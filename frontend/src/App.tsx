import './App.css';
import React from 'react';
import {connect, Dispatch} from 'react-redux';
import {Route, RouteComponentProps} from "react-router-dom";
import {ApplicationState} from './store';
import {increment} from './store/increment/actions';
import AppBar from "@material-ui/core/AppBar/AppBar";
import Toolbar from "@material-ui/core/Toolbar/Toolbar";
import Typography from "@material-ui/core/Typography/Typography";

import {createStyles, withStyles, WithStyles} from "@material-ui/core";
import LoginScreen from "./components/LoginScreen/LoginScreen";
import UserFormRoute from "./components/UserFormRoute/UserFormRoute";
import AddRoomMatesModal from "./components/AddRoomMatesModal/AddRoomMatesModal";

const styles = createStyles({
    main: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
    }
});

interface IPropsFromStore extends RouteComponentProps<any>{
    store: ApplicationState;
    add(value: number): void;
}

function mapStateToProps(state: ApplicationState){
  return { store: state }
}

function mapDispatchToProps(dispatch: Dispatch<ApplicationState>) {
  return { add: (value: number): void => { dispatch(increment(value)) } }
}

class App extends React.Component<IPropsFromStore & WithStyles<typeof styles>> {

  public render() {
    const { classes } = this.props;

    return (
          <div className="App">
              <div className={classes.main}>
                  <AppBar color={"default"} position={"static"}>
                      <Toolbar>
                          <Typography variant="title" color={"textPrimary"}>
                              Aplikacja zapisowa
                          </Typography>
                      </Toolbar>
                  </AppBar>
                  <Route path={'/SignIn'} component={LoginScreen}/>
                  <Route path={'/RoomBooking'} component={UserFormRoute}/>
                  <Route path={'/AddingRoomMates'} component={AddRoomMatesModal}/>
              </div>
          </div>
    );
  }
}

export default connect(mapStateToProps,mapDispatchToProps)
(withStyles(styles)(App));
