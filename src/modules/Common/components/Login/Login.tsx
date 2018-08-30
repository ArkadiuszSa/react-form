import * as React from "react";
import axios from "axios";

import Button from "@material-ui/core/Button";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";

import AuthService from "../../helpers/auth-service";
import constants from "../../../../constants";

export interface LoginState {
  email?: string;
  emailErr?: string;
  password?: string;
  passwordErr?: string;
  submitInfo?: string;
}

export interface LoginProps {
  history?: any;
}

export default class Login extends React.Component<LoginProps, LoginState> {
  private apiBase = constants.API_BASE;

  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  handleChange = (e: React.FormEvent<EventTarget>): void => {
    let target = e.target as HTMLInputElement;
    this.setState({ [target.name]: target.value });
    if (
      this.state.submitInfo !== "" &&
      this.state.submitInfo !== "Loging failed"
    ) {
      this.setState({ submitInfo: "" });
    }
  };

  validate = () => {
    let isError = false;
    const errors = {
      emailErr: "",
      passwordErr: ""
    };

    if (this.state.email === "") {
      isError = true;
      errors.emailErr = "Requires login";
    }
    if (this.state.password === "") {
      isError = true;
      errors.passwordErr = "Requires password";
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
      let loginRequestData = {
        email: this.state.email,
        password: this.state.password
      };
      axios
        .post(this.apiBase + "/login", loginRequestData)
        .then(response => {
          AuthService.setSesion(response.data);
          this.props.history.push("/admin/applications");
        })
        .catch(error => {
          this.setState({ submitInfo: "Login failed" });
        });
    } else {
      this.setState({ submitInfo: "" });
    }
  };

  render() {
    return (
      <div className="form-container">
        <form className="form" onSubmit={this.onSubmit}>
          <p className="title">Log in</p>

          <FormControl className="text-field">
            <InputLabel htmlFor="name-error">Email</InputLabel>
            <Input
              id="name-error"
              name="email"
              value={this.state.email}
              onChange={this.handleChange}
            />
            <FormHelperText className="field-error">
              {this.state.emailErr}
            </FormHelperText>
          </FormControl>
          <FormControl className="text-field">
            <InputLabel htmlFor="name-error">Password</InputLabel>
            <Input
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.handleChange}
            />
            <FormHelperText className="field-error">
              {this.state.passwordErr}
            </FormHelperText>
          </FormControl>

          <p className="submit-info">{this.state.submitInfo}</p>

          <Button variant="outlined" type="submit" className="submit-button">
            Submit
          </Button>
        </form>
      </div>
    );
  }
}
