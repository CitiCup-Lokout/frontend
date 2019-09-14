import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import Navigation from './Navigation';
import Footer from './Footer';
import Home from './Home';
import Rank from './Rank';
import PersonProfile from './PersonProfile';
import SearchResult from './SearchResult';


function App() {
    return (
        <Router>
            <div id="main" className="uk-padding-large uk-padding-remove-top uk-padding-remove-left uk-padding-remove-right">
                <header>
                    <Navigation />
                </header>
                <main>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/rank" component={Rank} />
                    <Route path="/up/:uid" component={PersonProfile} />
                    <Route path="/s/:query" component={SearchResult} />
                </main>
            </div>
            <footer>
                <Footer />
            </footer>
        </Router>
    );
}

export default App;
