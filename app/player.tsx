"use client";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import { useState } from "react";
import CountUp from "react-countup";

export default function Player({ playerNum }: { playerNum: number }) {
  const [lifePoints, setLifePoints] = useState<number>(8000);

  const [value, setValue] = useState<string>("0");
  const [diceOrCoinResult, setDiceOrCoinResult] = useState<string>("");

  const valueAsNumber = Number(value);

  // in most cases players primarily want to subtract, so set addMode to false to set the subtract button to be enabled
  const [addMode, setAddMode] = useState<boolean>(false);

  const handleAddModeChange = (
    _: React.MouseEvent<HTMLElement>,
    newAddMode: boolean,
  ) => {
    if (newAddMode !== null) {
      setAddMode(newAddMode);
    }
  };

  const handleLifePointChange = () => {
    let lifePointsAfter = lifePoints + valueAsNumber * (addMode ? 1 : -1) || 0;
    if (lifePointsAfter <= 0) {
      lifePointsAfter = 0;
    }
    setLifePoints(lifePointsAfter);
  };

  const handleDiceRoll = () => {
    setDiceOrCoinResult(`Dice result is ${Math.floor(Math.random() * 6) + 1}`);
  };

  const handleCoinFlip = () => {
    setDiceOrCoinResult(
      `Coin flip result is ${Math.round(Math.random()) ? "heads" : "tails"}`,
    );
  };

  const handleClearDiceOrCoinResult = () => {
    setDiceOrCoinResult("");
  };

  return (
    <div className="flex flex-col rounded-md m-4 p-4 shadow-md bg-blue-50">
      <span className="flex text-3xl p-1 px-8 text-white text-center rounded-md w-full align-text-top uppercase bg-gradient-to-r from-blue-600 box-decoration-slice  to-blue-400 h-fit">
        player {playerNum}:{" "}
        <CountUp
          end={lifePoints}
          duration={0.8}
          preserveValue={true}
          separator=""
        />{" "}
      </span>
      <div className="flex flex-row my-8">
        <ToggleButtonGroup
          color="info"
          value={addMode}
          exclusive
          onChange={handleAddModeChange}
          aria-label="text alignment"
          className="w-3/4"
        >
          <ToggleButton
            value={true}
            aria-label="left aligned"
            className="w-full"
          >
            +
          </ToggleButton>
          <ToggleButton
            value={false}
            aria-label="right aligned"
            className="w-full"
          >
            -
          </ToggleButton>
        </ToggleButtonGroup>
        <input
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          className="rounded-md bg-white text-black peer block min-h-[auto] w-full border-0 px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[twe-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:autofill:shadow-autofill dark:peer-focus:text-primary [&:not([data-twe-input-placeholder-active])]:placeholder:opacity-0"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <Button
          variant="contained"
          className="w-1/3"
          onClick={handleLifePointChange}
        >
          OK
        </Button>
      </div>
      <div className="flex flex-row ">
        <Button
          variant="contained"
          onClick={() => {
            setValue(String(valueAsNumber + 100));
          }}
          className="w-1/4"
        >
          100
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            setValue(String(valueAsNumber + 500));
          }}
          className="w-1/4"
        >
          500
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            setValue(String(valueAsNumber + 1000));
          }}
          className="w-1/4"
        >
          1000
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            setValue(String(0));
          }}
          className="w-1/4"
        >
          clear
        </Button>
      </div>
      {lifePoints == 0 && (
        <span className="text-red-600">Player {playerNum} loses!</span>
      )}
      <div className="flex flex-row my-8 h-8">
        <Button
          variant="outlined"
          onClick={handleDiceRoll}
          className="w-1/2 text-2xl"
        >
          🎲
        </Button>
        <Button
          variant="outlined"
          onClick={handleCoinFlip}
          className="w-1/2 text-2xl"
        >
          🪙
        </Button>
      </div>
      {diceOrCoinResult && (
        <span className="text-black">
          {diceOrCoinResult}{" "}
          <IconButton onClick={handleClearDiceOrCoinResult} size="small">
            <DeleteIcon />
          </IconButton>
        </span>
      )}
    </div>
  );
}
