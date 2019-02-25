import React, { Component } from 'react';
import {Link} from "react-router-dom";
import ManageTripScreen from '../screens/ManageTripScreen/ManageTripScreen';

export default class ManageTripsRoute extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }


  render() {
    return <ManageTripScreen />
  }
}
