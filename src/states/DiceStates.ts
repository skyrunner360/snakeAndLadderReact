import { atom } from "recoil";

export const diceValue = atom({
  key: "diceValue",
  default: 0,
});
export const diceType = atom({
  key: "diceType",
  default: "none", //normal || crooked
});
