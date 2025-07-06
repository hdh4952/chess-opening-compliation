import EditButton from "./EditButton";

function MoveCard({
  move,
  onClick,
  title,
  description,
  isEditable,
  fen,
  setDb,
}) {
  function editMove(newTitle, newDescription) {
    console.log(newTitle, newDescription);
    setDb((prevDb) => {
      const updatedDb = new Map(prevDb);
      const list = updatedDb.get(fen) || [];
      const filteredList = list.filter((e) => e.move !== move);
      filteredList.push({ move, title: newTitle, description: newDescription });
      updatedDb.set(fen, filteredList);
      console.log(updatedDb);
      return updatedDb;
    });
  }

  return (
    <div
      className="w-full flex flex-col p-4 rounded border border-amber-800 h-32 mb-4 cursor-pointer hover:bg-amber-800 hover:text-white hover:border-white relative"
      onClick={() => onClick()}
    >
      {isEditable && (
        <EditButton title={title} description={description} onSave={editMove} />
      )}
      <span className="text-xl font-bold">{move}</span>
      {title && <span>[{title}]</span>}
      {description && <span>{description}</span>}
    </div>
  );
}

export default MoveCard;
