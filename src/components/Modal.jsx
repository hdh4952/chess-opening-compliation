function Modal({ children, isOpen = false, onExit }) {
  if (!isOpen) return null;

  return (
    <div className="z-100 fixed top-0 left-0 bottom-0 w-full flex justify-center items-center">
      {children}
    </div>
  );
}

export default Modal;
