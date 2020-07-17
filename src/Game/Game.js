import React, { Component } from "react";
import Player from "../Player/Player";

// Make Turn Design and Prevention Code
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
  //We might want to make adjustRequiredCalls and checkWinner the same function
  adjustRequiredCalls() {
    const immutateplayersData = this.state.playersData.slice();
    if (immutateplayersData.every((player) => player.requiredCall === 0)) {
      this.setState({ maxRaise: 0 });
    }
    this.checkWinner();
  }

  checkWinner() {
    const immutateplayersData = this.state.playersData.slice();
    let numOfActive = 0;
    immutateplayersData.forEach((player) => {
      numOfActive = player.fold ? numOfActive : numOfActive + 1;
    });
    numOfActive === 1
      ? this.isWinner()
      : this.setState({ numOfActivePlayers: numOfActive });
  }

  isWinner() {
    const immuteState = Object.assign({}, this.state);
    const winner = immuteState.playersData.find((player) => !player.fold);
    winner.cash += immuteState.pot;

    immuteState.maxRaise = 0;
    this.setState({ immuteState });
    this.newRound();
  }

  newRound() {
    const immuteState = Object.assign({}, this.state);
    immuteState.playersData.forEach((player) => {
      player.fold = false;
    });
    this.setState({ playersData: immuteState.playersData, pot: 0 });
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

  playerFold(index) {
    const immutateplayersData = this.state.playersData.slice();
    const playerData = immutateplayersData[index];
    playerData.fold = true;
    playerData.requiredCall = 0;
    this.setState({ playersData: immutateplayersData });
    this.adjustRequiredCalls();
  }

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
        <div className="max-w-m bg-blue-400 rounded overflow-hidden shadow-lg m-4">
          <p className="inline px-2 font-bold ">
            Total players: {this.state.numofTotalPlayers}
          </p>
          <p className="inline px-2 font-bold">
            Active players: {this.state.numOfActivePlayers}
          </p>
          <p className="font-bold text-black">Pot: {this.state.pot}</p>
          <p className="font-bold text-red-700">
            Max Raise: {this.state.maxRaise}
          </p>
        </div>
        {this.renderPlayers()}
      </div>
    );
  }
}

export default Game;
