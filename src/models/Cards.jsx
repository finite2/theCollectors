import React from 'react';

import {randomInteger} from './Random'

var patrons = [
  "Old Time Auctioneer",
  "Wine Dealer",
  "London Collector",
  "Chinese Jeweler",
  "Interesting Historian",
  "Seductive Actress",
  "Saudi Prince",
  "Action Actor",
]

var cardCounter = {x:0}

var paintingDescription = <span>visible<br />Hidden<br />Set bonus 2 Painting +2<br />3 Painting +8<br />4 Painting +15</span>
var sculptureDescription = <span>Visible Heavy<br />Set bonus 2 Sculpture +2<br />3 Sculpture +8<br />4 Sculpture +15</span>
var armourDescription = <span>Set bonus matched +12</span>

var cards = {
  "Old Time Auctioneer": new CardData("Old Time Auctioneer", 0, "Patron", "Patron", "", <span>Sold at
   +2 <br />Painting +1</span>),
  "Wine Dealer": new CardData("Wine Dealer", 0, "Patron", "Patron", "", <span>Wine +1<br />Wine Case +1<br />Plate +1</span>),
  "London Collector": new CardData("London Collector", 0, "Patron", "Patron", "", <span>Plate +2<br />Sculpture +2</span>),
  "Chinese Jeweler": new CardData("Chinese Jeweler", 0, "Patron", "Patron", "", <span>Jewelery +2<br />Plate +2<br />Forgery -10</span>),
  "Interesting Historian": new CardData("Interesting Historian", 0, "Patron", "Patron", "", <span>Plate +2<br />Armour +2<br />Sculpture +1</span>),
  "Seductive Actress": new CardData("Seductive Actress", 0, "Patron", "Patron", "", <span>Jewelery +2<br />Jewelery earing pair +9<br />Wine +1<br />Painting +1</span>),
  "Saudi Prince": new CardData("Saudi Prince", 0, "Patron", "Patron", "", <span>Painting +3<br />Sculpture +2<br />Wine +1<br />Protected Privacy<br />Will not take part in auctions</span>),
  "Action Actor": new CardData("Action Actor", 0, "Patron", "Patron", "", <span>Armour set bonus +3<br />Armour matching set bonus +6<br />Wine +1<br />Sword +1</span>),
  "Hidden": new CardData("Hidden Object", 0, "Collectable", "?", <span>What could this object be?</span>),
  "TrustWorthy Acomplice 1": new CardData("TrustWorthy Acomplice", 1, "Hired Help", "Hired Help", "", <span></span>),
  "TrustWorthy Acomplice 2": new CardData("TrustWorthy Acomplice", 2, "Hired Help", "Hired Help", "", <span></span>),
  "TrustWorthy Acomplice 3": new CardData("TrustWorthy Acomplice", 3, "Hired Help", "Hired Help", "", <span></span>),
  "Deal 1": new CardData("Selling Information", 1, "Deal", "Deal", "", <span></span>),
  "Deal 2": new CardData("Forgeries to order", 2, "Deal", "Deal", "", <span></span>),
  "Deal 3": new CardData("Steal originals to order", 3, "Deal", "Deal", "", <span></span>),
  "Vintage Merlot": new CardData("Vintage Merlot", 2, "Collectable", "Wine", "Merlot", <span>Case bonus (6) +6</span>, (c,s) => ScoreWine(c,s)),
  "Sword 1": new CardData("Samurai Sword", 3, "Collectable", "Sword", ""),
  "Sword 2": new CardData("Excalibur", 3, "Collectable", "Sword", ""),
  "Sword 3": new CardData("Kings Longsword", 3, "Collectable", "Sword", ""),
  "Armour Boots 1": new CardData("Lancelot's Boots", 1, "Collectable", "Armour", "Lancelot", armourDescription)
    .addScoreFunction((c,s) => ScoreArmour(c,s)),
  "Armour Helmet 1": new CardData("Lancelot's Helmet", 1, "Collectable", "Armour", "Lancelot", armourDescription)
    .addScoreFunction((c,s) => ScoreArmour(c,s)),
  "Armour Armour 1": new CardData("Lancelot's Armour", 2, "Collectable", "Armour", "Lancelot", armourDescription)
    .addScoreFunction((c,s) => ScoreArmour(c,s)),
  "Arthor's Boots": new CardData("Arthor's Boots", 1, "Collectable", "Armour", "Arthor", armourDescription)
    .addScoreFunction((c,s) => ScoreArmour(c,s)),
  "Arthor's Helmet": new CardData("Arthor's Helmet", 1, "Collectable", "Armour", "Arthor", armourDescription)
    .addScoreFunction((c,s) => ScoreArmour(c,s)),
  "Arthor's Armour": new CardData("Arthor's Armour", 2, "Collectable", "Armour", "Arthor", armourDescription)
    .addScoreFunction((c,s) => ScoreArmour(c,s)),
  "Sir Henry's Boots": new CardData("Sir Henry's Boots", 1, "Collectable", "Armour", "Henry", armourDescription)
    .addScoreFunction((c,s) => ScoreArmour(c,s)),
  "Sir Henry's Helmet": new CardData("Sir Henry's Helmet", 1, "Collectable", "Armour", "Henry", armourDescription)
    .addScoreFunction((c,s) => ScoreArmour(c,s)),
  "Sir Henry's Armour": new CardData("Sir Henry's Armour", 2, "Collectable", "Armour", "Henry", armourDescription)
    .addScoreFunction((c,s) => ScoreArmour(c,s)),
  "Ching Dynasty Plate": new CardData("Ching Dynasty Plate", 0, "Collectable", "Plate", "", <span>Multiple Bonus<br />2nd 2<br />3rd 3<br />4th+ 4</span>)
    .addScoreFunction((c,s) => ScorePlate(c,s)),
  "Emerald Bracelet": new CardData("Emerald Bracelet", 3, "Collectable", "Jewelery", "", <span></span>)
    .addScoreFunction((c,s) => ScoreJewelery(c,s)),
  "Emerald Necklace": new CardData("Emerald Necklace", 3, "Collectable", "Jewelery", "", <span></span>)
    .addScoreFunction((c,s) => ScoreJewelery(c,s)),
  "Emerald Earing": new CardData("Emerald Earing", 0, "Collectable", "Jewelery", "", <span>Set of 2 +10</span>)
    .addScoreFunction((c,s) => ScoreJewelery(c,s)),
  "Diamond Bracelet": new CardData("Diamond Bracelet", 3, "Collectable", "Jewelery", "", <span></span>)
    .addScoreFunction((c,s) => ScoreJewelery(c,s)),
  "Diamond Necklace": new CardData("Diamond Necklace", 3, "Collectable", "Jewelery", "", <span></span>)
    .addScoreFunction((c,s) => ScoreJewelery(c,s)),
  "Diamond Earing": new CardData("Diamond Earing", 0, "Collectable", "Jewelery", "", <span>Set of 2 +10</span>)
    .addScoreFunction((c,s) => ScoreJewelery(c,s)),
  "Michael 1": new CardData("Rondanini Pieta", 4, "Collectable", "Sculpture", "Michel Angelo", sculptureDescription)
    .addScoreFunction((c,s) => ScoreNamedSet(c, s, [0,2,6,7])),
  "Michael 2": new CardData("Angel", 3, "Collectable", "Sculpture", "Michel Angelo", sculptureDescription)
    .addScoreFunction((c,s) => ScoreNamedSet(c, s, [0,2,6,7])),
  "Michael 3": new CardData("Battle of the Centaurs", 3, "Collectable", "Sculpture", "Michel Angelo", sculptureDescription)
    .addScoreFunction((c,s) => ScoreNamedSet(c, s, [0,2,6,7])),
  "Michael 4": new CardData("Bacchus", 3, "Collectable", "Sculpture", "Michel Angelo", sculptureDescription)
    .addScoreFunction((c,s) => ScoreNamedSet(c, s, [0,2,6,7])),
  "Sculpture 1": new CardData("Sculpture 1", 4, "Collectable", "Sculpture", "Michel Angelo", sculptureDescription)
    .addScoreFunction((c,s) => ScoreNamedSet(c, s, [0,2,6,7])),
  "Sculpture 2": new CardData("Sculpture 2", 3, "Collectable", "Sculpture", "Michel Angelo", sculptureDescription)
    .addScoreFunction((c,s) => ScoreNamedSet(c, s, [0,2,6,7])),
  "Sculpture 3": new CardData("Sculpture 3", 3, "Collectable", "Sculpture", "Michel Angelo", sculptureDescription)
    .addScoreFunction((c,s) => ScoreNamedSet(c, s, [0,2,6,7])),
  "Sculpture 4": new CardData("Sculpture 4", 3, "Collectable", "Sculpture", "Michel Angelo", sculptureDescription)
    .addScoreFunction((c,s) => ScoreNamedSet(c, s, [0,2,6,7])),
  "DaVinci 1": new CardData("Mona Lisa", 5, "Collectable", "Painting", "Michel Angelo", paintingDescription)
    .addScoreFunction((c,s) => ScoreNamedSet(c, s, [0,2,6,7])),
  "DaVinci 2": new CardData("John The Baptist", 3, "Collectable", "Painting", "Michel Angelo", paintingDescription)
    .addScoreFunction((c,s) => ScoreNamedSet(c, s, [0,2,6,7])),
  "DaVinci 3": new CardData("Virgin and Child", 2, "Collectable", "Painting", "Michel Angelo", paintingDescription)
    .addScoreFunction((c,s) => ScoreNamedSet(c, s, [0,2,6,7])),
  "DaVinci 4": new CardData("Vitruvian Man", 0, "Collectable", "Painting", "Michel Angelo", paintingDescription)
    .addScoreFunction((c,s) => ScoreNamedSet(c, s, [0,2,6,7])),
  "Painting 1": new CardData("Painting 1", 5, "Collectable", "Painting", "Michel Angelo", paintingDescription)
    .addScoreFunction((c,s) => ScoreNamedSet(c, s, [0,2,6,7])),
  "Painting 2": new CardData("Painting 2", 3, "Collectable", "Painting", "Michel Angelo", paintingDescription)
    .addScoreFunction((c,s) => ScoreNamedSet(c, s, [0,2,6,7])),
  "Painting 3": new CardData("Painting 3", 2, "Collectable", "Painting", "Michel Angelo", paintingDescription)
    .addScoreFunction((c,s) => ScoreNamedSet(c, s, [0,2,6,7])),
  "Painting 4": new CardData("Painting 4", 0, "Collectable", "Painting", "Michel Angelo", paintingDescription, (c,s) => ScoreNamedSet(c, s, [0,2,6,7])),
  "Auction": new CardData("Auction", 0, "Action", "Auction", "", <span>Sell 1+(TA) items at higher prices. Can sell to Patrons.<br />Unique +7<br />Painting +5<br /> Sculpture +4<br />Plate +3<br />Sword or Armour +2<br />Wine</span>)
  .addOnPlayFunction((card, player, opponent) => onPlayAuction(card, player, opponent))
  .addTAFunction(numberCards => auctionTA(numberCards))
  .addAuctionScoreFunction((cards) => valueAtAuction(cards))
  .addSelectionConfirm((self, selection, player, opponent) => scoreAuction(self, selection, player, opponent)),
  "Fine Art Auction": new CardData("Fine Art Auction", 0, "Action", "Auction", "", <span>Sell 1+(TA) items at higher prices. Can sell to Patrons.<br />Painting +7<br />Sculpture +5<br />Forgeries will be confiscated</span>)
  .addOnPlayFunction((card, selectState, player, opponent) => onPlayAuction(card, selectState, player, opponent))
  .addTAFunction(numberCards => auctionTA(numberCards))
  .addAuctionScoreFunction((cards) => valueAtAuction(cards))
  .addSelectionConfirm((self, selectState,selection, player, opponent) => scoreAuction(self, selectState, selection, player, opponent)),
  "Fine Spirits Auction": new CardData("Fine Spirits Auction", 0, "Action", "Auction", "", <span>Sell 2+2*(TA) Wine at higher prices. Can sell to Patrons.<br />Wine +2<br />Forgeries will be confiscated</span>)
  .addOnPlayFunction((card, selectState, player, opponent) => onPlayAuction(card, selectState, player, opponent))
  .addTAFunction(numberCards => wineAuctionTA(numberCards))
  .addAuctionScoreFunction((cards) => valueAtAuction(cards))
  .addSelectionConfirm((self, selection, player, opponent) => scoreAuction(self, selection, player, opponent)),
  "Restricting Time": new CardData("Restricting Time", 0, "Action", "Time", "", <span>The next player may only take one card on their next turn. They may not discard a card</span>)
  .addOnPlayFunction((card, selectState, player, opponent) => onPlayRestricting(card, selectState, player, opponent)),
  "Bridge Burner": new CardData("Bridge Burner", 0, "Action", "Time", "", <span>If discarded, enture selection is also discarded</span>)
  .addOnCardDiscard(BridgeBurner),
  "Blackmail Opportunity": new CardData("Blackmail Opportunity", 0, "Action", "Deal", "", <span>The next deal you complete will be worth triple value</span>)
  .addOnPlayFunction((card, selectState, player, opponent) => onPlayBlackmail(card, selectState, player, opponent)),
  "Informant": new CardData("Informant", 0, "Action", "Action", "", <span>Reveal three of your opponents items which are currently hidden</span>)
    .addOnPlayFunction((c,p,o) => informant(c,p,o)),
  "Chasing an old Lead": new CardData("Chasing an old load", 0, "Action", "Action", "", <span>Take a Collectable card of your choice which you have sold at auction this game</span>)
  .addOnPlayFunction((card, selectState, player, opponent) => onPlayLead(card, selectState, player, opponent))
  .addSelectionConfirm((self, selection, player, opponent) => onSelectLead(self, selection, player, opponent)),
  "Making your Aquaintance": new CardData("Making your Aquaintance", 0, "Action", "Action", "", <span>Follow up a lead to aquire a new Patron. Receive a new random Patron</span>),
  "Expedition": new CardData("Expedition", 0, "Action", "Action", "", <span>Send 2(TA) on an expedition for lost treasure. Requires owning a set of clues</span>),
  "Forger": new CardData("Forger", 0, "Action", "Action", "", <span>Forge a Collectable. Forge thee copies if forging Wine.</span>)
  .addOnPlayFunction((card, selectState, player, opponent) => onPlayForger(card, selectState, player, opponent))
  .addSelectionConfirm((self, selection, player, opponent) => onSelectForger(self, selection, player, opponent)),
  "Arsony": new CardData("Arsony", 0, "Action", "Action", "", <span>Destroy up to three items using one TA for each. May destroy hidden or revealed items</span>)
  .addOnPlayFunction((card, selectState, player, opponent) => onPlaySelectOpponentCards(card, selectState, player, opponent))
  .addTAFunction(numberCards => linearTA(numberCards))
  .addSelectionConfirm((self, selection, player, opponent) => actOnArsony(self, selection, player, opponent)),
  "Burglary": new CardData("Burglary", 0, "Action", "Action", "", <span>Steal up to three items using two TA for each. May steal hidden or revealed items</span>)
  .addOnPlayFunction((card, selectState, player, opponent) => onPlaySelectOpponentCards(card, selectState, player, opponent))
  .addTAFunction(numberCards => burglaryTA(numberCards))
  .addSelectionConfirm((self, selection, player, opponent) => actOnBurglary(self, selection, player, opponent)),
    "Safe": new CardData("Safe", 0, "Action", "Action", "", <span>Place two non heavy items in your new safe. If these were previously revealed they will now be hidden.</span>)
}

function Card(name, forgery = false) {

  cardCounter.x ++
  //console.log(name);
  var card = cards[name]
  card.index = cardCounter.x
  card.reference = name
  // console.log(card);
  Object.keys(card).map(k => {
    this[k] = card[k]
  })
  this.forgery = forgery
  this.forgeryKnown = forgery

}

function BridgeBurner(self, player, opponent) {
  player.hand = []
}

function ScoreCards(cards) {
  var total = 0;
  var scoredCards = [];
  for(var i=0; i<cards.length; i++) {
    total += ScoreCard(cards[i], scoredCards);
    scoredCards.push(cards[i]);
  }
  return total;
}

function onPlayAuction(card, gameState, player, opponent) {
  console.log(gameState.selectState);
  gameState.selectState = "player"
  console.log(gameState.selectState);
}

function onPlaySelectOpponentCards(card, gameState, player, opponent) {
  gameState.selectState = "opponent"
}



function onPlayRestricting(card, gameState, player, opponent) {
  opponent.keep = 1;
  opponent.discard = 0;
}

function onPlayForger(card, gameState, player, opponent) {
  gameState.selectState = "selectable"
  gameState.selectableCards = player.owned
}

function onPlayLead(card, gameState, player, opponent) {
  gameState.selectState = "selectable"
  gameState.selectableCards = player.soldCards
}

function onPlayBlackmail(card, gameState, player, opponent) {
  player.dealBonus = true
}

function onSelectForger(self, selectedCard, player, opponent) {
console.log(selectedCard);
  var duplicatedCard = new Card(selectedCard.reference, true)
  player.owned.push(duplicatedCard)
  if(self.collectableType === "wine") {
    duplicatedCard = new Card(selectedCard.reference, true)
    player.owned.push(duplicatedCard)
    duplicatedCard = new Card(selectedCard.reference, true)
    player.owned.push(duplicatedCard)
  }
}

function onSelectLead(self, selectedCard, player, opponent) {
  console.log(selectedCard);
  var duplicatedCard = new Card(selectedCard.reference, true)
  player.owned.push(duplicatedCard)
}

function valueAtAuction(cards) {
  var total = 0;
  for(var i=0; i<cards.length; i++) {
    var card = cards[i]
    console.log(card);
    if(card.collectableType === "Painting") {
      total += 5
    } else if(card.collectableType === "Sculpture") {
      total += 4
    } else if(card.collectableType === "Plate") {
      total += 3
    } else if(card.collectableType === "Armour" || card.collectableType === "Sword") {
      total += 2
    } else if(card.collectableType === "Wine") {
      total += 1
    }
  }
  return total + ScoreCards(cards);
}

function valueAtArtAuction(cards) {
  var total = 0;
  for(var i=0; i<cards.length; i++) {
    var card = cards[i]
    console.log(card);
    if(card.collectableType === "Painting") {
      total += 7
    } else if(card.collectableType === "Sculpture") {
      total += 5
    }
  }
  return total + ScoreCards(cards);
}

function valueAtSpiritsAuction(cards) {
  var total = 0;
  for(var i=0; i<cards.length; i++) {
    var card = cards[i]
    console.log(card);
    if(card.collectableType === "Wine") {
      total += 2
    }
  }
  return total + ScoreCards(cards);
}

function auctionTA(numberCards) {
  return Math.max(0, numberCards-1)
}

function wineAuctionTA(numberCards) {
  return Math.max(0, Math.ceiling(numberCards / 2 - 2))
}

function linearTA(numberCards) {
  return numberCards
}

function burglaryTA(numberCards) {
  return 2 * numberCards
}

function ScoreCard(card, scoredCards) {
  return card.scoreCard(card, scoredCards);
}

function scoreAuction(self, cardSelection, player, opponent) {
  var value = self.auctionScore(cardSelection)
  player.gold += value
  player.ta -= self.taCost(cardSelection.length)
  for (var i = 0; i < cardSelection.length; i++) {
    var card = cardSelection[i];
    player.removeCard(card)
    player.soldCards.push(card)
    player.addHistory(self.name, cardSelection, value)
  }

}

function actOnArsony(self, selection, player, opponent) {
  for (var i = 0; i < selection.length; i++) {
    var card = selection[i]
    if (player.ta > 0) {
      player.ta --
      if(card.name === "Hidden Object") {
        opponent.removeRandomHiddenCard()
      } else {
        opponent.removeCard(card)
      }

    }
  }
}

function actOnBurglary(self, selection, player, opponent) {
  for (var i = 0; i < selection.length; i++) {
    var card = selection[i]
    card.forgeryKnown = false
    if (player.ta > 0) {
      player.ta --
      if(card.name === "Hidden Object") {
        card = opponent.removeRandomHiddenCard()
      } else {
        opponent.removeCard(card)
      }
      card.cardToOtherPlayer()
      player.owned.push(card)
    }
  }
}


function ScorePlate(card, scoredCards) {
  var nCards = scoredCards.filter(c => c.name === card.name).length
  if(nCards === 0) {
    return 0;
  } else if(nCards > 4) {
    return 4;
  } else {
    return nCards+1;
  }
}

function ScoreNamedSet(card, scoredCards, cardbonus = []) {
  var nCards = scoredCards.filter(c => c.group === card.group).length
  return card.value + cardbonus[nCards]
}

function ScoreArmour(card, scoredCards) {
  var nCards = scoredCards.filter(c => c.group === card.group).length
  if(nCards === 2) {
    return card.value + 12;
  }
  return card.value
}

function ScoreWine(card, scoredCards) {
  var nCards = scoredCards.filter(c => c.group === card.group).length
  if(nCards === 5 || nCards === 11) {
    return card.value + 6
  }
  return card.value
}




function ScoreJewelery(card, scoredCards) {
  // console.log(card);
  var nCards = scoredCards.filter(c => c.name === card.name).length
  if(nCards === 1) {
    return card.value + 10;
  }
  return card.value;
}

function informant(card, player, oponent) {
  for(var i=0; i<3; i++) {
    oponent.revealRandomCard()
  }
}



// Cards generator
function CardData(name, value, cardType, collectableType, group, description) {
  this.name = name
  this.value = value
  this.cardType = cardType
  this.collectableType = collectableType
  this.group = group
  this.location = null
  this.description = description

  this.playerState = this.collectableType === "Sculpture" ? "revealed": "hidden"
  this.opponentState = this.playerState

  this.cardToOtherPlayer = function() {
    this.opponentState = this.playerState
    this.forgeryKnown = false
  }

  this.scoreCard = (card, scoredCards) => {return card.value}


  if(cardType == "Collectable"){
    this.onPlayFunction = (card, gameState, player, opponent) => player.owned.push(card)
  } else if(cardType === "Hired Help") {
    this.onPlayFunction = (card, gameState, player, opponent) => player.acceptHiredHelp(card.value)
  } else if(cardType == "Deal") {
    this.onPlayFunction = (card, gameState, player, opponent) => player.acceptDeal(card.value)
  } else {
    this.onPlayFunction = (card, selectState, player, opponent) => {console.log(card.name + " onPlayFunction not implimented")}
  }



  this.manageSelectionConfirm = (card,player,opponent) => {console.log(card.name + " manageSelectionConfirm not implimented")}
  this.auctionScore = (card, selectedCards, player,opponent) => console.log(card.name + " auctionScore not implimented");
  this.taCost = (card, selectedCards, player,opponent) => console.log(card.name + " taCost not implimented");
  this.onCardDiscard = (card, player, opponent) => console.log(card.name + " onCardDiscard not implimented");

  this.addOnPlayFunction = function(fun) {
    this.onPlayFunction = fun
    return this
  }

  this.addScoreFunction = function(fun) {
    this.scoreCard = fun
    return this
  }

  this.addTAFunction = function(fun) {
    this.taCost = fun
    return this
  }

  this.addAuctionScoreFunction = function(fun) {
    this.auctionScore = fun
    return this
  }

  this.addSelectionConfirm = function(fun) {
    this.manageSelectionConfirm = fun
    return this
  }

  this.addOnCardDiscard = function(fun) {
    this.onCardDiscard = fun
    return this
  }
}

export {Card, ScoreCards, CardData, cards, patrons}
