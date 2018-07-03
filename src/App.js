import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import GameControllerUI from './components/GameControllerUI'



class App extends Component {
  render() {
    return (
      <div className="App">
        <GameControllerUI />
      </div>
    );
  }
}

export default App;
