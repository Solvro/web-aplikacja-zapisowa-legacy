import Button from '@material-ui/core/Button';
import { bindActionCreators } from 'redux';
import * as React from 'react';
import { connect } from 'react-redux';
import * as actionCreators from './store/actions/actionsCreators';
import './App.css';

import logo from './logo.svg';



function mapStateToProps(state){
  // tslint:disable-next-line:no-console
  console.log(state);
  return {
    index: state.numbers
  }
}

function mapDispachtToProps(dispatch){
    // tslint:disable-next-line:no-console
    console.log(dispatch);
  return bindActionCreators(actionCreators, dispatch);

}

class App extends React.Component {

  add = () => {
    return true;
  }

  render() {
    // tslint:disable-next-line:no-console
    console.log('func',this.props.increment);
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.tsx</code> and save to reload.
          
        </p>
        <Button variant="contained" color="primary" onClick={this.props.increment.bind(null, 1)}>
          {this.props.index}
        </Button>
      </div>
    );
  }
}

export default connect(mapStateToProps,mapDispachtToProps)(App);
