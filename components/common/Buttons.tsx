import { ButtonType } from "@/types/commonTypes";

export function SubmitButton({ type, text, disable, onClick = () => {}, className = "" }: ButtonType) {
  return (
    <button
      onClick={onClick}
      type={type}
      className={`w-full bg-blue-500 text-white py-2 rounded-md ${
        disable ? "opacity-50 cursor-not-allowed" : ""
      } ${className}`}
      disabled={disable}
    >
      {text}
    </button>
  );
}
