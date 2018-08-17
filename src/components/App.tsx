import * as React from "react";
import "./../assets/scss/App.scss";
import Form from './Form'
const reactLogo = require("./../assets/img/react_logo.svg");
import '../assets/scss/normalize.css'
export interface AppProps {
}

export default class App extends React.Component<AppProps, undefined> {

  render() {
    return (
      <div className="App">
        <Form  />
      </div>
    );
  }
}

