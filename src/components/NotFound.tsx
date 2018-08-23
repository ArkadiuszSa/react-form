import * as React from "react";
import "./../assets/scss/NotFound.scss";
import { withRouter } from 'react-router-dom';


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