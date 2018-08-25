import * as React from "react";
import { withRouter } from 'react-router-dom';
import {
  BrowserRouter as Router,
  Link,
} from 'react-router-dom';

import "./layout.scss";
const logo = require("../../../../assets/img/logout.svg") as string;
import AdminAuthGuard from '../../helpers/admin-auth-guard'

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';


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
