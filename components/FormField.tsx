// components/FormField.tsx
import type { ChangeEvent } from "react"

interface Props {
  label: string
  name: string
  type?: string
  value: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

export default function FormField({ label, name, type = "text", value, onChange }: Props) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs font-medium text-blue-600 uppercase tracking-wide">
        {label}
      </label>
      <input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        className="border-b border-blue-300 py-2 text-sm outline-none focus:border-blue-600 bg-transparent"
      />
    </div>
  )
}