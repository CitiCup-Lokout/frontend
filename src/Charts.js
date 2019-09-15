import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

import config from './config';
import { omitString, mergeObject } from './utils';

import ImgSentiAna0 from './res/sentiment_analysis/av64287119.png';
import ImgSentiAna1 from './res/sentiment_analysis/av64611629.png';
import ImgSentiAna2 from './res/sentiment_analysis/av65595759.png';
import ImgSentiAna3 from './res/sentiment_analysis/av65844602.png';
import ImgSentiAna4 from './res/sentiment_analysis/av66608963.png';
import ImgWorldCloud0 from './res/word_cloud/av64287119.jpg';
import ImgWorldCloud1 from './res/word_cloud/av64611629.jpg';
import ImgWorldCloud2 from './res/word_cloud/av65595759.jpg';
import ImgWorldCloud3 from './res/word_cloud/av65844602.jpg';
import ImgWorldCloud4 from './res/word_cloud/av66608963.jpg';
import ImgFanMap from './res/fan_map.png';

require("highcharts/modules/annotations")(Highcharts);
require("highcharts/modules/networkgraph")(Highcharts);
require("highcharts/highcharts-more")(Highcharts);

const danmuAnalysisFigList = {
    av64287119: {
        sentiAna: ImgSentiAna0,
        wordCloud: ImgWorldCloud0
    },
    av64611629: {
        sentiAna: ImgSentiAna1,
        wordCloud: ImgWorldCloud1
    },
    av65595759: {
        sentiAna: ImgSentiAna2,
        wordCloud: ImgWorldCloud2
    },
    av65844602: {
        sentiAna: ImgSentiAna3,
        wordCloud: ImgWorldCloud3
    },
    av66608963: {
        sentiAna: ImgSentiAna4,
        wordCloud: ImgWorldCloud4
    }
};

const radarChartScoreTable = [
    [250000, 500000, 750000, 1000000, 1500000, 2000000, 3000000, 4000000, 5000000],
    [10, 20, 30, 50, 75, 100, 150, 300, 600],
    [10000, 50000, 150000, 300000, 500000, 750000, 1000000, 2000000, 4000000],
    [1, 2, 3, 4, 5, 6, 7, 8, 9],
    [10000, 50000, 150000, 300000, 500000, 750000, 1000000, 2000000, 4000000]
];


/**
 * radar chart of profile
 */
function ProfileRaderChart(props) {
    let scores = [1, 1, 1, 1, 1];

    for (let i = 0; i < props.values.length; i++) {
        let stages = radarChartScoreTable[i];
        let v = props.values[i];

        for (let j = 0; j < stages.length; j++) {
            if (v > stages[j]) {
                scores[i] += 1;
            } else {
                break;
            }
        }
    }

    let options = {
        chart: {
            polar: true,
            type: 'line',
            backgroundColor: null
        },

        title: null,

        xAxis: {
            categories: ['粉丝基数', '粉丝成长', '作品质量', '发布速度', '收入水平'],
            tickmarkPlacement: 'on',
            lineWidth: 0,
            gridLineWidth: 2,
            labels: {
                style: {
                    fontSize: '15px',
                    color: '#FFFFFF'
                }
            }
        },

        yAxis: {
            gridLineInterpolation: 'polygon',
            lineWidth: 0,
            min: 0,
            max: 10,
            gridLineWidth: 2,
            title: {
                style: {
                    textTransform: 'uppercase'
                }
            },
            labels: {
                style: {
                    fontSize: '15px',
                    color: '#FFFFFF'
                }
            }
        },

        legend: {
            enabled: false
        },

        series: [{
            data: scores,
            pointPlacement: 'on',
            color: Highcharts.getOptions().colors[3],
            lineWidth: 5
        }],

        tooltip: {
            borderWidth: 0,
            backgroundColor: 'rgba(219,219,216,0.8)',
            shadow: true
        }
    };

    return (
        <div className="uk-flex uk-flex-center">
            <div>
                <HighchartsReact
                    highcharts={Highcharts}
                    options={options}
                />
            </div>
        </div>
    );
}

/**
 * chart switcher
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

/**
 * basic info chart
 */
class BasicInfoChart extends React.Component {
    constructor(props) {
        super(props);
    }

    fetchData(dataType, varName, onComplete) {
        fetch(`${config.API_URL}/chart/${this.props.uid}?field=${varName}&dataType=${dataType}`)
            .then(res => res.json())
            .then(
                (result) => {
                    let points = [];
                    let labels = [];

                    result.forEach(ele => {
                        let x = ele.Time * 1000,
                            y = (ele[varName] !== 'NaN') ? ele[varName] : NaN;

                        // if a video is published in the period, add it as an annotation
                        if (ele.Videos && dataType !== 'pre') {
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

                    let pltLines = [];
                    if (dataType == 'pre') {
                        pltLines = [{
                            color: Highcharts.getOptions().colors[8],
                            width: 2,
                            dashStyle: 'ShortDashDotDot',
                            value: (new Date()).getTime(),
                            label: {
                                useHTML: true,
                                text: `当前时间点`,
                                style: {
                                    color: Highcharts.getOptions().colors[8],
                                    fontWeight: 'bold',
                                    backgroundColor: 'white'
                                },
                                x: 10
                            },
                            zIndex: 1000
                        }];
                    }

                    onComplete({
                        annotations: [{
                            labels: labels
                        }],
                        xAxis: {
                            type: 'datetime',
                            plotLines: pltLines
                        },
                        series: [{
                            type: 'area',
                            data: points,
                            lineColor: Highcharts.getOptions().colors[1],
                            color: Highcharts.getOptions().colors[10],
                            fillOpacity: 0.5
                        }],
                        legend: {
                            enabled: false
                        }
                    });
                }
            );
    }

    render() {
        return (
            <div>
                <h3 className="uk-heading-bullet">新增</h3>
                <div>
                    <ChartSwitcher
                        items={{
                            FanNum: { name: '粉丝量', chartTitle: '新增粉丝量' },
                            PlayNum: { name: '播放量', chartTitle: '新增播放量' },
                            ChargeNum: { name: '充电量', chartTitle: '新增充电量' }
                        }}
                        fetchData={(itemKey, callback) => {
                            this.fetchData('inc', itemKey, callback)
                        }}
                    />
                </div>

                <h3 className="uk-heading-bullet">累计</h3>
                <div>
                    <ChartSwitcher
                        items={{
                            FanNum: { name: '粉丝量', chartTitle: '累计粉丝量' },
                            PlayNum: { name: '播放量', chartTitle: '累计播放量' },
                            ChargeNum: { name: '充电量', chartTitle: '累计充电量' }
                        }}
                        fetchData={(itemKey, callback) => {
                            this.fetchData('sum', itemKey, callback)
                        }}
                    />
                </div>

                <h3 className="uk-heading-bullet">预测</h3>
                <div>
                    <ChartSwitcher
                        items={{
                            FanNum: { name: '粉丝量', chartTitle: '预测粉丝量' },
                            PlayNum: { name: '播放量', chartTitle: '预测播放量' }
                        }}
                        fetchData={(itemKey, callback) => {
                            this.fetchData('pre', itemKey, callback)
                        }}
                    />
                </div>
            </div>
        );
    }
}


/**
 * video info chart
 */

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
        fetch(`${config.API_URL}/videoQuality/${this.props.profile.uid}`)
            .then(res => res.json())
            .then(
                (result) => {
                    let totalQuality = 0;
                    let pts = result.map(ele => {
                        totalQuality += (ele.Quality !== 'NaN') ? ele.Quality : 0;

                        return {
                            x: ele.UploadTime * 1000,
                            y: (ele.Quality !== 'NaN') ? ele.Quality : NaN,
                            name: ele.Topic
                        };
                    });

                    onComplete(pts, totalQuality / result.length);
                }
            );
    }

    fetchTrackedVideo(onComplete) {
        fetch(`${config.API_URL}/trackedVideos/${this.props.profile.uid}`)
            .then(res => res.json())
            .then(onComplete);
    }

    fetchVideoData(avNum, itemKey, onComplete) {
        fetch(`${config.API_URL}/videoChart/${this.props.profile.uid}/${avNum}?field=${itemKey}&dataType=sum`)
            .then(res => res.json())
            .then((result) => {
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
        let compList = list.map((ele, idx) => {
            let danmuAnalysisFigComp = null;

            let avId = 'av' + ele.AVNum;

            if (avId in danmuAnalysisFigList) {
                let figs = danmuAnalysisFigList[avId];

                danmuAnalysisFigComp = (
                    <div className="uk-margin-medium-top">
                        <h5>评论情感分析/词云</h5>
                        <div className="uk-grid-small" uk-grid="true">
                            <div className="uk-width-1-2"><img className="uk-box-shadow-medium" src={figs.sentiAna} /></div>
                            <div className="uk-width-1-2"><img className="uk-box-shadow-medium" src={figs.wordCloud} /></div>
                        </div>
                    </div>
                );
            }

            return (
                <li key={idx} className="uk-close">
                    <a className="uk-accordion-title" href="#">
                        <span className="uk-padding-small uk-padding-remove-left uk-padding-remove-bottom uk-padding-remove-top" uk-icon="icon: video-camera;"></span>
                        <span>{ele.Topic}</span>
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

                        {danmuAnalysisFigComp}
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

/**
 * evaluation chart
 */
class EvaluationChart extends React.Component {
    constructor(props) {
        super(props);
    }

    fetchData(onComplete) {
        fetch(`${config.API_URL}/chart/${this.props.profile.uid}?field=ChannelValue&dataType=pre`)
            .then(res => res.json())
            .then(
                (result) => {
                    let points = result.map(ele => {
                        return [ele.Time * 1000, (ele['ChannelValue'] !== 'NaN') ? ele['ChannelValue'] : NaN];
                    });

                    onComplete({
                        xAxis: {
                            type: 'datetime',
                            plotLines: [{
                                color: Highcharts.getOptions().colors[8],
                                width: 2,
                                dashStyle: 'ShortDashDotDot',
                                value: (new Date()).getTime(),
                                label: {
                                    useHTML: true,
                                    text: `当前时间点`,
                                    style: {
                                        color: Highcharts.getOptions().colors[8],
                                        fontWeight: 'bold',
                                        backgroundColor: 'white'
                                    },
                                    x: 10
                                },
                                zIndex: 1000
                            }]
                        },
                        series: [{
                            type: 'area',
                            data: points,
                            lineColor: Highcharts.getOptions().colors[1],
                            color: Highcharts.getOptions().colors[10],
                            fillOpacity: 0.5
                        }],
                        legend: {
                            enabled: false
                        }
                    });
                }
            );
    }

    render() {
        return (
            <div>
                <h3 className="uk-heading-bullet">价值测量</h3>
                <div className="uk-padding-small">
                    <div className="uk-grid-small" uk-grid="true">
                        <div className="uk-width-expand" uk-leader="true">平均视频收益</div>
                        <div>{(this.props.profile.IncomePerVideo === 'NaN') ? this.props.profile.IncomePerVideo : this.props.profile.IncomePerVideo.toFixed(2)}</div>
                    </div>
                    <div className="uk-grid-small" uk-grid="true">
                        <div className="uk-width-expand" uk-leader="true">频道视频年收入</div>
                        <div>{(this.props.profile.IncomeYearly === 'NaN') ? this.props.profile.IncomeYearly : this.props.profile.IncomeYearly.toFixed(2)}</div>
                    </div>
                    <div className="uk-grid-small" uk-grid="true">
                        <div className="uk-width-expand" uk-leader="true">频道价值</div>
                        <div>{(this.props.profile.ChannelValue === 'NaN') ? this.props.profile.ChannelValue : this.props.profile.ChannelValue.toFixed(2)}</div>
                    </div>
                </div>

                <h3 className="uk-heading-bullet">预测</h3>
                <ChartSwitcher
                    items={{
                        ChannelValue: {
                            chartTitle: '频道价值预测',
                            name: '频道价值'
                        }
                    }}
                    fetchData={(_, callback) => {
                        this.fetchData(callback);
                    }}
                />
            </div>
        );
    }
}


/**
 * fans chart
 */
function FansChart(props) {
    let options = {
        title: null,
        chart: {
            type: 'networkgraph',
            height: '100%'
        },
        plotOptions: {
            networkgraph: {
                keys: ['from', 'to'],
                layoutAlgorithm: {
                    enableSimulation: true,
                    friction: -0.9
                }
            }
        },
        series: [{
            dataLabels: {
                enabled: true,
                linkFormat: ''
            },
            id: 'lang-tree',
            data: [
                ['Proto Indo-European', 'Balto-Slavic'],
                ['Proto Indo-European', 'Germanic'],
                ['Proto Indo-European', 'Celtic'],
                ['Proto Indo-European', 'Italic'],
                ['Proto Indo-European', 'Hellenic'],
                ['Proto Indo-European', 'Anatolian'],
                ['Proto Indo-European', 'Indo-Iranian'],
                ['Proto Indo-European', 'Tocharian'],
                ['Indo-Iranian', 'Dardic'],
                ['Indo-Iranian', 'Indic'],
                ['Indo-Iranian', 'Iranian'],
                ['Iranian', 'Old Persian'],
                ['Old Persian', 'Middle Persian'],
                ['Indic', 'Sanskrit'],
                ['Italic', 'Osco-Umbrian'],
                ['Italic', 'Latino-Faliscan'],
                ['Latino-Faliscan', 'Latin'],
                ['Celtic', 'Brythonic'],
                ['Celtic', 'Goidelic'],
                ['Germanic', 'North Germanic'],
                ['Germanic', 'West Germanic'],
                ['Germanic', 'East Germanic'],
                ['North Germanic', 'Old Norse'],
                ['North Germanic', 'Old Swedish'],
                ['North Germanic', 'Old Danish'],
                ['West Germanic', 'Old English'],
                ['West Germanic', 'Old Frisian'],
                ['West Germanic', 'Old Dutch'],
                ['West Germanic', 'Old Low German'],
                ['West Germanic', 'Old High German'],
                ['Old Norse', 'Old Icelandic'],
            ]
        }]
    };

    return (
        <div>
            <h3 className="uk-heading-bullet">粉丝分布</h3>
            <div className="uk-flex uk-flex-center">
                <img className="uk-box-shadow-medium" src={ImgFanMap} />
            </div>

            <h3 className="uk-heading-bullet">百度指数</h3>
            <div className="uk-flex uk-flex-center">
                <a className="uk-button uk-button-primary uk-width-1-2@m uk-button-large" href={`http://index.baidu.com/v2/main/index.html#/trend/${props.profile.Name}`}>还想看？试试百度指数</a>
            </div>

            <h3 className="uk-heading-bullet">粉丝关系图</h3>
            <div className="uk-flex uk-flex-center">
                <HighchartsReact
                    highcharts={Highcharts}
                    containerProps={{ 'className': 'uk-box-shadow-medium uk-padding-small uk-background-default' }}
                    options={options}
                />
            </div>
        </div>
    );
}


export { ProfileRaderChart, BasicInfoChart, VideoInfoChart, EvaluationChart, FansChart };
