import * as React from "react";
import "./../assets/scss/HappeningsList.scss";
import Happening from './happening'
import axios from 'axios';

export interface HappeningProps {
  _id?: string,
  title?: string,
  description?: string,
  days?: Array<string>,
  price?: string,
}

export interface HappeningsListState {
  happenings?: Array<HappeningProps>
}

export interface ServerData {
  data: HappeningProps[]
}

export default class HappeningList extends React.Component<{}, HappeningsListState> {

  componentWillMount() {
    this.setState({
      happenings: []
    })
    this.getHappenings();
  }
  public happenings: Array<HappeningProps>;
  constructor(props) {
    super(props);
    this.getHappenings = this.getHappenings.bind(this);
  }

  getHappenings() {
    axios.get<HappeningProps[]>("http://localhost:4000/api/happenings")
      .then((response: ServerData) => {
        let dupa: HappeningsListState = response.data as HappeningsListState;
        this.happenings = response.data;
        this.setState({
          happenings: response.data
        })
      })
      .catch((error) => {

      });
  }

  render() {
    return (
      <div className='happenings-container'>
        <h1 className="happenings-header">EVENTS LIST</h1>
        {this.state.happenings.map((happeningData) => {
          return <Happening happening={happeningData} />
        })}
      </div>
    )
  }
}