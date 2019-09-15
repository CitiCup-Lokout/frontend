import React from 'react';

import ImgLogo1 from './res/task_logos/1.svg';
import ImgLogo2 from './res/task_logos/2.jpg';
import ImgLogo3 from './res/task_logos/3.jpg';
import ImgLogo4 from './res/task_logos/4.jpg';
import ImgLogo5 from './res/task_logos/5.png';
import ImgLogo6 from './res/task_logos/6.jpg';
import ImgTask from './res/task.svg';


class Task extends React.Component {
    render() {
        return (
            <div className="uk-container uk-margin-large-top">
                <h2 className="uk-text-center">任务发布区</h2>
                <div className="uk-container uk-margin-large-top" uk-grid="true">
                    <div className="uk-width-1-4@m">
                        <ul className="uk-nav uk-nav-default">
                            <li className="uk-active"><a href="#">总览</a></li>
                            <li className="uk-parent">
                                <a href="#">软件</a>
                                <ul className="uk-nav-sub">
                                    <li><a href="#">游戏</a></li>
                                    <li><a href="#">办公</a></li>
                                    <li><a href="#">交友</a></li>
                                </ul>
                            </li>
                            <li className="uk-parent">
                                <a href="#">电商</a>
                                <ul className="uk-nav-sub">
                                    <li><a href="#">食品</a></li>
                                    <li><a href="#">数码</a></li>
                                    <li><a href="#">时尚</a></li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                    <div className="uk-width-expand@m">
                        <table className="uk-table uk-table-middle uk-table-divider">
                            <tbody>
                                <tr>
                                    <td className="uk-width-small"><img src={ImgLogo5} /></td>
                                    <td>
                                        <p>软体-办公 | 全能扫描王</p>
                                        <p>数码/生活/科技/影视 | 50w粉丝以上</p>
                                        <p>1.5元/次下载 | 资金池: 9445/100000元</p>
                                    </td>
                                    <td>
                                        <p> FROM: 合合科技 </p>
                                        <p> DDL: 10-31 </p>
                                    </td>
                                    <td><button className="uk-button uk-button-default" type="button">获取链接</button></td>
                                </tr>
                                <tr>
                                    <td className="uk-width-small"><img src={ImgLogo3} /></td>
                                    <td>
                                        <p>软体-交友 | 绿洲</p>
                                        <p>时尚/生活/科技/游戏 | 50w粉丝以上</p>
                                        <p>3元/次下载 | 资金池: 13345/200000元</p>
                                    </td>
                                    <td>
                                        <p> FROM: 绿洲app </p>
                                        <p> DDL: 10-1 </p>
                                    </td>
                                    <td><button className="uk-button uk-button-default" type="button">获取链接</button></td>
                                </tr>
                                <tr>
                                    <td className="uk-width-small"><img src={ImgLogo4} /></td>
                                    <td>
                                        <p>电商-时尚 | Jackblack 男士护肤套装</p>
                                        <p>全区 | 50w粉丝以上</p>
                                        <p>8元/次下载 | 资金池: 16000/16000</p>
                                    </td>
                                    <td>
                                        <p> FROM: JACKBLACK </p>
                                        <p> DDL: 10-1 </p>
                                    </td>
                                    <td><button className="uk-button uk-button-default" type="button">已结束</button></td>
                                </tr>
                                <tr>
                                    <td className="uk-width-small"><img src={ImgLogo2} /></td>
                                    <td>
                                        <p>软件-电商 | 毒App</p>
                                        <p>全区 | 100w粉丝以上</p>
                                        <p>2元/次下载 | 资金池: 49002/50000</p>
                                    </td>
                                    <td>
                                        <p> FROM: 毒App </p>
                                        <p> DDL: 10-1 </p>
                                    </td>
                                    <td><button className="uk-button uk-button-default" type="button">获取链接</button></td>
                                </tr>
                            </tbody>
                        </table>

                    </div>
                </div>

                <div className="uk-flex-middle uk-margin-large" uk-grid>
                    <div className="uk-width-expand">
                        <img src={ImgTask} alt="Image" />
                    </div>
                </div>
            </div>
        );
    }
}

export default Task;
