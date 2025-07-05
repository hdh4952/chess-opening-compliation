function MoveCard({ move, onClick }) {
  return (
    <div>
      <button
        className="w-full border border-black h-32 mb-4 cursor-pointer hover:bg-amber-800 hover:text-white"
        onClick={() => onClick()}
      >
        {move}
      </button>
    </div>
  );
}

export default MoveCard;
