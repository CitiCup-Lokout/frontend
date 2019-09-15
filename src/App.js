import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ScrollToTop from 'react-router-scroll-top'

import Navigation from './Navigation';
import Footer from './Footer';
import Home from './Home';
import Rank from './Rank';
import Report from './Report';
import Bid from './Bid';
import Task from './Task';
import PersonProfile from './PersonProfile';
import SearchResult from './SearchResult';
import NoMatch from './NoMatch';


function App() {
    return (
        <Router>
            <ScrollToTop>
                <div id="main" className="uk-padding-large uk-padding-remove-top uk-padding-remove-left uk-padding-remove-right">
                    <header>
                        <Navigation />
                    </header>
                    <main>
                        <Switch>
                            <Route exact path="/" component={Home} />
                            <Route exact path="/rank" component={Rank} />
                            <Route exact path="/report" component={Report} />
                            <Route exact path="/bid" component={Bid} />
                            <Route exact path="/task" component={Task} />
                            <Route path="/up/:uid" component={PersonProfile} />
                            <Route path="/s/:query" component={SearchResult} />
                            <Route component={NoMatch} />
                        </Switch>
                    </main>
                </div>
                <footer>
                    <Footer />
                </footer>
            </ScrollToTop>
        </Router>
    );
}

export default App;
