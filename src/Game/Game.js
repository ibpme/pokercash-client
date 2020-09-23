import React, { Component } from "react";
import Player from "../Player/Player";
import GameLogic from "../utils/gameAPI";

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
    };
    this.updateGame = this.updateGame.bind(this);
  }

  componentDidMount() {
    this.setState({
      playersData: this.props.playersData,
      numOfActivePlayers: this.props.numofTotalPlayers,
      numofTotalPlayers: this.props.numofTotalPlayers,
    });
  }

  updateGame(index, action, amount = 0) {
    const updatedGame = GameLogic(this.state, index, action, amount);
    this.setState(updatedGame);
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
          updateGame={this.updateGame}
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
