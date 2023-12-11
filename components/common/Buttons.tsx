import { ButtonType } from "@/types/commonTypes";

export function SubmitButton({ type, text, disable }:ButtonType) {
  return (
    <button
      type={type}
      className={`w-full bg-blue-500 text-white py-2 rounded-md ${disable ? "opacity-50 cursor-not-allowed" : ""}`}
      disabled={disable}
    >
      {text}
    </button>
  );
}
