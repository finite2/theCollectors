import {randomInteger} from './Random'
import SaleHistory from './SaleHistory'

function Player(index) {


  this.index = index;

  this.hand = []

  this.gold = 0;
  this.ta = 3;

  this.keep = 2;
  this.discard = 1;

  this.owned = [];

  this.dealBonus = false;
  this.safeCapacity = 0;

  this.patrons = [];
  this.history = [];
  this.soldCards = [];

  this.getCardPositionByIndex = function(card) {
    return this.owned.indexOf(card)
  }

  this.removeCard = function(card) {
    var index = this.getCardPositionByIndex(card)
    if(index !== -1) {
      this.owned.splice(index, 1)
    } else {
      console.log(`card ${card.name} wasn't found`);
    }
  }

  this.removeRandomHiddenCard = function() {
    var done = false
    var card = null
    if(this.owned.filter(c => c.opponentState === "hidden" && c.playerState === "hidden").length > 0) {
      while(!done) {
        var index = randomInteger(this.owned.length)
        card = this.owned[index]
        if(card.opponentState === "hidden" && card.playerState === "hidden") {
          this.owned.splice(index, 1)
          done = true
        }
      }
    }
    return card
  }

  this.acceptDeal = function(value) {
    if(this.dealBonus) {
      this.gold += value * 3
      this.dealBonus = false
    } else {
      this.gold += value
    }
  }

  this.acceptHiredHelp = function(value) {
    this.ta += value
  }

  this.revealRandomCard =function() {
    var done = false
    // if there exists items to reveal
    if(this.owned.filter(c => c.opponentState === "hidden" && c.playerState === "hidden").length > 0) {
      while(!done) {
        var index = randomInteger(this.owned.length)
        var card = this.owned[index]
        if(card.opponentState === "hidden" && card.playerState === "hidden") {
          card.opponentState = 'revealed'
          done = true
        }
      }
    }
  }

  this.addHistory = function(name, cards, value) {
    this.history.push(new SaleHistory(name, cards, value))
  }



}

export default Player;
