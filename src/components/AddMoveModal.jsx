import { useState } from "react";
import Modal from "./Modal";

function AddMoveModal({ isOpen, close, move }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  return (
    <Modal isOpen={isOpen}>
      <div className="p-4 rounded border-2 border-amber-800 bg-white h-2/3 w-1/2 max-sm:w-4/5 relative">
        <span className="text-lg font-bold">{move}</span>
        <div className="h-11/12 flex flex-col justify-around mt-2">
          <label htmlFor="title" className="mb-4">
            title
          </label>
          <input
            name="title"
            type="text"
            className="border border-amber-800 mb-4 rounded h-1/12 pl-2"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <label htmlFor="description" className="mb-4">
            description
          </label>
          <textarea
            name="description"
            type="text"
            className="border border-amber-800 mb-4 rounded h-3/5 resize-none pl-2 pt-2"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <div className="flex justify-around">
            <button
              onClick={() => {
                close();
              }}
              className="cursor-pointer rounded bg-red-400 hover:bg-red-600 text-white px-4 py-2 w-1/3"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                close({ title, description });
              }}
              className="cursor-pointer rounded bg-blue-400 hover:bg-blue-600 text-white px-4 py-2 w-1/3"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default AddMoveModal;
