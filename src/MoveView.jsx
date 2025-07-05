import MoveCard from "./components/MoveCard";

function MoveView({ moves, onMove }) {
  return (
    <div>
      {moves.map((move) => (
        <MoveCard key={move} move={move} onClick={() => onMove(move)} />
      ))}
      <MoveCard key="add" move="+" onClick={() => alert("plus")} />
    </div>
  );
}

export default MoveView;
