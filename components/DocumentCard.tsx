import Button from "./Button";

interface DocumentCardProps {
  title: string;
  description: string;
  value: string;
}

export default function DocumentCard({ title, description, value }: DocumentCardProps) {
  return (
    <div className="flex flex-col rounded-xl overflow-hidden shadow-md border-2 border-primary hover:shadow-xl transition-all duration-200 w-80 h-64">

      {/* Título */}
      <div className="bg-neutral-light px-6 py-4 flex items-center justify-center">
        <h3 className="text-neutral-dark font-bold text-sm uppercase tracking-widest text-center font-heading">
          {title}
        </h3>
      </div>

      {/* Descrição */}
      <div className="flex bg-primary flex-1 items-center justify-center px-6 py-4">
        <p className="text-neutral-white text-sm leading-relaxed opacity-90 font-sans">
          {description}
        </p>
      </div>

      {/* Botão Selecionar */}
      <a href={`/gerar-documento?tipo=${value}`} className="w-full">
        <Button
          label="SELECIONAR"
          className="w-full rounded-none py-3"
          variant="selecionar"
        />
      </a>

    </div>
  );
}