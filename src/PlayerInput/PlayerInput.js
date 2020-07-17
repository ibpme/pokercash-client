import React, { Component } from "react";

export class PlayerInput extends Component {
  render() {
    return (
      <div>
        <p className="mx-3 text-base pt-5 ">
          {`Player Number ${Number(this.props.playerNumber + 1)}:`}
        </p>
        <label className="block text-black text-sm font-bold m-2">Name:</label>
        <input
          className="bg-gray-700 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-black leading-tight focus:outline-none focus:bg-blue-500 focus:border-black-500"
          required
          name={"player" + this.props.playerNumber}
          type="text"
          onChange={this.props.handleInputChange}
        />
        <br />
        <label className="block text-black text-sm font-bold m-2">Cash:</label>
        <input
          className="bg-gray-700 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-black leading-tight focus:outline-none focus:bg-blue-500 focus:border-black-500"
          required
          name={"cash" + this.props.playerNumber}
          type="number"
          min="0"
          onChange={this.props.handleInputChange}
        />
      </div>
    );
  }
}

export default PlayerInput;
