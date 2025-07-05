function AddMoveCard({ onClick }) {
  return (
    <button
      className="w-full flex justify-center items-center p-4 rounded border border-amber-800 h-32 mb-4 cursor-pointer hover:bg-amber-800 hover:text-white hover:border-white"
      onClick={() => onClick()}
    >
      <span className="text-4xl font-bold">+</span>
    </button>
  );
}

export default AddMoveCard;
