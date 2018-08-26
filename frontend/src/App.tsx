import './App.css';

import Button from '@material-ui/core/Button';
import React, {MouseEvent} from 'react';
import {connect, Dispatch} from 'react-redux';
import {RouteComponentProps} from "react-router-dom";
import {ApplicationState} from './store';
import {increment} from './store/increment/actions';

interface IPropsFromStore extends RouteComponentProps<any>{
    store: ApplicationState;
    add(value: number): void;
}

interface IAppState {
  state: ''
}

function mapStateToProps(state: ApplicationState){
  return { store: state }
}

function mapDispatchToProps(dispatch: Dispatch<ApplicationState>) {
  return { add: (value: number): void => { dispatch(increment(value)) } }
}
class App extends React.Component<IPropsFromStore, IAppState> {

  public render() {
    // tslint:disable-next-line:no-console
    console.log('props',this.props);
      return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.tsx</code> and save to reload.

        </p>
        <Button variant="contained" color="primary" onClick={this.onClickAdd}>
          Add 10 to store
        </Button>
        <Button variant="contained" color="primary" onClick={this.onClickChange} >
            Go to The best site you have ever seen!
        </Button>
        <p>Store: {`${this.props.store.incrementStore.number}`}</p>
      </div>
    );
  }

    private onClickAdd = (event: MouseEvent<HTMLElement>) => this.props.add(10);
    private onClickChange = (event: MouseEvent<HTMLElement>) => this.props.history.push('/a');
}
// this.props.history.push("/a")
export default connect(mapStateToProps,mapDispatchToProps)(App);
