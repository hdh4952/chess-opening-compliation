import { useState } from "react";
import MoveView from "./MoveView";
import { Chessboard, defaultSquareStyle } from "react-chessboard";
import { Chess } from "chess.js";
import { overlay } from "overlay-kit";
import AddMoveModal from "./components/AddMoveModal";
import useMoves from "./hooks/useMoves";
import { useChessInteraction } from "./hooks/useChessInteraction";

function App() {
  const [chessGame, setChessGame] = useState(new Chess());
  const [history, setHistory] = useState([chessGame.fen()]);
  const { optionSquares, onSquareClick } = useChessInteraction(
    chessGame,
    handleMove
  );
  const { data: registeredMoves } = useMoves(chessGame.fen());

  const chessboardOptions = {
    allowDragging: false,
    onSquareClick,
    position: chessGame.fen(),
    defaultSquareStyle,
    squareStyles: optionSquares,
  };

  async function handleMove(move) {
    if (!registeredMoves.find((e) => e.move === move)) {
      const a = await overlay.openAsync(({ isOpen, close }) => (
        <AddMoveModal isOpen={isOpen} close={close} move={move} />
      ));
      console.log(move, a);
    }

    const newChessGame = new Chess(chessGame.fen());
    newChessGame.move(move);
    setChessGame(newChessGame);
    setHistory((prev) => [...prev, newChessGame.fen()]);
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
          {/* <AddMoveModal isOpen={true} close={() => {}} move="e4" /> */}
          <div className="w-1/2 h-fit">
            <Chessboard options={chessboardOptions} />
          </div>
          <div className="h-3/4 w-2/5 overflow-y-scroll">
            <MoveView
              chessGame={chessGame}
              onMove={handleMove}
              onUndo={handleUndo}
              moves={registeredMoves}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
