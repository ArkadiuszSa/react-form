import * as React from "react";
import { mount, EnzymeAdapter } from "enzyme";
import * as enzyme from "enzyme"
import * as Adapter from "enzyme-adapter-react-16"
import Form from "../src/modules/user/components/application-form/application-form"

enzyme.configure({ adapter: new Adapter()})

describe("Form", () => {
  let props;
  let mountedForm;
  const form = () => {
    if (!mountedForm) {
      mountedForm = mount(
        <Form {...props} />
      );
    }
    return mountedForm;
  }

  it("always renders a form", () => {
    const forms = form().find("form");
    expect(forms.length).toBeGreaterThan(0);
  });


});