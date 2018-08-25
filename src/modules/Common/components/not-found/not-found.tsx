import * as React from "react";
import { withRouter } from 'react-router-dom';

import "./not-found.scss";


class AdminPanel extends React.Component<{}, {}> {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="not-found-container" >
        <p className="err-number-p">404</p>
        <p className="err-message-p">Page not found</p>
      </div>
    )
  }
}

export default withRouter(AdminPanel)