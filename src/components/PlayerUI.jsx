import React, { Component } from 'react'


import SelectableCardUI from './SelectableCardUI'

import {Card, cards} from '../models/Cards'

import "./PlayerUI.css"

class PlayerUI extends Component {
  render() {

    var {player, hand, onCardMouseOver, onCardClick} = this.props

    var cards = <div className="row">
      {player.owned.map((c,i) => {
        return <div key={i} className="col-2"><SelectableCardUI card={c} onCardMouseOver={onCardMouseOver} onCardClick={onCardClick} location={{player: "player", index:i}}/></div>
      })}
    </div>



    return (
      <div className="player">
        <h4>Player {player.index}</h4>
        <p><span>Trusted Accomplaces available: <b>{player.ta}</b></span> Gold: <b>{player.gold}</b></p>
        <div className="row m-0">
          <div className="col-12">
            {cards}
          </div>
        </div>
      </div>

    )
  }
}

export default PlayerUI;
