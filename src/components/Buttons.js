export function PrimaryButton({ text, onClick, type, size }) {
  return (
    <button
      onClick={onClick}
      type={type}
      size={size}
      className="m-2 p-2 bg-sky-600 border rounded-full text-white font-medium hover:bg-sky-500"
    >
      {text}
    </button>
  )
}
