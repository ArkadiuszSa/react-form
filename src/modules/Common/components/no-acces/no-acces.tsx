import * as React from "react";
import { withRouter } from 'react-router-dom';

export interface NoAccesProps {
  history?: any
}

class Logout extends React.Component<NoAccesProps, {}> {
  constructor(props) {
    super(props);
    setTimeout(()=>{
      this.props.history.push("/login")

    },2000)
  }

  render() {
    return (
      <div className="not-found-container" >
        <p className="err-message-p">You don't have acces to this page!</p>
      </div>
    )
  }
}

export default withRouter(Logout)