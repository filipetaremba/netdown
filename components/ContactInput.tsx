interface ContactInputProps {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function ContactInput({ label, name, type = "text", value, onChange }: ContactInputProps) {
  return (
    <div className="flex flex-col gap-1 w-full">
      <label className="text-primary text-xs font-semibold uppercase tracking-widest font-heading">
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full bg-transparent border-b border-primary text-neutral-dark text-sm py-2 focus:outline-none focus:border-primary transition-colors font-sans"
      />
    </div>
  );
}