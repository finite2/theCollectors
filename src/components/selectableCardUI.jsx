import React, { PureComponent } from 'react';

import CardStubUI from './CardStubUI';

class SelectableCardUI extends PureComponent {
  render() {

    var {card, location, onCardMouseOver, onCardClick} = this.props

    return <CardStubUI  card={card} location={location} onCardMouseOver={onCardMouseOver} onCardClick={onCardClick}/>
  }
}

export default SelectableCardUI;
