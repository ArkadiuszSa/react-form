import * as React from "react";
import "./../assets/scss/Happening.scss";
import { withRouter } from 'react-router-dom';
import axios from 'axios';

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




class Happening extends React.Component<HappeningProps, {}> {
  constructor(props) {
    super(props);
    this.redirecToForm = this.redirecToForm.bind(this);
    this.getFormData = this.redirecToForm.bind(this);

  }

  redirecToForm() {
    this.props.history.push("/form/"+this.props.happening._id)
  }

  getFormData() {

  }


  render() {
    return (
      <div className="happening-container" onClick={this.redirecToForm}>
        <p className="title-p">{this.props.happening.title}</p>
        <p className="description-p">{this.props.happening.description}</p>
        <p className="price-p">
          <label>Price:</label>{this.props.happening.price}
        </p>
        <div className="days-container">
          <label>Days:</label>
          <div>
            {this.props.happening.days.map((date) => {
              return <p>{date}</p>
            })}
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(Happening)
