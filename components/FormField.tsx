// components/FormField.tsx
import type { ChangeEvent } from "react"

interface Props {
  label: string
  name: string
  type?: string
  value: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  required?: boolean
  placeholder?: string
}

export default function FormField({ label, name, type = "text", value, onChange, required, placeholder }: Props) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs font-bold text-[#1a3fcf] uppercase tracking-widest">
        {label}
      </label>
      <input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        className="border border-[#1a3fcf]/30 rounded px-3 py-2.5 text-sm text-gray-800 outline-none focus:border-[#1a3fcf] focus:ring-1 focus:ring-[#1a3fcf]/20 bg-white transition-colors duration-200 placeholder-gray-300"
      />
    </div>
  )
}