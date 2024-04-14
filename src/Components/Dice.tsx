import { MdRestartAlt } from "react-icons/md";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  currentPlayer,
  gameLogs,
  gameState,
  playerPositions,
} from "../states/BoardStates";
import { diceType, diceValue } from "../states/DiceStates";
import {
  crookedDiceRoll,
  diceRoll,
  DiceValToIconMap,
  laddersArr,
  snakesArr,
} from "../Utils";
import { useState } from "react";

const Dice = () => {
  const [diceVal, setDiceVal] = useRecoilState(diceValue);
  const [gameLog, setGameLog] = useRecoilState(gameLogs);
  const [currPlayer, setCurrPlayer] = useRecoilState(currentPlayer);
  const [playerPos, setPlayerPos] = useRecoilState(playerPositions);
  const [gState, setGState] = useRecoilState(gameState);
  const [diceRolling, setDiceRolling] = useState(false);
  const typeOfDice = useRecoilValue(diceType);

  const rollDice = () => {
    const newVal = typeOfDice === "normal" ? diceRoll() : crookedDiceRoll();
    const newPlayer = currPlayer === 1 ? 2 : 1;
    const isPlayerFree = newVal === 6;
    // @ts-expect-error for indexing
    const currPlayerPos = playerPos[`player${currPlayer}`] + newVal;
    const snakeBite = snakesArr.find((ar) => ar[0] === currPlayerPos);
    const ladderRidden = laddersArr.find((arr) => arr[0] === currPlayerPos);
    setDiceRolling(true);
    setTimeout(() => {
      setDiceVal(newVal);
      setGameLog([
        ...gameLog,
        `Player ${currPlayer} Rolled Dice to ${newVal}.`,
        // @ts-expect-error for indexing
        ...(isPlayerFree && !gState[`player${currPlayer}`].move
          ? [`Player ${currPlayer} is Free to Move!`]
          : []),
        // @ts-expect-error for indexing
        ...(gState[`player${currPlayer}`].move
          ? [`Player ${currPlayer} moves to Position ${currPlayerPos}.`]
          : []),
        ...(snakeBite ? [`Player ${currPlayer} was BITTEN by Snake!`] : []),
        ...(ladderRidden ? [`Player ${currPlayer} RIDES Ladder!`] : []),
        ...(snakeBite
          ? [`Player ${currPlayer} Moves to Position ${snakeBite[1]}.`]
          : ladderRidden
          ? [`Player ${currPlayer} Moves to Position ${ladderRidden[1]}.`]
          : []),
        `Player ${newPlayer}'s Turn.`,
      ]);
      setCurrPlayer(newPlayer);
      setPlayerPos({
        player1:
          currPlayer === 1 && isPlayerFree && !gState["player1"].move
            ? 1
            : gState["player1"].move && currPlayer === 1
            ? snakeBite
              ? snakeBite[1]
              : ladderRidden
              ? ladderRidden[1]
              : playerPos.player1 + newVal
            : playerPos.player1,
        player2:
          currPlayer === 2 && isPlayerFree && !gState["player2"].move
            ? 1
            : gState["player2"].move && currPlayer === 2
            ? snakeBite
              ? snakeBite[1]
              : ladderRidden
              ? ladderRidden[1]
              : playerPos.player2 + newVal
            : playerPos.player2,
      });
      if (isPlayerFree) {
        setGState({ ...gState, [`player${currPlayer}`]: { move: true } });
        if (currPlayerPos >= 100) {
          setGState({ ...gState, global: "over" });
          setGameLog([
            ...gameLog,
            `Player ${currPlayer} Rolled Dice to ${newVal}.`,
            `Player ${currPlayer} moves to Position 100.`,
            `Player ${currPlayer} WON!`,
            "GAME OVER",
          ]);
          setPlayerPos({ ...playerPos, [`player${currPlayer}`]: 100 });
          setDiceVal(0);
        }
      } else {
        if (currPlayerPos >= 100) {
          setGState({ ...gState, global: "over" });
          setGameLog([
            ...gameLog,
            `Player ${currPlayer} Rolled Dice to ${newVal}.`,
            `Player ${currPlayer} moves to Position 100.`,
            `Player ${currPlayer} WON!`,
            "GAME OVER",
          ]);
          setPlayerPos({ ...playerPos, [`player${currPlayer}`]: 100 });
          setDiceVal(0);
        }
      }
      setDiceRolling(false);
    }, 2000);
  };

  return (
    <div>
      <div className="flex justify-center content-center items-center">
        <button
          className={`border-none  ${diceRolling && "rolling"} ${
            typeOfDice === "crooked" && "text-[#c4de31]"
          }`}
          onClick={rollDice}
          disabled={gState.global === "over"}
        >
          {/* @ts-expect-error for indexing */}
          {DiceValToIconMap[diceVal]}
        </button>
      </div>
      <div className="grid">
        <i className="justify-self-center text-xl">Click to Roll Dice</i>
        {gState.global === "over" && (
          <button
            className="flex items-center gap-2 rounded-md border border-dashed border-red-400 justify-self-center my-4 p-4 bg-red-300 text-white"
            onClick={() => window.location.reload()}
          >
            <MdRestartAlt size={30} />
            Restart
          </button>
        )}
        <button
          className="flex items-center gap-2 rounded-xl border  justify-self-center my-4 p-4 bg-green-300 text-black"
          onClick={() => window.location.reload()}
        >
          <MdRestartAlt size={30} />
          Restart Game
        </button>
      </div>
    </div>
  );
};

export default Dice;
