import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
// import Home from '../pages/Home';
import Birth from '../pages/Birth';
import Death from '../pages/Death';
import Sale from '../pages/Sale';
import Purchase from '../pages/Purchase';

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path="/entrar" component={SignIn} />
      <Route path="/registrar" component={SignUp} />

      <Route path="/" exact component={Birth} isPrivate />
      <Route path="/nascimentos" component={Birth} isPrivate />
      <Route path="/mortes" exact component={Death} isPrivate />
      <Route path="/compras" exact component={Purchase} isPrivate />
      <Route path="/vendas" exact component={Sale} isPrivate />
    </Switch>
  );
};

export default Routes;
