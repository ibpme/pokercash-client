import React, { Component } from "react";
import Player from "../Player/Player";

//TODO: Get all the game neccasary game logic to this component
//      Make component didmount to call the initial props for the player data
// Make Turns
export class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pot: 0,
      numOfActivePlayers: 0,
      numofTotalPlayers: 0,
      status: true,
      maxRaise: 0,
      playersData: [],
      // Players data is the one we will manipulate containing array of objects
      // {
      //   number: index,
      //   name: nameVAlue,
      //   cash: cashValue,
      //   fold: false,
      //   requiredCall: 0,
      // }
    };
    this.addToPot = this.addToPot.bind(this);
    this.adjustMaxRaise = this.adjustMaxRaise.bind(this);
    // this.renderPlayers = this.renderPlayers.bind(this);
    this.playerCheckOrCall = this.playerCheckOrCall.bind(this);
    this.playerRaise = this.playerRaise.bind(this);
    this.playerFold = this.playerFold.bind(this);
  }

  componentDidMount() {
    //TODO: Research getDerivedStateFromProps
    this.setState({
      playersData: this.props.playersData,
      numOfActivePlayers: this.props.numofTotalPlayers,
      numofTotalPlayers: this.props.numofTotalPlayers,
    });
  }

  //Game Actions Methods

  addToPot(amount) {
    this.setState((prevState) => {
      return { pot: prevState.pot + amount };
    });
  }

  adjustMaxRaise(amount) {
    this.setState({ maxRaise: amount });
  }

  adjustRequiredCalls() {
    const immutateplayersData = this.state.playersData.slice();
    if (immutateplayersData.every((player) => player.requiredCall === 0)) {
      this.setState({ maxRaise: 0 });
    }
  }

  //Player Actions Methods
  playerCheckOrCall(index) {
    const immutateplayersData = this.state.playersData.slice();
    const playerData = immutateplayersData[index];
    playerData.cash -= playerData.requiredCall;
    this.addToPot(playerData.requiredCall);
    playerData.requiredCall = 0;
    this.setState({ playersData: immutateplayersData });
    this.adjustRequiredCalls();
  }

  playerRaise(index, amount) {
    const immutateplayersData = this.state.playersData.slice();
    const playerData = immutateplayersData[index];
    //Set Condition here raise must be greated than raise max and
    playerData.cash -= amount;
    this.addToPot(amount);
    playerData.requiredCall = 0;
    immutateplayersData.forEach((player) => {
      if (player.number !== playerData.number) {
        player.requiredCall += amount - this.state.maxRaise;
      }
    });
    this.setState({ playersData: immutateplayersData });
    this.adjustMaxRaise(amount);
    this.adjustRequiredCalls();
  }
  playerFold(index) {}

  renderPlayers() {
    return this.state.playersData.map((playerData, index) => {
      return (
        <Player
          key={index}
          index={index}
          playerData={playerData}
          addToPot={this.addToPot}
          maxRaise={this.state.maxRaise}
          playerCheckOrCall={this.playerCheckOrCall}
          playerRaise={this.playerRaise}
          playerFold={this.playerFold}
        />
      );
    });
  }

  render() {
    if (this.state.playersData.length === 0) {
      return <div>Loading...</div>;
    }
    return (
      <div>
        <p>Number of Total players: {this.state.numofTotalPlayers}</p>
        <p>Number of Active players: {this.state.numOfActivePlayers}</p>
        <p>Pot: {this.state.pot}</p>
        <p>Max Raise: {this.state.maxRaise}</p>
        {this.renderPlayers()}
      </div>
    );
  }
}

export default Game;
