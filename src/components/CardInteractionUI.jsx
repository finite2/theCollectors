import React, { Component } from 'react';

import SelectableCardUI from './SelectableCardUI'

class CardInteractionUI extends Component {
  render() {

    var {keyCard, selectedCards, potentialCard, selectState, onCardMouseOver, onCardClick, onConfirm} = this.props
    var selection;
    var value = 0;
    var ta = 0;

    console.log(potentialCard);
    var cards = potentialCard === null ? selectedCards: selectedCards.concat(potentialCard)
    console.log(cards);

    if(cards.length > 0) {
      selection = cards.map((c,i) => <SelectableCardUI key={i} card={c} onCardMouseOver={onCardMouseOver} onCardClick={onCardClick} location={{player: "selection", index: i}}/>)
      value = keyCard.auctionScore(cards)
      ta = keyCard.taCost(cards.length)
    }





    if(selectState === "none") {
      return null;
    }

    return [<div className="col-2" key="selection">{selection}</div>,
      <div className="col-2" key="details">
        <p>Number of TA: {ta}</p>
        <p>Value: {value}</p><button className="btn btn-primary btn-lg" onClick={() => onConfirm()} style={{margin: '10px'}}>Confirm</button>
      </div>]

  }
}


export default CardInteractionUI
