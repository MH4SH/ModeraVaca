import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';

import ScrollToTop from './components/ScrollToTop';

export default function Routes() {
    return (
        <Router>
            <ScrollToTop />

            <Switch>
                <Route path="/" exact component={Login}/>
                <Route path="/entrar" exact component={Login}/>
                <Route path="/registrar" exact component={Register}/>
                <Route path="/home" exact component={Home} />
            </Switch>
        </Router>
    )
}