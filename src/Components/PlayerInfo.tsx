import { useRecoilValue } from "recoil";
import { gameLogs, playerPositions } from "../states/BoardStates";
import { MdOutlinePersonPinCircle, MdPersonPinCircle } from "react-icons/md";

const PlayerInfo = () => {
  const playerPos = useRecoilValue(playerPositions);
  const gLogs = useRecoilValue(gameLogs);
  return (
    <div>
      <h3>Game Logs</h3>
      <div className="border border-gray-500 overflow-auto h-20">
        {gLogs?.map((log) => (
          <p className="p-1" key={log + +new Date()}>
            {log}
          </p>
        ))}
      </div>
      <h3>Player Positions</h3>
      <p className="flex items-center">
        Player 1 <MdPersonPinCircle size={50} /> :- {playerPos.player1}
      </p>
      <p className="flex items-center">
        Player 2 <MdOutlinePersonPinCircle size={50} /> :- {playerPos.player2}
      </p>
    </div>
  );
};

export default PlayerInfo;
