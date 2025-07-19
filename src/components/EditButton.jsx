import { overlay } from "overlay-kit";
import Modal from "./Modal";
import { useState } from "react";
import ConfirmModal from "./ConfirmModal";

function EditButton({ move, title, description, onSave, onDelete }) {
  return (
    <button
      className="absolute right-4 z-100 bg-blue-400 hover:bg-blue-600 text-white rounded px-2 py-1 hover:cursor-pointer"
      onClick={(e) => {
        e.stopPropagation();
        overlay.open(({ isOpen, close }) => (
          <ModalWithEdit
            isOpen={isOpen}
            close={close}
            move={move}
            title={title}
            description={description}
            onSave={onSave}
            onDelete={onDelete}
          />
        ));
      }}
    >
      edit
    </button>
  );
}

function ModalWithEdit({
  isOpen,
  close,
  move,
  title,
  description,
  onSave,
  onDelete,
}) {
  const [editedTitle, setEditedTitle] = useState(title);
  const [editedDescription, setEditedDescription] = useState(description);

  return (
    <Modal isOpen={isOpen}>
      <div className="p-4 rounded border-2 border-amber-800 bg-white max-sm:w-4/5 h-2/3 w-1/2 relative">
        <span className="text-lg font-bold">{move}</span>
        <div className="h-11/12 flex flex-col justify-around mt-2">
          <label htmlFor="title" className="mb-4">
            title
          </label>
          <input
            name="title"
            type="text"
            className="border border-amber-800 mb-4 rounded h-1/12 pl-2"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
          />
          <label htmlFor="description" className="mb-4">
            description
          </label>
          <textarea
            name="description"
            type="text"
            className="border border-amber-800 mb-4 rounded h-3/5 resize-none pl-2 pt-2"
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
          />
          <div className="flex justify-around">
            <button
              onClick={async () => {
                const isConfirm = await overlay.openAsync(
                  ({ isOpen, close }) => (
                    <ConfirmModal isOpen={isOpen} close={close}>
                      삭제하시겠습니까?
                    </ConfirmModal>
                  )
                );
                if (isConfirm) {
                  onDelete();
                }
                close();
              }}
              className="cursor-pointer rounded bg-red-400 hover:bg-red-600 text-white px-4 py-2 w-1/3"
            >
              Delete
            </button>
            <button
              onClick={() => {
                onSave(editedTitle, editedDescription);
                close();
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

export default EditButton;
