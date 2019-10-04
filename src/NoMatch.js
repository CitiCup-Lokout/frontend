import React from 'react';

import ImgOops from './res/oops.svg';


function NoMatch() {
    return (
        <div className="uk-flex uk-flex-center uk-margin-large-top">
            <div>
                <h1><img src={ImgOops} /></h1>
                <p className="uk-text-lead">您要访问的页面还没有准备好！</p>
                <p>可能的原因是...</p>
                <ul>
                    <li>404 Not Found</li>
                    <li>经营性备案尚未通过</li>
                    <li>该功能还在测试中</li>
                    <li>您的权限不足</li>
                </ul>
            </div>
        </div>
    );
}

export default NoMatch;