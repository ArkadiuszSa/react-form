import * as React from "react";
import "./../assets/scss/Form.scss";
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import axios from 'axios';

export interface FormState {
  firstName?: string,
  firstNameErr?: string,
  lastName?: string,
  lastNameErr?: string,
  email?: string,
  emailErr?: string,
  date?: string
  dateErr?: string
  submitInfo?: string
}

export default class Form extends React.Component<{}, FormState> {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      date: '',
      submitInfo: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }


  handleChange = (e: React.FormEvent<EventTarget>): void => {
    let target = e.target as HTMLInputElement;
    this.setState({ [target.name]: target.value })
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
      axios.post("http://localhost:4000/happening", this.state)
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
        <p className='title'>Sign for Summer Party</p>

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

        <FormControl className="text-field" aria-describedby="name-error-text">
          <InputLabel htmlFor="name-error"></InputLabel>
          <Input id="name-error" type="date" name="date" value={this.state.date} onChange={this.handleChange} />
          <FormHelperText className="field-error">{this.state.dateErr}</FormHelperText>
        </FormControl>

        <p className="submit-info">{this.state.submitInfo}</p>

        <Button variant="outlined" type='submit' className='submit-button'>
          Submit
        </Button>
      </form>
    )
  }
}
