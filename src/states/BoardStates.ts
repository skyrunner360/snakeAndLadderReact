import { atom } from "recoil";

export const playerPositions = atom({
  key: "playerPositions",
  default: {
    player1: 0,
    player2: 0,
  },
});

export const gameLogs = atom({
  key: "gameLogs",
  default: ["Player 1 Click Dice to Start Game"],
});

export const currentPlayer = atom({
  key: "currentPlayer",
  default: 1,
});

export const gameState = atom({
  key: "gameState",
  default: {
    global: "notStarted", // notStarted || started || over
    player1: {
      move: false,
    },
    player2: {
      move: false,
    },
  },
});
