import * as React from "react";
import * as moment from 'moment';
import axios from 'axios';

import "./application-form.scss";
import ApplicationFormService from "./application-form.service"

import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';

import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import MaskedInput from 'react-text-mask';

export interface FormState {
  title?: string,
  firstName?: string,
  firstNameErr?: string,
  lastName?: string,
  lastNameErr?: string,
  email?: string,
  emailErr?: string,
  date?: any
  dateErr?: string
  submitInfo?: string,
  avaibleDates?: any[],
  selectedDate?: any
}

export interface FormProps {
  match?: any,
  history?: any
}

export default class ApplicationForm extends React.Component<FormProps, FormState> {
  public happeningId = '';
  private applicationFormService: ApplicationFormService = new ApplicationFormService()
  constructor(props) {
    super(props);

    this.state = {
      date: '',
      title: '',
      firstName: '',
      lastName: '',
      email: '',
      submitInfo: '',
      avaibleDates: [],
      selectedDate: null
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.happeningId = this.props.match.params.id;
  }

  componentDidMount() {
    this.getHappening();
  }

  getHappening() {
    this.applicationFormService.getHappening(this.happeningId)
      .then((res) => {
        this.setState({
          title: res.title,
          avaibleDates: res.avaibleDates,
          selectedDate: moment(res.avaibleDates[0])
        })
      })
      .catch((error) => {
        this.setState({ submitInfo: 'There is problem with server connection' })
      });
  }

  handleChange = (e: React.FormEvent<EventTarget>): void => {
    let target = e.target as HTMLInputElement;
    this.setState({ [target.name]: target.value })
    if (this.state.submitInfo !== '') {
      this.setState({ submitInfo: '' })
    }
  }

  handleDateChange(date) {
    let dates = date.format("YYYY-MM-DD")
    this.setState({
      date: dates,
      selectedDate: date
    });
  }

  validate = () => {
    let state = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      date: this.state.date,
      avaibleDates: [...this.state.avaibleDates]
    }

    let validationRes = this.applicationFormService.validateForm(state);
    let isError = validationRes.isError
    let errors = validationRes.errors;

    this.setState({
      ...this.state,
      ...errors
    });

    return isError;
  };

  onSubmit = e => {
    e.preventDefault();
    const err = this.validate();
    if (!err) {
      let application = {
        happeningId: this.happeningId,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        email: this.state.email,
        date: this.state.date
      }
      this.applicationFormService.AddNewApplication(application)
        .then((response) => {
          this.setState({ submitInfo: response })
          if (response === 'Form correctly saved!') {
            setTimeout(() => {
              this.props.history.push("/")
            }, 1000)
          }
        })

    } else {
      this.setState({ submitInfo: '' })
    }
  };

  TextMaskCustom(props) {
    const { inputRef, ...other } = props;

    return (
      <MaskedInput
        {...other}
        ref={inputRef}
        mask={[/\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/]}
        keepCharPositions={true}
        placeholder={'yyyy-mm-dd'}
      />
    );
  }

  render() {
    return (
      <div className="form-container">
        <form className='form' onSubmit={this.onSubmit}>
          <p className='title'>Sign up for {this.state.title}</p>

          <FormControl className="text-field" >
            <InputLabel >First name</InputLabel>
            <Input name="firstName" value={this.state.firstName} onChange={this.handleChange} />
            <FormHelperText className="field-error">{this.state.firstNameErr}</FormHelperText>
          </FormControl>

          <FormControl className="text-field" >
            <InputLabel >Last name</InputLabel>
            <Input name="lastName" value={this.state.lastName} onChange={this.handleChange} />
            <FormHelperText className="field-error">{this.state.lastNameErr}</FormHelperText>
          </FormControl>

          <FormControl className="text-field">
            <InputLabel >Email</InputLabel>
            <Input name="email" value={this.state.email} onChange={this.handleChange} />
            <FormHelperText className="field-error">{this.state.emailErr}</FormHelperText>
          </FormControl>

          <DatePicker
            selected={this.state.selectedDate}
            onChange={this.handleDateChange}
            includeDates={this.state.avaibleDates}
            customInput={
              <FormControl className="text-field"  >
                <InputLabel>Date</InputLabel>
                <Input name="date" value={this.state.date} onChange={this.handleChange} inputComponent={this.TextMaskCustom} />
                <FormHelperText className="field-error">{this.state.dateErr}</FormHelperText>
              </FormControl>
            }
          />

          <p className="submit-info">{this.state.submitInfo}</p>

          <Button variant="outlined" type='submit' className='submit-button'>
            Submit
          </Button>

        </form>
      </div>
    )
  }
}
