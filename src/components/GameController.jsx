import React, { Component } from 'react';

import StartTurnUI from './StartTurnUI';
import PlayerUI from './PlayerUI';
import CardUI from './CardUI';
import OpponentUI from './OpponentUI';
import SelectableCardUI from './SelectableCardUI';
import HandUI from './HandUI'
import EndGameUI from './EndGameUI'
import CardStubUI from './CardStubUI'
import CardInteractionUI from './CardInteractionUI'
import SelectCard from './SelectCard'

import {Card, CardData, cards, patrons, ScoreCards} from '../models/Cards'
import Deck from '../models/Deck'
import Player from '../models/Player';
import {randomInteger} from '../models/Random'

class GameControllerUI extends Component {


  constructor(props){
    super(props)

    this.onStartTurn = this.onStartTurn.bind(this)
    this.endTurn = this.endTurn.bind(this)
    this.onCardClick = this.onCardClick.bind(this)
    this.onCardMouseOver = this.onCardMouseOver.bind(this)
    this.startNewGame = this.startNewGame.bind(this)
    this.onConfirm = this.onConfirm.bind(this)
    this.onSelectCardClick = this.onSelectCardClick.bind(this)

    var player0 = new Player(0)
    var player1 = new Player(1)
    var deck = new Deck();
    deck.shuffle()

    deck.getHand(player0.hand)
    deck.getHand(player1.hand)

    var gameState = {
      turnState: "pre",
      selectState: "none"
    }

    this.state = {
      deck: deck,
      players: [player0, player1],
      selectedCards: [],
      potentialCard: null,
      turn: 0,
      gameState: gameState,
      activeCard: null
    }

  }


 startNewGame() {

   var player0 = new Player(0)
   var player1 = new Player(1)
   var deck = new Deck();
   deck.shuffle()
   deck.getHand(player0.hand)
   deck.getHand(player1.hand)

   var gameState = {
     turnState: "pre",
     selectState: "none"
   }

   this.setState({
     deck: deck,
     players: [player0, player1],
     selectedCards: [],
     potentialCard: null,
     turn: 0,
     gameState: gameState,
     activeCard: null
   })
 }

  onSelectCardClick(card = undefined) {
    console.log('onSelectCardClick');
    var {activeCard, gameState, players, turn} = this.state

    gameState.selectState = "none"
    gameState.selectableCards = []

    if(card !== undefined) {
      activeCard.manageSelectionConfirm(activeCard, card, players[turn], players[1-turn])
    }

    this.setState({
     activeCard: null,
     players: players,
     gameState: gameState
    })
  }

  onCardClick(card = undefined, location = "") {

    var {players, turn, gameState, selectedCards} = this.state

    var player = players[turn]
    var hand = player.hand
    var opponent = players[1-turn]

    console.log("card clicked " + card.name);
    console.log("selectState: " + gameState.selectState);
    console.log("location: " + location.player);

    if(location.player === "hand" && gameState.selectState === "none") {
      if(player.keep > 0) {
        player.keep --
        card.onPlayFunction(card, gameState, player, opponent)
        hand.splice(location.index,1)

        this.setState({
          players:players,
          gameState: gameState
        })
      } else if(player.keep === 0 && player.discard > 0) {
        // on discard skills
        player.discard --;
        hand.splice(location.index,1)
        card.onCardDiscard(card, player, opponent)





        this.setState({
          players:players
        })
      }

    } else {

      if(gameState.selectState === location.player) {
        if(this.state.activeCard.taCost(selectedCards.length + 1) <= player.ta) {
          card.location = location
          selectedCards.push(card)
          this.setState({
            selectedCards: selectedCards,
            potentialCard: null
          })
        }
      } else if(location.player === "selection") {
        selectedCards.splice(location.index,1)
        this.setState({
          selectedCards: selectedCards,
        })
      }
    }
  }

  onConfirm() {
    console.log("onConfirm");
    var {activeCard, selectedCards, players, turn, gameState} = this.state

    activeCard.manageSelectionConfirm(activeCard, selectedCards, players[turn], players[1-turn])
    gameState.selectState = "none"

    this.setState({
      activeCard: null,
      selectedCards: [],
      players: players,
      gameState: gameState
    })
  }

 onCardMouseOver(card, location) {
   var {gameState} = this.state
   var player = this.state.players[this.state.turn]

   console.log(location.player);
   console.log("selectState: " + gameState.selectState);
   if(gameState.selectState === "none") {
     this.setState({
       activeCard: card
     })
   } else if(gameState.selectState === location.player && this.state.activeCard.taCost(this.state.selectedCards.length + 1) <= player.ta) {
     this.setState({
       potentialCard: card
     })
   }
 }

  onStartTurn() {
    var {gameState} = this.state
    gameState.selectState = "none"
    gameState.turnState = "main"
    this.setState({
      gameState: gameState
    })
  }

  endTurn () {

    var {hands, players, turn, deck, gameState} = this.state

    var player0 = players[0]
    var player1 = players[1]

    // deal cards and continue
    if(this.state.deck.deck.length > 2) {
      deck.getHand(player0.hand)
      deck.getHand(player1.hand)
      players[turn].keep = 2;
      players[turn].discard = 1;

      if(turn === 1) {
        // swap hands when both players have played. Intended to be simulataneous
        var hand = player0.hand
        player0.hand = player1.hand
        player1.hand = hand
      }

      gameState.turnState = "pre"
      this.setState({
        players: players,
        turn: 1 - turn,
        gameState: gameState
      })
    // otherwise end game now
    } else {
      console.log("time to score.");

      // score players
      for(var i=0; i<players.length; i++) {
        var player = players[i]
        var value = ScoreCards(player.owned)
        player.gold += value
        player.addHistory('End', player.owned, value)
      }

      gameState.turnState = "scoring"

      this.setState({
        players: players,
        gameState: gameState
      })
    }
  }

  render() {
    console.log("Render");


    var {selectedCards, potentialCard, gameState} = this.state

    var player = this.state.players[this.state.turn]
    var oponent = this.state.players[1 - this.state.turn]
    var hand = player.hand

    if(gameState.turnState === "pre") {
      return <StartTurnUI player={player} startTurn={this.onStartTurn}/>
    } else if(gameState.turnState === "scoring") {
      return <EndGameUI players={this.state.players} startNewGame={this.startNewGame}/>
    }

    var cardInteractionUI = null
    if(gameState.selectState === "opponent" || gameState.selectState === "player"){
      cardInteractionUI = <CardInteractionUI keyCard={this.state.activeCard} selectedCards={selectedCards} potentialCard={potentialCard} selectState={gameState.selectState} onCardMouseOver={this.onCardMouseOver} onCardClick={this.onCardClick} onConfirm={this.onConfirm}/>
    }

    var endTurnButton = null
    if(player.keep === 0 && player.discard === 0) {
      endTurnButton = <button className="btn btn-primary btn-lg" style={{margin: '10px'}} onClick={() => this.endTurn()}>End Turn</button>
    }

    var selectCard = null
    if(gameState.selectState === "selectable") {
      selectCard = <SelectCard cards={gameState.selectableCards} onCardMouseOver={this.onCardMouseOver} onCardClick={this.onSelectCardClick}/>
    }

    return <div>
        <div className="row">
          <div className="col-6">
            <OpponentUI  onCardMouseOver={this.onCardMouseOver} onCardClick={this.onCardClick} player={oponent}/></div>
            <div className="col-2">{this.state.activeCard !== null ? <CardUI card={this.state.activeCard}/>: <CardUI card={{name: "none"}}/>}
            </div>
            {cardInteractionUI}
        </div>
        <HandUI hand={hand} onCardMouseOver={this.onCardMouseOver} onCardClick={this.onCardClick} keep={player.keep} discard={player.discard}/>
        <PlayerUI player={player} onCardMouseOver={this.onCardMouseOver} onCardClick={this.onCardClick} keep={player.keep} discard={player.discard}/>
        {endTurnButton}
        {selectCard}
      </div>
  }
}

export default GameControllerUI;
