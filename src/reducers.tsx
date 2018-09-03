import applicationFormReducers from "./modules/user/pages/application-form/application-form.reducers";

import { combineReducers } from "redux";

export default combineReducers({
  applicationForm: applicationFormReducers
});
