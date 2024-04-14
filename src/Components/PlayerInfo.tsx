import { useRecoilValue } from "recoil";
import { gameLogs, playerPositions } from "../states/BoardStates";
import { MdOutlinePersonPinCircle, MdPersonPinCircle } from "react-icons/md";
import { useEffect } from "react";

const PlayerInfo = () => {
  const playerPos = useRecoilValue(playerPositions);
  const gLogs = useRecoilValue(gameLogs);
  useEffect(() => {
    const scrollDiv = document.getElementById("logContainer");
    scrollDiv.scrollTop = scrollDiv?.scrollHeight;
  }, [gLogs]);

  return (
    <div>
      <div>
        <h3 className="font-bold text-2xl text-blue-500">
          Current Player Positions
        </h3>
        <p className="flex items-center font-medium text-lg">
          Player 1 <MdPersonPinCircle size={50} /> :- {playerPos.player1}
        </p>
        <p className="flex items-center font-medium text-lg">
          Player 2 <MdOutlinePersonPinCircle size={50} /> :- {playerPos.player2}
        </p>
      </div>
      <div>
        <h3 className="font-bold text-2xl text-green-400">Game Logs</h3>
        <div
          className="border border-blue-500 overflow-auto h-60 rounded-lg my-2 shadow-lg"
          id="logContainer"
        >
          {gLogs?.map((log) => (
            <p
              className="p-3 border border-gray-200 rounded-md shadow-md text-lg"
              key={log + +new Date()}
            >
              {log}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PlayerInfo;
