import type { ButtonHTMLAttributes, ReactNode } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export default function Button({ children, ...props }: Props) {
  return (
    <button
      className="bg-primary text-white py-2 px-4 rounded-md hover:bg-primary-hover disabled:bg-gray-300"
      {...props}
    >
      {children}
    </button>
  );
}