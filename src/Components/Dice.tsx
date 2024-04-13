import React from "react";
import { useRecoilState } from "recoil";
import { diceValue } from "../states/DiceStates";
import { diceRoll, DiceValToIconMap } from "../Utils";
import { MdRestartAlt } from "react-icons/md";
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
      ...(isPlayerFree && !gState[`player${currPlayer}`].move
        ? [`Player ${currPlayer} is Free to Move!`]
        : []),
      `Player ${newPlayer}'s Turn.`,
    ]);
    setCurrPlayer(newPlayer);
    setPlayerPos({
      player1:
        currPlayer === 1 && isPlayerFree && !gState["player1"].move
          ? 1
          : gState["player1"].move && currPlayer === 1
          ? playerPos.player1 + newVal
          : playerPos.player1,
      player2:
        currPlayer === 2 && isPlayerFree && !gState["player2"].move
          ? 1
          : gState["player2"].move && currPlayer === 2
          ? playerPos.player2 + newVal
          : playerPos.player2,
    });
    if (isPlayerFree) {
      setGState({ ...gState, [`player${currPlayer}`]: { move: true } });
      if (
        playerPos.player1 + newVal >= 100 ||
        playerPos.player2 + newVal >= 100
      ) {
        setGState({ ...gState, global: "over" });
        setGameLog([...gameLog, `Player ${currPlayer} WON!`, "GAME OVER"]);
        setPlayerPos({ ...playerPos, [`player${currPlayer}`]: 100 });
        setDiceVal(0);
      }
    } else {
      if (
        playerPos.player1 + newVal >= 100 ||
        playerPos.player2 + newVal >= 100
      ) {
        setGState({ ...gState, global: "over" });
        setGameLog([...gameLog, `Player ${currPlayer} WON!`, "GAME OVER"]);
        setPlayerPos({ ...playerPos, [`player${currPlayer}`]: 100 });
        setDiceVal(0);
      } else {
        setGState({ ...gState, global: "started" });
      }
    }
  };

  return (
    <div>
      <div className="flex justify-center content-center items-center">
        <button
          className="border-none"
          onClick={rollDice}
          disabled={gState.global === "over"}
        >
          {DiceValToIconMap[diceVal]}
        </button>
      </div>
      <div className="grid">
        <i className="justify-self-center">Click to Roll Dice</i>
        {gState.global === "over" && (
          <button
            className="flex items-center gap-2 rounded-md border border-dashed border-red-400 justify-self-center my-4 p-4 bg-red-300 text-white"
            onClick={() => window.location.reload()}
          >
            <MdRestartAlt size={30} />
            Restart
          </button>
        )}
      </div>
    </div>
  );
};

export default Dice;
