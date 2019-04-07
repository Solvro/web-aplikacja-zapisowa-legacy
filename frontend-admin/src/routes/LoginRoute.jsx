import React, { Component } from 'react';
import LoginScreen from '../screens/LoginScreen/LoginScreen';

export default class LoginRoute extends Component {
  render() {
    return <div style={{ height: '100vh' }}><LoginScreen { ...this.props } /></div>;
  }
}
