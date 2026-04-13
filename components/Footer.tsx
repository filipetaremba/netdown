import Link from "next/link"

const DOC_LINKS = [
  { label: "Rendimento Pedagógico", tipo: "rendimento_pedagogico" },
  { label: "Declaração de Vínculo", tipo: "declaracao_vinculo" },
  { label: "Certificado de Conclusão", tipo: "certificado_conclusao" },
  { label: "Diploma", tipo: "diploma" },
]

const NAV_LINKS = [
  { label: "Início", href: "/#inicio" },
  { label: "Sobre", href: "/#sobre" },
  { label: "Como Funciona", href: "/#como-funciona" },
  { label: "Documentos", href: "/#documentos" },
  { label: "Contacto", href: "/#contacto" },
]

export default function Footer() {
  return (
    <footer className="bg-[#0d1f6b] text-white">

      {/* Wave SVG no topo — espelha o estilo da landing */}
      <div className="w-full overflow-hidden leading-none">
        <svg viewBox="0 0 1440 60" preserveAspectRatio="none" className="w-full h-10 fill-white">
          <path d="M0,40 C360,0 1080,80 1440,20 L1440,0 L0,0 Z" />
        </svg>
      </div>

      <div className="max-w-6xl mx-auto px-6 pt-2 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          {/* Coluna 1 — Marca */}
          <div>
            <Link href="/" className="text-2xl font-black tracking-widest uppercase">
              NETDOWN
            </Link>
            <p className="mt-3 text-white/60 text-xs leading-relaxed max-w-xs">
              Plataforma de geração automática de documentos universitários. Rápida, segura e acessível a qualquer momento.
            </p>
          </div>

          {/* Coluna 2 — Navegação */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-white/40 mb-4">
              Navegação
            </h3>
            <ul className="flex flex-col gap-2.5">
              {NAV_LINKS.map(({ label, href }) => (
                <li key={href}>
                  <a
                    href={href}
                    className="text-white/70 hover:text-white text-sm transition-colors duration-200"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Coluna 3 — Documentos */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-white/40 mb-4">
              Documentos
            </h3>
            <ul className="flex flex-col gap-2.5">
              {DOC_LINKS.map(({ label, tipo }) => (
                <li key={tipo}>
                  <Link
                    href={`/documentos/criar?tipo=${tipo}`}
                    className="text-white/70 hover:text-white text-sm transition-colors duration-200"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divisor */}
        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-xs">
            © {new Date().getFullYear()} NetDown. Todos os direitos reservados.
          </p>
          <Link
              href="/documentos/criar?tipo=declaracao_vinculo"   // ← muda aqui
              className="bg-red-600 hover:bg-red-700 text-white text-xs font-bold uppercase tracking-widest px-8 py-3 transition-colors duration-200"
            >
              Gerar Documento
            </Link>
        </div>
      </div>
    </footer>
  )
}