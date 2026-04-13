const fs = require('fs');
const content = `import Link from "next/link"

const documentos = [
  {
    titulo: "Rendimento Pedagógico",
    descricao: "Destinado à solicitação do histórico de desempenho académico do estudante.",
    detalhe: "Usado para pedidos de bolsa, transferências e avaliações externas.",
    tipo: "rendimento_pedagogico",
    icon: "📊",
  },
  {
    titulo: "Declaração de Vínculo",
    descricao: "Comprova a inscrição activa do estudante em instituições externas.",
    detalhe: "Necessário para estágios, seguros académicos e candidaturas.",
    tipo: "declaracao_vinculo",
    icon: "🔗",
  },
  {
    titulo: "Certificado de Conclusão de Curso",
    descricao: "Atesta a conclusão de um curso e o cumprimento dos requisitos académicos.",
    detalhe: "Emitido após aprovação em todas as unidades curriculares.",
    tipo: "certificado_conclusao",
    icon: "🎓",
  },
  {
    titulo: "Diploma",
    descricao: "Documento oficial que certifica formalmente a conclusão de um curso superior.",
    detalhe: "Reconhecido por entidades nacionais e internacionais.",
    tipo: "diploma",
    icon: "📜",
  },
]

export default function DocumentosPage() {
  return (
    <div className="pt-16 min-h-screen bg-gray-50">

      {/* Header da página */}
      <div className="bg-[#1a3fcf] text-white px-6 py-16 text-center relative overflow-hidden">
        <div className="absolute top-[-60px] right-[-60px] w-60 h-60 rounded-full bg-white/5 pointer-events-none" />
        <p className="text-white/60 text-xs font-bold uppercase tracking-[0.3em] mb-3">Catálogo</p>
        <h1 className="text-4xl font-black uppercase tracking-tight">Documentos Disponíveis</h1>
        <p className="mt-4 text-white/70 text-sm max-w-md mx-auto leading-relaxed">
          Seleccione o tipo de documento académico que pretende gerar e preencha o formulário correspondente.
        </p>
        {/* Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 50" preserveAspectRatio="none" className="w-full h-10 fill-gray-50">
            <path d="M0,25 C400,50 1040,0 1440,30 L1440,50 L0,50 Z" />
          </svg>
        </div>
      </div>

      {/* Grid de documentos */}
      <div className="max-w-5xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 gap-6">
          {documentos.map(({ titulo, descricao, detalhe, tipo, icon }) => (
            <div
              key={tipo}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden flex flex-col"
            >
              {/* Topo colorido */}
              <div className="bg-[#1a3fcf] px-6 py-5 flex items-center gap-4">
                <span className="text-2xl">{icon}</span>
                <h2 className="text-white font-black text-sm uppercase tracking-wide leading-tight">{titulo}</h2>
              </div>

              {/* Corpo */}
              <div className="px-6 py-5 flex flex-col gap-3 flex-1">
                <p className="text-gray-700 text-sm leading-relaxed">{descricao}</p>
                <p className="text-gray-400 text-xs leading-relaxed border-l-2 border-[#1a3fcf]/30 pl-3">{detalhe}</p>
              </div>

              {/* CTA */}
              <div className="px-6 pb-6">
                <Link
                  href={`\/documentos\/criar?tipo=\${tipo}`}
                  className="block w-full bg-red-600 hover:bg-red-700 text-white text-xs font-bold uppercase tracking-widest py-3 rounded text-center transition-all duration-200 hover:scale-[1.02]"
                >
                  Gerar Este Documento →
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Nota de rodapé */}
        <p className="text-center text-gray-400 text-xs mt-12 leading-relaxed">
          Todos os documentos gerados seguem os modelos oficiais. O sistema não armazena dados pessoais.
        </p>
      </div>
    </div>
  )
}
`;
fs.writeFileSync('app/documentos/page.tsx', content, 'utf8');
console.log('restored app/documentos/page.tsx');
