import React, { use } from "react";

type ButtonVariant = "primary" | "outline" | "selecionar";

interface ButtonProps {
  label: string;
  variant?: ButtonVariant;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  className?:string;
}

export default function Button({ 
  label, 
  variant = "primary", 
  onClick,
  type = "button",
  className= ""
}: ButtonProps) {
  const base = "px-3 py-2 rounded font-semibold text-sm tracking-widest font-heading cursor-pointer transition-all duration-200";

  const variants = {
    primary: "bg-danger text-neutral-white hover:bg-danger-dark",
    outline: "border border-primary text-primary hover:bg-neutral-light",
    selecionar: "bg-primary-dark text-neutral-white hover:text-danger",
  };

  return (
    <button 
      type={type}
      className={`${base} ${variants[variant]} ${className}`} 
      onClick={onClick}
    >
      {label}
    </button>
  );
}