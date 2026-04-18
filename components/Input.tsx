interface InputProps {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Input({ label, name, type = "text", placeholder, value, onChange }: InputProps) {
  return (
    <div className="flex flex-col gap-1 w-full">
      <label className="text-primary text-xs font-semibold uppercase tracking-widest font-heading">
        {label}
      </label>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full px-3 py-2 border border-primary rounded text-neutral-dark text-sm font-sans focus:outline-none focus:ring-1 focus:ring-primary transition-colors placeholder:text-neutral-dark/30"
      />
    </div>
  );
}