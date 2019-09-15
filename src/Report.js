import React from 'react';

import ImgThumbnail0 from './res/thumbnails/0.png';
import ImgThumbnail1 from './res/thumbnails/1.png';
import ImgThumbnail2 from './res/thumbnails/2.png';
import ImgThumbnail3 from './res/thumbnails/3.png';


function Report() {
    let list = [
        {
            title: '敬汉卿强森8月涨粉对比,华农月纪录被刷新',
            subtitle: '【涨粉月刊#13】',
            time: '2019-09-07',
            url: 'https://www.bilibili.com/video/av66975224',
            img: ImgThumbnail0
        },
        {
            title: 'B站粉丝最多UP排行,8月诞生两个600万粉,两人刷新月纪录',
            subtitle: '【涨粉月刊#13-总榜】',
            time: '2019-09-02',
            url: 'https://www.bilibili.com/video/av66362279',
            img: ImgThumbnail1
        },
        {
            title: '8月涨粉最快是谁?第一天就刷新纪录,不到三天刷新华农月纪录',
            subtitle: '【涨粉月刊#13】',
            time: '2019-08-20',
            url: 'https://www.bilibili.com/video/av64623886',
            img: ImgThumbnail2
        },
        {
            title: 'B站近期掉粉最多的UP主是谁?',
            subtitle: '【吃瓜月刊#11-2】',
            time: '2019-08-20',
            url: 'https://www.bilibili.com/video/av64280004',
            img: ImgThumbnail3
        }
    ];

    let listComp = list.map((ele, idx) => {
        return (
            <div key={idx}>
                <div className="uk-flex-middle" uk-grid="true">
                    <div className="uk-width-3-4@m uk-width-2-3">
                        <h4>
                            <a target="_blank" rel="noopener noreferrer" className="uk-link-heading" href={ele.url}>{ele.title}</a>
                            <br />
                            <small>{ele.subtitle} {ele.time}</small>
                        </h4>
                    </div>
                    <div className="uk-width-1-4@m uk-width-1-3 uk-flex-first">
                        <img src={ele.img} />
                    </div>
                </div>
                <hr />
            </div>
        );
    });

    return (
        <div className="uk-container uk-margin-large-top">
            <h2 className="uk-text-center">可视化报告区</h2>
            <div className="uk-container uk-margin-large-top" uk-grid="true">
                <div className="uk-width-auto@m">
                    <ul className="uk-tab-left" uk-tab="connect: #component-tab-left; animation: uk-animation-fade">
                        <li><a href="#"><p className="switcher-large-text">总览</p></a></li>
                        <li><a href="#"><p className="switcher-large-text">行业资讯</p></a></li>
                        <li><a href="#"><p className="switcher-large-text">涨粉月刊</p></a></li>
                        <li><a href="#"><p className="switcher-large-text">吃瓜月刊</p></a></li>
                        <li><a href="#"><p className="switcher-large-text">播放量月刊</p></a></li>
                    </ul>
                </div>
                <div className="uk-width-expand@m">
                    <ul id="component-tab-left" className="uk-switcher">
                        <li>{listComp}</li>
                        <li>{listComp}</li>
                        <li>{listComp}</li>
                        <li>{listComp}</li>
                        <li>{listComp}</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Report;