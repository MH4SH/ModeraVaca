import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import Login from './pages/Login';
import Register from './pages/Register';

export default function Routes() {
    return (
        <Router>
            <Switch>
                <Route path="/" exact component={Login}/>
                <Route path="/entrar" exact component={Login}/>
                <Route path="/registrar" exact component={Register}/>
            </Switch>
        </Router>
    )
}