import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

import config from './config';
import { omitString, mergeObject } from './utils';

require("highcharts/modules/annotations")(Highcharts);


/**
 * basic info chart
 */
class BasicInfoChart extends React.Component {
    constructor(props) {
        super(props);

        this.increaseChartRef = React.createRef();
        this.sumChartRef = React.createRef();
        this.predictChartRef = React.createRef();

        this.state = {
            increaseChart: null,
            sumChart: null,
            preChart: null
        }
    }

    fetchData(varName, dataType, onComplete) {
        fetch(`${config.API_URL}/chart/${this.props.uid}?field=${varName}&dataType=${dataType}`)
            .then(res => res.json())
            .then(
                (result) => {
                    let points = [];
                    let labels = [];

                    result.forEach(ele => {
                        let x = ele.Time * 1000,
                            y = (ele[varName] != 'NaN') ? ele[varName] : NaN;

                        // if a video is published in the period, add it as an annotation
                        if (ele.Videos) {
                            ele.Videos.forEach((v) => {
                                labels.push({
                                    allowOverlap: true,
                                    point: {
                                        x: v.UploadTime * 1000,
                                        y: y,
                                        xAxis: 0,
                                        yAxis: 0
                                    },
                                    text: omitString(v.Topic, 8)
                                });
                            });
                        }
                        points.push([x, y]);
                    });

                    onComplete(points, labels);
                }
            );
    }

    changeChart(varName, chartDataType, loadingState, newStateGen) {
        let tableTitlePrefix = {
            'inc': '新增',
            'sum': '累计',
            'pre': '预测'
        };

        let varNameDict = {
            FanNum: '粉丝量',
            PlayNum: '播放量',
            ChargeNum: '充电量'
        };

        this.setState(loadingState);

        this.fetchData(varName, chartDataType, (pts, labels) => {
            const options = {
                title: {
                    text: `${tableTitlePrefix[chartDataType]}${varNameDict[varName]}`
                },
                annotations: [{
                    labels: labels
                }],
                xAxis: {
                    type: 'datetime',
                },
                yAxis: {
                    title: {
                        text: varNameDict[varName]
                    }
                },
                series: [{
                    type: 'area',
                    data: pts,
                    lineColor: Highcharts.getOptions().colors[1],
                    color: Highcharts.getOptions().colors[10],
                    fillOpacity: 0.5
                }],
                legend: {
                    enabled: false
                }
            };

            this.setState(newStateGen(options));
        });
    }

    changeIncreaseChart(varName) {
        this.changeChart(
            varName, 'inc',
            {
                increaseChart: (
                    <div className="uk-flex uk-flex-center uk-padding-small" style={{ height: (this.predictChartRef.current !== null ? this.predictChartRef.current.chart.chartHeight : 400) + 'px' }}>
                        <span className="uk-margin-medium-top" uk-spinner="ratio: 3"></span>
                    </div>
                )
            },
            (options) => {
                return {
                    increaseChart: (
                        <div>
                            <HighchartsReact
                                ref={this.predictChartRef}
                                containerProps={{ 'className': 'uk-box-shadow-medium uk-padding-small uk-background-default' }}
                                highcharts={Highcharts}
                                options={options}
                            />
                        </div>
                    )
                };
            }
        );
    }

    changeSumChart(varName) {
        this.changeChart(
            varName, 'sum',
            {
                sumChart: (
                    <div className="uk-flex uk-flex-center uk-padding-small" style={{ height: (this.sumChartRef.current !== null ? this.sumChartRef.current.chart.chartHeight : 400) + 'px' }}>
                        <span className="uk-margin-medium-top" uk-spinner="ratio: 3"></span>
                    </div>
                )
            },
            (options) => {
                return {
                    sumChart: (
                        <div>
                            <HighchartsReact
                                ref={this.sumChartRef}
                                containerProps={{ 'className': 'uk-box-shadow-medium uk-padding-small uk-background-default' }}
                                highcharts={Highcharts}
                                options={options}
                            />
                        </div>
                    )
                };
            }
        );
    }

    changePreChart(varName) {
        this.changeChart(
            varName, 'pre',
            {
                preChart: (
                    <div className="uk-flex uk-flex-center uk-padding-small" style={{ height: (this.predictChartRef.current !== null ? this.predictChartRef.current.chart.chartHeight : 400) + 'px' }}>
                        <span className="uk-margin-medium-top" uk-spinner="ratio: 3"></span>
                    </div>
                )
            },
            (options) => {
                return {
                    preChart: (
                        <div>
                            <HighchartsReact
                                ref={this.predictChartRef}
                                containerProps={{ 'className': 'uk-box-shadow-medium uk-padding-small uk-background-default' }}
                                highcharts={Highcharts}
                                options={options}
                            />
                        </div>
                    )
                };
            }
        );
    }

    componentDidMount() {
        this.changeIncreaseChart('FanNum');
        this.changeSumChart('FanNum');
        this.changePreChart('FanNum');
    }

    render() {
        return (
            <div>
                <h3 className="uk-heading-bullet">新增</h3>
                <div>
                    <ul className="uk-subnav uk-subnav-pill uk-flex-center" uk-switcher="true">
                        <li><a href="#" onClick={() => { this.changeIncreaseChart('FanNum') }}>粉丝</a></li>
                        <li><a href="#" onClick={() => { this.changeIncreaseChart('PlayNum') }}>播放</a></li>
                        <li><a href="#" onClick={() => { this.changeIncreaseChart('ChargeNum') }}>充电</a></li>
                    </ul>

                    {this.state.increaseChart}
                </div>

                <h3 className="uk-heading-bullet">累计</h3>
                <div>
                    <ul className="uk-subnav uk-subnav-pill uk-flex-center" uk-switcher="true">
                        <li><a href="#" onClick={() => { this.changeSumChart('FanNum') }}>粉丝</a></li>
                        <li><a href="#" onClick={() => { this.changeSumChart('PlayNum') }}>播放</a></li>
                        <li><a href="#" onClick={() => { this.changeSumChart('ChargeNum') }}>充电</a></li>
                    </ul>

                    {this.state.sumChart}
                </div>

                <h3 className="uk-heading-bullet">预测</h3>
                <div>
                    <ul className="uk-subnav uk-subnav-pill uk-flex-center" uk-switcher="true">
                        <li><a href="#" onClick={() => { this.changePreChart('FanNum') }}>粉丝</a></li>
                        <li><a href="#" onClick={() => { this.changePreChart('PlayNum') }}>播放</a></li>
                        <li><a href="#" onClick={() => { this.changePreChart('ChargeNum') }}>充电</a></li>
                    </ul>

                    {this.state.preChart}
                </div>
            </div>
        );
    }
}


/**
 * video info chart
 */
class ChartSwitcher extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoaded: false,
            chart: null
        };

        this.chartRef = React.createRef();
    }

    componentDidMount() {
        this.switchChart(Object.keys(this.props.items)[0]);
    }

    switchChart(itemKey) {
        this.setState({
            chart: (
                <div className="uk-flex uk-flex-center uk-padding-small" style={{ height: (this.chartRef.current !== null ? this.chartRef.current.chart.chartHeight : 400) + 'px' }}>
                    <span className="uk-margin-medium-top" uk-spinner="ratio: 3"></span>
                </div>
            )
        });

        this.props.fetchData(itemKey, (hightchartsOptions) => {
            const options = {
                title: {
                    text: this.props.items[itemKey].chartTitle
                },
                yAxis: {
                    title: {
                        text: this.props.items[itemKey].name
                    }
                },
                legend: {
                    enabled: false
                }
            };

            mergeObject(options, hightchartsOptions);

            this.setState({
                chart: (
                    <div>
                        <HighchartsReact
                            ref={this.chartRef}
                            containerProps={{ 'className': 'uk-box-shadow-medium uk-padding-small uk-background-default' }}
                            highcharts={Highcharts}
                            options={options}
                        />
                    </div>
                )
            });
        });
    }

    render() {
        let listComp = [];

        for (let [k, v] of Object.entries(this.props.items)) {
            listComp.push(
                <li key={k}><a href="#" onClick={() => { this.switchChart(k) }}>{v.name}</a></li>
            );
        }

        return (
            <div>
                <ul className="uk-subnav uk-subnav-pill uk-flex-center" uk-switcher="true">
                    {listComp}
                </ul>

                {this.state.chart}
            </div>
        );
    }
}

class VideoInfoChart extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            qualityChart: (
                <div className="uk-flex uk-flex-center uk-padding-small" style={{ height: '400px' }}>
                    <span className="uk-margin-medium-top" uk-spinner="ratio: 3"></span>
                </div>
            ),

            trackedVideoList: (
                <div className="uk-flex uk-flex-center uk-padding-small">
                    <span className="uk-margin-medium-top" uk-spinner="ratio: 3"></span>
                </div>
            ),
        };
    }

    fetchVideoQuality(onComplete) {
        fetch(`${config.API_URL}/videoQuality/${this.props.uid}`)
            .then(res => res.json())
            .then(
                (result) => {
                    let totalQuality = 0;
                    let pts = result.map(ele => {
                        totalQuality += (ele.Quality != 'NaN') ? ele.Quality : 0;

                        return {
                            x: ele.UploadTime * 1000,
                            y: (ele.Quality != 'NaN') ? ele.Quality : NaN,
                            name: ele.Topic
                        };
                    });

                    onComplete(pts, totalQuality / result.length);
                }
            );
    }

    fetchTrackedVideo(onComplete) {
        fetch(`${config.API_URL}/trackedVideos/${this.props.uid}`)
            .then(res => res.json())
            .then(onComplete);
    }

    fetchVideoData(avNum, itemKey, onComplete) {
        fetch(`${config.API_URL}/videoChart/${this.props.uid}/${avNum}?field=${itemKey}&dataType=sum`)
            .then(res => res.json())
            .then((result) => {
                console.log(result)

                let pts = result.map((ele) => {
                    return [ele.CrawlTime * 1000, ele[itemKey] == 'NaN' ? NaN : ele[itemKey]];
                });

                onComplete({
                    xAxis: {
                        type: 'datetime',
                    },
                    series: [{
                        type: 'area',
                        data: pts,
                        lineColor: Highcharts.getOptions().colors[1],
                        color: Highcharts.getOptions().colors[10],
                        fillOpacity: 0.5
                    }]
                });
            });
    }

    createQualityChart(pts, avgQuality) {
        const options = {
            title: {
                text: '视频质量分布'
            },
            xAxis: {
                type: 'datetime',
            },
            yAxis: {
                title: {
                    text: '质量'
                },
                plotLines: [{
                    color: Highcharts.getOptions().colors[8],
                    width: 2,
                    dashStyle: 'ShortDashDotDot',
                    value: avgQuality,
                    label: {
                        useHTML: true,
                        text: `平均质量：${avgQuality.toFixed(2)}`,
                        style: {
                            color: Highcharts.getOptions().colors[8],
                            fontWeight: 'bold',
                            backgroundColor: 'white'
                        },
                        y: -20
                    },
                    zIndex: 1000
                }]
            },
            series: [{
                type: 'column',
                data: pts,
                lineColor: Highcharts.getOptions().colors[1],
                color: Highcharts.getOptions().colors[4],
                fillOpacity: 0.5
            }],
            legend: {
                enabled: false
            },
            plotOptions: {
                column: {
                    pointPadding: 0.2,
                    borderWidth: 1,
                    pointWidth: 10,
                    shadow: true
                }
            }
        };

        this.setState({
            qualityChart: (
                <div>
                    <HighchartsReact
                        ref={this.predictChartRef}
                        containerProps={{ 'className': 'uk-box-shadow-medium uk-padding-small uk-background-default' }}
                        highcharts={Highcharts}
                        options={options}
                    />
                </div>
            )
        });
    }

    createTrackedVideoList(list) {
        console.log(list)
        let compList = list.map((ele, idx) => {
            return (
                <li key={idx} className="uk-close">
                    <a className="uk-accordion-title" href="#">
                        {ele.Topic}
                    </a>
                    <div className="uk-accordion-content">
                        <ul className="uk-comment-meta uk-subnav uk-margin-remove-top">
                            <li><span href="#">播放: {ele.View}</span></li>
                            <li><span href="#">点赞: {ele.Like}</span></li>
                            <li><span href="#">弹幕: {ele.DMNum}</span></li>
                            <li><span href="#">评论: {ele.Comment}</span></li>
                            <li><span href="#">硬币: {ele.Coin}</span></li>
                        </ul>

                        <ChartSwitcher
                            items={{
                                View: {
                                    chartTitle: '播放量走势',
                                    name: '播放量'
                                },
                                Like: {
                                    chartTitle: '点赞量走势',
                                    name: '点赞量'
                                },
                                DMNum: {
                                    chartTitle: '弹幕量走势',
                                    name: '弹幕量'
                                },
                                Comment: {
                                    chartTitle: '评论量走势',
                                    name: '评论量'
                                },
                                Coin: {
                                    chartTitle: '硬币量走势',
                                    name: '硬币量'
                                }
                            }}
                            fetchData={(itemKey, callback) => {
                                this.fetchVideoData(ele.AVNum, itemKey, callback);
                            }}
                        />
                    </div>
                    <hr />
                </li>
            );
        });

        this.setState({
            trackedVideoList: (
                <ul className="uk-background-default uk-padding-large" uk-accordion="multiple: true">
                    {compList}
                </ul>
            )
        });
    }

    componentDidMount() {
        this.fetchVideoQuality((pts, avgQuality) => {
            this.createQualityChart(pts, avgQuality);
        });

        this.fetchTrackedVideo((list) => {
            this.createTrackedVideoList(list);
        });
    }

    render() {
        return (
            <div>
                <h3 className="uk-heading-bullet">视频信息</h3>
                <div>
                    <div className="uk-padding-small uk-grid-divider uk-grid-medium uk-child-width-expand@s" uk-grid="true">
                        <div>
                            <div className="uk-grid-small" uk-grid="true">
                                <div className="uk-width-expand" uk-leader="true">平均播放量</div>
                                <div>{this.props.profile.AvgView.toFixed(2)}</div>
                            </div>
                            <div className="uk-grid-small" uk-grid="true">
                                <div className="uk-width-expand" uk-leader="true">平均赞赏/平均播放</div>
                                <div>{(this.props.profile.AvgScore / this.props.profile.AvgView).toFixed(2)}</div>
                            </div>
                            <div className="uk-grid-small" uk-grid="true">
                                <div className="uk-width-expand" uk-leader="true">近期发布数</div>
                                <div>{this.props.profile.RecentCount}</div>
                            </div>
                        </div>

                        <div>
                            <div className="uk-grid-small" uk-grid="true">
                                <div className="uk-width-expand" uk-leader="true">平均赞赏</div>
                                <div>{this.props.profile.AvgScore}</div>
                            </div>
                            <div className="uk-grid-small" uk-grid="true">
                                <div className="uk-width-expand" uk-leader="true">充电/本月播放</div>
                                <div>{((this.props.profile.ChargesMonthly / this.props.profile.ViewsMonthly) * 100).toFixed(3)}%</div>
                            </div>
                            <div className="uk-grid-small" uk-grid="true">
                                <div className="uk-width-expand" uk-leader="true">平均时长</div>
                                <div>{this.props.profile.AvgDuration}s</div>
                            </div>
                        </div>
                    </div>
                </div>

                <h3 className="uk-heading-bullet">视频质量</h3>
                {this.state.qualityChart}

                <h3 className="uk-heading-bullet">视频追踪</h3>
                {this.state.trackedVideoList}
            </div>
        );
    }
}


export { BasicInfoChart, VideoInfoChart };
