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
  happenings?:Array<HappeningProps>
}

export interface ServerData {
  data: HappeningProps[]
}

export default class HappeningList extends React.Component< {}, HappeningsListState> {
  //public happenings:Array<HappeningProps>;
  //  = [
  //   {
  //     _id: '1',
  //     title: 'Sumer Party',
  //     description: 'Only this summer you can get your as on beach and dance with nice leadys!Only this summer you can get your as on beach and dance with nice leadys!Only this summer you can get your as on beach and dance with nice leadys! ',
  //     days: [
  //       '25-08-2018',
  //       '01-09-2018',
  //       '08-09-2018'
  //     ],
  //     price: '10$'
  //   },
  //   {
  //     _id: '2',
  //     title: 'AirShow',
  //     description: 'You will be able to see the bravest pilots the world has seen!You will be able to see the bravest pilots the world has seen!You will be able to see the bravest pilots the world has seen! ',
  //     days: [
  //       '29-08-2018'
  //     ],
  //     price: '10$'
  //   },
  //   {
  //     _id: '3',
  //     title: 'Melodius Holidays',
  //     description: 'A concert of independent jazz artists will take place in the nearby park. We invite all music fans. Free entrance',
  //     days: [
  //       '30-08-2018'
  //     ],
  //     price: 'Free'
  //   }
  // ]

  componentWillMount() {
    this.setState({
      happenings:[]
    })
   this.getHappenings();
  }

  public happenings:Array<HappeningProps>;
  constructor(props) {
    super(props);

    this.getHappenings=this.getHappenings.bind(this);
  }

  getHappenings() {

    axios.get<HappeningProps[]>("http://localhost:4000/api/happenings")
    .then((response: ServerData)  => {
      let dupa:HappeningsListState=response.data as HappeningsListState;
      this.happenings=response.data;
      this.setState({
        happenings:response.data
      })
      console.log(response.data)
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