import * as React from "react";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import Button from "@material-ui/core/Button";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import MaskedInput from "react-text-mask";

import "./application-form.scss";
import {
  fetchHappening,
  handleFormChange,
  handleDateChange,
  submitApplicationForm,
  resetApplicationForm
} from "./application-form.actions";

export interface FormProps {
  match: any;
  history: any;
  fetchHappening: Function;
  resetApplicationForm: Function;
  handleFormChange: Function;
  handleDateChange: any;
  submitApplicationForm: Function;

  title: string;
  firstName: string;
  firstNameErr: string;
  lastName: string;
  lastNameErr: string;
  email: string;
  emailErr: string;
  date: string;
  dateErr: string;
  avaibleDates: any[];
  selectedDate: any;
  submitInfo: any;
}

class ApplicationForm extends React.Component<FormProps, {}> {
  public happeningId = "";
  public disabledInput: boolean = false;
  constructor(props) {
    super(props);

    this.happeningId = this.props.match.params.id;
  }
  componentWillMount() {
    this.props.resetApplicationForm();
    this.disabledInput = false;
  }

  componentWillUnmount() {
    this.props.resetApplicationForm();
  }

  componentDidMount() {
    this.props.fetchHappening(this.happeningId);
  }

  TextMaskCustom(props) {
    const { inputRef, ...other } = props;

    return (
      <MaskedInput
        {...other}
        ref={inputRef}
        mask={[/\d/, /\d/, /\d/, /\d/, "-", /\d/, /\d/, "-", /\d/, /\d/]}
        keepCharPositions={true}
        placeholder={"yyyy-mm-dd"}
      />
    );
  }

  render() {
    if (this.props.submitInfo === "Form correctly saved!") {
      this.disabledInput = true;
      setTimeout(() => {
        this.props.history.push("/");
      }, 2000);
    }
    return (
      <div className="form-container">
        <form
          className="form"
          onSubmit={e =>
            this.props.submitApplicationForm(e, {
              happeningId: this.happeningId,
              firstName: this.props.firstName,
              lastName: this.props.lastName,
              email: this.props.email,
              date: this.props.date,
              avaibleDates: this.props.avaibleDates
            })
          }
        >
          <p className="title">Sign up for {this.props.title}</p>

          <FormControl className="text-field">
            <InputLabel>First name</InputLabel>
            <Input
              disabled={this.disabledInput}
              name="firstName"
              value={this.props.firstName}
              onChange={e => this.props.handleFormChange(e)}
            />
            <FormHelperText className="field-error">
              {this.props.firstNameErr}
            </FormHelperText>
          </FormControl>

          <FormControl className="text-field">
            <InputLabel>Last name</InputLabel>
            <Input
              disabled={this.disabledInput}
              name="lastName"
              value={this.props.lastName}
              onChange={e => this.props.handleFormChange(e)}
            />
            <FormHelperText className="field-error">
              {this.props.lastNameErr}
            </FormHelperText>
          </FormControl>

          <FormControl className="text-field">
            <InputLabel>Email</InputLabel>
            <Input
              disabled={this.disabledInput}
              name="email"
              value={this.props.email}
              onChange={e => this.props.handleFormChange(e)}
            />
            <FormHelperText className="field-error">
              {this.props.emailErr}
            </FormHelperText>
          </FormControl>

          <DatePicker
            selected={this.props.selectedDate}
            onChange={this.props.handleDateChange}
            includeDates={this.props.avaibleDates}
            customInput={
              <FormControl className="text-field">
                <InputLabel>Date</InputLabel>
                <Input
                  disabled={this.disabledInput}
                  name="date"
                  value={this.props.date}
                  onChange={e => this.props.handleFormChange(e)}
                  inputComponent={this.TextMaskCustom}
                />
                <FormHelperText className="field-error">
                  {this.props.dateErr}
                </FormHelperText>
              </FormControl>
            }
          />

          <p className="submit-info">{this.props.submitInfo}</p>
          <Button variant="outlined" type="submit" className="submit-button">
            Submit
          </Button>
        </form>
      </div>
    );
  }
}

export default ApplicationForm;
