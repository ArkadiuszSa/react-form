import * as React from "react";
import { withRouter } from 'react-router-dom';

export interface LoginProps {
  history?: any
}


class Logout extends React.Component<LoginProps, {}> {
  constructor(props) {
    super(props);
    setTimeout(()=>{
      this.props.history.push("/")

    },2000)
  }

  render() {
    return (
      <div className="not-found-container" >
        <p className="err-message-p">You have successfully logged out!</p>
      </div>
    )
  }
}

export default withRouter(Logout)