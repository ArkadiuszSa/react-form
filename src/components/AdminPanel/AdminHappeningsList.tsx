import * as React from "react";
import "../../assets/scss/AdminHappeningsList.scss";
import { withRouter } from 'react-router-dom';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import http from '../../helpers/Axios'
import * as moment from 'moment'
import {
  Link
} from 'react-router-dom';
import { isMoment } from "moment";

export interface ServerData {
  data: Happening[]
}

export interface HappeningsListState {
  happenings: Happening[]
}
export interface Happening {
  _id: string,
  title: string
}
export interface HappeningListProps {
  history?: any
}

class AdminHappenigsList extends React.Component<HappeningListProps, HappeningsListState> {
  constructor(props) {
    super(props);

    this.state = {
      happenings: []
    }

    this.getHappenings = this.getHappenings.bind(this);
    this.addNewHappening = this.addNewHappening.bind(this);

    this.getHappenings()
  }

  redirectToHappening(id) {
    this.props.history.push("/admin/happening/" + id)

  }

  getHappenings() {
    axios.get("http://localhost:4000/api/happenings/")
      .then((response: ServerData) => {
        console.log('odpala getowanie')
        this.setState({
          happenings: response.data
        })
      })
      .catch((error) => {
        console.log(error)
      });
  }

  addNewHappening() {
    let newHappening = {
      title: 'New happening',
      description: 'Description',
      price: 'Price',
      days: [moment().format("YYYY-MM-DD")]
    }
    http.post("http://localhost:4000/api/happening", newHappening)
      .then((response) => {
        console.log('wchodzi w thena')
        this.getHappenings();
      })
      .catch((error) => {
        console.log(error)
      });
  }


  render() {
    return (
      <div className="admin-happenings-container" >
        <p className="happenings-title-p">Happenings</p>
        <List>
          {this.state.happenings.map((happeningData) => {
            return <ListItem button divider onClick={() => this.redirectToHappening(happeningData._id)}>
              {happeningData.title}
            </ListItem>
          })}
        </List>
        <Button variant="outlined" color="primary" className='admin-happenings-new-button' onClick={this.addNewHappening}>New</Button>
      </div>
    )
  }
}

export default withRouter(AdminHappenigsList)
