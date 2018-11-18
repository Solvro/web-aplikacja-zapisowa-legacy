import * as React from "react";
import {Redirect, Route, RouteComponentProps, RouteProps} from "react-router-dom";
import { verifyUser } from '../store/api';


interface PrivateRouteProps extends RouteProps {
  component: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>
}

type RenderComponent = (props: RouteComponentProps<any>) => React.ReactNode;

export class PrivateRoute extends Route<PrivateRouteProps> {

  state = {
    auth: false,
    authorized: false
  }

  validateIsLogged = async () => {
    const token = await localStorage.getItem('token');
    const verifyResult = token && await verifyUser(token);
    const isLogged = token && verifyResult;
    return  isLogged;
  }

  componentWillMount(){
   this.validateIsLogged()
      .then(isLogged => {
        if(isLogged === true )
          this.setState({auth: true})
        this.setState({authorized: true})
      })
      .catch(err => {
        this.setState({authorized: true})
      })
  }

  render () {
    const {component: Component, ...rest}: PrivateRouteProps = this.props;
    const renderComponent: RenderComponent = (props) => (
      this.state.auth
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