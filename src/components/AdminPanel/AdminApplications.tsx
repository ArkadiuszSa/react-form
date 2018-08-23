import * as React from "react";
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import "../../assets/scss/AdminApplications.scss";

//
import * as PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import * as moment from 'moment';

export interface ApplicationsData {
  data: [{
    happeningId?: string,
    firstName?: string,
    lastName?: string,
    email?: string,
    date?: string
  }]
}

export interface HappeningsData {
  data: [{
    _id: string,
    title: string
  }]
}

export interface ApplicationsState {
  applications: Application[]
}


export interface Application {
  happeningTitle?: string,
  firstName?: string,
  lastName?: string,
  email?: string,
  date?: string
}



class AdminApplications extends React.Component<{}, ApplicationsState> {
  public applicationsData = [];
  public happeningsData = [];
  constructor(props) {
    super(props);
    this.state = {
      applications: []
    }
    this.getData();

  }

  getApplications() {
    return axios.get("http://localhost:4000/api/applications/")
      .catch((error) => {
        console.log(error)
      });
  }

  getHappenings() {
    return axios.get("http://localhost:4000/api/happenings")
      .catch((error) => {
        console.log(error)
      });
  }

  transformDataToApplications(happeningsData, applicationsData): Application[] {
    let applications: Application[] = applicationsData.map((applicationData) => {
      let happeningData = happeningsData.find((happening) => {
        return applicationData.happeningId === happening._id;
      })
      

      let application: Application = {
        date: moment(applicationData.date).format("YYYY-MM-DD"),
        happeningTitle: happeningData.title,
        firstName: applicationData.firstName,
        lastName: applicationData.lastName,
        email: applicationData.email
      }
      return application;
    })
    return applications;

  }

  async getData() {
    let happeningsData: HappeningsData = await this.getHappenings() as HappeningsData;
    let applicationsData: ApplicationsData = await this.getApplications() as ApplicationsData;
    let applications = this.transformDataToApplications(happeningsData.data, applicationsData.data);
    
    this.setState({
      applications: applications
    })
  }


  render() {
    return (
      <div className="applications-container" >
      <p className="application-title-p">Applications</p>
        <div className="applications-table">
          <Paper  >

            <Table >
              <TableHead>
                <TableRow>
                  <TableCell >First name</TableCell>
                  <TableCell >Last name</TableCell>
                  <TableCell >Email</TableCell>
                  <TableCell >Date</TableCell>
                  <TableCell >Event</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.applications.map(application => {
                  return (
                    <TableRow >
                      <TableCell >{application.firstName}</TableCell>
                      <TableCell >{application.lastName}</TableCell>
                      <TableCell >{application.email}</TableCell>
                      <TableCell >{application.date}</TableCell>
                      <TableCell >{application.happeningTitle}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </Paper>
        </div>
      </div>
    )
  }
}



export default withRouter(AdminApplications)
