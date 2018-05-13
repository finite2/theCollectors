import React, { PureComponent } from 'react';

import './cardUI.css'

class CardUI extends PureComponent {
  render() {

    var {card} = this.props

    if(card.name !== "none") {

      return <div className="card">
        <div className="row cardTop">
          <span className="col-4 cardType">{card.cardType}</span>
          <span className="col-4 collectableType">{card.cardType === "Collectable" ? card.collectableType: null}</span>
          {card.value !== 0 ? <span className="col-4 value">{card.value}</span> : null}
        </div>
        <h4 className="center cardName">{card.name}</h4>
        <div className="row cardTop">
          <span className="col-4 fogery">{card.forgery && card.forgeryKnown ? "Forgery": null}</span>
        </div>
        <p className="description">{card.description}</p>
      </div>
    } else {
      return <div className="noCard">
      </div>
    }
  }
}

export default CardUI;
