import React from 'react';

import ImgDefaultAvatar from './res/default-avatar.png';
import ImgGird from './res/gird.png';
import config from './config';
import { ProfileRaderChart, BasicInfoChart, VideoInfoChart, EvaluationChart, FansChart } from './Charts';


class Avatar extends React.Component {
    constructor(props) {
        super(props);

        this.state = { src: props.src };
    }

    render() {
        return (
            <div className="uk-width-auto">
                <img
                    className="uk-visible@m uk-border-circle" width="150" height="150" alt=""
                    src={this.state.src}
                    onError={() => { this.setState({ src: ImgDefaultAvatar }) }}
                />
                <img
                    className="uk-hidden@m uk-border-circle" width="90" height="90" alt=""
                    src={this.state.src}
                    onError={() => { this.setState({ src: ImgDefaultAvatar }) }}
                />
            </div>
        );
    }
}

class PersonProfile extends React.Component {
    constructor(props) {
        super(props);

        this.state = { isLoaded: false };

        this.profile = null;

        this.fetchProfile(props.match.params.uid);
    }

    fetchProfile(uid) {
        fetch(`${config.API_URL}/info/${uid}`)
            .then(res => res.json())
            .then(
                (result) => {
                    this.profile = result;

                    this.setState({ isLoaded: true });
                }
            );
    }

    render() {
        let backgroundImageStyle = {
            background: `url(${ImgGird}) 50% 17vh repeat,linear-gradient(to left top, #28a5f5, #1e87f0) 0 0 no-repeat`
        };

        if (this.state.isLoaded) {
            return (
                <div>
                    <div style={backgroundImageStyle} className="uk-section uk-section-small uk-section-primary uk-light uk-flex uk-flex-center">
                        <div style={{ maxWidth: '600px' }} className="uk-card uk-card-transparent uk-width-1-2@m uk-margin-medium-top">
                            <div className="uk-card-header">
                                <div className="uk-grid-small uk-flex-middle" uk-grid="true">
                                    <Avatar src={this.profile.Face} />
                                    <div className="uk-width-expand uk-margin-small-left">
                                        <h3 className="uk-card-title uk-margin-remove-bottom">{this.profile.Name} <span className="uk-label uk-margin-small-left">未入驻</span></h3>
                                        <p className="uk-margin-remove-top">简介: {this.profile.Profile}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="uk-card-body">
                                <div className="uk-child-width-expand uk-text-center" uk-grid="true">
                                    <div>
                                        <div>粉丝数</div>
                                        <div className="uk-margin-small-top">{this.profile.FanNum}</div>
                                    </div>
                                    <div>
                                        <div>播放量</div>
                                        <div className="uk-margin-small-top">{this.profile.PlayNum}</div>
                                    </div>
                                    <div>
                                        <div>本月充电量</div>
                                        <div className="uk-margin-small-top">{this.profile.ChargeNum}</div>
                                    </div>
                                </div>
                                <hr className="uk-divider-icon" />
                                <div className="uk-child-width-expand uk-text-center" uk-grid="true">
                                    <div>
                                        <div>粉丝增长指数</div>
                                        <div className="uk-margin-small-top">{this.profile.FanIncIndex.toFixed(2)}</div>
                                    </div>
                                    <div>
                                        <div>作品指数</div>
                                        <div className="uk-margin-small-top">{this.profile.WorkIndex.toFixed(2)}</div>
                                    </div>
                                    <div>
                                        <div>总指数</div>
                                        <div className="uk-margin-small-top">{this.profile.SummaryIndex.toFixed(2)}</div>
                                    </div>
                                </div>
                            </div>

                            <ProfileRaderChart values={[this.profile.FanNum, this.profile.FanIncIndex, this.profile.AvgView + this.profile.AvgScore, this.profile.RecentCount, this.profile.IncomeYearly]} />

                            <div className="uk-card-footer uk-flex uk-flex-center">
                                <a className="uk-button uk-button-secondary" href="#"><span uk-icon="icon: star;"></span> 收藏</a>
                                <a target="_blank" rel="noopener noreferrer" href={`https://space.bilibili.com/${this.profile.uid}`} className="uk-button uk-button-secondary uk-margin-left"><span uk-icon="icon: world;"></span> TA的频道</a>
                                <a className="uk-button uk-button-secondary uk-margin-left" href="#"><span uk-icon="icon: mail;"></span> 私信</a>
                            </div>
                        </div>
                    </div>

                    <div className="uk-container uk-margin-medium">
                        <div className="uk-child-width-1-1" uk-grid="True">
                            <div>
                                <div uk-grid="True">
                                    <div className="uk-width-auto@m">
                                        <ul className="uk-tab-left" uk-tab="connect: #tab-right-charts; animation: uk-animation-fade">
                                            <li><a href="#"><p className="switcher-large-text">基本数据</p></a></li>
                                            <li><a href="#"><p className="switcher-large-text">视频数据</p></a></li>
                                            <li><a href="#"><p className="switcher-large-text">估值数据</p></a></li>
                                            <li><a href="#"><p className="switcher-large-text">粉丝画像</p></a></li>
                                        </ul>
                                    </div>
                                    <div className="uk-width-expand@m">
                                        <ul id="tab-right-charts" className="uk-switcher">
                                            <li><BasicInfoChart uid={this.props.match.params.uid} /></li>
                                            <li><VideoInfoChart profile={this.profile} /></li>
                                            <li><EvaluationChart profile={this.profile} /></li>
                                            <li><FansChart profile={this.profile} /></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        } else {
            return (
                <div className="uk-margin-xlarge-top uk-flex uk-flex-center">
                    <span className="uk-margin-large-top" uk-spinner="ratio: 4.5"></span>
                </div>
            );
        }
    }
}

export default PersonProfile;