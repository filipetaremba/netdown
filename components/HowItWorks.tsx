import StepCard from "./StepCard";

const steps = [
  {
    step: 1,
    title: "Selecione o Documento",
    description: "Escolha o tipo de requerimento académico que pretende gerar.",
  },
  {
    step: 2,
    title: "Preencha os Dados",
    description: "Introduza as suas informações académicas de forma simples e rápida.",
  },
  {
    step: 3,
    title: "Gerar o Documento",
    description: "O sistema processa automaticamente os dados e cria o documento.",
  },
  {
    step: 4,
    title: "Faça o Download",
    description: "O ficheiro é disponibilizado pronto para utilização.",
  },
];

export default function HowItWorks() {
  return (
    <section className="w-full py-24 px-6 md:px-20 flex flex-col items-center bg-neutral-light">

      {/* Label topo */}
      <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-primary mb-3">
        <span className="w-5 h-[2px] bg-primary"></span>
        Processo
      </div>

      {/* Título */}
      <h2 className="text-primary font-bold text-3xl md:text-4xl tracking-wide text-center mb-4 font-heading">
        Como Funciona?
      </h2>

      {/* Subtítulo */}
      <p className="text-neutral-dark/60 text-sm md:text-base text-center mb-14 font-sans leading-relaxed">
        A NetDown foi desenvolvida para tornar a geração de documentos académicos um processo simples e directo,
        permitindo que o utilizador obtenha o seu documento em poucos passos.
      </p>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-6xl">
        {steps.map((item) => (
          <StepCard
            key={item.step}
            step={item.step}
            title={item.title}
            description={item.description}
          />
        ))}
      </div>

    </section>
  );
}