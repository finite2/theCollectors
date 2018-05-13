import React, { Component } from 'react'

import {Card, CardData, cards, patrons} from '../models/Cards'

import SelectableCardUI from './SelectableCardUI'


import "./Hand.css"

class HandUI extends Component {
  render() {

    var {hand, onCardMouseOver, onCardClick, keep, discard} = this.props
    console.log(hand);
    var cardsInHand = hand.map(n => new Card(n))

    return <div className={"hand" + (keep === 0 ? " discard": "")}>
      <h4>Your Hand</h4>
      <p><span>Keep <b>{keep}</b> more cards.</span> <span>Discard <b>{discard}</b> more cards.</span></p>
      <div className="row m-0">
        {cardsInHand.map((c,i) => {
          return <div key={i} className="col-2"><SelectableCardUI card={c} onCardMouseOver={onCardMouseOver} onCardClick={onCardClick} location={{player: "hand", region: "none", index:i}}/></div>
        })}
      </div>
    </div>
  }
}

export default HandUI
