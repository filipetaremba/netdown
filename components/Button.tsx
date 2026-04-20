import React, { use } from "react";

type ButtonVariant = "primary" | "outline" | "selecionar";

interface ButtonProps {
  label: string;
  variant?: ButtonVariant;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  className?: string;
  disabled?: boolean;
}

export default function Button({ 
  label, 
  variant = "primary", 
  onClick,
  type = "button",
  className= "",
  disabled = false,
}: ButtonProps) {
  const base = "px-3 py-2 rounded font-semibold text-sm tracking-widest font-heading transition-all duration-200";

  const variants = {
    primary: "bg-danger text-neutral-white hover:bg-danger-dark",
    outline: "border border-primary text-primary hover:bg-neutral-light",
    selecionar: "bg-primary-dark text-neutral-white hover:text-danger",
  };

  return (
    <button 
      type={type}
      className={`${base} ${variants[variant]} ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"} ${className}`} 
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
}