import { useRecoilValue } from "recoil";
import Board from "./Components/Board";
import Dice from "./Components/Dice";
import Home from "./Components/Home";
import PlayerInfo from "./Components/PlayerInfo";
import { gameState } from "./states/BoardStates";

function App() {
  const { global } = useRecoilValue(gameState);
  return (
    <>
      <div className="p-4">
        <h1 className="font-extrabold text-5xl text-center text-blue-500">
          Snakes and Ladders Game
        </h1>
        {global === "notStarted" ? (
          <Home />
        ) : (
          <div className="grid grid-cols-3 p-2 ">
            <div className="border border-red-500 p-2">
              <PlayerInfo />
            </div>
            <div className="border border-red-500 p-2">
              <Board />
            </div>
            <div className="border border-red-500 p-2">
              <Dice />
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
