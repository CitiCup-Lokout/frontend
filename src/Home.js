import React from 'react';
import { Redirect } from 'react-router-dom';

import ImgLogo from './res/logo.svg';


class Home extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            searchContent: '',
            isRedirectToSearchResult: false
        };
    }

    handleSearch(event) {
        this.setState({ isRedirectToSearchResult: true });

        event.preventDefault();
    }

    render() {
        if (this.state.isRedirectToSearchResult) {
            return <Redirect to={`/s/${this.state.searchContent}`} />;
        } else {
            return (
                <div className="uk-flex uk-flex-center">
                    <div className="uk-card uk-card-transparent uk-width-1-2@m  uk-margin-large-top">
                        <div className="uk-card-header">
                            <h1 className="uk-text-center"><img style={{ width: '60%' }} src={ImgLogo} /></h1>
                        </div>
                        <div className="uk-card-body">
                            <form onSubmit={(event) => { this.handleSearch(event) }} style={{ width: "100%" }} className="uk-search uk-search-default uk-search-large">
                                <span uk-search-icon="true"></span>
                                <input
                                    style={{ fontSize: "1.5rem", background: '#FFFFFF' }}
                                    value={this.state.searchContent}
                                    className="uk-search-input" type="search" placeholder="搜索...."
                                    onChange={(event) => {
                                        this.setState({ searchContent: event.target.value });
                                    }}
                                />
                            </form>
                        </div>
                        <div className="uk-card-footer uk-flex uk-flex-center uk-margin-large-bottom">
                            <a href="" className="uk-icon-button uk-margin-small-right" uk-icon="twitter"></a>
                            <a href="" className="uk-icon-button  uk-margin-small-right" uk-icon="facebook"></a>
                            <a href="" className="uk-icon-button" uk-icon="google-plus"></a>
                        </div>
                    </div>
                </div>
            );
        }
    }
}

export default Home;