import * as React from "react";
import "./../assets/scss/Form.scss";
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import * as moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';

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
  submitInfo?: string
}

export interface HappeningProps {
  happening: {
    _id?: string,
    title?: string,
    description?: string,
    days?: Array<string>,
    price?: string,
  }
  history?: any//to fix
}
export interface FormProps {
  match?: any
}

export interface ServerData {
  data: {
    title: string,
    days: any
  }
}

export default class Form extends React.Component<FormProps, FormState> {
  public happeningId = '';
  public happeningDays = [];
  public days = [];
  public selected = null;
  constructor(props) {
    super(props);


    this.state = {
      date: '',
      title: '',
      firstName: '',
      lastName: '',
      email: '',
      submitInfo: ''
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
        this.setState({
          title: response.data.title
        })

        this.happeningDays = response.data.days;
        let days = this.happeningDays.map((date) => {
          this.days.push(moment(date))
          this.setState({
            date: this.days[0].format("YYYY-MM-DD")
          });
        })

      })
      .catch((error) => {
        console.log(error)
      });
  }


  handleChange = (e: React.FormEvent<EventTarget>): void => {
    let target = e.target as HTMLInputElement;
    this.setState({ [target.name]: target.value })
    if (this.state.submitInfo !== '' && this.state.submitInfo !== 'Form has not been saved correctly') {
      this.setState({ submitInfo: '' })
    }
  }

  handleDateChange(date) {
    this.setState({
      date: date.format("YYYY-MM-DD")
    });

    this.selected = date;
  }

  validate = () => {
    let isError = false;
    const errors = {
      firstNameErr: "",
      lastNameErr: "",
      emailErr: "",
      dateErr: ""
    };

    if (this.state.email.indexOf("@") === -1) {
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
      let happeningApplication = {
        happeningId: this.happeningId,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        email: this.state.email,
        date: this.state.date
      }
      axios.post("http://localhost:4000/api/happening-application", happeningApplication)
        .then((response) => {
          this.setState({ submitInfo: 'Form correctly saved' })

        })
        .catch((error) => {
          this.setState({ submitInfo: 'Form has not been saved correctly' })
        });

    } else {
      this.setState({ submitInfo: '' })
    }
  };

  render() {
    return (
      <form className='form' onSubmit={this.onSubmit}>
        <p className='title'>Sign up for {this.state.title}</p>

        <FormControl className="text-field" aria-describedby="name-error-text">
          <InputLabel htmlFor="name-error">First name</InputLabel>
          <Input id="name-error" name="firstName" value={this.state.firstName} onChange={this.handleChange} />
          <FormHelperText className="field-error">{this.state.firstNameErr}</FormHelperText>
        </FormControl>

        <FormControl className="text-field" aria-describedby="name-error-text">
          <InputLabel htmlFor="name-error">Last name</InputLabel>
          <Input id="name-error" name="lastName" value={this.state.lastName} onChange={this.handleChange} />
          <FormHelperText className="field-error">{this.state.lastNameErr}</FormHelperText>
        </FormControl>

        <FormControl className="text-field" aria-describedby="name-error-text">
          <InputLabel htmlFor="name-error">Email</InputLabel>
          <Input id="name-error" name="email" value={this.state.email} onChange={this.handleChange} />
          <FormHelperText className="field-error">{this.state.emailErr}</FormHelperText>
        </FormControl>
        <DatePicker
          selected={this.selected}
          onChange={this.handleDateChange}
          dateFormat="DD.MM.YYYY"
          includeDates={this.days}
          customInput={
            <FormControl className="text-field" aria-describedby="name-error-text">
              <InputLabel htmlFor="name-error">Date</InputLabel>
              <Input id="name-error" name="date" value={this.state.date} onClick={this.handleChange} />
              <FormHelperText className="field-error">{this.state.dateErr}</FormHelperText>
            </FormControl>
          }
        />

        <p className="submit-info">{this.state.submitInfo}</p>

        <Button variant="outlined" type='submit' className='submit-button'>
          Submit
        </Button>
      </form>
    )
  }
}
