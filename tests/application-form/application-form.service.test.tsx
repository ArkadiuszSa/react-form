import Service from "../../src/modules/user/pages/application-form/application-form.service";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import constants from "../../src/constants";
import * as moment from "moment";

const apiBase = constants.API_BASE;

var mock = new MockAdapter(axios);
mock.onGet(apiBase + "/happening/id").reply(200, {
  title: "Happening Name",
  days: ["2018-11-11"]
});

const applicationFormService = new Service();

describe("ApplicationForm-service", () => {
  test("should fetch happening and return transformed data", done => {
    applicationFormService.getHappening("id").then(res => {
      expect(res).toMatchSnapshot();
      done();
    });
  });

  test("should return axios post promise", done => {
    applicationFormService
      .AddNewApplication("application")
      .then(() => {
        done();
      })
      .catch(() => {
        done();
      });
  });

  test("should positively validate form and return boolean result", () => {
    const application = {
      firstName: "John",
      lastName: "Doo",
      email: "johndo@gmail.com",
      date: "2018-11-18",
      avaibleDates: [moment("2018-11-18")]
    };
    const result = applicationFormService.validateForm(application);
    expect(result.isError).toBe(false);
    expect(result.errors).toMatchSnapshot();
  });

  test("should negatively validate form and return boolean result with errors", () => {
    const application = {
      firstName: "",
      lastName: "",
      email: "",
      date: "",
      avaibleDates: [moment("2018-11-18")]
    };
    const result = applicationFormService.validateForm(application);
    expect(result.isError).toMatchSnapshot();
    expect(result.errors).toMatchSnapshot();
  });
});
