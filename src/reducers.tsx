import applicationFormReducers from './modules/user/components/application-form/application-form.reducers'

import { combineReducers } from 'redux';

export default combineReducers({
  applicationForm:applicationFormReducers
});