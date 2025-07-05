import { useRef, useState } from "react";
import MoveView from "./MoveView";
import { Chessboard } from "react-chessboard";
import { Chess } from "chess.js";
import data from "./data/opening-data.json";

function dataInit() {
  const db = new Map();
  data.moves.forEach(({ fen, move, title, description }) => {
    if (!db.has(fen)) {
      db.set(fen, []);
    }
    db.get(fen).push({ move, title, description });
  });
  return db;
}

function App() {
  const chessGameRef = useRef(new Chess());
  const chessGame = chessGameRef.current;
  const [chessPosition, setChessPosition] = useState(chessGame.fen());
  const [db] = useState(dataInit());

  function onPieceDrop({ sourceSquare, targetSquare }) {
    if (!targetSquare) {
      return false;
    }

    try {
      chessGame.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: "q",
      });

      setChessPosition(chessGame.fen());

      return true;
    } catch {
      return false;
    }
  }

  const chessboardOptions = {
    position: chessPosition,
    onPieceDrop,
  };

  function handleMove(move) {
    chessGame.move(move);
    setChessPosition(chessGame.fen(), data);
  }

  return (
    <div className="h-screen w-screen flex items-center">
      <div className="h-full w-full flex items-center p-16">
        <div className="flex h-full w-full justify-around items-center">
          <div className="w-1/2 h-fit">
            <Chessboard options={chessboardOptions} />
          </div>
          <div className="h-3/4 w-2/5 overflow-y-scroll">
            <MoveView
              db={db}
              fen={chessGame.fen()}
              possibleMoves={chessGame.moves()}
              onMove={handleMove}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
