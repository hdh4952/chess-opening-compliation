import Modal from "./Modal";

export default function ConfirmModal({ children, isOpen, close }) {
  return (
    <Modal isOpen={isOpen}>
      <div className="p-4 rounded border-2 border-amber-800 bg-white h-fit max-sm:w-2/3 w-2/5 relative flex flex-col items-center">
        <span className="mb-4">{children}</span>
        <div className="flex justify-around w-full">
          <button
            className="cursor-pointer rounded bg-red-400 hover:bg-red-600 text-white px-4 py-2 w-1/3"
            onClick={() => close(false)}
          >
            no
          </button>
          <button
            className="cursor-pointer rounded bg-blue-400 hover:bg-blue-600 text-white px-4 py-2 w-1/3"
            onClick={() => close(true)}
          >
            yes
          </button>
        </div>
      </div>
    </Modal>
  );
}
