import './App.css';
import React from 'react';
import {Route, RouteComponentProps, Switch, withRouter} from "react-router-dom";
import AppBar from "@material-ui/core/AppBar/AppBar";
import Toolbar from "@material-ui/core/Toolbar/Toolbar";
import Typography from "@material-ui/core/Typography/Typography";

import {createStyles, withStyles, WithStyles} from "@material-ui/core";
import LoginScreen from "./components/LoginScreen/LoginScreen";
import UserFormRoute from "./components/UserFormRoute/UserFormRoute";
import AddRoomMatesModal from "./components/AddRoomMatesModal/AddRoomMatesModal";
import SummaryRoute from "./components/SummaryRoute/SummaryRoute";
import PrivateRoute from './components/PrivateRoute';
import ErrorDisplay from "./components/ErrorDisplay";


const styles = createStyles({
    main: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
    }
});

class App extends React.Component<WithStyles<typeof styles> & RouteComponentProps<{}>> {

  public render() {
    const { classes } = this.props;

    return (
          <div className="App">
              <div className={classes.main}>
                  <AppBar color={"secondary"} position={"static"}>
                      <Toolbar>
                          <Typography variant="h6" color={"inherit"}>
                              Aplikacja zapisowa
                          </Typography>
                      </Toolbar>
                  </AppBar>
                  <Switch>
                      <PrivateRoute path={'/AddingRoomMates'} component={AddRoomMatesModal}/>
                      <PrivateRoute path={'/RoomBooking'} component={UserFormRoute}/>
                      <PrivateRoute path={'/Summary'} component={SummaryRoute}/>
                      <Route path={'/'} component={LoginScreen}/>
                  </Switch>
                  <ErrorDisplay />
              </div>
          </div>
    );
  }
}

export default withRouter(withStyles(styles)(App));
