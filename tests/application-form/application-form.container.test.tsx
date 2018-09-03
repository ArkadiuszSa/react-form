import * as React from "react";
import ApplicationFormContainer from "../../src/modules/user/pages/application-form/application-form.container";
import { shallow, mount } from "enzyme";
import configureMockStore from "redux-mock-store";
import * as enzyme from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import * as moment from "moment";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import constants from "../../src/constants";
const mockStore = configureMockStore();
enzyme.configure({ adapter: new Adapter() });

const apiBase = constants.API_BASE;

let mock = new MockAdapter(axios);

describe("ApplicationForm-container, integration tests betwen container,component and actions", () => {
  const INITIAL_STATE = {
    applicationForm: {
      title: "",
      firstName: "",
      firstNameErr: "",
      lastName: "",
      lastNameErr: "",
      email: "",
      emailErr: "",
      date: "",
      dateErr: "",
      submitInfo: "",
      avaibleDates: [],
      selectedDate: null
    }
  };
  let wrapper, store;

  beforeEach(() => {
    store = mockStore(INITIAL_STATE);
    wrapper = shallow(
      <ApplicationFormContainer
        store={store}
        match={{ params: { id: "id" } }}
      />,
      {
        lifecycleExperimental: true
      }
    );
  });

  test("maps state and dispatch to props", () => {
    expect(wrapper.props().title).toMatchSnapshot();
    expect(wrapper.props().firstName).toMatchSnapshot();
    expect(wrapper.props().firstNameErr).toMatchSnapshot();
    expect(wrapper.props().lastName).toMatchSnapshot();
    expect(wrapper.props().lastNameErr).toMatchSnapshot();
    expect(wrapper.props().email).toMatchSnapshot();
    expect(wrapper.props().emailErr).toMatchSnapshot();
    expect(wrapper.props().date).toMatchSnapshot();
    expect(wrapper.props().dateErr).toMatchSnapshot();
    expect(wrapper.props().submitInfo).toMatchSnapshot();
    expect(wrapper.props().avaibleDates).toMatchSnapshot();
    expect(wrapper.props().selectedDate).toMatchSnapshot();
  });

  test("should run RESET_APPLICATION_FORM action on componentWillMount()", () => {
    wrapper.dive();
    const actions = store.getActions();
    expect(actions).toMatchSnapshot();
  });

  test("should run FETCH_APPLICATION_HAPPENING with payload", done => {
    mock.onGet(apiBase + "/happening/id").reply(200, {
      title: "Happening Name",
      days: ["2018-11-11"]
    });

    wrapper.props().fetchHappening("id");
    wrapper.update();

    setTimeout(() => {
      const actions = store.getActions();
      expect(actions).toMatchSnapshot();
      done();
    }, 0);
  });

  test("should run  RESET_APPLICATION_FORM action and  SUBMIT_APPLICATION_FORM_FAILURE action form with errors payload ", () => {
    const fakeEvent = { preventDefault: () => {} };

    wrapper
      .dive()
      .find("form")
      .simulate("submit", fakeEvent);

    const actions = store.getActions();
    expect(actions).toMatchSnapshot();
  });

  test("should also run HANDLE_FORM_CHANGE action with payload and RESET_APPLICATION_FORM_SUBMIT_INFO ", () => {
    wrapper = mount(
      <ApplicationFormContainer
        store={store}
        match={{ params: { id: "id" } }}
      />
    );

    wrapper
      .find("Input")
      .at(0)
      .props()
      .onChange({ target: { name: "firstName", value: "John" } });

    const actions = store.getActions();
    expect(actions).toMatchSnapshot();
  });

  test("should also run HANDLE_DATE_CHANGE action with payload", () => {
    wrapper.props().handleDateChange(moment("2018-11-11"));
    const actions = store.getActions();
    expect(actions).toMatchSnapshot();
  });

  test("should submit valid form and use SUBMIT_APPLICATION_FORM_SUCCES action with payload ", () => {
    mock.onPost(apiBase + "/application").reply(200, {});
    wrapper.props().submitApplicationForm(
      { preventDefault: () => {} },
      {
        firstName: "John",
        lastname: "Doo",
        email: "johndoo@gmail.com",
        date: "2018-11-11",
        avaibleDates: [moment("2018-11-11")]
      }
    );

    const actions = store.getActions();
    expect(actions).toMatchSnapshot();
  });

  test("should submit form, pass validation and  and use SUBMIT_APPLICATION_FORM_FAILURE action with payload due to user was signed in with that email ", done => {
    mock.onPost(apiBase + "/application").reply(400, {
      errors: ["This email is already signed up for this event"]
    });

    wrapper.props().submitApplicationForm(
      { preventDefault: () => {} },
      {
        firstName: "John",
        lastname: "Doo",
        email: "johndoo@gmail.com",
        date: "2018-11-11",
        avaibleDates: [moment("2018-11-11")]
      }
    );

    setTimeout(() => {
      const actions = store.getActions();
      expect(actions).toMatchSnapshot();
      done();
    }, 0);
  });

  test("should submit form, pass validation and  and use SUBMIT_APPLICATION_FORM_FAILURE action with payload due to emial validation on api ", done => {
    mock.onPost(apiBase + "/application").reply(400, {
      errors: [
        {
          value: "error value",
          param: "email"
        }
      ]
    });

    wrapper.props().submitApplicationForm(
      { preventDefault: () => {} },
      {
        firstName: "John",
        lastname: "Doo",
        email: "johndoo@gmail.com",
        date: "2018-11-11",
        avaibleDates: [moment("2018-11-11")]
      }
    );

    setTimeout(() => {
      const actions = store.getActions();
      expect(actions).toMatchSnapshot();
      done();
    }, 0);
  });

  test("should submit form, pass validation and  and use SUBMIT_APPLICATION_FORM_FAILURE action with payload due to other error ", done => {
    mock.onPost(apiBase + "/application").reply(404, {
      errors: ["other error"]
    });

    wrapper.props().submitApplicationForm(
      { preventDefault: () => {} },
      {
        firstName: "John",
        lastname: "Doo",
        email: "johndoo@gmail.com",
        date: "2018-11-11",
        avaibleDates: [moment("2018-11-11")]
      }
    );

    setTimeout(() => {
      const actions = store.getActions();
      expect(actions).toMatchSnapshot();
      done();
    }, 0);
  });
});
