import "./App.css";
import React, { Component } from "react";
import Game from "./Game/Game";
import GameInput from "./GameInput/GameInput";

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gameReady: false,
      playersData: [],
    };
    this.submitPlayers = this.submitPlayers.bind(this);
  }
  submitPlayers(playersArray) {
    const playersData = playersArray;
    this.setState({ playersData: playersData });
    this.setState({ gameReady: true });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          {!this.state.gameReady ? (
            <GameInput submitPlayers={this.submitPlayers} />
          ) : (
            <Game
              numofTotalPlayers={this.state.playersData.length}
              playersData={this.state.playersData}
            />
          )}
        </header>
      </div>
    );
  }
}

export default App;
