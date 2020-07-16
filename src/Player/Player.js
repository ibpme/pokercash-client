import React, { Component } from "react";

export class Player extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      cash: 0,
      fold: false,
      requiredCall: 0,
    };
    this.callOrCheck = this.callOrCheck.bind(this);
    this.raise = this.raise.bind(this);
    this.fold = this.fold.bind(this);
  }

  componentDidMount() {
    this.setState({
      name: this.props.playerData.name,
      cash: this.props.playerData.cash,
    });
  }
  coo;
  callOrCheck() {
    if (this.state.requiredCall === 0) {
      console.log("Check");
    } else {
      console.log("Call");
    }
  }
  raise() {
    console.log("raise");
    this.setState((prevState) => {
      return {
        cash: prevState.cash - 500,
      };
    });

    this.props.addToPot(500);
  }
  fold() {
    this.setState({ fold: true });
    //Fold Method
  }

  render() {
    return (
      <div>
        <h3>Player Name : {this.state.name}</h3>
        <p>Player Cash : {this.state.cash}</p>
        <div>
          <button onClick={this.callOrCheck}>
            {this.state.requiredCall === 0 ? "Check" : "Call"}
          </button>
          <button onClick={this.raise}>Raise</button>
          <button onClick={this.fold}>Fold</button>
        </div>
      </div>
    );
  }
}

export default Player;
