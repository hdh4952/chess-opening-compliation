function MoveCard({ move, onClick, title, description }) {
  return (
    <button
      className="w-full flex flex-col p-4 rounded border border-amber-800 h-32 mb-4 cursor-pointer hover:bg-amber-800 hover:text-white hover:border-white"
      onClick={() => onClick()}
    >
      <span className="text-xl font-bold">{move}</span>
      {title && <span>[{title}]</span>}
      {description && <span>{description}</span>}
    </button>
  );
}

export default MoveCard;
