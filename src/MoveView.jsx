import { overlay } from "overlay-kit";
import AddMoveCard from "./components/AddMoveCard";
import MoveCard from "./components/MoveCard";
import Modal from "./components/Modal";

function MoveView({ db, setDb, chessGame, onMove, onUndo }) {
  const fen = chessGame.fen();

  const moves = (() => {
    if (!db.has(fen)) {
      db.set(fen, []);
    }

    return db.get(fen);
  })();

  function addMoveToDb(fen, move) {
    setDb((prevDb) => {
      const updatedDb = new Map(prevDb);
      const list = updatedDb.get(fen) || [];
      list.push({ move, title: "", description: "" });
      updatedDb.set(fen, list);
      return updatedDb;
    });
  }

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
          isEditable
          fen={fen}
          db={db}
        />
      ))}
      <AddMoveCard
        onClick={() => {
          const addableMoves = (() => {
            const set = new Set(chessGame.moves());
            moves.forEach(({ move }) => set.delete(move));
            return [...set.keys()];
          })();

          overlay.open(({ isOpen, close }) => (
            <Modal isOpen={isOpen}>
              <div className="p-4 rounded border-2 border-amber-800 bg-white h-2/3 w-1/2 relative">
                <button onClick={close} className="absolute right-4">
                  Cancel
                </button>
                <span>추가할 수</span>
                <div className="h-11/12 overflow-y-scroll mt-2">
                  {addableMoves.map((move) => (
                    <MoveCard
                      key={move}
                      move={move}
                      onClick={() => {
                        addMoveToDb(fen, move);
                        close();
                      }}
                    />
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
