import React, { Component } from 'react';

import './CardStub.css'

class CardStubUI extends Component {
  render() {

    var {card, onCardMouseOver, onCardClick, location} = this.props

    if(card === undefined) {
      return <p>undefined</p>
    }
    if(card.name !== "none") {
      return <div className="CardStub" onClick={() => onCardClick(card, location)} onMouseEnter={() => onCardMouseOver(card, location)} onMouseLeave={() => onCardMouseOver(null, location)}>
        <div className="row cardTop">
        <span className="col-4 cardType">{card.cardType}</span>
        <span className="col-4 collectableType">{card.cardType === "Collectable" ? card.collectableType: null}</span>
        {card.value !== 0 ? <span className="col-4 value">{card.value}</span> : null}
        </div>
        <h4 className="center cardName">{card.name}</h4>
      </div>
    } else {
      return null
    }
  }
}

export default CardStubUI;
