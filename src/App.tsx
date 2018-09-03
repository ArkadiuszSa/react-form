import * as React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./app.scss";
import "./assets/scss/normalize.scss";

import AdminPanel from "./modules/admin-panel/components/layout/layout";
import AdminHappeningsList from "./modules/admin-panel/components/happenings-list/happenings-list";
import AdminApplications from "./modules/admin-panel/components/applications/applications";
import AdminHappening from "./modules/admin-panel/components/happenings-list/happening/happening";

import ApplicationFormContainer from "./modules/user/pages/application-form/application-form.container";
import HappeningsList from "./modules/user/pages/happenings-list/happenings-list";

import Login from "./modules/common/pages/login/login";
import Logout from "./modules/common/pages/logout/logout";
import NotFound from "./modules/common/pages/not-found/not-found";
import NoAcces from "./modules/common/pages/no-acces/no-acces";

import { createStore } from "redux";
import rootReducer from "./reducers";
import { Provider } from "react-redux";

const store = createStore(rootReducer);

export interface AppProps {}

export default class App extends React.Component<AppProps, undefined> {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="app">
            <Switch>
              <Route exact path="/" component={HappeningsList} />
              <Route
                exact
                path="/form/:id"
                component={ApplicationFormContainer}
              />
              <Route exact path="/login" component={Login} />
              <AdminPanel path="/admin">
                <Route
                  exact
                  path="/admin/happenings"
                  component={AdminHappeningsList}
                />
                <Route
                  exact
                  path="/admin/happening/:id"
                  component={AdminHappening}
                />
                <Route
                  exact
                  path="/admin/applications"
                  component={AdminApplications}
                />
              </AdminPanel>
              <Route exact path="/logout" component={Logout} />
              <Route exact path="/no-acces" component={NoAcces} />
              <Route exact path="/**" component={NotFound} />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}
