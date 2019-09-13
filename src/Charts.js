import React from 'react';
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

import config from './config';


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
                    console.log(result)
                    onComplete(result.map((ele => {
                        return [ele['Time'] * 1000, !ele['breakpoint'] ? ele[varName] : NaN]
                    })));
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

        this.fetchData(varName, chartDataType, (res) => {
            const options = {
                title: {
                    text: `${tableTitlePrefix[chartDataType]}${varNameDict[varName]}`
                },
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
                    data: res
                }],
                legend: {
                    enabled: false
                },
                plotOptions: {
                    area: {
                        fillColor: {
                            linearGradient: {
                                x1: 0,
                                y1: 0,
                                x2: 0,
                                y2: 1
                            },
                            stops: [
                                [0, Highcharts.getOptions().colors[0]],
                                [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                            ]
                        },
                        marker: {
                            radius: 2
                        },
                        lineWidth: 1,
                        states: {
                            hover: {
                                lineWidth: 1
                            }
                        },
                        threshold: null
                    }
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
                    <div className="uk-flex uk-flex-center uk-padding-small" style={{height: (this.predictChartRef.current !== null ? this.predictChartRef.current.chart.chartHeight : 400) + 'px'}}>
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
                                containerProps={{'className': 'uk-box-shadow-medium uk-padding-small uk-background-default'}}
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
                    <div className="uk-flex uk-flex-center uk-padding-small" style={{height: (this.sumChartRef.current !== null ? this.sumChartRef.current.chart.chartHeight : 400) + 'px'}}>
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
                                containerProps={{'className': 'uk-box-shadow-medium uk-padding-small uk-background-default'}}
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
                    <div className="uk-flex uk-flex-center uk-padding-small" style={{height: (this.predictChartRef.current !== null ? this.predictChartRef.current.chart.chartHeight : 400) + 'px'}}>
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
                                containerProps={{'className': 'uk-box-shadow-medium uk-padding-small uk-background-default'}}
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

export { BasicInfoChart };