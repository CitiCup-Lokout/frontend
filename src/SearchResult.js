import React from 'react';
import { Link } from 'react-router-dom';

import config from './config';
import ImgDefaultAvatar from './res/default-avatar.png';


class Avatar extends React.Component {
    constructor(props) {
        super(props);

        this.state = { src: props.src };
    }

    render() {
        return (
            <img
                className="uk-comment-avatar" src={this.state.src} width="80" height="80" alt=""
                onError={() => { this.setState({ src: ImgDefaultAvatar }) }}
            />
        );
    }
}

class SearchResult extends React.Component {
    constructor(props) {
        super(props);

        this.searchResultList = [];

        this.state = {
            isLoaded: false
        };

        this.fetchSearchResult(props.match.params.query);
    }

    fetchSearchResult(query) {
        if (this.searchResultList.length > 0) {
            this.searchResultList.splice(0, this.searchResultList.length);
        }

        fetch(`${config.API_URL}/search?query=${query}`)
            .then(res => res.json())
            .then(
                (result) => {
                    for (let i = 0; i < result.length; i++) {
                        let o = result[i];

                        this.searchResultList.push(
                            <Link to={`/up/${o.uid}`} key={i} className="uk-background-default uk-link-toggle uk-margin-small-bottom uk-box-shadow-medium uk-comment-primary uk-width-1-1 uk-flex uk-flex-middle">
                                <div className="uk-width-auto uk-margin-small-right">
                                    <Avatar src={o.Face} />
                                </div>
                                <div className="uk-width-expand uk-margin-small-left">
                                    <h4 className="uk-comment-title uk-margin-remove">
                                        <span className="uk-link-heading">{o.Name}</span>
                                    </h4>
                                    <ul className="uk-margin-small-top uk-comment-meta uk-subnav uk-margin-remove-bottom">
                                        <li><span>粉丝数 {o.FansNow}</span></li>
                                        <li><span>评分 {o.AvgScore}</span></li>
                                    </ul>
                                </div>
                            </Link>
                        );
                    }

                    this.setState({ isLoaded: true });
                }
            );
    }

    render() {
        let comp;

        if (this.state.isLoaded) {
            comp = (
                <div className="uk-margin-medium-top uk-flex uk-flex-center uk-width-1-1">
                    <div className="uk-width-3-4@s uk-width-1-1">{this.searchResultList}</div>
                </div>
            );
        } else {
            comp = (
                <div className="uk-margin-xlarge-top uk-flex uk-flex-center">
                    <span uk-spinner="ratio: 4.5"></span>
                </div>
            );
        }

        return (
            <div className="uk-container uk-margin-large-top">
                <h2 className="uk-text-center">搜索结果</h2>
                {comp}
            </div>
        );
    }
}

export default SearchResult;