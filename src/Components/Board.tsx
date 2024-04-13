import { useMemo } from "react";
import { MdOutlinePersonPinCircle, MdPersonPinCircle } from "react-icons/md";
import { useRecoilValue } from "recoil";
import { playerPositions } from "../states/BoardStates";

const Board = () => {
  const memoizedValue = useMemo(() => {
    const arr = Array.from({ length: 100 }, (_, i) => i + 1);
    const newArr = [];
    while (arr.length) newArr.push(arr.splice(0, 10));
    return newArr;
  }, []);

  const playerPos = useRecoilValue(playerPositions);

  return (
    <div className="flex items-center">
      <div className="p-2">
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
      <table>
        {memoizedValue.reverse().map((i, ind) => {
          return (
            <tr className="p-4" key={ind + +new Date()}>
              {i.map((ij) => {
                return (
                  <td
                    className="p-4 border border-blue-400 text-center"
                    key={ij}
                  >
                    {ij}
                    {playerPos.player1 === ij && (
                      <MdPersonPinCircle size={30} />
                    )}
                    {playerPos.player2 === ij && (
                      <MdOutlinePersonPinCircle size={30} />
                    )}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </table>
    </div>
  );
};

export default Board;
