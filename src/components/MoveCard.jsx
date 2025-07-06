import { overlay } from "overlay-kit";
import Modal from "./Modal";
import { useState } from "react";

function MoveCard({ move, onClick, title, description, isEditable, fen, db }) {
  return (
    <div
      className="w-full flex flex-col p-4 rounded border border-amber-800 h-32 mb-4 cursor-pointer hover:bg-amber-800 hover:text-white hover:border-white relative"
      onClick={() => onClick()}
    >
      {isEditable && (
        <button
          className="absolute right-4 z-100 bg-blue-400 hover:bg-blue-600 text-white rounded px-2 py-1 hover:cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            overlay.open(({ isOpen, close }) => (
              <Modal isOpen={isOpen}>
                <div className="p-4 rounded border-2 border-amber-800 bg-white h-2/3 w-1/2 relative">
                  <div className="h-11/12 flex flex-col justify-around mt-2">
                    <label htmlFor="title" className="mb-4">
                      title
                    </label>
                    <input
                      name="title"
                      type="text"
                      className="border border-amber-800 mb-4 rounded h-1/12 pl-2"
                      defaultValue={title}
                    />
                    <label htmlFor="description" className="mb-4">
                      description
                    </label>
                    <textarea
                      name="description"
                      type="text"
                      className="border border-amber-800 mb-4 rounded h-3/5 resize-none pl-2 pt-2"
                      defaultValue={description}
                    />
                    <div className="flex justify-around">
                      <button
                        onClick={close}
                        className="cursor-pointer rounded bg-red-400 hover:bg-red-600 text-white px-4 py-2 w-1/3"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={close}
                        className="cursor-pointer rounded bg-blue-400 hover:bg-blue-600 text-white px-4 py-2 w-1/3"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              </Modal>
            ));
          }}
        >
          edit
        </button>
      )}
      <span className="text-xl font-bold">{move}</span>
      {title && <span>[{title}]</span>}
      {description && <span>{description}</span>}
    </div>
  );
}

export default MoveCard;
