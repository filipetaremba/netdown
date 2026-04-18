import DocumentCard from "./DocumentCard";
import Button from "./Button";

const documents = [
  {
    title: "Rendimento Pedagógico",
    description: "Destinado à solicitação do histórico de desempenho académico do estudante.",
    value: "rendimento-pedagogico",
  },
  {
    title: "Declaração de Vínculo",
    description: "Utilizado para comprovar a inscrição ativa do estudante em instituições externas.",
    value: "declaracao-vinculo",
  },
  {
    title: "Certificado de Conclusão",
    description: "Documento que atesta a conclusão de um curso, indicando que o estudante cumpriu os requisitos exigidos.",
    value: "certificado-conclusao",
  },
];

export default function Documents() {
  return (
    <section className="w-full py-24 px-6 md:px-20 flex flex-col items-center bg-neutral-white">

      <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-primary mb-3">
        <span className="w-5 h-[2px] bg-primary"></span>
        Documentos Disponíveis
      </div>

      <h2 className="text-primary font-bold text-3xl md:text-4xl tracking-wide text-center mb-4 font-heading">
        O que Podes Gerar?
      </h2>

      <p className="text-neutral-dark/60 text-sm md:text-base text-center max-w-4xl mb-14 font-sans leading-relaxed">
        Requerimentos académicos que podem ser gerados através da plataforma, de forma padronizada e pronta para utilização.
      </p>

      <div className="flex flex-col md:flex-row items-center justify-center gap-8 w-full mb-12">
        {documents.map((doc) => (
          <DocumentCard
            key={doc.title}
            title={doc.title}
            description={doc.description}
            value={doc.value}
          />
        ))}
      </div>

      <a href="/documentos">
        <Button label="Ver Mais" variant="outline" />
      </a>

    </section>
  );
}