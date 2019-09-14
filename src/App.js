import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import Navigation from './Navigation';
import Home from './Home';
import Rank from './Rank';
import PersonProfile from './PersonProfile';
import SearchResult from './SearchResult';


function App() {
    return (
        <Router>
            <div id="main">
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
        </Router>
    );
}

export default App;
