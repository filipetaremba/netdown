interface SelectProps {
  label: string;
  name: string;
  value: string;
  options: { label: string; value: string }[];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export default function Select({ label, name, value, options, onChange }: SelectProps) {
  return (
    <div className="flex flex-col gap-1 w-full">
      <label className="text-primary text-xs font-semibold uppercase tracking-wide">
        {label}
      </label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="w-full px-3 py-2 border border-primary rounded text-neutral-dark text-sm focus:outline-none focus:ring-1 focus:ring-primary transition-colors bg-neutral-white"
      >
        <option value="">Selecione o tipo de documento</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}