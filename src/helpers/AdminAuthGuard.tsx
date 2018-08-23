import * as React from "react";
import { withRouter } from 'react-router-dom';
import * as jwt from 'jsonwebtoken'
import * as moment from "moment"

export interface HappeningProps {

  history?: any
}

// export interface ServerData {
//   data: {
//     token: string
//   }
// }

class AuthGuard {
  constructor() {

  }

  setSesion(authResult) {
    var decodedToken = jwt.decode(authResult.token);
    localStorage.removeItem("auth-token");
    localStorage.setItem('auth-token', authResult.token);
  }

  closeSesion() {
    localStorage.removeItem("auth-token");
  }

  checkAcces() {
    let authToken = localStorage.getItem('auth-token');
    if (authToken == null) {
      return false
    }
    let authTokenDecoded = jwt.decode(authToken);

    moment.utc().format();
    let tokenExpired=!moment().isBefore(moment(authTokenDecoded.exp),'seconds');
    let actualTime=moment().toDate().getTime()
    actualTime = (actualTime-(actualTime%1000))/1000;

    if(authTokenDecoded.exp-actualTime<=0){
      return false;
    }
    else{
      return true;
      
    }
  }

}

export default new AuthGuard()
