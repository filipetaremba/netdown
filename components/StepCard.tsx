import type { LucideIcon } from "lucide-react";

interface StepCardProps {
  step: number;
  icon: LucideIcon;
  title: string;
  description: string;
}

export default function StepCard({ step, icon: Icon, title, description }: StepCardProps) {
  return (
    <div className="group relative flex flex-col items-start text-left p-7 bg-neutral-white border border-neutral-dark/10 rounded-2xl overflow-hidden hover:border-primary/30 hover:shadow-lg transition-[border-color,box-shadow] duration-300 w-full">

      {/* Barra de destaque no hover */}
      <span className="absolute inset-x-0 top-0 h-1 bg-primary scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-300"></span>

      {/* Ícone */}
      <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary transition-colors duration-300">
        <Icon
          aria-hidden="true"
          className="w-5 h-5 text-primary group-hover:text-neutral-white transition-colors duration-300"
          strokeWidth={2}
        />
      </div>

      {/* Número do passo */}
      <span className="text-primary text-xs font-semibold uppercase tracking-widest font-heading mb-2">
        Passo {String(step).padStart(2, "0")}
      </span>

      {/* Título */}
      <h3 className="text-neutral-dark font-bold text-lg font-heading tracking-wide mb-2">
        {title}
      </h3>

      {/* Descrição */}
      <p className="text-neutral-dark/60 text-sm leading-relaxed font-sans">
        {description}
      </p>

    </div>
  );
}
