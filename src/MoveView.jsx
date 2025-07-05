import AddMoveCard from "./components/AddMoveCard";
import MoveCard from "./components/MoveCard";

function MoveView({ db, fen, possibleMoves, onMove, onUndo }) {
  const moves = (() => {
    if (db.has(fen)) {
      return db.get(fen);
    }
    return [];
  })();

  return (
    <div>
      <MoveCard move="←" onClick={() => onUndo()} />
      {moves.map(({ move, title, description }) => (
        <MoveCard
          key={move}
          move={move}
          title={title}
          description={description}
          onClick={() => onMove(move)}
        />
      ))}
      <AddMoveCard onClick={() => {}} />
    </div>
  );
}

export default MoveView;
