import {
  FETCH_APPLICATION_HAPPENING_SUCCES,
  FETCH_APPLICATION_HAPPENING_FAILURE,
  RESET_APPLICATION_FORM,
  HANDLE_FORM_CHANGE,
  HANDLE_DATE_CHANGE,
  VALIDATION_APPLICATION_FORM_FAILURE,
  SUBMIT_APPLICATION_FORM_FAILURE,
  RESET_APPLICATION_FORM_SUBMIT_INFO,
  SUBMIT_APPLICATION_FORM_SUCCES,
  VALIDATION_APPLICATION_FORM_SUCCES
} from "./application-form.actions";

const INITIAL_STATE = {
  title: "",
  firstName: "",
  firstNameErr: "",
  lastName: "",
  lastNameErr: "",
  email: "",
  emailErr: "",
  date: "",
  dateErr: "",
  submitInfo: "",
  avaibleDates: [],
  selectedDate: ""
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_APPLICATION_HAPPENING_SUCCES:
      return {
        ...state,
        title: action.payload.title,
        date: action.payload.date,
        avaibleDates: action.payload.avaibleDates,
        selectedDate: action.payload.selectedDate
      };

    case FETCH_APPLICATION_HAPPENING_FAILURE:
      return {
        ...state,
        title: action.payload
      };

    case RESET_APPLICATION_FORM:
      return {
        ...state,
        ...INITIAL_STATE
      };

    case HANDLE_FORM_CHANGE:
      return {
        ...state,
        [action.payload.name]: action.payload.value
      };
    case HANDLE_DATE_CHANGE:
      return {
        ...state,
        date: action.payload.date,
        selectedDate: action.payload.selectedDate
      };
    case VALIDATION_APPLICATION_FORM_FAILURE:
      return {
        ...state,
        ...action.payload
      };
    case VALIDATION_APPLICATION_FORM_SUCCES:
      return {
        ...state,
        firstNameErr: "",
        lastNameErr: "",
        emailErr: "",
        dateErr: ""
      };
    case SUBMIT_APPLICATION_FORM_SUCCES:
      return {
        ...state,
        submitInfo: action.payload
      };
    case SUBMIT_APPLICATION_FORM_FAILURE:
      return {
        ...state,
        submitInfo: action.payload
      };
    case RESET_APPLICATION_FORM_SUBMIT_INFO:
      return {
        ...state,
        submitInfo: ""
      };

    default:
      return state;
  }
};
