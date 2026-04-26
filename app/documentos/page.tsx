import Navbar from "@/components/Navbar";
import DocumentCard from "@/components/DocumentCard";

const allDocuments = [
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
    description: "Documento que atesta a conclusão de um curso, indicando que o estudante cumpriu os requisitos académicos exigidos.",
    value: "certificado-conclusao",
  },
  {
    title: "Diploma",
    description: "Documento oficial que certifica a conclusão de um curso superior, reconhecendo formalmente a qualificação obtida.",
    value: "diploma",
  },
];

export default function DocumentosPage() {
  return (
    <main className="min-h-screen bg-neutral-light">
      <Navbar />

      <section className="w-full px-6 md:px-20 py-20">

        {/* Cabeçalho */}
        <div className="mb-12 flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-primary mb-3">
            <span className="w-5 h-[2px] bg-primary"></span>
            Catálogo
          </div>
          <h1 className="text-primary font-bold text-3xl md:text-4xl tracking-wide font-heading mb-3">
            Documentos Disponíveis
          </h1>
          <p className="text-neutral-dark/60 text-sm md:text-base font-sans leading-relaxed max-w-xl">
            Requerimentos académicos que podem ser gerados através da plataforma, de forma padronizada e pronta para utilização.
          </p>
        </div>

        {/* Grid de documentos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full">
          {allDocuments.map((doc) => (
            <DocumentCard
              key={doc.title}
              title={doc.title}
              description={doc.description}
              value={doc.value}
            />
          ))}
        </div>

      </section>
    </main>
  );
}