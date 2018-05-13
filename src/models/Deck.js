import {shuffle} from './Random'

function Deck() {

  this.deck = [
    "TrustWorthy Acomplice 1",
    "TrustWorthy Acomplice 1",
    "TrustWorthy Acomplice 1",
    "TrustWorthy Acomplice 2",
    "TrustWorthy Acomplice 2",
    "TrustWorthy Acomplice 2",
    "TrustWorthy Acomplice 3",
    "TrustWorthy Acomplice 3",
    "TrustWorthy Acomplice 3",
    "Deal 1",
    "Deal 1",
    "Deal 1",
    "Deal 2",
    "Deal 2",
    "Deal 2",
    "Deal 3",
    "Deal 3",
    "Deal 3",
    "Sword 1",
    "Sword 2",
    "Sword 3",
    "Armour Boots 1",
    "Armour Helmet 1",
    "Armour Armour 1",
    "Arthor's Boots",
    "Arthor's Helmet",
    "Arthor's Armour",
    "Sir Henry's Boots",
    "Sir Henry's Helmet",
    "Sir Henry's Armour",
    "Ching Dynasty Plate",
    "Ching Dynasty Plate",
    "Ching Dynasty Plate",
    "Ching Dynasty Plate",
    "Ching Dynasty Plate",
    "Ching Dynasty Plate",
    "Ching Dynasty Plate",
    "Ching Dynasty Plate",
    "Vintage Merlot",
    "Vintage Merlot",
    "Vintage Merlot",
    "Vintage Merlot",
    "Vintage Merlot",
    "Vintage Merlot",
    "Vintage Merlot",
    "Vintage Merlot",
    "Vintage Merlot",
    "Emerald Bracelet",
    "Emerald Necklace",
    "Emerald Earing",
    "Emerald Earing",
    "Emerald Earing",
    "Diamond Bracelet",
    "Diamond Necklace",
    "Diamond Earing",
    "Diamond Earing",
    "Diamond Earing",
    "Michael 1",
    "Michael 2",
    "Michael 3",
    "Michael 4",
    "Sculpture 1",
    "Sculpture 2",
    "Sculpture 3",
    "Sculpture 4",
    "DaVinci 1",
    "DaVinci 2",
    "DaVinci 3",
    "DaVinci 4",
    "Painting 1",
    "Painting 2",
    "Painting 3",
    "Painting 4",
    "Auction",
    "Auction",
    "Auction",
    "Fine Art Auction",
    "Fine Art Auction",
    "Fine Spirits Auction",
    "Restricting Time",
    "Restricting Time",
    "Bridge Burner",
    "Bridge Burner",
    "Blackmail Opportunity",
    "Blackmail Opportunity",
    "Informant",
    "Informant",
    "Chasing an old Lead",
    "Chasing an old Lead",
    "Forger",
    "Forger",
    "Arsony",
    "Arsony",
    "Burglary",
    "Burglary"
  ]


  this.shuffle = function() {
    this.deck = shuffle(this.deck)
  }

  this.addCardToHand = function(hand){
    hand.push(this.deck[0])
    this.deck.splice(0,1)
  }

  this.getHand = function(hand, handSize = 6) {
    while(hand.length < handSize){
      this.addCardToHand(hand)
    }
  }

}

var deck2 = [
  "Sword 1",
  "Sword 2",
  "Sword 3",
  "Armour Boots 1",
  "Armour Helmet 1",
  "Armour Armour 1",
  "Arthor's Boots",
  "Arthor's Helmet",
  "Arthor's Armour",
  "Sir Henry's Boots",
  "Sir Henry's Helmet",
  "Sir Henry's Armour",
  "Ching Dynasty Plate",
  "Ching Dynasty Plate",
  "Ching Dynasty Plate",
  "Ching Dynasty Plate",
  "Ching Dynasty Plate",
  "Ching Dynasty Plate",
  "Ching Dynasty Plate",
  "Ching Dynasty Plate",
  "Burglary",
  "Burglary",
  "Burglary",
  "Auction",
  "Auction",
  "Auction",
  "Forger",
  "Forger",
  "Forger",
]




export default Deck
