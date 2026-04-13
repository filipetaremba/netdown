"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"

const NAV_LINKS = [
  { label: "Início", href: "inicio" },
  { label: "Sobre", href: "sobre" },
  { label: "Como Funciona", href: "como-funciona" },
  { label: "Documentos", href: "documentos" },
  { label: "Contacto", href: "contacto" },
]

const NAVBAR_HEIGHT = 64

export default function Navbar() {
  const pathname = usePathname()
  const isLanding = pathname === "/"
  const [menuOpen, setMenuOpen] = useState(false)

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId)
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - NAVBAR_HEIGHT
      window.scrollTo({ top, behavior: "smooth" })
    }
  }

  const handleNavClick = (e: React.MouseEvent, sectionId: string) => {
    if (isLanding) {
      e.preventDefault()
      scrollToSection(sectionId)
    }
    setMenuOpen(false)
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#1a3fcf] shadow-md">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="text-white font-black text-xl tracking-widest uppercase">
          NETDOWN
        </Link>

        {/* Links desktop */}
        <ul className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(({ label, href }) => (
            <li key={href}>
              <a
                href={isLanding ? `#${href}` : `/#${href}`}
                onClick={(e) => handleNavClick(e, href)}
                className="text-white/80 hover:text-white text-xs font-semibold uppercase tracking-widest transition-colors duration-200"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <Link
              href="/documentos/criar?tipo=declaracao_vinculo"   // ← muda aqui
              className="bg-red-600 hover:bg-red-700 text-white text-xs font-bold uppercase tracking-widest px-8 py-3 transition-colors duration-200"
            >
              Gerar Documento
            </Link>

        {/* Hamburguer mobile */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-white p-1"
          aria-label="Menu"
        >
          <span className={`block w-6 h-0.5 bg-white mb-1.5 transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block w-6 h-0.5 bg-white mb-1.5 transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      {/* Menu mobile */}
      {menuOpen && (
        <div className="md:hidden bg-[#1530a8] border-t border-white/10 px-6 py-4 flex flex-col gap-4">
          {NAV_LINKS.map(({ label, href }) => (
            <a
              key={href}
              href={isLanding ? `#${href}` : `/#${href}`}
              onClick={(e) => handleNavClick(e, href)}
              className="text-white/80 hover:text-white text-sm font-semibold uppercase tracking-widest transition-colors"
            >
              {label}
            </a>
          ))}
          <Link
              href="/documentos/criar?tipo=declaracao_vinculo"   // ← muda aqui
              className="bg-red-600 hover:bg-red-700 text-white text-xs font-bold uppercase tracking-widest px-8 py-3 transition-colors duration-200"
            >
              Gerar Documento
            </Link>
        </div>
      )}
    </nav>
  )
}