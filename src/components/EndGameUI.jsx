import React, { Component } from 'react'

import SaleHistoryUI from './SaleHistoryUI'

class EndGameUI extends Component {



  render() {

    var {players} = this.props

    var playersUI = players.map((p,i) => {

      var history = p.history.map((h,i) => {
        return <SaleHistoryUI history={h}/>
      })

      return <div className="col-6" key={i}>
        <h3>Player {p.index}</h3>
        <h3>Total Score: {p.gold}</h3>
        <h3>History:</h3>
        {history}

      </div>
    })

    return <div className="row">
      {playersUI}
      <div className="col-12">
        <button className="btn btn-primary btn-lg" onClick={() => this.props.startNewGame()}>New Game</button>
      </div>
    </div>

  }


}

export default EndGameUI;
