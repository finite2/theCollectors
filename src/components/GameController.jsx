import React, { Component } from 'react';

import TestUI from './TestUI'


import GameContext from './GameContext'

class GameController extends Component {

  constructor(props) {
    super(props)

    this.pushCounter = () => this.setState({counter: this.state.counter + 1 })


    this.state = {
      test: "test",
      counter: 4,
      pushCounter: this.pushCounter
    };
  }

  render() {
    console.log("Render");
    return <GameContext.Provider value={this.state}>
      <div>Hi</div>
        <TestUI />
    </GameContext.Provider>
  }
}

export default GameController;
