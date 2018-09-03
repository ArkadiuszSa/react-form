import * as React from "react";
import { mount } from "enzyme";
import * as enzyme from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import Form from "../../src/modules/user/pages/application-form/application-form.component";

enzyme.configure({ adapter: new Adapter() });

function setup() {
  const match = { params: { id: "id" } };
  const props = {
    match: match,
    history: jest.fn(),
    fetchHappening: jest.fn(),
    resetApplicationForm: jest.fn(),
    handleFormChange: jest.fn(),
    handleDateChange: jest.fn(),
    submitApplicationForm: jest.fn(),

    title: "",
    firstName: "",
    firstNameErr: "",
    lastName: "",
    lastNameErr: "",
    email: "",
    emailErr: "",
    date: "",
    dateErr: "",
    avaibleDates: [],
    selectedDate: null,
    submitInfo: ""
  };

  const enzymeWrapper = mount(<Form {...props} />);

  return {
    props,
    enzymeWrapper
  };
}
describe("ApplicationForm-component", () => {
  const { enzymeWrapper } = setup();

  test("should render self and subcomponents", () => {
    const { enzymeWrapper } = setup();
    const forms = enzymeWrapper.find("form");
    expect(forms.length).toMatchSnapshot();
    const formControls = enzymeWrapper.find("FormControl");
    expect(formControls.length).toMatchSnapshot();
    const datepicker = enzymeWrapper.find("DatePicker");
    expect(datepicker.length).toMatchSnapshot();
    const button = enzymeWrapper.find("Button");
    expect(button.length).toMatchSnapshot();
  });

  test("should display title", () => {
    enzymeWrapper.setProps({
      ...enzymeWrapper.props,
      title: "New happening"
    });

    expect(
      enzymeWrapper
        .find("p")
        .first()
        .text()
    ).toMatchSnapshot();
  });

  test("should display errors in textHelpers", () => {
    const { enzymeWrapper } = setup();
    enzymeWrapper.setProps({
      ...enzymeWrapper.props,
      firstNameErr: "Requires first name",
      lastNameErr: "Requires last name",
      emailErr: "Requires email",
      dateErr: "Requires date"
    });
    expect(
      enzymeWrapper
        .find("FormHelperText")
        .at(0)
        .text()
    ).toMatchSnapshot();
    expect(
      enzymeWrapper
        .find("FormHelperText")
        .at(1)
        .text()
    ).toMatchSnapshot();
    expect(
      enzymeWrapper
        .find("FormHelperText")
        .at(2)
        .text()
    ).toMatchSnapshot();
    expect(
      enzymeWrapper
        .find("FormHelperText")
        .at(3)
        .text()
    ).toMatchSnapshot();
  });

  test("should display data in inputs", () => {
    const { enzymeWrapper } = setup();
    enzymeWrapper.setProps(
      {
        ...enzymeWrapper.props,
        firstName: "John",
        lastName: "Doo",
        email: "JohnDo@gmail.com",
        date: "2018-11-11"
      },
      () => {
        expect(
          enzymeWrapper
            .find("Input")
            .at(0)
            .props().value
        ).toMatchSnapshot();
        expect(
          enzymeWrapper
            .find("Input")
            .at(1)
            .props().value
        ).toMatchSnapshot();
        expect(
          enzymeWrapper
            .find("Input")
            .at(2)
            .props().value
        ).toMatchSnapshot();
        expect(
          enzymeWrapper
            .find("Input")
            .at(3)
            .props().value
        ).toMatchSnapshot();
      }
    );
  });

  test("should display datepicker after click on date input", () => {
    const { enzymeWrapper } = setup();

    enzymeWrapper
      .find("Input")
      .at(3)
      .simulate("click");
    const datepicker = enzymeWrapper.find("div.react-datepicker");
    expect(datepicker.length).toMatchSnapshot();
  });

  test("should display submit info", () => {
    const { enzymeWrapper } = setup();
    enzymeWrapper.setProps(
      {
        ...enzymeWrapper.props,
        submitInfo: "Form correctly saved."
      },
      () => {
        expect(enzymeWrapper.find("p.submit-info").text()).toMatchSnapshot();
      }
    );
  });
});
