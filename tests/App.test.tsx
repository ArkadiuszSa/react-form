import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as TestUtils from 'react-dom/test-utils';
import App from '../src/components/App';
import { mount, EnzymeAdapter } from "enzyme";
import * as enzyme from "enzyme"
import * as Adapter from "enzyme-adapter-react-16"

enzyme.configure({ adapter: new Adapter()})

describe("App", () => {
    let props;
    let mountedApp;
    const app = () => {
      if (!mountedApp) {
        mountedApp = mount(
          <App {...props} />
        );
      }
      return mountedApp;
    }
  
    it("always renders a div", () => {
      const divs = app().find("div");
      expect(divs.length).toBeGreaterThan(0);
    });
  });

  