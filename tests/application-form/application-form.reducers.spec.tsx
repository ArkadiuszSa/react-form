import * as reducers from "../../src/modules/user/pages/application-form/application-form.reducers";
import * as actions from "../../src/modules/user/pages/application-form/application-form.actions";

describe("ApplicationForm-reducers", () => {
  describe("INITIAL_STATE", () => {
    test("is correct", () => {
      const action = { type: "dummy_action" };
      expect(reducers.default(undefined, action)).toMatchSnapshot();
    });
  });

  describe("FETCH_APPLCATION_HAPPENING_SUCCES", () => {
    test("returns the correct state", () => {
      const passedState = {
        title: "New happening",
        date: "2018-11-28",
        avaibleDates: ["2018-11-28"],
        selectedDate: "2018-11-28"
      };
      const action = {
        type: actions.FETCH_APPLICATION_HAPPENING_SUCCES,
        payload: passedState
      };
      expect(reducers.default(undefined, action)).toMatchSnapshot();
    });
  });

  describe("FETCH_APPLCATION_HAPPENING_FAILURE", () => {
    test("returns the correct state", () => {
      const passedState = {
        title: "There is problem with server connection"
      };
      const action = {
        type: actions.FETCH_APPLICATION_HAPPENING_SUCCES,
        payload: passedState
      };
      expect(reducers.default(undefined, action)).toMatchSnapshot();
    });
  });

  describe("RESET_APPLICATION_FORM", () => {
    test("returns the correct state", () => {
      const action = {
        type: actions.RESET_APPLICATION_FORM
      };
      expect(reducers.default(undefined, action)).toMatchSnapshot();
    });
  });
  describe("HANDLE_FORM_CHANGE", () => {
    test("returns the correct state", () => {
      const payload = {
        name: "email",
        value: "kowalski@gmail.com"
      };
      const action = {
        type: actions.HANDLE_FORM_CHANGE,
        payload: payload
      };
      expect(reducers.default(undefined, action)).toMatchSnapshot();
    });
  });

  describe("HANDLE_DATE_CHANGE", () => {
    test("returns the correct state", () => {
      const payload = {
        date: "2018-11-12",
        selectedDate: "2018-11-12"
      };
      const action = {
        type: actions.HANDLE_DATE_CHANGE,
        payload: payload
      };
      expect(reducers.default(undefined, action)).toMatchSnapshot();
    });
  });

  describe("VALIDATION_APPLICATION_FORM_FAILURE", () => {
    test("returns the correct state", () => {
      const payload = {
        firstNameErr: "First name is required",
        lastNameErr: "Last name is required",
        emailErr: "Email is required",
        dateErr: "Date is required"
      };
      const action = {
        type: actions.VALIDATION_APPLICATION_FORM_FAILURE,
        payload: payload
      };
      expect(reducers.default(undefined, action)).toMatchSnapshot();
    });
  });

  describe("VALIDATION_APPLICATION_FORM_SUCCES", () => {
    test("returns the correct state", () => {
      const action = {
        type: actions.VALIDATION_APPLICATION_FORM_FAILURE
      };
      expect(reducers.default(undefined, action)).toMatchSnapshot();
    });
  });

  describe("SUBMIT_APPLICATION_FORM_FAILURE", () => {
    test("returns the correct state", () => {
      const payload = "This email is already signed up for this event";
      const action = {
        type: actions.SUBMIT_APPLICATION_FORM_FAILURE,
        payload: payload
      };
      expect(reducers.default(undefined, action)).toMatchSnapshot();
    });
  });

  describe("RESET_APPLICATION_FORM_SUBMIT_INFO", () => {
    test("returns the correct state", () => {
      const action = {
        type: actions.RESET_APPLICATION_FORM_SUBMIT_INFO
      };
      expect(reducers.default(undefined, action)).toMatchSnapshot();
    });
  });
});
