import { useState } from "react";
import MoveView from "./MoveView";
import { Chessboard, defaultSquareStyle } from "react-chessboard";
import { Chess } from "chess.js";
import data from "./data/opening-data.json";
import { overlay } from "overlay-kit";
import AddMoveModal from "./components/AddMoveModal";

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
  const [db, setDb] = useState(dataInit());
  const [moveFrom, setMoveFrom] = useState("");
  const [optionSquares, setOptionSquares] = useState({});

  function getMoveOptions(square) {
    const moves = chessGame.moves({
      square,
      verbose: true,
    });

    if (moves.length === 0) {
      setOptionSquares({});
      return false;
    }

    const newSquares = {};

    for (const move of moves) {
      newSquares[move.to] = {
        background:
          chessGame.get(move.to) &&
          chessGame.get(move.to)?.color !== chessGame.get(square)?.color
            ? "radial-gradient(circle, rgba(0,0,0,.1) 85%, transparent 85%)"
            : "radial-gradient(circle, rgba(0,0,0,.1) 25%, transparent 25%)",
        borderRadius: "50%",
      };
    }

    newSquares[square] = {
      background: "rgba(255, 255, 0, 0.4)",
    };

    setOptionSquares(newSquares);

    return true;
  }

  function onSquareClick({ square, piece }) {
    if (!moveFrom && piece) {
      const hasMoveOptions = getMoveOptions(square);

      if (hasMoveOptions) {
        setMoveFrom(square);
      }

      return;
    }

    const moves = chessGame.moves({
      square: moveFrom,
      verbose: true,
    });

    const foundMove = moves.find((m) => m.from === moveFrom && m.to === square);

    if (!foundMove) {
      const hasMoveOptions = getMoveOptions(square);
      setMoveFrom(hasMoveOptions ? square : "");
      return;
    }

    try {
      handleMove(foundMove.san);
      // chessGame.move({
      //   from: moveFrom,
      //   to: square,
      //   promotion: "q",
      // });
    } catch {
      const hasMoveOptions = getMoveOptions(square);

      if (hasMoveOptions) {
        setMoveFrom(square);
      }

      return;
    }

    setMoveFrom("");
    setOptionSquares({});
  }

  const chessboardOptions = {
    allowDragging: false,
    onSquareClick,
    position: chessGame.fen(),
    defaultSquareStyle,
    squareStyles: optionSquares,
  };

  async function handleMove(move) {
    const newChessGame = new Chess(chessGame.fen());
    newChessGame.move(move);
    setChessGame(newChessGame);
    setHistory((prev) => [...prev, newChessGame.fen()]);
    const a = await overlay.openAsync(({ isOpen, close }) => (
      <AddMoveModal isOpen={isOpen} close={close} />
    ));
    console.log(move, a);
  }

  function handleUndo() {
    if (history.length > 1) {
      const newHistory = history.slice(0, history.length - 1);
      const lastGameState = new Chess(newHistory[newHistory.length - 1]);
      setChessGame(lastGameState);
      setHistory(newHistory);
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
              chessGame={chessGame}
              onMove={handleMove}
              onUndo={handleUndo}
            />
          </div>
        </div>
      </div>
      <button
        className="absolute left-4 top-4 rounded border bg-black text-white px-2 py-1 cursor-pointer"
        onClick={() => {
          const obj = {};
          const moves = [];
          for (const [fen, moveList] of db) {
            moveList.forEach(({ move, title, description }) => {
              moves.push({
                fen,
                move,
                title,
                description,
              });
            });
          }
          obj["moves"] = moves;
          console.log(JSON.stringify(obj));
        }}
      >
        DB JSON
      </button>
    </div>
  );
}

export default App;
