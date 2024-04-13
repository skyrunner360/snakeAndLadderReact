import React from "react";
import { useRecoilState } from "recoil";
import { diceValue } from "../states/DiceStates";
import { diceRoll, DiceValToIconMap } from "../Utils";
import {
  currentPlayer,
  gameLogs,
  gameState,
  playerPositions,
} from "../states/BoardStates";

const Dice = () => {
  const [diceVal, setDiceVal] = useRecoilState(diceValue);
  const [gameLog, setGameLog] = useRecoilState(gameLogs);
  const [currPlayer, setCurrPlayer] = useRecoilState(currentPlayer);
  const [playerPos, setPlayerPos] = useRecoilState(playerPositions);
  const [gState, setGState] = useRecoilState(gameState);

  const rollDice = () => {
    const newVal = diceRoll();
    const newPlayer = currPlayer === 1 ? 2 : 1;
    const isPlayerFree = newVal === 6;
    setDiceVal(newVal);
    setGameLog([
      ...gameLog,
      `Player ${currPlayer} Rolled Dice to ${newVal}.`,
      ...(isPlayerFree ? [`Player ${currPlayer} is Free to Move!`] : []),
      `Player ${newPlayer}'s Turn.`,
    ]);
    setCurrPlayer(newPlayer);
    setPlayerPos({
      player1:
        currPlayer === 1 && isPlayerFree && !gState["player1"].move
          ? newVal
          : gState["player1"].move && currPlayer === 1
          ? playerPos.player1 + newVal
          : playerPos.player1,
      player2:
        currPlayer === 2 && isPlayerFree && !gState["player2"].move
          ? newVal
          : gState["player2"].move && currPlayer === 2
          ? playerPos.player2 + newVal
          : playerPos.player2,
    });
    if (isPlayerFree) {
      setGState({ ...gState, [`player${currPlayer}`]: { move: true } });
    } else {
      setGState({ ...gState, global: "started" });
    }
    console.log("Game states", gState);
  };

  return (
    <div>
      <div className="flex justify-center content-center items-center">
        <div className="cursor-pointer" onClick={rollDice}>
          {DiceValToIconMap[diceVal]}
        </div>
      </div>
      <div className="grid">
        <i className="justify-self-center">Click to Roll Dice</i>
      </div>
    </div>
  );
};

export default Dice;
