import { connect } from "react-redux";
import {
  fetchHappeningSucces,
  fetchHappeningFailure,
  handleFormChange,
  handleDateChange,
  validationApplicationFormFailure,
  submitApplicationFormSucces,
  submitApplicationFormFailure,
  resetApplicationFormSubmitInfo,
  validationApplicationFormSucces,
  resetApplicationForm
} from "./application-form.actions";
import ApplicationFormService from "./application-form.service";
import ApplicationForm from "./application-form.component";

const applicationFormService = new ApplicationFormService();

export function mapStateToProps(state) {
  return {
    title: state.applicationForm.title,
    avaibleDates: state.applicationForm.avaibleDates,
    selectedDate: state.applicationForm.selectedDate,
    firstName: state.applicationForm.firstName,
    firstNameErr: state.applicationForm.firstNameErr,
    lastName: state.applicationForm.lastName,
    lastNameErr: state.applicationForm.lastNameErr,
    email: state.applicationForm.email,
    emailErr: state.applicationForm.emailErr,
    date: state.applicationForm.date,
    dateErr: state.applicationForm.dateErr,
    submitInfo: state.applicationForm.submitInfo
  };
}

export const mapDispatchToProps = dispatch => {
  return {
    fetchHappening: id => {
      applicationFormService
        .getHappening(id)
        .then(response => {
          dispatch(fetchHappeningSucces(response));
        })
        .catch(() => {
          dispatch(fetchHappeningFailure());
        });
    },

    resetApplicationForm: () => {
      dispatch(resetApplicationForm());
    },

    handleFormChange: (e: React.FormEvent<EventTarget>) => {
      let target = e.target as HTMLInputElement;
      dispatch(
        handleFormChange({
          name: target.name,
          value: target.value
        })
      );
      dispatch(resetApplicationFormSubmitInfo());
    },

    handleDateChange: date => {
      let newDate = date.format("YYYY-MM-DD");
      dispatch(
        handleDateChange({
          date: newDate,
          selectedDate: date
        })
      );
      dispatch(resetApplicationFormSubmitInfo());
    },

    submitApplicationForm: (e, application) => {
      e.preventDefault();
      const validationRes = applicationFormService.validateForm(application);

      if (validationRes.isError) {
        dispatch(
          validationApplicationFormFailure({
            ...validationRes.errors
          })
        );
      } else {
        dispatch(validationApplicationFormSucces());

        applicationFormService
          .AddNewApplication(application)
          .then(response => {
            dispatch(submitApplicationFormSucces());
          })
          .catch(error => {
            if (error.response.data.errors[0].param === "email") {
              dispatch(
                submitApplicationFormFailure("The provided email is invalid!")
              );
            } else if (
              error.response.data.errors[0] ===
              "This email is already signed up for this event"
            ) {
              dispatch(
                submitApplicationFormFailure(
                  "This email is already signed up for this event!"
                )
              );
            } else {
              dispatch(
                submitApplicationFormFailure(
                  "Form has not been saved correctly! Please check the connection."
                )
              );
            }
          });
      }
    }
  };
};

const ApplicationFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ApplicationForm);

export default ApplicationFormContainer;
