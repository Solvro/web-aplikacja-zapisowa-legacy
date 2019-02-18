import React, { Component } from 'react';
import {Link} from "react-router-dom";

export default class ManageTripsRoute extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }


  render() {
    return (
      <div>
        Manage Trips
        <ul>
          <li>
            <Link to="/trips/1">Trip 1</Link>
          </li>
          <li>
            <Link to="/trips/69">Trip 69</Link>
          </li>
        </ul>
      </div>
    );
  }
}
