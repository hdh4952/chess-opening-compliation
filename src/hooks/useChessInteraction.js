import { useState } from "react";

export function useChessInteraction(chessGame, handleMove) {
  const [moveFrom, setMoveFrom] = useState("");
  const [optionSquares, setOptionSquares] = useState({});

  function getMoveOptions(square) {
    const moves = chessGame.moves({ square, verbose: true });

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
      if (hasMoveOptions) setMoveFrom(square);
      return;
    }

    const moves = chessGame.moves({ square: moveFrom, verbose: true });
    const foundMove = moves.find((m) => m.from === moveFrom && m.to === square);

    if (!foundMove) {
      const hasMoveOptions = getMoveOptions(square);
      setMoveFrom(hasMoveOptions ? square : "");
      return;
    }

    try {
      handleMove(foundMove.san);
    } catch {
      const hasMoveOptions = getMoveOptions(square);
      if (hasMoveOptions) setMoveFrom(square);
      return;
    }

    setMoveFrom("");
    setOptionSquares({});
  }

  return {
    optionSquares,
    onSquareClick,
  };
}
