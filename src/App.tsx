import * as React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';

import "./App.scss";
const reactLogo = require("./assets/img/react_logo.svg");
import './assets/scss/normalize.css'

import AdminPanel from './modules/admin-panel/components/layout/layout'
import AdminHappeningsList from "./modules/admin-panel/components/happenings-list/happenings-list";
import AdminApplications from "./modules/admin-panel/components/applications/applications";
import AdminHappening from "./modules/admin-panel/components/happenings-list/happening/happening";

import ApplicationForm from './modules/user/components/application-form/application-form';
import HappeningsList from './modules/user/components/happenings-list/happenings-list'

import Login from './modules/common/components/login/login'
import Logout from "./modules/common/components/logout/logout";
import NotFound from "./modules/common/components/not-found/not-found";
import NoAcces from "./modules/common/components/no-acces/no-acces";

export interface AppProps {
}

export default class App extends React.Component<AppProps, undefined> {

  render() {
    return (
      <Router >
        <div className="App">
          <Switch>
            <Route exact path='/' component={HappeningsList} />
            <Route exact path='/form/:id' component={ApplicationForm} />
            <Route exact path='/login' component={Login} />
            <AdminPanel path='/admin'>
                <Route exact path='/admin/happenings' component={AdminHappeningsList} />
                <Route exact path='/admin/happening/:id' component={AdminHappening} />
                <Route exact path='/admin/applications' component={AdminApplications} />
            </AdminPanel>
            <Route exact  path='/logout' component={Logout} />
            <Route exact  path='/no-acces' component={NoAcces} />
            <Route exact  path='/**' component={NotFound} />
            
          </Switch>
        </div>
      </Router>
    );
  }
}

