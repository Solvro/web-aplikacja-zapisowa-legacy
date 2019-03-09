import * as React from "react";
import {Redirect, Route, RouteComponentProps, RouteProps} from "react-router-dom";
import {verifyUser} from '../store/api';
import {RoomMate} from "../store/RoomMate/types";
import {connect, Dispatch} from "react-redux";
import {ApplicationState} from "../store";
import {signIn} from "../store/RoomMate/actions";


interface PrivateRouteProps extends RouteProps {
    component: React.ComponentType<RouteComponentProps<{}>> | React.ComponentType<any>
    signIn(user: RoomMate): void;
}

const mapDispatchToProps = (dispatch: Dispatch<ApplicationState>): Partial<PrivateRouteProps> => {
    return {
        signIn(user: RoomMate) {
            dispatch(signIn(user));
        }
    }
};

const mapStateToProps = (state: ApplicationState, ownProps: Partial<PrivateRouteProps>) => {
    return {...ownProps};
};

type RenderComponent = (props: RouteComponentProps<{}>) => React.ReactNode;

class PrivateRoute extends Route<PrivateRouteProps> {

    state = {
        loggedIn: false,
        authorized: false
    };

    validateIsLogged = async () => {
        const token = await localStorage.getItem('token');
        try {
            const student = JSON.parse((await localStorage.getItem('signedInStudent')!));
            this.props.signIn(student);
            const verifyResult = token && await verifyUser(token);
            const isLogged = token && verifyResult;
            return isLogged;
        } catch (e) {
            console.log(e);
            return ;
        }
    };

    componentWillMount() {
        this.validateIsLogged()
            .then(isLogged => {
                if (isLogged === true)
                    this.setState({loggedIn: true});
                this.setState({authorized: true})
            })
            .catch(err => {
                this.setState({authorized: true})
            })
    }

    render() {
        const {component: Component, ...rest}: PrivateRouteProps = this.props;
        const renderComponent: RenderComponent = (props) => (
            this.state.loggedIn
                ? <Component {...props} />
                : <Redirect to='/'/>
        );

        return (
            this.state.authorized ?
                <Route {...rest} render={renderComponent}/>
                : <div></div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PrivateRoute);
