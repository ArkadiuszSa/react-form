import * as React from "react";
import axios from "axios";

import "./happenings-list.scss";
import Happening from "./happening/happening";
import constants from "../../../../constants";

export interface HappeningProps {
  _id?: string;
  title?: string;
  description?: string;
  days?: Array<string>;
  price?: string;
}

export interface HappeningsListState {
  happenings?: Array<HappeningProps>;
}

export interface ServerData {
  data: HappeningProps[];
}

export default class HappeningList extends React.Component<
  {},
  HappeningsListState
> {
  private apiBase = constants.API_BASE;
  componentWillMount() {
    this.setState({
      happenings: []
    });
    this.getHappenings();
  }
  public happenings: Array<HappeningProps>;
  constructor(props) {
    super(props);
    this.getHappenings = this.getHappenings.bind(this);
  }

  getHappenings() {
    axios
      .get<HappeningProps[]>(this.apiBase + "/happenings")
      .then((response: ServerData) => {
        this.happenings = response.data;
        this.setState({
          happenings: response.data
        });
      });
  }

  render() {
    return (
      <div className="happenings-container">
        <h1 className="happenings-header">EVENTS LIST</h1>
        {this.state.happenings.map(happeningData => {
          return <Happening happening={happeningData} />;
        })}
      </div>
    );
  }
}
