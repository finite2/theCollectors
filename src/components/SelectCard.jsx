import React, { Component } from 'react';

import CardUI from './CardUI';
import SelectableCardUI from './SelectableCardUI';
class SelectCard extends Component {
  render() {
console.log("SelectCard");
    var {cards, onCardMouseOver, onCardClick} = this.props



    var cardUI = null
    if(cards.length > 0) {
      cardUI = cards.map((c,i) => {
        return <div key={i} className="col-2"><SelectableCardUI card={c} onCardMouseOver={onCardMouseOver} onCardClick={onCardClick} location={{player: "selectable", region: "none", index:i}}/></div>
      })
    } else {
      cardUI = <button className="btn btn-primary btn-lg" style={{margin: '10px'}} onClick={() => onCardClick()}>Return</button>
    }


    console.log(cards);

    return <div className="row" style={{position: 'absolute', background: '#0000FF', top: '40%', left: '10%', height: '9%', width: '80%', 'overflowX': 'auto', 'overflowY': 'hidden', padding: '10px', border: '1px solid black'}}>
      {cardUI}
    </div>
  }
}

export default SelectCard;
