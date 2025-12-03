import Player from "./player";

export default function ygocalc() {
  return (
    <div className="flex flex-row md:flex-nowrap flex-wrap items-stretch w-full h-svh">
      <Player playerNum={1} />
      <Player playerNum={2} />
    </div>
  );
}
