import * as moment from "moment";
import http from "../../helpers/http";
import constants from "../../../../constants";

export interface ApplicationsData {
  data: [
    {
      happeningId?: string;
      firstName?: string;
      lastName?: string;
      email?: string;
      date?: string;
    }
  ];
}
export interface HappeningsData {
  data: [
    {
      _id: string;
      title: string;
    }
  ];
}
export interface Application {
  happeningTitle?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  date?: string;
}
export default class ApplicationService {
  private apiBase = constants.API_BASE;

  constructor() {}

  getApplicationsPromise() {
    return http.get(this.apiBase + "/applications/");
  }

  getHappeningsPromise() {
    return http.get(this.apiBase + "/happenings");
  }

  transformDataToApplications(happeningsData, applicationsData): Application[] {
    let applications: Application[] = applicationsData.map(applicationData => {
      let happeningData = happeningsData.find(happening => {
        return applicationData.happeningId === happening._id;
      });

      let application: Application = {
        date: moment(applicationData.date).format("YYYY-MM-DD"),
        happeningTitle: happeningData.title,
        firstName: applicationData.firstName,
        lastName: applicationData.lastName,
        email: applicationData.email
      };
      return application;
    });
    return applications;
  }

  async getApplicationsAndHappenings() {
    let happeningsData: HappeningsData = (await this.getHappeningsPromise()) as HappeningsData;
    let applicationsData: ApplicationsData = (await this.getApplicationsPromise()) as ApplicationsData;
    let applications = this.transformDataToApplications(
      happeningsData.data,
      applicationsData.data
    );
    return applications;
  }
}
