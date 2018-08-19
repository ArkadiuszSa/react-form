import * as React from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom';

import "./../assets/scss/App.scss";
const reactLogo = require("./../assets/img/react_logo.svg");
import '../assets/scss/normalize.css'

import Form from './Form'
import HappeningsList from './HappeningsList'

export interface AppProps {
}

export default class App extends React.Component<AppProps, undefined> {

  render() {
    return (
      <Router forceRefresh={true}>
        <div className="App">
          <Switch>
            <Route exact path='/' component={HappeningsList} />
            <Route exact path='/form/:id' component={Form} />
          </Switch>
        </div>
      </Router>
    );
  }
}

