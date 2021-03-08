import React from 'react';
import { Switch, Route } from 'react-router-dom';
import routes from '../constants/routes';
import Register from './Register';
import Posts from './Posts';
import Complete from './Complete';

export default function Home() {
  return (
    <Switch>
      <Route exact path={routes.register} component={Register}></Route>
      <Route exact path={routes.posts} component={Posts}></Route>
      <Route exact path={routes.completeRegister} component={Complete}></Route>
    </Switch>
  );
}
