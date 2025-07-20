function Modal({ children, isOpen = false }) {
  if (!isOpen) return null;

  return (
    <div className="z-100 fixed top-0 left-0 bottom-0 w-full flex justify-center items-center">
      <div className="fixed inset-0 bg-white opacity-50 h-full w-full"></div>
      {children}
    </div>
  );
}

export default Modal;
