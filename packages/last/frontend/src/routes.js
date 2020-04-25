import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';

import ScrollToTop from './components/ScrollToTop';



export default function Routes() {
    const Middlewares = () => {
        const userToken = localStorage.getItem('userToken');
    
        if(userToken)
            return (
                <>
                    <Route path="/" exact={true} component={Home} />
                    <Route path="/fichas" component={Home} />
                    <Route path="/pendente" exact component={Home} />
                    <Route path="/transacoes" exact component={Home} />
                </>
            )
            
        return <Route path="/" component={Login} />
    }
    return (
        <Router>
            <ScrollToTop />

            <Switch>
                <Route path="/entrar" component={Login}/>
                <Route path="/registrar" component={Register}/>

                <Middlewares />
            </Switch>
        </Router>
    )
}