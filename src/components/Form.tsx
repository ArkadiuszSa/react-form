import * as React from "react";
import "./../assets/scss/Form.scss";
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import DatePicker from 'react-datepicker';
import axios from 'axios';
import * as moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
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

export interface ServerData {
  data: {
    title: string,
    days: string
  }
}

export default class Form extends React.Component<FormProps, FormState> {
  public happeningId = '';

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
    this.getHappening();
  }

  getHappening() {
    axios.get("http://localhost:4000/api/happening/" + this.happeningId)
      .then((response: ServerData) => {

        let dates = [];
        for (let date of response.data.days) {
          dates.push(moment(date))
        }

        this.setState({
          title: response.data.title,
          avaibleDates: dates,
          selectedDate: moment(dates[0])
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
    let isError = false;
    const errors = {
      firstNameErr: "",
      lastNameErr: "",
      emailErr: "",
      dateErr: ""
    };

    let invalidDate = true;
    for (let date of this.state.avaibleDates) {
      if (this.state.date === date.format("YYYY-MM-DD")) {
        invalidDate = false;
      }
    }
    if (invalidDate) {
      isError = true;
      errors.dateErr = "Date must match to event dates";
    }

    let emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(this.state.email)) {
      isError = true;
      errors.emailErr = "Requires valid email";
    }

    if (this.state.firstName === "") {
      isError = true;
      errors.firstNameErr = "Requires first name";
    }
    if (this.state.lastName === "") {
      isError = true;
      errors.lastNameErr = "Requires last name";
    }
    if (this.state.date === "") {
      isError = true;
      errors.dateErr = "Requires date";
    }

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
      axios.post("http://localhost:4000/api/application", application)
        .then((response) => {
          this.setState({ submitInfo: 'Form correctly saved' })
          setTimeout(()=>{
            this.props.history.push("/")
          },1000)
        })
        .catch((error) => {
          this.setState({ submitInfo: 'Form has not been saved correctly' })
        });

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
