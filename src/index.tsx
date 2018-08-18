import * as React from "react";
import {render} from "react-dom";
import {AppContainer} from "react-hot-loader";
import App from "./components/App";
import {
    BrowserRouter as Router,
    Route,
    Link,
    Switch
  } from 'react-router-dom';
const rootEl = document.getElementById("root");

render(
    <AppContainer>
            <App/>
    </AppContainer>,
    rootEl
);

declare let module: { hot: any };

if (module.hot) {
    module.hot.accept("./components/App", () => {
        const NewApp = require("./components/App").default;

        render(
            <AppContainer>
                <NewApp/>
            </AppContainer>,
            rootEl
        );
    });
}
