import React from 'react';
import { Link } from 'react-router-dom';


class Navigation extends React.Component {
    constructor(props) {
        super(props);

        this.navButtons = [
            {
                name: '排名',
                url: '/rank/',
                icon: 'list'
            },
            {
                name: '招标发布区',
                url: '/bid/',
                icon: 'bolt'
            },
            {
                name: '任务发布区',
                url: '/task/',
                icon: 'thumbnails'
            },
            {
                name: '报告区',
                url: '/report/',
                icon: 'file-text'
            },
            {
                name: 'Source',
                url: 'https://github.com/CitiCup-Lokout',
                icon: 'github-alt'
            }
        ];
    }

    createButtonsForWideScreen() {
        let listComps = [];
        for (let i = 0; i < this.navButtons.length - 1; i++) {
            let btn = this.navButtons[i];
            listComps.push(<li key={i}><Link to={btn.url}>{btn.name}</Link></li>);
        }

        let lastBtn = this.navButtons[this.navButtons.length - 1];

        return (
            <div className="uk-flex">
                <ul className="uk-navbar-nav uk-visible@m">
                    {listComps}
                </ul>
                <div className="uk-navbar-item uk-visible@m">
                    <a target="_blank" rel="noopener noreferrer" href={lastBtn.url} className="uk-button uk-button-default uk-border-rounded">
                        <span className="uk-margin-small-right" uk-icon={'icon: ' + lastBtn.icon}></span>
                        <span>{lastBtn.name}</span>
                    </a>
                </div>
            </div>
        );
    }

    createButtonsForNarrowScreen() {
        let narrowComps = [];

        for (let i = 0; i < this.navButtons.length - 1; i++) {
            let btn = this.navButtons[i];
            narrowComps.push(
                <li key={i}>
                    <Link to={btn.url}>
                        <span className="uk-margin-small-right" uk-icon={"icon: " + btn.icon}></span>
                        {btn.name}
                    </Link>
                </li>
            );
        }

        let lastBtn = this.navButtons[this.navButtons.length - 1];

        narrowComps.push(
            <li key={this.navButtons.length - 1}>
                <a href={lastBtn.url} target="_blank" rel="noopener noreferrer">
                    <span className="uk-margin-small-right" uk-icon={"icon: " + lastBtn.icon}></span>
                    {lastBtn.name}
                </a>
            </li>
        )

        return narrowComps;
    }

    render() {
        return (
            <div id="nav" className="uk-box-shadow-small">
                <nav className="uk-navbar-container" uk-navbar="true">
                    <div className="uk-navbar-left">
                        <Link to="/" className="uk-navbar-item uk-logo uk-margin-small-left">
                            Lokout
                        </Link>
                    </div>
                    <div className="uk-navbar-right uk-margin-small-right">
                        {this.createButtonsForWideScreen()}

                        <div className="uk-hidden@m uk-inline">
                            <button className="toggle-button uk-icon-button uk-button-default" uk-icon="icon: menu"></button>
                            <div uk-dropdown="mode: click; animation: uk-animation-slide-top-small; pos: top-right;" className="dropdown-menu uk-border-rounded">
                                <ul className="uk-nav uk-dropdown-nav">
                                    {this.createButtonsForNarrowScreen()}
                                </ul>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
        );
    }
}

export default Navigation;
