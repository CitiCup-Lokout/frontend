import React from 'react';

import ImgBidRelease from './res/bid_release.svg';

import DataBid from './res/bid_data.json';


class Bid extends React.Component {
    render() {
        let listComp = [];
        for (let i = 0; i < DataBid.length; i++) {
            let item = DataBid[i];

            let tableRows = [];
            for (let [k, v] of Object.entries(item)) {
                tableRows.push(
                    <tr key={k}>
                        <td className="uk-width-1-5"><b>{k}</b></td>
                        <td>{v}</td>
                    </tr>
                );
            }

            listComp.push(
                <li key={i} className="uk-close">
                    <a className="uk-accordion-title" href="#"><span uk-icon="icon: nut;"></span> {item['产品名称']}</a>
                    <div className="uk-accordion-content">
                        <table className="uk-table uk-table-justify uk-table-small">
                            <tbody>
                                {tableRows}
                            </tbody>
                        </table>
                    </div>
                    <hr className="uk-divider-icon" />
                </li>
            );
        }

        return (
            <div className="uk-container uk-margin-large-top">
                <h2 className="uk-text-center">招标发布区</h2>
                <div className="uk-container uk-margin-large-top" uk-grid="true">
                    <div className="uk-width-1-4@m">
                        <ul className="uk-tab-left" uk-tab="connect: #component-tab-left; animation: uk-animation-fade">
                            <li><a href="#"><p className="switcher-large-text">总览</p></a></li>
                            <li><a href="#"><p className="switcher-large-text">动画</p></a></li>
                            <li><a href="#"><p className="switcher-large-text">音乐</p></a></li>
                            <li><a href="#"><p className="switcher-large-text">舞蹈</p></a></li>
                            <li><a href="#"><p className="switcher-large-text">游戏</p></a></li>
                            <li><a href="#"><p className="switcher-large-text">科技</p></a></li>
                            <li><a href="#"><p className="switcher-large-text">数码</p></a></li>
                            <li><a href="#"><p className="switcher-large-text">生活</p></a></li>
                            <li><a href="#"><p className="switcher-large-text">影视</p></a></li>
                            <li><a href="#"><p className="switcher-large-text">时尚</p></a></li>
                        </ul>
                    </div>
                    <div className="uk-width-expand@m">
                        <ul id="component-tab-left" className="uk-switcher">
                            <li>
                                <ul uk-accordion="multiple: true">
                                    {listComp}
                                </ul>
                            </li>
                            <li><h3>暂无内容</h3></li>
                            <li><h3>暂无内容</h3></li>
                            <li><h3>暂无内容</h3></li>
                            <li><h3>暂无内容</h3></li>
                            <li><h3>暂无内容</h3></li>
                            <li><h3>暂无内容</h3></li>
                            <li><h3>暂无内容</h3></li>
                            <li><h3>暂无内容</h3></li>
                            <li><h3>暂无内容</h3></li>
                        </ul>
                    </div>
                </div>
                <div className="uk-flex-middle" uk-grid="true">
                    <div className="uk-width-expand">
                        <img src={ImgBidRelease} />
                    </div>
                </div>
            </div>
        );
    }
}

export default Bid;