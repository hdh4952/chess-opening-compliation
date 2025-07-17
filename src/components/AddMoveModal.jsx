import Modal from "./Modal";

function AddMoveModal({ isOpen, close }) {
  return (
    <Modal isOpen={isOpen}>
      <div className="p-4 rounded border-2 border-amber-800 bg-white h-2/3 w-1/2 relative">
        <button onClick={close} className="absolute right-4">
          Cancel
        </button>
        <span>추가할 수</span>
        <button onClick={() => close("asdf")}>temp</button>
      </div>
    </Modal>
  );
}

export default AddMoveModal;
