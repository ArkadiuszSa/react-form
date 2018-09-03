import * as React from "react";
import { withRouter } from "react-router-dom";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import "./applications.scss";
import ApplicationsService from "./applications.service";

export interface ApplicationsState {
  applications: Application[];
}

export interface Application {
  happeningTitle?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  date?: string;
}

class AdminApplications extends React.Component<{}, ApplicationsState> {
  private applicationsFormService: ApplicationsService = new ApplicationsService();
  constructor(props) {
    super(props);
    this.state = {
      applications: []
    };
  }

  componentDidMount() {
    this.getData();
  }

  async getData() {
    let applications = await this.applicationsFormService.getApplicationsAndHappenings();
    this.setState({
      applications: applications
    });
  }

  render() {
    return (
      <div className="applications-container">
        <p className="application-title-p">Applications</p>
        <div className="applications-table">
          <Paper>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>First name</TableCell>
                  <TableCell>Last name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Event</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.applications.map(application => {
                  return (
                    <TableRow>
                      <TableCell>{application.firstName}</TableCell>
                      <TableCell>{application.lastName}</TableCell>
                      <TableCell>{application.email}</TableCell>
                      <TableCell>{application.date}</TableCell>
                      <TableCell>{application.happeningTitle}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </Paper>
        </div>
      </div>
    );
  }
}

export default withRouter(AdminApplications);
