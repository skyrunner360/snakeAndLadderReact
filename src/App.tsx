import { useRecoilValue } from "recoil";
import Board from "./Components/Board";
import Dice from "./Components/Dice";
import Home from "./Components/Home";
import PlayerInfo from "./Components/PlayerInfo";
import { gameState, playerPositions } from "./states/BoardStates";
import { MdOutlinePersonPinCircle, MdPersonPinCircle } from "react-icons/md";

function App() {
  const { global } = useRecoilValue(gameState);
  const playerPos = useRecoilValue(playerPositions);
  return (
    <>
      <div className="p-4">
        <h1 className="font-extrabold text-5xl text-center text-blue-500">
          Snakes and Ladders Game
        </h1>
        {global === "notStarted" ? (
          <Home />
        ) : (
          <div>
            <div className="grid grid-cols-3 p-2 ">
              <div className="p-2 border-r-4 ">
                <PlayerInfo />
              </div>
              <div className="p-2">
                <Board />
              </div>
              <div className="p-2 grid items-center border-l-4">
                <Dice />
              </div>
            </div>
            <div className="p-2 flex justify-center gap-2 mt-28">
              {playerPos.player1 === 0 && (
                <div className="p-1 truncate text-nowrap">
                  <MdPersonPinCircle size={50} />
                  Player 1
                </div>
              )}
              {playerPos.player2 === 0 && (
                <div className="p-1 truncate text-nowrap">
                  <MdOutlinePersonPinCircle size={50} />
                  Player 2
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
