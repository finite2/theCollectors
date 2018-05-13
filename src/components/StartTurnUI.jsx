import React, { Component } from 'react'

class StartTurnUI extends Component {
  render() {
    return <div>
      <h4>Player {this.props.player.index}</h4>
      <button className="btn btn-primary btn-lg" id="changeFilter" onClick={() => this.props.startTurn()}>
        StartTurn
      </button>
    </div>
  }

}

export default StartTurnUI
