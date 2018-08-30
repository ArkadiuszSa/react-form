import * as React from "react";
import * as moment from "moment";
import { withRouter } from "react-router-dom";

import "./happenings-list.scss";
import http from "../../helpers/http";
import constants from "../../../../constants";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Button from "@material-ui/core/Button";

export interface ServerData {
  data: Happening[];
}

export interface HappeningsListState {
  happenings: Happening[];
}
export interface Happening {
  _id: string;
  title: string;
}
export interface HappeningListProps {
  history?: any;
}

class AdminHappenigsList extends React.Component<
  HappeningListProps,
  HappeningsListState
> {
  private apiBase = constants.API_BASE;

  constructor(props) {
    super(props);

    this.state = {
      happenings: []
    };

    this.getHappenings = this.getHappenings.bind(this);
    this.addNewHappening = this.addNewHappening.bind(this);

    this.getHappenings();
  }

  redirectToHappening(id) {
    this.props.history.push("/admin/happening/" + id);
  }

  getHappenings() {
    http
      .get(this.apiBase + "/happenings/")
      .then((response: ServerData) => {
        this.setState({
          happenings: response.data
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  addNewHappening() {
    let newHappening = {
      title: "New happening",
      description: "Description",
      price: "Price",
      days: [moment().format("YYYY-MM-DD")]
    };
    http
      .post(this.apiBase + "/happening", newHappening)
      .then(response => {
        this.getHappenings();
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    return (
      <div className="admin-happenings-container">
        <p className="happenings-title-p">Happenings</p>
        <List>
          {this.state.happenings.map(happeningData => {
            return (
              <ListItem
                button
                divider
                onClick={() => this.redirectToHappening(happeningData._id)}
              >
                {happeningData.title}
              </ListItem>
            );
          })}
        </List>
        <Button
          variant="outlined"
          color="primary"
          className="admin-happenings-new-button"
          onClick={this.addNewHappening}
        >
          New
        </Button>
      </div>
    );
  }
}

export default withRouter(AdminHappenigsList);
