import MoveCard from "./components/MoveCard";

function MoveView({ fen, onMove, onUndo, moves }) {
  return (
    <div>
      <MoveCard move="←" onClick={() => onUndo()} />
      {moves.map(({ move, title, description }) => (
        <MoveCard
          key={move}
          fen={fen}
          move={move}
          title={title}
          description={description}
          onClick={() => onMove(move)}
          isEditable
        />
      ))}
    </div>
  );
}

export default MoveView;
