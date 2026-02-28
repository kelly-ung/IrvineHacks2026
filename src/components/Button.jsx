function Button({ children, onClick, type="button", className=""}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`bg-green-800 hover:bg-green-950 text-white px-4 py-2 rounded-full transition ${className}`}
    >
      {children}
    </button>
  );
}

export default Button;