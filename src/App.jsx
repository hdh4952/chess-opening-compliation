import Board from "./Board";
import MoveView from "./MoveView";

function App() {
  return (
    <div className="h-screen w-screen flex items-center">
      <div className="h-3/4 w-full flex justify-between items-center">
        <div className="flex h-full w-full items-center">
          <div className="h-fit p-4 w-1/2">
            <Board />
          </div>
          <div className="h-full w-1/2 p-4 overflow-y-scroll">
            <MoveView />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
