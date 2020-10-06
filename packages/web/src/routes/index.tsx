import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Login from "../pages/Login";
import Register from "../pages/Register";
// import Home from '../pages/Home';
import Birth from "../pages/Birth";
import Death from "../pages/Death";
import Sale from "../pages/Sale";
import Purchase from "../pages/Purchase";

const Routes: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route path="/entrar" component={Login} />
        <Route path="/registrar" component={Register} />

        <Route path="/" exact component={Birth} isPrivate />
        <Route path="/nascimentos" component={Birth} isPrivate />
        <Route path="/mortes" exact component={Death} isPrivate />
        <Route path="/compras" exact component={Purchase} isPrivate />
        <Route path="/vendas" exact component={Sale} isPrivate />
      </Switch>
    </Router>
  );
};

export default Routes;
