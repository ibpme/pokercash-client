# PokerCash

PokerCash is an open source remote tool intended as a replacement for Poker Chips in playing Texas Holdem Poker Games.
PokerCash is created using ReactJS with create-react-app.

## Current Version : 0.2

The current version is now available [here](https://ibpme.github.io/pokercash-client/)

### Beta

- v0.1 - playable with no styles in the web, few bugs are expected.
- v0.2 - GAME API connected see src UTILS for details

### GameAPI

Under the utils file the logic and game API can be found [here](https://github.com/ibpme/pokercash-client/blob/master/src/utils/gameAPI.js)

Because Pokercash uses React, the API takes in a **GameState** , which contains the Player Data State. Any changes to the **PlayerData** state will call the GameAPI.

Data Structure for GameState and PlayerData :

![alt text](https://github.com/ibpme/pokercash-client/blob/master/PokerGame-Data%20Structure.png)

GameAPI and Logic :

![alt text](https://github.com/ibpme/pokercash-client/blob/master/PokerGame-Player%20Methods.png)


## Coming soon:

- An online multiplayer version of PokerCash is in development
- Better Styling and UI
