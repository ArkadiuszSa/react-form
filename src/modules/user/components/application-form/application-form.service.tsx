import axios from 'axios';
import * as moment from 'moment';

export interface HappeningData {
  data: {
    title: string,
    days: any,
  }
}

export default class ApplicationFormService {
  constructor() {

  }

  public getHappening(id) {
    return axios.get("http://localhost:4000/api/happening/" + id)
      .then((response: HappeningData) => {

        let dates = [];
        for (let date of response.data.days) {
          dates.push(moment(date))
        }

        return {
          title: response.data.title,
          avaibleDates: dates
        }
      })
  }

  public AddNewApplication(application) {
    return axios.post("http://localhost:4000/api/application", application)
      .then((response) => {
        return('Form correctly saved!')
      })
      .catch((error) => {
        return ('Form has not been saved correctly!' )
      });
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

    let emailRegex = /\S+@\S+\.\S+/;
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
