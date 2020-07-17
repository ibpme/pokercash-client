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
        turn: true,
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
      <form
        className="bg-blue-800 shadow-md rounded  p-8 m-4"
        autoComplete="off"
        onSubmit={this.handleSubmit}
      >
        <label className="block text-white text-sm font-bold mb-2">
          Number of players:
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
          min="2"
          max="9"
          name="numberOfTotalPlayers"
          type="number"
          value={this.state.numberOfTotalPlayers}
          onChange={this.handleInputChange}
        />
        {this.renderPlayerInput()}
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold mt-5 py-1 px-4 rounded-full"
          variant="contained"
          color="primary"
          onSubmit={this.handleSubmit}
        >
          Submit
        </button>
      </form>
    );
  }
}

export default GameInput;
