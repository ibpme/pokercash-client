import React, { Component } from "react";
import Player from "../Player/Player";

//TODO: Get all the game neccasary game logic to this component
//      Make component didmount to call the initial props for the player data
export class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pot: 0,
      numOfActivePlayers: 0,
      numofTotalPlayers: 0,
      status: true,
      maxRaise: 0,
      playersData: [], //Players data is the one we will manipulate
    };
    this.addToPot = this.addToPot.bind(this);
    this.adjustMaxRaise = this.adjustMaxRaise.bind(this);
    this.renderPlayers = this.renderPlayers.bind(this);
  }

  componentDidMount() {
    this.setState({
      playersData: this.props.playersData,
      numOfActivePlayers: this.props.numofTotalPlayers,
      numofTotalPlayers: this.props.numofTotalPlayers,
    });
  }

  addToPot(amount) {
    this.setState((prevState) => {
      return { pot: prevState.pot + amount };
    });
  }

  adjustMaxRaise(amount) {
    this.setState({ maxRaise: amount });
  }

  renderPlayers() {
    return this.state.playersData.map((playerData, index) => {
      return (
        <Player
          key={index}
          number={index}
          playerData={playerData}
          addToPot={this.addToPot}
          maxRaise={this.state.maxRaise}
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
        {this.renderPlayers()}
      </div>
    );
  }
}

export default Game;
