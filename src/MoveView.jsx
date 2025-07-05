import { overlay } from "overlay-kit";
import AddMoveCard from "./components/AddMoveCard";
import MoveCard from "./components/MoveCard";
import Modal from "./components/Modal";

function MoveView({ db, setDb, fen, possibleMoves, onMove, onUndo }) {
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
      <AddMoveCard
        onClick={async () => {
          const result = await overlay.openAsync(({ isOpen, close }) => (
            <Modal isOpen={isOpen}>
              <div className="p-4 rounded border-2 border-amber-800 bg-white h-2/3 w-1/2 relative">
                <button onClick={close} className="absolute right-0">
                  Cancel
                </button>
                <span>추가할 수</span>
                <div className="h-11/12 overflow-y-scroll mt-2">
                  {possibleMoves.map((move) => (
                    <MoveCard key={move} move={move} />
                  ))}
                </div>
              </div>
            </Modal>
          ));
        }}
      />
    </div>
  );
}

export default MoveView;
