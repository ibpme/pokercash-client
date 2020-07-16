import React, { Component } from "react";

export class PlayerInput extends Component {
  render() {
    return (
      <div>
        <label>
          Name:
          <input
            required
            name={"player" + this.props.playerNumber}
            type="text"
            onChange={this.props.handleInputChange}
          />
        </label>
        <br />
        <label>
          Cash:
          <input
            required
            name={"cash" + this.props.playerNumber}
            type="number"
            min="0"
            onChange={this.props.handleInputChange}
          />
        </label>
      </div>
    );
  }
}

export default PlayerInput;
