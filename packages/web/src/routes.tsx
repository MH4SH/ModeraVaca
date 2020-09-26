import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Birth from './pages/Birth';
import Death from './pages/Death';
import Sale from './pages/Sale';
import Purchase from './pages/Purchase';


export default function Routes() {
    const Middlewares = () => {
        const userToken = localStorage.getItem('userToken');
    
        if(userToken)
            return (
                <>
                    <Route path="/" exact={true} component={Birth} />
                    <Route path="/nascimentos" component={Birth} />
                    <Route path="/mortes" exact component={Death} />
                    <Route path="/compras" exact component={Purchase} />
                    <Route path="/vendas" exact component={Sale} />
                </>
            )
            
        return <Route path="/" component={Login} />
    }
    return (
        <Router>

            <Switch>
                <Route path="/entrar" component={Login}/>
                <Route path="/registrar" component={Register}/>

                <Middlewares />
            </Switch>
        </Router>
    )
}