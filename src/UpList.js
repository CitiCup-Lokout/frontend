import React from 'react';
import { Link } from 'react-router-dom';

import ImgDefaultAvatar from './res/default-avatar.png';


class Avatar extends React.Component {
    constructor(props) {
        super(props);

        this.state = { src: props.src };
    }

    render() {
        return (
            <img
                className="uk-comment-avatar uk-border-circle" src={this.state.src} width="80" height="80" alt=""
                onError={() => { this.setState({ src: ImgDefaultAvatar }) }}
            />
        );
    }
}

class UpList extends React.Component {
    constructor(props) {
        super(props);

        this.listComponents = null;

        if (props.list === null || props.list.length === 0) {
            this.listComponents = (
                <h3 className="uk-text-center">没有相关内容</h3>
            );
        } else {
            this.listComponents = [];

            for (let i = 0; i < props.list.length; i++) {
                let o = props.list[i];
                let itemsComp = [];

                if (this.props.items) {
                    for (let k in this.props.items) {
                        itemsComp.push(
                            <li key={k}><span>{this.props.items[k]} {(o[k] == 'NaN') ? o[k] : parseInt(o[k])}</span></li>
                        );
                    }
                }

                this.listComponents.push(
                    <Link to={`/up/${o.uid}`} key={i} className="uk-background-default uk-link-toggle uk-margin-small-bottom uk-box-shadow-medium uk-comment-primary uk-width-1-1 uk-flex uk-flex-middle">
                        <div className="uk-width-auto uk-margin-small-right">
                            <Avatar src={(typeof o.Face !== 'undefined') ? o.Face.replace('http://', 'https://') : ''} />
                        </div>
                        <div className="uk-width-expand uk-margin-small-left">
                            <h4 className="uk-comment-title uk-margin-remove">
                                <span className="uk-link-heading">{o.Name}</span>
                            </h4>
                            <ul className="uk-margin-small-top uk-comment-meta uk-subnav uk-margin-remove-bottom">
                                {itemsComp}
                            </ul>
                        </div>
                    </Link>
                );
            }
        }
    }

    render() {
        return (
            <div className="uk-margin-medium-top uk-flex uk-flex-center uk-width-1-1">
                <div className="uk-width-3-4@s uk-width-1-1">{this.listComponents}</div>
            </div>
        );
    }
}

export default UpList;