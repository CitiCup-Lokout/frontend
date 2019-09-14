import React from 'react';

import config from './config';
import UpList from './UpList';


class Rank extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoaded: false,
            category: 'global',
            field: 'SummaryIndex',
            order: 'dec',
            offset: '1'
        };

        this.rankList = null;

        this.fetchRank(props.match.params.query);
    }

    fetchRank() {
        fetch(`${config.API_URL}/rank/${this.state.category}?field=${this.state.field}&order=${this.state.order}&offset=${parseInt(this.state.offset) - 1}&count=50`)
            .then(res => res.json())
            .then(
                (result) => {
                    this.rankList = <UpList list={result} showRank={true} />;

                    this.setState({ isLoaded: true });
                }
            );
    }

    componentDidUpdate(_, prevState) {
        if (prevState.isLoaded === true && this.state.isLoaded === false) {
            this.fetchRank();
        }
    }

    changeCategory(event) {
        this.setState({
            isLoaded: false,
            category: event.target.value
        });
    }

    changeField(event) {
        this.setState({
            isLoaded: false,
            field: event.target.value
        });
    }

    changeOffset(event) {
        this.setState({
            isLoaded: false
        });

        event.preventDefault();
    }

    render() {
        let comp = null;

        if (this.state.isLoaded) {
            comp = this.rankList;
        } else {
            comp = (
                <div className="uk-margin-xlarge-top uk-flex uk-flex-center">
                    <span uk-spinner="ratio: 4.5"></span>
                </div>
            );
        }

        return (
            <div className="uk-container uk-margin-large-top">
                <h2 className="uk-text-center">排名</h2>
                <form onSubmit={(event) => { this.changeOffset(event) }} className="uk-margin-medium-top uk-flex uk-flex-center uk-width-1-1">
                    <div className="row uk-flex uk-flex-center uk-width-3-4@s uk-width-1-1">
                        <select disabled={!this.state.isLoaded} onChange={(event) => { this.changeCategory(event) }} value={this.state.category} className="uk-select">
                            <option value='global'>全站</option>
                            <option value='advertisement'>广告区</option>
                            <option value='dance'>舞蹈区</option>
                            <option value='fashion'>时尚区</option>
                            <option value='game'>游戏区</option>
                            <option value='mic'>国创区</option>
                            <option value='muisc'>音乐区</option>
                            <option value='technology'>科技区</option>
                            <option value='animation'>动画区</option>
                            <option value='digit'>数码区</option>
                            <option value='fun'>娱乐区</option>
                            <option value='life'>生活区</option>
                            <option value='movie'>影视区</option>
                            <option value='otomad'>鬼畜区</option>
                        </select>

                        <select disabled={!this.state.isLoaded} onChange={(event) => { this.changeField(event) }} value={this.state.field} className="uk-select">
                            <option value='FanNum'>按粉丝数量</option>
                            <option value='ChargesMonthly'>按本月充电数</option>
                            <option value='ViewsWeekly'>按本周播放量</option>
                            <option value='FanIncIndex'>按粉丝增长指数</option>
                            <option value='WorkIndex'>按作品指数</option>
                            <option value='SummaryIndex'>按总指数</option>
                            <option value='AvgQuality'>按平均质量</option>
                        </select>
                        <input
                            className="uk-input" type="number" placeholder="请输入排名起点...." min="1"
                            value={this.state.offset}
                            disabled={!this.state.isLoaded}
                            onChange={(event) => {
                                this.setState({ offset: event.target.value });
                            }}
                        />
                    </div>
                </form>

                {comp}
            </div>
        );
    }
}

export default Rank;