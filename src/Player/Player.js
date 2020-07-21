import React, { Component } from "react";

//TODO:Move the necessary data to the Parent Game Component
//Work with playerData in Player Component and playersData in Game Component
//Add Fold Design and Prevention Code

export class Player extends Component {
  constructor(props) {
    super(props);
    this.callOrCheck = this.callOrCheck.bind(this);
    this.raise = this.raise.bind(this);
    this.fold = this.fold.bind(this);
    this.handleRaiseChange = this.handleRaiseChange.bind(this);
    this.state = {
      raiseAmount: 0,
    };
  }
  callOrCheck() {
    if (this.props.playerData.requiredCall === 0) {
      console.log("Check");
      this.props.playerCheckOrCall(this.props.index);
    } else {
      console.log("Call");
      this.props.playerCheckOrCall(this.props.index);
    }
  }
  raise() {
    const immuteState = Object.assign({}, this.state);
    const amount = Number(immuteState.raiseAmount);
    this.props.playerRaise(this.props.index, amount);
  }
  fold() {
    console.log("fold");
    this.props.playerFold(this.props.index);
  }

  handleRaiseChange(event) {
    const value = event.target.value;
    this.setState({
      raiseAmount: value,
    });
  }

  render() {
    return (
      <div
        style={
          !this.props.playerData.turn || this.props.playerData.fold
            ? { opacity: 0.5 }
            : {}
        }
      >
        <div className="max-w-m bg-teal-600 rounded overflow-hidden shadow-lg m-4">
          <span className="inline-block px-3 py-1 text-base font-semibold text-gray-100 mr-2">
            Name : {this.props.playerData.name}
          </span>
          <span className="inline-block px-3 py-1 text-base font-semibold text-gray-100 mr-2">
            Cash : {this.props.playerData.cash}
          </span>
          <span className="inline-block px-3 py-1 text-base font-semibold text-yellow-400 mr-2">
            Required Call: {this.props.playerData.requiredCall}
          </span>
        </div>
        <div className="inline-flex">
          <button
            disabled={!this.props.playerData.turn || this.props.playerData.fold}
            className="bg-green-400 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 mx-2 rounded shadow"
            onClick={this.callOrCheck}
          >
            {this.props.playerData.requiredCall === 0 ? "Check" : "Call"}
          </button>
          <input
            className="text-blue-800 px-2 mx-2 rounded shadow"
            onChange={this.handleRaiseChange}
            min={this.props.maxRaise}
            max={this.props.playerData.cash}
            value={this.state.raiseAmount}
            name="raiseAmount"
            type="number"
          />
          <button
            disabled={!this.props.playerData.turn || this.props.playerData.fold}
            className="bg-orange-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 mx-2 rounded shadow"
            onClick={this.raise}
          >
            Raise
          </button>
          <button
            disabled={!this.props.playerData.turn || this.props.playerData.fold}
            className="bg-red-500 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 mx-2 rounded shadow"
            onClick={this.fold}
          >
            Fold
          </button>
        </div>
      </div>
    );
  }
}

export default Player;
