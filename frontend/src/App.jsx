import Button from '@material-ui/core/Button';
import { bindActionCreators } from 'redux';
import * as React from 'react';
import { connect } from 'react-redux';
import actionCreators from './store/actions/actionsCreators';
import './App.css';

import logo from './logo.svg';



function mapStateToProps(state){
  // tslint:disable-next-line:no-console
  console.log('state',state);
  return {
    numbers: state.numbers
  }
}

function mapDispachToProps(dispatch){
    // tslint:disable-next-line:no-console
    console.log('dispatch', dispatch);
  return bindActionCreators(actionCreators, dispatch);

}

class App extends React.Component {

  add = () => {
    return true;
  }

  render() {
    // tslint:disable-next-line:no-console
    console.log('props',this.props);
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.tsx</code> and save to reload.
          
        </p>
        <Button variant="contained" color="primary" onClick={() => this.props.increment(10)}>
          Add 10 to store
        </Button>
        <p>Store: {this.props.numbers.numbers || 1}</p>
      </div>
    );
  }
}

export default connect(mapStateToProps,mapDispachToProps)(App);
