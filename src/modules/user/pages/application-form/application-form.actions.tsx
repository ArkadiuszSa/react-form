export const FETCH_APPLICATION_HAPPENING_SUCCES =
  "FETCH_APPLICATION_HAPPENING_SUCCES";
export const FETCH_APPLICATION_HAPPENING_FAILURE =
  "FETCH_APPLICATION_HAPPENING_FAILURE";
export const RESET_APPLICATION_FORM = "RESET_APPLICATION_FORM";

export const HANDLE_FORM_CHANGE = "HANDLE_FORM_CHANGE";
export const HANDLE_DATE_CHANGE = "HANDLE_DATE_CHANGE";

export const VALIDATION_APPLICATION_FORM_FAILURE =
  "VALIDATION_APPLICATION_FORM_FAILURE";
export const VALIDATION_APPLICATION_FORM_SUCCES =
  "VALIDATION_APPLICATION_FORM_SUCCES";

export const SUBMIT_APPLICATION_FORM = "SUBMIT_APPLICATION_FORM";
export const SUBMIT_APPLICATION_FORM_SUCCES = "SUBMIT_APPLICATION_FORM_SUCCES";
export const SUBMIT_APPLICATION_FORM_FAILURE =
  "SUBMIT_APPLICATION_FORM_FAILURE";

export const RESET_APPLICATION_FORM_SUBMIT_INFO =
  "RESET_APPLICATION_FORM_SUBMIT_INFO";

export function fetchHappeningSucces(data) {
  return {
    type: FETCH_APPLICATION_HAPPENING_SUCCES,
    payload: data
  };
}

export function fetchHappeningFailure() {
  return {
    type: FETCH_APPLICATION_HAPPENING_FAILURE,
    payload: "There is problem with server connection"
  };
}

export function resetApplicationForm() {
  return {
    type: RESET_APPLICATION_FORM
  };
}

export function handleFormChange(formElement) {
  return {
    type: HANDLE_FORM_CHANGE,
    payload: formElement
  };
}

export function handleDateChange(dates) {
  return {
    type: HANDLE_DATE_CHANGE,
    payload: dates
  };
}

export function validationApplicationFormFailure(errors) {
  return {
    type: VALIDATION_APPLICATION_FORM_FAILURE,
    payload: errors
  };
}

export function validationApplicationFormSucces() {
  return {
    type: VALIDATION_APPLICATION_FORM_SUCCES
  };
}

export function submitApplicationForm(data) {
  return {
    type: SUBMIT_APPLICATION_FORM,
    payload: data
  };
}

export function submitApplicationFormSucces() {
  return {
    type: SUBMIT_APPLICATION_FORM_SUCCES,
    payload: "Form correctly saved!"
  };
}

export function submitApplicationFormFailure(error) {
  return {
    type: SUBMIT_APPLICATION_FORM_FAILURE,
    payload: error
  };
}

export function resetApplicationFormSubmitInfo() {
  return {
    type: RESET_APPLICATION_FORM_SUBMIT_INFO
  };
}
