"use client";
import { useState } from "react";
import Player from "./player";
import Button from "@mui/material/Button";

export default function ygocalc() {
  const [playerCount, setPlayerCount] = useState<number>(2);

  return (
    <div className="flex flex-col">
      <Button
        variant="contained"
        className="cursor-pointer"
        onClick={() => setPlayerCount(playerCount + 1)}
      >
        Add player
      </Button>
      <div className="grid grid-cols-1 md:grid-cols-2 items-stretch w-full  ">
        {[...Array(playerCount)].map((_, playerNum) => (
          <Player playerNum={playerNum + 1} key={"player-" + playerNum} />
        ))}
      </div>
    </div>
  );
}
