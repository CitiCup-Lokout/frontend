import React from 'react';

function Footer() {
    return (
        <div className="uk-margin-small-top uk-grid-divider uk-box-shadow-medium uk-child-width-expand@s uk-background-muted uk-padding-large" uk-grid="true">
            <div>
                <h4><span uk-icon="icon: info;"></span> 网站功能</h4>
                <ul>
                    <li>海量的频道信息，多维度的频道能力指标</li>
                    <li>基于梅卡夫斯定律与传统现金流折现的估值模型</li>
                    <li>基于机器学习的指标预测与评论情感分析</li>
                    <li>高效的推广任务与招标信息发布机制</li>
                    <li>多渠道行业资讯与可视化行研报告</li>
                </ul>
            </div>
            <div>
                <h4><span uk-icon="icon: users;"></span> 合作伙伴</h4>
                <ul>
                    <li>BiliBili频道主 狸子LePtC</li>
                </ul>
            </div>
            <div>
                <h4><span uk-icon="icon: receiver;"></span> 联系我们</h4>
                <ul>
                    <li>站长邮箱：wangzy7@shanghaitech.edu.cn</li>
                    <li>技术支持：wangph@shanghaitech.edu.cn</li>
                </ul>
            </div>
        </div>
    )
}

export default Footer;