const footerLinks = [
  { label: "Inicio", href: "/" },
  { label: "Sobre", href: "/sobre" },
  { label: "Como Funciona", href: "/como-funciona" },
  { label: "Documentos", href: "/documentos" },
  { label: "Contacto", href: "#contacto" },
];

export default function Footer() {
  return (
    <footer className="w-full bg-primary px-6 md:px-20 py-16">

      {/* Divisor topo */}
      <div className="flex flex-col md:flex-row items-start justify-between gap-12 mb-12">

        {/* Logo + Descrição */}
        <div className="max-w-sm">
          <a href="/" className="text-neutral-white font-bold text-2xl tracking-widest font-heading">
            NETDOWN
          </a>
          <p className="text-neutral-white/70 text-sm mt-4 leading-relaxed font-sans max-w-xs">
            Plataforma de geração automática de requerimentos universitários de forma rápida, segura e acessível a qualquer momento.
          </p>

          {/* Linha decorativa */}
          <div className="w-10 h-[2px] bg-primary-dark mt-6"></div>
        </div>

        {/* Links */}
        <div className="flex flex-col gap-3">
          <h4 className="text-neutral-white font-bold text-xs uppercase tracking-widest font-heading mb-3">
            Navegação
          </h4>
          {footerLinks.map((link) => (
            
            <a  key={link.label}
              href={link.href}
              className="text-neutral-white/70 text-sm font-sans hover:text-neutral-white hover:translate-x-1 transition-all duration-200"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Contacto */}
        <div className="flex flex-col gap-3">
          <h4 className="text-neutral-white font-bold text-xs uppercase tracking-widest font-heading mb-3">
            Contacto
          </h4>
          <p className="text-neutral-white/70 text-sm font-sans">
            netdown@gmail.com
          </p>
          <p className="text-neutral-white/70 text-sm font-sans">
            Beira, Moçambique
          </p>
        </div>

        {/* CTA */}
        <div className="flex flex-col gap-3">
          <h4 className="text-neutral-white font-bold text-xs uppercase tracking-widest font-heading mb-3">
            Começa Agora
          </h4>
          <p className="text-neutral-white/70 text-sm font-sans max-w-xs leading-relaxed">
            Gera o teu requerimento académico em segundos.
          </p>
          
          <a  href="/gerar-documento"
            className="mt-2 inline-block bg-danger text-neutral-white text-xs font-semibold uppercase tracking-widest font-heading px-5 py-2 rounded hover:bg-danger-dark transition-all duration-200"
          >
            Gerar Requerimento
          </a>
        </div>

      </div>

      {/* Copyright */}
      <div className="border-t border-neutral-white/20 pt-6 flex justify-center">
        <p className="text-neutral-white/50 text-xs font-sans text-center">
          © {new Date().getFullYear()} NetDown. Todos os direitos reservados.
        </p>
      </div>

    </footer>
  );
}