import EditButton from "./EditButton";

function MoveCard({ fen, move, onClick, title, description, isEditable }) {
  function editMove(newTitle, newDescription) {
    console.log({
      fen,
      move,
      title: newTitle,
      description: newDescription,
    });
  }

  return (
    <div
      className="w-full flex flex-col p-2 rounded border border-amber-800 h-32 mb-4 cursor-pointer hover:bg-amber-800 hover:text-white hover:border-white relative whitespace-pre text-sm"
      onClick={() => onClick()}
    >
      {isEditable && (
        <EditButton
          move={move}
          title={title}
          description={description}
          onSave={editMove}
        />
      )}
      <span className="text-md font-bold">{move}</span>
      {title && <span>[{title}]</span>}
      {description && <span>{description}</span>}
    </div>
  );
}

export default MoveCard;
