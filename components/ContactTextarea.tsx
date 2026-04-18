interface ContactTextareaProps {
  label: string;
  name: string;
  value: string;
  rows?: number;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export default function ContactTextarea({ label, name, value, rows = 2, onChange }: ContactTextareaProps) {
  return (
    <div className="flex flex-col gap-1 w-full">
      <label className="text-primary text-xs font-semibold uppercase tracking-widest font-heading">
        {label}
      </label>
      <textarea
        name={name}
        value={value}
        rows={rows}
        onChange={onChange}
        className="w-full bg-transparent border-b border-primary text-neutral-dark text-sm py-2 focus:outline-none resize-none transition-colors font-sans"
      />
    </div>
  );
}