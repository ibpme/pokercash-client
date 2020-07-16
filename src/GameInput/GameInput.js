import React, { Component } from "react";
import PlayerInput from "../PlayerInput/PlayerInput";

export class GameInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numberOfTotalPlayers: 2,
    };
    this.renderPlayerInput = this.renderPlayerInput.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: value,
    });
  }

  handleSubmit(event) {
    let playersArray = [];
    for (let i = 0; i < this.state.numberOfTotalPlayers; i++) {
      const name = this.state[String("player" + i)];
      const cash = this.state[String("cash" + i)];
      const playerObject = {
        number: i,
        name: name,
        cash: cash,
        fold: false,
        requiredCall: 0,
      };
      playersArray.push(playerObject);
    }
    this.props.submitPlayers(playersArray);
  }

  renderPlayerInput() {
    const numberOfTotalPlayers = Number(this.state.numberOfTotalPlayers);
    return Array(numberOfTotalPlayers)
      .fill()
      .map((player, index) => {
        return (
          <PlayerInput
            handleInputChange={this.handleInputChange}
            key={index}
            playerNumber={index}
          />
        );
      });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Number of players:
          <input
            min="2"
            max="9"
            name="numberOfTotalPlayers"
            type="number"
            value={this.state.numberOfTotalPlayers}
            onChange={this.handleInputChange}
          />
        </label>
        {this.renderPlayerInput()}
        <button onSubmit={this.handleSubmit}>Submit</button>
      </form>
    );
  }
}

export default GameInput;
