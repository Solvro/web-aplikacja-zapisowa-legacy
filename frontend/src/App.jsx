import Button from '@material-ui/core/Button';
import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { increment } from './store/increment/actions';
import './App.css';

import logo from './logo.svg';
import { ApplicationState } from './store';
import { bindActionCreators } from 'redux';



function mapStateToProps(state){
  return {store:state}
}

function mapDispatchToProps(dispatch) {
  return { add: bindActionCreators(increment, dispatch) }
}
// tslint:disable-next-line
// function mapDispatchToProps(dispatch: Dispatch) {
//   add: (value: any) => dispatch(increment(value))
// }

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
        <Button variant="contained" color="primary" onClick={() => this.props.add(10)}>
          Add 10 to store
        </Button>
        <p>Store: {`${this.props.store.incrementStore.number}`}</p>
      </div>
    );
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(App);
