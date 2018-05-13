import React, { PureComponent } from 'react';

import './SaleHistory.css'

class SaleHistoryUI extends PureComponent {
  render() {
    var {history} = this.props

    var cards = history.cards.map(c => <li>c.name</li>)

    return <div class='history'>
      <h4>Sold at {history.name}</h4>
      <ul>
        {cards}
      </ul>
      <h4> total value of {history.value}</h4>
    </div>
  }
}

export default SaleHistoryUI;
