import Button from "./Button";

export default function CTA() {
  return (
    <section className="w-full py-24 px-6 md:px-20 bg-primary flex flex-col items-center justify-center text-center">

      {/* Label topo */}
      <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-neutral-white/70 mb-3">
        <span className="w-5 h-[2px] bg-neutral-white/70"></span>
        Começa Agora
      </div>

      {/* Título */}
      <h2 className="text-neutral-white font-bold text-3xl md:text-4xl tracking-wide max-w-2xl leading-tight mb-6 font-heading">
        Pronto para Gerar o teu Requerimento?
      </h2>

      {/* Frase */}
      <p className="text-neutral-white/80 text-sm md:text-base max-w-xl leading-relaxed mb-10 font-sans">
        Acede à plataforma e gera o teu documento académico em segundos.
      </p>

      {/* Botão */}
      <a href="/gerar-documento">
        <Button label="Gerar Requerimento" variant="primary" />
      </a>

    </section>
  );
}