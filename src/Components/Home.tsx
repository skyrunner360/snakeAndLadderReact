import { IoDice } from "react-icons/io5";
import { useRecoilState } from "recoil";
import { diceType } from "../states/DiceStates";
import { gameState } from "../states/BoardStates";

const Home = () => {
  const [selDiceType, setSelDiceType] = useRecoilState(diceType);
  const [gState, setGState] = useRecoilState(gameState);

  return (
    <>
      <div>
        <div className="text-center p-4">
          <h1 className="font-extrabold text-4xl text-green-400">
            Choose a Dice Type
          </h1>
        </div>
        <hr color="#545743" />
        <div className="grid grid-cols-2 gap-2 p-2 items-center justify-center">
          <div
            className={`justify-self-center cursor-pointer p-2 ${
              selDiceType === "normal" && "rounded-md border border-blue-700"
            }`}
            onClick={() => setSelDiceType("normal")}
          >
            <IoDice size={200} className="mx-auto" />
            <p className="text-lg text-wrap">
              <b>Normal Dice :-</b> Play the Game With a Normal Dice.
            </p>
          </div>
          <div
            className={`justify-self-center cursor-pointer p-2  ${
              selDiceType === "crooked" && "rounded-md border border-blue-700"
            }`}
            onClick={() => setSelDiceType("crooked")}
          >
            <IoDice size={200} color="#c4de31" className="mx-auto" />
            <p className="text-lg text-wrap">
              <b>Crooked Dice :-</b> Play the Game With a Crooked Dice where it
              always rolls to Even Numbers.
            </p>
          </div>
        </div>
        <div className="p-2 text-center">
          <button
            className="p-4 bg-green-400 text-white rounded-lg hover:font-bold text-2xl"
            disabled={selDiceType === "none"}
            onClick={() => setGState({ ...gState, global: "started" })}
          >
            Start Game
          </button>
        </div>
      </div>
    </>
  );
};

export default Home;
