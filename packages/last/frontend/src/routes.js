import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import Logon from './pages/Logon';

export default function Routes() {
    return (
        <Router>
            <Switch>
                <Route path="/" exact component={Logon}/>
            </Switch>
        </Router>
    )
}