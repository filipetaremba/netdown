interface StepCardProps {
  step: number;
  title: string;
  description: string;
}

export default function StepCard({ step, title, description }: StepCardProps) {
  return (
    <div className="flex flex-col items-center text-center p-8 bg-primary rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 w-full">

      {/* Número do passo */}
      <div className="w-14 h-14 rounded-full bg-neutral-white flex items-center justify-center mb-5 shadow-md">
        <span className="text-primary font-bold text-xl font-heading">{step}</span>
      </div>

      {/* Título */}
      <h3 className="text-neutral-white font-bold text-lg font-heading tracking-wide mb-3">
        {title}
      </h3>

      {/* Divisor */}
      <div className="w-8 h-[2px] bg-neutral-white opacity-40 mb-3"></div>

      {/* Descrição */}
      <p className="text-neutral-white text-sm leading-relaxed opacity-90 font-sans">
        {description}
      </p>

    </div>
  );
}