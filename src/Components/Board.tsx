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
      <table className="relative">
        <img
          src="/Snake_silhouette.svg?url"
          style={{ position: "absolute", top: 10, left: 20, zIndex: -1 }}
          height={100}
          width={200}
        />
        <img
          src="/Snake_silhouette.svg?url"
          style={{
            position: "absolute",
            top: 220,
            left: 240,
            zIndex: -1,
            rotate: "90deg",
          }}
          height={60}
          width={250}
        />
        <img
          src="/Snake_silhouette.svg?url"
          style={{
            position: "absolute",
            top: 115,
            left: 60,
            zIndex: -1,
            rotate: "90deg",
          }}
          height={200}
          width={400}
        />
        <img
          src="/Snake_silhouette.svg?url"
          style={{
            position: "absolute",
            bottom: 5,
            left: 210,
            zIndex: -1,
          }}
          height={100}
          width={150}
        />
        <img
          src="/ladder.svg?url"
          style={{
            position: "absolute",
            bottom: "-15px",
            left: "360px",
            zIndex: -1,
            height: "300px",
            width: "150px",
            rotate: "40deg",
          }}
        />
        <img
          src="/ladder.svg?url"
          style={{
            position: "absolute",
            top: "165px",
            left: "0px",
            zIndex: -1,
            height: "300px",
            width: "170px",
            rotate: "-40deg",
          }}
        />
        <img
          src="/ladder.svg?url"
          style={{
            position: "absolute",
            top: "-55px",
            left: "255px",
            zIndex: -1,
            height: "300px",
            width: "165px",
            rotate: "40deg",
          }}
        />
        {memoizedValue.reverse().map((i, ind) => {
          return (
            <tr className="p-4" key={ind + +new Date()}>
              {i.map((ij) => {
                return (
                  <td
                    className="p-4 border border-blue-400 text-center relative"
                    key={ij}
                  >
                    {ij}
                    {playerPos.player1 === ij && (
                      <MdPersonPinCircle
                        size={30}
                        style={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          transform: "translate(-50,-50)",
                          zIndex: 2,
                        }}
                      />
                    )}
                    {playerPos.player2 === ij && (
                      <MdOutlinePersonPinCircle
                        size={30}
                        style={{
                          position: "absolute",
                          top: 0,
                          right: 0,
                          transform: "translate(-50,-50)",
                          zIndex: 2,
                        }}
                      />
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
