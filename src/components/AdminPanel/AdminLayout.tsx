import * as React from "react";
import "../../assets/scss/AdminPanel.scss";
const logo = require("./logout.svg") as string;
import { withRouter } from 'react-router-dom';
//
import * as PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
//

import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom';

import AdminAuthGuard from '../../helpers/AdminAuthGuard'
export interface AdminLayoutProps {
  history?: any
}

class AdminPanel extends React.Component<AdminLayoutProps, {}> {
  constructor(props) {
    super(props);

  }
  
  closeSession() {
    AdminAuthGuard.closeSesion();
  }

  componentWillMount() {
    if (!AdminAuthGuard.checkAcces()) {
      this.props.history.push("/no-acces");
    }
  }

  render() {
    return (
      <div className="admin-container" >

        <div className="admin-nav"> Admin panel
          <Link className="nav-link" to="/logout" onClick={this.closeSession}>
            <img className="logout-img" src={logo} />
          </Link>
        </div>

        <div className="admin-content-container">
          {this.props.children}
        </div>

        <nav className="admin-sidebar">
          <List component="nav">
            <Link className="menu-link" to="/admin/happenings">
              <ListItem button divider >
                <ListItemText primary="Happenings" />
              </ListItem>
            </Link>
            <Link className="menu-link" to="/admin/applications">
              <ListItem button divider >
                <ListItemText primary="Applications" />
              </ListItem>
            </Link>
          </List>
        </nav>
      </div>
    )
  }
}

export default withRouter(AdminPanel)
