import { useId } from "react";
import type { InputHTMLAttributes } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export default function Input({ label, error, className = "", ...props }: Props) {
  const id = useId();
  return (
    <div className="flex flex-col gap-1 text-sm w-full">
      <label htmlFor={id} className="font-medium text-gray-700">
        {label}
      </label>
      <input
        id={id}
        className={[
          "px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2",
          error ? "border-red-500 ring-red-300" : "focus:ring-primary",
          className,
        ].join(" ")}
        {...props}
      />
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}
