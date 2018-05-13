import React, { Component } from 'react'

import SelectableCardUI from './SelectableCardUI'

import {Card, cards} from '../models/Cards'

import "./Opponent.css"

class OpponentUI extends Component {
  render() {

    var {player, onCardMouseOver, onCardClick} = this.props
    var hiddenCard = new Card("Hidden");

    var cards = player.owned.map((c,i) => {
      if(c.opponentState === "hidden") {
        return <div key={"h" + i} className="col-3"><SelectableCardUI card={hiddenCard} onCardMouseOver={onCardMouseOver} onCardClick={onCardClick} location={{player: "opponent", index:null}}/></div>
      } else {
        return <div key={"r" + i} className="col-3"><SelectableCardUI card={c} onCardMouseOver={onCardMouseOver} onCardClick={onCardClick} location={{player: "opponent", index:c.index}}/></div>
      }
    })



    return (
      <div className="opponent">
        <h4>Player {player.index}</h4>
        <p><span>Trusted Accomplaces available: <b>{player.ta}</b></span> Gold: <b>{player.gold}</b></p>
        <div className="row m-0 owned">
          {cards}
        </div>
      </div>

    )
  }
}

export default OpponentUI;
