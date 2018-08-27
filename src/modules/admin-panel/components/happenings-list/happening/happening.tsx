import * as React from "react";
import { withRouter } from "react-router-dom";
import * as moment from "moment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import "./happening.scss";
import http from "../../../helpers/http";
import HappeningService from "./happening.service";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Button from "@material-ui/core/Button";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";

export interface AdminHappeningProps {
  history?: any;
  match?: any;
}

export interface Happening {
  title?: string;
  description?: string;
  price?: string;
  days?: string[];
}

export interface HappeningData {
  title?: string;
  description?: string;
  price?: string;
  days?: string[];
  selectedDates?: any[];
}

export interface AdminHappeningState {
  _id?: string;
  title?: string;
  description?: string;
  price?: string;
  days?: string[];
  selectedDates?: any[];
  editName?: string;
  editVal?: any;
}
export interface ServerData {
  data: AdminHappeningState;
}

class AdminHappening extends React.Component<
  AdminHappeningProps,
  AdminHappeningState
> {
  private happeningService: HappeningService = new HappeningService();

  constructor(props) {
    super(props);
    this.state = {
      _id: this.props.match.params.id,
      title: "",
      description: "",
      price: "",
      days: [],
      editName: "",
      editVal: "",
      selectedDates: []
    };

    this.handleEditClick = this.handleEditClick.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.deleteHappening = this.deleteHappening.bind(this);
    this.updateHappening = this.updateHappening.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
  }

  componentDidMount() {
    this.getHappening(this.state._id);
  }

  getHappening(id) {
    this.happeningService
      .getHappening(this.state._id)
      .then((result: HappeningData) => {
        this.setState({
          ...this.state,
          ...result
        });
      });
  }

  deleteHappening() {
    http
      .delete("http://localhost:4000/api/happening/" + this.state._id)
      .then((response: ServerData) => {
        this.props.history.push("/admin/happenings");
      })
      .catch(error => {
        console.log(error);
      });
  }

  updateHappening(name?) {
    let updatedHappening = {
      title: this.state.title,
      description: this.state.description,
      price: this.state.price,
      days: this.state.days
    };

    if (typeof name !== "undefined")
      updatedHappening[name] = this.state.editVal;

    http
      .put(
        "http://localhost:4000/api/happening/" + this.state._id,
        updatedHappening
      )
      .then((response: ServerData) => {
        this.getHappening(this.state._id);
        this.setState({ editName: "" });
      })
      .catch(error => {
        console.log(error);
      });
  }

  handleEditClick = (name): void => {
    if (this.state.editName === "") {
      this.setState({ editVal: this.state[name] });
      this.setState({ editName: name });
    }
  };

  handleDateChange(newDate) {
    let notFound = true;

    for (let i = 0; i < this.state.selectedDates.length; i++) {
      if (
        this.state.selectedDates[i].format("YYYY-MM-DD") ===
        newDate.format("YYYY-MM-DD")
      ) {
        notFound = false;
        let newSelectedDates = [...this.state.selectedDates];
        newSelectedDates.splice(i, 1);
        this.setState({
          selectedDates: newSelectedDates
        });
        break;
      }
    }

    if (notFound) {
      this.setState({
        selectedDates: [...this.state.selectedDates, newDate]
      });
    }
  }

  handleDateSave() {
    let newDates = [];
    for (let date of this.state.selectedDates) {
      newDates.push(date.format("YYYY-MM-DD"));
    }
    this.setState(
      {
        days: newDates.sort()
      },
      () => {
        this.updateHappening();
      }
    );
  }

  handleCancel(name) {
    this.setState({ editName: "" });
  }

  handleChange = (e: React.FormEvent<EventTarget>): void => {
    let target = e.target as HTMLInputElement;
    this.setState({ editVal: target.value });
  };

  render() {
    return (
      <div className="admin-happening-container">
        <p className="admin-happening-title-p">Happening</p>
        <List component="nav">
          <ListItem
            button={this.state.editName === ""}
            divider
            onClick={() => this.handleEditClick("title")}
          >
            {this.state.editName !== "title" ? (
              <p className="admin-happening-field">
                <label className="admin-happening-label">Title:</label>
                <span>{this.state.title}</span>
              </p>
            ) : this.state.editName === "title" ? (
              <div className="admin-happening-textfield-wrapper">
                <FormControl className="admin-happening-textfield">
                  <InputLabel htmlFor="name-error">Title</InputLabel>
                  <Input
                    value={this.state.editVal}
                    onChange={this.handleChange}
                  />
                </FormControl>
                <Button
                  variant="outlined"
                  type="submit"
                  color="secondary"
                  className="admin-happening-button"
                  onClick={() => this.handleCancel("title")}
                >
                  Cancel
                </Button>
                <Button
                  variant="outlined"
                  type="submit"
                  color="primary"
                  className="admin-happening-button"
                  onClick={() => this.updateHappening("title")}
                >
                  Save
                </Button>
              </div>
            ) : null}
          </ListItem>

          <ListItem
            button={this.state.editName === ""}
            divider
            onClick={() => this.handleEditClick("description")}
          >
            {this.state.editName !== "description" ? (
              <p className="admin-happening-field">
                <label className="admin-happening-label">Description:</label>
                <span>{this.state.description}</span>
              </p>
            ) : this.state.editName === "description" ? (
              <div className="admin-happening-textfield-wrapper">
                <FormControl className="admin-happening-textfield">
                  <InputLabel htmlFor="name-error">Description</InputLabel>
                  <Input
                    multiline={true}
                    value={this.state.editVal}
                    onChange={this.handleChange}
                  />
                </FormControl>
                <Button
                  variant="outlined"
                  type="submit"
                  color="secondary"
                  className="admin-happening-button"
                  onClick={() => this.handleCancel("description")}
                >
                  Cancel
                </Button>
                <Button
                  variant="outlined"
                  type="submit"
                  color="primary"
                  className="admin-happening-button"
                  onClick={() => this.updateHappening("description")}
                >
                  Save
                </Button>
              </div>
            ) : null}
          </ListItem>

          <ListItem
            button={this.state.editName === ""}
            divider
            onClick={() => this.handleEditClick("price")}
          >
            {this.state.editName !== "price" ? (
              <p className="admin-happening-field">
                <label className="admin-happening-label">Price:</label>
                <span>{this.state.price}</span>
              </p>
            ) : this.state.editName === "price" ? (
              <div className="admin-happening-textfield-wrapper">
                <FormControl className="admin-happening-textfield">
                  <InputLabel htmlFor="name-error">Price</InputLabel>
                  <Input
                    multiline={true}
                    value={this.state.editVal}
                    onChange={this.handleChange}
                  />
                </FormControl>
                <Button
                  variant="outlined"
                  type="submit"
                  color="secondary"
                  className="admin-happening-button"
                  onClick={() => this.handleCancel("price")}
                >
                  Cancel
                </Button>
                <Button
                  variant="outlined"
                  type="submit"
                  color="primary"
                  className="admin-happening-button"
                  onClick={() => this.updateHappening("price")}
                >
                  Save
                </Button>
              </div>
            ) : null}
          </ListItem>

          <ListItem
            button={this.state.editName === ""}
            divider
            onClick={() => this.handleEditClick("days")}
          >
            {this.state.editName !== "days" ? (
              <p className="admin-happening-field">
                <label className="admin-happening-label">Days:</label>
                <div>
                  {this.state.days.map(date => {
                    return <p className="admin-happening-days-p">{date}</p>;
                  })}
                </div>
              </p>
            ) : this.state.editName === "days" ? (
              <div className="admin-happening-textfield-wrapper admin-happening-datepicker-wrapper">
                <DatePicker
                  inline
                  highlightDates={this.state.selectedDates}
                  onChange={this.handleDateChange}
                />
                <div>
                  <Button
                    variant="outlined"
                    type="submit"
                    color="secondary"
                    className="admin-happening-button"
                    onClick={() => this.handleCancel("days")}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="outlined"
                    type="submit"
                    color="primary"
                    className="admin-happening-button"
                    onClick={() => this.handleDateSave()}
                  >
                    Save
                  </Button>
                </div>
              </div>
            ) : null}
          </ListItem>
        </List>
        <Button
          variant="outlined"
          type="submit"
          color="primary"
          className="admin-happenings-delete-button"
          onClick={this.deleteHappening}
        >
          Delete
        </Button>
      </div>
    );
  }
}

export default withRouter(AdminHappening);
