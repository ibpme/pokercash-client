import React, { Component } from "react";
import Player from "../Player/Player";
export class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pot: 0,
      numOfActivePlayers: this.props.numofTotalPlayers,
      numofTotalPlayers: this.props.numofTotalPlayers,
      status: true,
      maxRaise: 0,
      playersData: [],
    };
    this.addToPot = this.addToPot.bind(this);
    this.adjustMaxRaise = this.adjustMaxRaise.bind(this);
  }

  componentDidMount() {
    this.setState({ playersData: this.props.playersData });
  }

  addToPot(amount) {
    this.setState((prevState) => {
      return { pot: prevState.pot + amount };
    });
  }

  adjustMaxRaise(amount) {
    this.setState({ maxRaise: amount });
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
        {this.state.playersData.map((playerData, index) => {
          return (
            <Player
              key={index}
              playerData={playerData}
              addToPot={this.addToPot}
              maxRaise={this.maxRaise}
            />
          );
        })}
      </div>
    );
  }
}

export default Game;
