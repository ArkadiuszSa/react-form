import * as React from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect
} from 'react-router-dom';

import "./../assets/scss/App.scss";
const reactLogo = require("./../assets/img/react_logo.svg");
import '../assets/scss/normalize.css'

import Form from './Form'
import HappeningsList from './HappeningsList'
import AdminPanel from './AdminPanel/AdminLayout'
import NotFound from './NotFound'
import Login from './Login'

import AdminHappeningsList from "./AdminPanel/AdminHappeningsList";
import AdminApplications from "./AdminPanel/AdminApplications";
import AdminHappening from "./AdminPanel/AdminHappening";
import Logout from "./Logout";
import NoAcces from "./NoAcces";


export interface AppProps {
}

export default class App extends React.Component<AppProps, undefined> {

  render() {
    return (
      <Router >
        <div className="App">
          <Switch>
            <Route exact path='/' component={HappeningsList} />
            <Route exact path='/form/:id' component={Form} />
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

