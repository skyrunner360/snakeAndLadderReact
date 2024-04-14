import { MdRestartAlt } from "react-icons/md";
import { useRecoilState } from "recoil";
import {
  currentPlayer,
  gameLogs,
  gameState,
  playerPositions,
} from "../states/BoardStates";
import { diceValue } from "../states/DiceStates";
import { diceRoll, DiceValToIconMap, laddersArr, snakesArr } from "../Utils";

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
    const currPlayerPos = playerPos[`player${currPlayer}`] + newVal;
    const snakeBite = snakesArr.find((ar) => ar[0] === currPlayerPos);
    const ladderRidden = laddersArr.find((arr) => arr[0] === currPlayerPos);
    console.log("Snake and Ladder", { snakeBite, currPlayerPos });
    setDiceVal(newVal);
    setGameLog([
      ...gameLog,
      `Player ${currPlayer} Rolled Dice to ${newVal}.`,
      ...(isPlayerFree && !gState[`player${currPlayer}`].move
        ? [`Player ${currPlayer} is Free to Move!`]
        : []),
      ...(snakeBite ? [`Player ${currPlayer} was BITTEN by Snake!`] : []),
      ...(ladderRidden ? [`Player ${currPlayer} RIDES Ladder!`] : []),
      ...(snakeBite
        ? [`Player ${currPlayer} Moves to ${snakeBite[1]}.`]
        : ladderRidden
        ? [`Player ${currPlayer} Moves to ${ladderRidden[1]}.`]
        : []),
      ...(gState[`player${currPlayer}`].move
        ? [`Player ${currPlayer} moves to Position ${currPlayerPos}.`]
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
