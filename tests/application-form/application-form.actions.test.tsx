import configureStore from "redux-mock-store";
import * as actions from "../../src/modules/user/pages/application-form/application-form.actions";

const mockStore = configureStore();
const store = mockStore();

describe("ApplicationForm-actions", () => {
  beforeEach(() => {
    store.clearActions();
  });

  describe("FETCH_APPLICATION_HAPPENING", () => {
    test("Dispatches the correct action and payload", () => {
      store.dispatch(actions.fetchHappeningSucces("payload"));
      expect(store.getActions()).toMatchSnapshot();
    });
  });

  describe("FETCH_APPLICATION_HAPPENING", () => {
    test("Dispatches the correct action and payload", () => {
      store.dispatch(actions.fetchHappeningFailure());
      expect(store.getActions()).toMatchSnapshot();
    });
  });

  describe("RESET_APPLICATION_FORM", () => {
    test("Dispatches the correct action and payload", () => {
      store.dispatch(actions.resetApplicationForm());
      expect(store.getActions()).toMatchSnapshot();
    });
  });

  describe("HANDLE_FORM_CHANGE", () => {
    test("Dispatches the correct action and payload", () => {
      store.dispatch(actions.handleFormChange("payload"));
      expect(store.getActions()).toMatchSnapshot();
    });
  });

  describe("HANDLE_DATE_CHANGE", () => {
    test("Dispatches the correct action and payload", () => {
      store.dispatch(actions.handleDateChange("payload"));
      expect(store.getActions()).toMatchSnapshot();
    });
  });

  describe("VALIDATION_APPLICATION_FORM_FAILURE", () => {
    test("Dispatches the correct action and payload", () => {
      store.dispatch(actions.validationApplicationFormFailure("payload"));
      expect(store.getActions()).toMatchSnapshot();
    });
  });

  describe("VALIDATION_APPLICATION_FORM_SUCCES", () => {
    test("Dispatches the correct action and payload", () => {
      store.dispatch(actions.validationApplicationFormSucces());
      expect(store.getActions()).toMatchSnapshot();
    });
  });

  describe("SUBMIT_APPLICATION_FORM", () => {
    test("Dispatches the correct action and payload", () => {
      store.dispatch(actions.submitApplicationForm("payload"));
      expect(store.getActions()).toMatchSnapshot();
    });
  });

  describe("SUBMIT_APPLICATION_FORM_SUCCES", () => {
    test("Dispatches the correct action and payload", () => {
      store.dispatch(actions.submitApplicationFormSucces());
      expect(store.getActions()).toMatchSnapshot();
    });
  });

  describe("SUBMIT_APPLICATION_FORM_FAILURE", () => {
    test("Dispatches the correct action and payload", () => {
      store.dispatch(actions.submitApplicationFormFailure("payload"));
      expect(store.getActions()).toMatchSnapshot();
    });
  });

  describe("RESET_APPLICATION_FORM_SUBMIT_INFO", () => {
    test("Dispatches the correct action and payload", () => {
      store.dispatch(actions.resetApplicationFormSubmitInfo());
      expect(store.getActions()).toMatchSnapshot();
    });
  });
});
