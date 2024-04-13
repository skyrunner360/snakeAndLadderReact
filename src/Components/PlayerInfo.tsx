import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { gameLogs, playerPositions } from "../states/BoardStates";

const PlayerInfo = () => {
  const [playerPos, setPlayerPos] = useRecoilState(playerPositions);
  const gLogs = useRecoilValue(gameLogs);
  return (
    <div>
      <h3>Game Logs</h3>
      <div className="border border-gray-500 overflow-auto h-20">
        {gLogs?.map((log) => (
          <p className="p-1">{log}</p>
        ))}
      </div>
      <h3>Player Positions</h3>
      <p>Player 1 :- {playerPos.player1}</p>
      <p>Player 2 :- {playerPos.player2}</p>
    </div>
  );
};

export default PlayerInfo;
