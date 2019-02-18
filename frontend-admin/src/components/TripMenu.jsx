import React from 'react';
import List from "@material-ui/core/List/List";
import ListItem from "@material-ui/core/ListItem/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon/ListItemIcon";
import DashboardIcon from "@material-ui/icons/Dashboard";
import HotelIcon from "@material-ui/icons/Hotel";
import PeopleIcon from "@material-ui/icons/People";
import EmailIcon from "@material-ui/icons/Email";
import ChartIcon from "@material-ui/icons/InsertChart";
import EditIcon from "@material-ui/icons/Edit";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";
import Drawer from "@material-ui/core/Drawer/Drawer";
import {withStyles} from "@material-ui/core";
import {withRouter} from "react-router-dom";

const drawerWidth = 240;

const menuItems = [
  {
    text: 'Wycieczki',
    icon: <DashboardIcon/>,
    goTo: () => `/trips/`,
  },
  {
    text: 'Pokoje',
    icon: <HotelIcon/>,
    goTo: id => `/trips/${id}/rooms`,
  },
  {
    text: 'Uczestnicy',
    icon: <PeopleIcon/>,
    goTo: id => `/trips/${id}/participants`,
  },
  {
    text: 'Wyślij wiadomość',
    icon: <EmailIcon/>,
    goTo: id => `/trips/${id}/message`,
  },
  {
    text: 'Statystyki',
    icon: <ChartIcon/>,
    goTo: id => `/trips/${id}`,
  },
  {
    text: 'Edycja wycieczki',
    icon: <EditIcon/>,
    goTo: id => `/trips/${id}/edit`,
  },
];

const styles = theme => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  toolbar: theme.mixins.toolbar,
});

const TripMenu = ({classes, history, match}) => (
  <Drawer
    className={classes.drawer}
    variant="permanent"
    classes={{
      paper: classes.drawerPaper,
    }}
  >
    <div className={classes.toolbar}/>
    <List>
      {menuItems.map(({text, icon, goTo}) => (
        <ListItem
          button
          key={text}
          onClick={() => history.push(goTo(match.params.id))}
        >
          <ListItemIcon>{icon}</ListItemIcon>
          <ListItemText primary={text}/>
        </ListItem>
      ))}
    </List>
  </Drawer>
);

export default withRouter(withStyles(styles)(TripMenu));
