import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  callApi(){
    fetch('http://localhost:8000/api/test')
    .then((result) => {
      console.log(result)
      return result.json();
    }).then(res => {
      alert(res['sub'])
    })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      
        <button onClick={() => this.callApi()}>
          Click here to call API
        </button>
      </div>
    );
  }
}

export default App;
