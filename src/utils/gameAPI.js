import { cloneDeep } from "lodash";

export default function GameLogic(OrginalGameState, index, action, amount = 0) {
  // GameState => {
  //       gameId:null
  //       pot: 0,
  //       numOfActivePlayers: 0,
  //       numofTotalPlayers: 0,
  //       status: true,
  //       maxRaise: 0,
  //       playersData: [{
  //         number: index,
  //         name: nameValue,
  //         cash: cashValue,
  //         fold: false,
  //         requiredCall: 0,
  //         turn : false
  //       },{},{}],
  //
  //     };
  //      DO WE NEED DEEP COPY OF GAMESTATE
  //      Automatic Turn Detection

  const GameState = cloneDeep(OrginalGameState);
  const checkTurn = (GameState) => {
    return Number(GameState.playersData.findIndex((player) => player.turn));
  };

  //Turns Logic
  const nextTurn = () => {
    let nextPlayerIndex = GameState.playersData.findIndex(
      (player) => player.turn
    );
    do {
      nextPlayerIndex =
        Number(nextPlayerIndex + 1) % GameState.numofTotalPlayers;
    } while (GameState.playersData[nextPlayerIndex].fold);
    setTurn(nextPlayerIndex);
  };

  const setTurn = (playerIndex) => {
    GameState.playersData.forEach((player) => {
      player.turn = Boolean(player.number === playerIndex);
    });
  };

  // Pot and Player Adjustments
  const addToPot = (amount) => {
    GameState.pot += amount;
  };
  const adjustMaxRaise = (amount) => {
    GameState.maxRaise = amount;
  };

  const adjustRequiredCalls = () => {
    if (GameState.playersData.every((player) => player.requiredCall === 0)) {
      GameState.maxRaise = 0;
    }
    checkWinner();
  };

  //Game Checking
  const checkWinner = () => {
    let numOfActive = 0;
    GameState.playersData.forEach((player) => {
      numOfActive = player.fold ? numOfActive : numOfActive + 1;
    });
    GameState.numOfActivePlayers = numOfActive;
    if (numOfActive === 1) {
      isWinner();
    } else {
      nextTurn();
    }
  };

  const isWinner = () => {
    const winner = GameState.playersData.find((player) => !player.fold);
    winner.cash += GameState.pot;
    GameState.maxRaise = 0;
    newRound();
  };

  const newRound = () => {
    GameState.numOfActivePlayers = GameState.numofTotalPlayers;
    GameState.playersData.forEach((player) => {
      player.fold = false;
    });
    GameState.pot = 0;
    setTurn(0);
  };

  //Player Actions

  const playerCheckOrCall = (index) => {
    GameState.playersData[index].cash -=
      GameState.playersData[index].requiredCall;
    addToPot(GameState.playersData[index].requiredCall);
    GameState.playersData[index].requiredCall = 0;
    adjustRequiredCalls();
  };

  const playerRaise = (index, amount) => {
    GameState.playersData[index].cash -= amount;
    addToPot(amount);
    GameState.playersData[index].requiredCall = 0;
    GameState.playersData.forEach((player) => {
      if (
        player.number !== GameState.playersData[index].number &&
        !player.fold
      ) {
        player.requiredCall += amount - GameState.maxRaise;
      }
    });
    adjustMaxRaise(amount);
    adjustRequiredCalls();
  };

  const playerFold = (index) => {
    GameState.playersData[index].fold = true;
    GameState.playersData[index].requiredCall = 0;
    adjustRequiredCalls();
  };

  switch (action) {
    case "fold":
      playerFold(index);
      return GameState;
    case "checkOrCall":
      playerCheckOrCall(index);
      return GameState;
    case "raise":
      playerRaise(index, amount);
      return GameState;
    default:
      return GameState;
  }
}
