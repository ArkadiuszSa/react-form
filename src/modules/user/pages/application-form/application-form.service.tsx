import axios from "axios";
import * as moment from "moment";
import constants from "../../../../constants";
export interface HappeningData {
  data: {
    title: string;
    days: any;
  };
}

export default class ApplicationFormService {
  private apiBase = constants.API_BASE;
  constructor() {}

  public getHappening(id) {
    return axios
      .get(this.apiBase + "/happening/" + id)
      .then((response: HappeningData) => {
        let dates = [];
        for (let date of response.data.days) {
          dates.push(moment(date));
        }
        return {
          title: "Sign up for " + response.data.title,
          date: response.data.days[0],
          avaibleDates: dates,
          selectedDate: moment(dates[0])
        };
      });
  }

  public AddNewApplication(application) {
    return axios.post(this.apiBase + "/application", application);
  }

  public validateForm(stateValues) {
    let isError = false;
    const errors = {
      firstNameErr: "",
      lastNameErr: "",
      emailErr: "",
      dateErr: ""
    };

    let invalidDate = true;
    for (let date of stateValues.avaibleDates) {
      if (stateValues.date === date.format("YYYY-MM-DD")) {
        invalidDate = false;
      }
    }
    if (invalidDate) {
      isError = true;
      errors.dateErr = "Date must match to event dates";
    }

    let emailRegex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    if (!emailRegex.test(stateValues.email)) {
      isError = true;
      errors.emailErr = "Requires valid email";
    }

    if (stateValues.firstName === "") {
      isError = true;
      errors.firstNameErr = "Requires first name";
    }
    if (stateValues.lastName === "") {
      isError = true;
      errors.lastNameErr = "Requires last name";
    }
    if (stateValues.date === "") {
      isError = true;
      errors.dateErr = "Requires date";
    }

    return { isError: isError, errors: errors };
  }
}
