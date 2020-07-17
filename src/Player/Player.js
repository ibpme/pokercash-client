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
      <div>
        <h3>Player Name : {this.props.playerData.name}</h3>
        <p>Player Cash : {this.props.playerData.cash}</p>
        <p>Required Call: {this.props.playerData.requiredCall}</p>
        <div>
          <button onClick={this.callOrCheck}>
            {this.props.playerData.requiredCall === 0 ? "Check" : "Call"}
          </button>
          <input
            onChange={this.handleRaiseChange}
            min={this.props.maxRaise}
            max={this.props.playerData.cash}
            value={this.state.raiseAmount}
            name="raiseAmount"
            type="number"
          />
          <button onClick={this.raise}>Raise</button>
          <button onClick={this.fold}>Fold</button>
        </div>
      </div>
    );
  }
}

export default Player;
