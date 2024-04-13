import { useState } from "react";
import PlayerInfo from "./Components/PlayerInfo";
import Board from "./Components/Board";
import Dice from "./Components/Dice";

function App() {
  return (
    <>
      <div className="grid grid-cols-3 p-2">
        <div className="border border-red-500 p-2">
          <PlayerInfo />
        </div>
        <div className="border border-red-500 p-2">
          <Board />
        </div>
        <div className="border border-red-500 p-2"> 
        <Dice/>
        </div>
      </div>
    </>
  );
}

export default App;
