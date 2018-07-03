import React, { Component } from 'react'

import GameContext from './GameContext'

class TestUI extends Component {
  render() {
    return <GameContext.Consumer>
      {(context) => {
        console.log(context);
        return <React.Fragment>
          <div>{context.test}</div>
          <a className="btn" onClick={context.pushCounter}>{context.counter}</a>
        </React.Fragment>}
      }
    </GameContext.Consumer>
  }
}

export default TestUI
