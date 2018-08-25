import * as moment from 'moment';
import http from '../../helpers/http'

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
export interface Application {
  happeningTitle?: string,
  firstName?: string,
  lastName?: string,
  email?: string,
  date?: string
}
export default class ApplicationService {
  constructor() {

  }

  getApplicationsPromise() {
    return http.get("http://localhost:4000/api/applications/")
      
  }

  getHappeningsPromise() {
    return http.get("http://localhost:4000/api/happenings")
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

  async getApplicationsAndHappenings() {
    let happeningsData: HappeningsData = await this.getHappeningsPromise() as HappeningsData;
    let applicationsData: ApplicationsData = await this.getApplicationsPromise() as ApplicationsData;
    let applications = this.transformDataToApplications(happeningsData.data, applicationsData.data);
    return applications;
  }

}
