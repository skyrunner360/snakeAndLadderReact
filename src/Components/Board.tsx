import React, { useMemo } from "react";

const Board = () => {
  const memoizedValue = useMemo(() => {
    const arr = Array.from({ length: 100 }, (_, i) => i + 1);
    console.log("arr", arr);
    const newArr = [];
    while (arr.length) newArr.push(arr.splice(0, 10));
    return newArr;
  }, []);
  return (
    <div className="text-center p-1">
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
