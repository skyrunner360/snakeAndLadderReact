import { IoDice } from "react-icons/io5";
import { FaDiceOne } from "react-icons/fa6";
import { FaDiceTwo } from "react-icons/fa6";
import { FaDiceThree } from "react-icons/fa6";
import { FaDiceFour } from "react-icons/fa";
import { FaDiceFive } from "react-icons/fa";
import { FaDiceSix } from "react-icons/fa6";

export const DiceValToIconMap = {
  0: <IoDice size={150} />,
  1: <FaDiceOne size={150} />,
  2: <FaDiceTwo size={150} />,
  3: <FaDiceThree size={150} />,
  4: <FaDiceFour size={150} />,
  5: <FaDiceFive size={150} />,
  6: <FaDiceSix size={150} />,
};

export const diceRoll = () => {
  return Math.trunc(Math.random() * 6 + 1);
};
export const snakesArr = [
  [91, 55],
  [60, 15],
  [70, 1],
  [35, 7],
];
export const laddersArr = [
  [18, 40],
  [33, 51],
  [76, 98],
];
