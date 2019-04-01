import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { verifyUser } from '../store/Api';


class PrivateRoute extends React.Component {

  state = {
    loggedIn: false,
    authorized: false
  }

/* eslint-disable no-console */
  validateIsLogged = async () => {
    const token = await localStorage.getItem('token');
    const verifyResult = token && await verifyUser(token);
    const isLogged = token && verifyResult;
    console.log("Sprawdzam czy user ma poprawny token: ", isLogged, verifyResult);
    return  isLogged;
  }

  componentWillMount(){
   this.validateIsLogged()
      .then(isLogged => {
        if(isLogged === true )
          this.setState({loggedIn: true})
        this.setState({authorized: true})
      })
      .catch(err => {
        this.setState({authorized: true})
      })
  }

  render () {
    const {component: Component, ...rest} = this.props;
    const renderComponent = (props) => (
      this.state.loggedIn
        ? <Component {...props} />
        : <Redirect to='/' />
    );

    return (
        this.state.authorized ?
        <Route {...rest} render={renderComponent} />
        : <div></div>

    );
  }

}

export default PrivateRoute;