import React from 'react';

import config from './config';
import UpList from './UpList';


class SearchResult extends React.Component {
    constructor(props) {
        super(props);

        this.searchResultList = null;

        this.state = {
            isLoaded: false
        };

        this.fetchSearchResult(props.match.params.query);
    }

    fetchSearchResult(query) {
        fetch(`${config.API_URL}/search?query=${query}`)
            .then(res => res.json())
            .then(
                (result) => {
                    this.searchResultList = <UpList list={result} />;

                    this.setState({ isLoaded: true });
                }
            );
    }

    render() {
        let comp;

        if (this.state.isLoaded) {
            comp = this.searchResultList;
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