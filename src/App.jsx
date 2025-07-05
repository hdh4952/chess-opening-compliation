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
  const [chessGame, setChessGame] = useState(new Chess());
  const [history, setHistory] = useState([chessGame.fen()]);
  const [chessPosition, setChessPosition] = useState(chessGame.fen());
  const [db, setDb] = useState(dataInit());

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

      setHistory((prev) => [...prev, chessGame.fen()]);
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
    setHistory((prev) => [...prev, chessGame.fen()]);
    setChessPosition(chessGame.fen());
  }

  function handleUndo() {
    if (history.length > 1) {
      const newHistory = history.slice(0, history.length - 1);
      const lastGameState = new Chess(newHistory[newHistory.length - 1]);
      setChessGame(lastGameState);
      setHistory(newHistory);
      setChessPosition(lastGameState.fen());
    }
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
              setDb={setDb}
              fen={chessGame.fen()}
              possibleMoves={chessGame.moves()}
              onMove={handleMove}
              onUndo={handleUndo}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
