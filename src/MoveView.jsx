import { Chess } from "chess.js";

function MoveView() {
  const chess = new Chess();
  const moves = chess.moves();
  return (
    <div className="">
      {moves.map((move) => (
        <div key={move} className="w-full border border-black h-32 mb-4">
          {move}
        </div>
      ))}
    </div>
  );
}

export default MoveView;
