import Button from "./Button";

export default function HeroSection() {
  return (
    <section className="w-full min-h-screen flex flex-col items-center justify-center text-center px-6 md:px-20">

      {/* Título */}
      <h1 className="text-primary font-bold text-3xl md:text-5xl leading-tight font-heading max-w-xs md:max-w-3xl"
      >
        Plataforma de Geração Automática de Requerimentos Universitários
      </h1>

      {/* Parágrafo */}
      <p className="text-neutral-dark/60 text-sm md:text-base text-center tracking-wide mt-6 md:mt-8 max-w-5xl leading-relaxed">
        Gera Requerimentos de Declarações Académicas de Forma Rápida Segura e Acessível a Qualquer Momento e em Qualquer Dispositivo.
      </p>
      {/* Botões */}
      <div className="flex flex-col md:flex-row items-center gap-4 mt-8 md:mt-10">
        <a href="/gerar-documento">
                <Button label="Gerar Requerimento" variant="primary" />
        </a>
       <a href="#como-funciona">
          <Button label="Como Funciona?" variant="outline" />
        </a>
      </div>

    </section>
  );
}