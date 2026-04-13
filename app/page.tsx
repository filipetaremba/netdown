"use client"

import Link from "next/link"

const NAVBAR_HEIGHT = 64

const scrollToSection = (sectionId: string) => {
  const el = document.getElementById(sectionId)
  if (el) {
    const top = el.getBoundingClientRect().top + window.scrollY - NAVBAR_HEIGHT
    window.scrollTo({ top, behavior: "smooth" })
  }
}

const documentos = [
  {
    titulo: "Rendimento Pedagogico",
    descricao: "Destinado à solicitação do histórico de desempenho académico do estudante.",
    tipo: "rendimento_pedagogico",
  },
  {
    titulo: "Declaração de Vinculo",
    descricao: "Utilizado para comprovar a inscrição ativa do estudante em instituições externas.",
    tipo: "declaracao_vinculo",
  },
  {
    titulo: "Certificado de Conclusao de Curso",
    descricao:
      "Documento que atesta a conclusão de um curso, indicando que o estudante cumpriu os requisitos académicos exigidos.",
    tipo: "certificado_conclusao",
  },
  {
    titulo: "Diploma",
    descricao: "Documento oficial que certifica a conclusão de um curso superior.",
    tipo: "diploma",
  },
]

const passos = [
  {
    n: "1",
    titulo: "Selecione o Documento",
    desc: "Escolha o tipo de documento académico que pretende gerar.",
  },
  {
    n: "2",
    titulo: "Preencha o Formulario",
    desc: "Insira as informações necessárias de forma clara e orientada.",
  },
  {
    n: "3",
    titulo: "Gerar o Documento",
    desc: "O sistema processa automaticamente os dados e cria o documento.",
  },
  {
    n: "4",
    titulo: "Faça o Download",
    desc: "O ficheiro é disponibilizado pronto para utilização.",
  },
]

export default function LandingPage() {
  return (
    <div className="font-sans">

      {/* ── HERO ── */}
      <section
        id="inicio"
        className="min-h-screen bg-[#f0f4ff] flex flex-col items-center justify-center text-center px-6 pt-16"
      >
        <h1 className="text-[#1a3fcf] text-4xl md:text-5xl font-black uppercase tracking-tight leading-tight max-w-2xl">
          Plataforma de Geração Automática de Documentos Universitários
        </h1>
        <p className="mt-6 text-gray-700 text-xs md:text-sm font-bold uppercase tracking-wider max-w-xl">
          Gera Requerimentos e Declarações Académicas de Forma Rápida Segura e Acessível a Qualquer Momento e em Qualquer Dispositivo.
        </p>
        <div className="mt-10 flex flex-wrap gap-4 justify-center">
          <Link
            href="/documentos"
            className="bg-red-600 hover:bg-red-700 text-white text-xs font-bold uppercase tracking-widest px-8 py-3 transition-colors duration-200"
          >
            Gerar Documento
          </Link>
          <button
            onClick={() => scrollToSection("como-funciona")}
            className="border border-[#1a3fcf] text-[#1a3fcf] hover:bg-[#1a3fcf] hover:text-white text-xs font-bold uppercase tracking-widest px-8 py-3 transition-colors duration-200"
          >
            Como Funciona?
          </button>
        </div>
      </section>

      {/* ── SOBRE ── */}
      <section id="sobre" className="py-24 px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <p className="text-[#1a3fcf] text-xs font-bold uppercase tracking-[0.3em] mb-2 text-center">Sobre</p>
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 text-center mb-10">NETDOWN</h2>
          <div className="text-gray-700 text-sm leading-relaxed space-y-4">
            <p>
              A NetDown é uma plataforma web dedicada à Geração Automática de Documentos Académicos de Forma Rápida, Segura e Padronizada. A NetDown é uma plataforma web dedicada à Geração Automática de Documentos Académicos de Forma Rápida, Segura e Padronizada.
            </p>
            <p>
              A NetDown é uma plataforma web dedicada à Geração Automática de Documentos Académicos de Forma Rápida, Segura e Padronizada.
            </p>
            <p>
              O Seu Objetivo é Garantir Consistência e Eficiência na Criação de Documentos Formais.
            </p>
            <p>
              Desenvolvido com uma Abordagem Leve, o Sistema Não Armazena Dados, Assegurando Privacidade e Uma Experiência Acessível.
            </p>
          </div>
        </div>
      </section>

      {/* Wave into Como Funciona */}
      <div className="bg-white">
        <svg viewBox="0 0 1440 60" preserveAspectRatio="none" className="w-full h-10 fill-[#f0f4ff]">
          <path d="M0,60 L1440,60 L1440,0 C1040,40 400,0 0,30 Z" />
        </svg>
      </div>

      {/* ── COMO FUNCIONA ── */}
      <section id="como-funciona" className="py-24 px-6 bg-[#f0f4ff]">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-black text-[#1a3fcf] text-center uppercase mb-4">Como Funciona?</h2>
          <p className="text-center text-gray-600 text-xs uppercase tracking-wide max-w-2xl mx-auto mb-12">
            A NetDown foi Desenvolvido para Tornar a Geração de Documentos Académicos um Processo Simples e Direto, Permitindo que o Utilizador Obtenha o Seu Documento em Poucos Passos.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {passos.map(({ n, titulo, desc }) => (
              <div
                key={n}
                className="bg-[#1a3fcf] text-white rounded-lg p-6 flex flex-col items-center text-center"
              >
                <span className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center font-black text-xl mb-4">
                  {n}
                </span>
                <h3 className="font-black text-xs uppercase tracking-wide mb-3">{titulo}</h3>
                <p className="text-white/80 text-xs leading-relaxed uppercase">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DOCUMENTOS ── */}
      <section id="documentos" className="py-16 px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-black text-[#1a3fcf] text-center uppercase mb-4">Documentos</h2>
          <p className="text-center text-gray-600 text-xs uppercase tracking-wide max-w-2xl mx-auto mb-10">
            Documentos Académicos que Podem ser Gerados Através da Plataforma, de Forma Padronizada e Pronta para Utilização.
          </p>
          <div className="flex flex-col gap-3">
            {documentos.map(({ titulo, descricao, tipo }) => (
              <div
                key={tipo}
                className="rounded-lg overflow-hidden border border-[#1a3fcf]/20"
              >
                <div className="bg-[#1a3fcf] px-5 py-3">
                  <h3 className="text-white font-black text-xs uppercase tracking-widest">{titulo}</h3>
                </div>
                <div className="bg-[#1a3fcf]/10 px-5 py-4 flex items-center justify-between gap-4">
                  <p className="text-gray-700 text-xs uppercase leading-relaxed">{descricao}</p>
                  <Link
                    href={`/documentos/criar?tipo=${tipo}`}
                    className="shrink-0 bg-red-600 hover:bg-red-700 text-white text-xs font-bold uppercase tracking-widest px-4 py-2 rounded transition-colors duration-200"
                  >
                    Gerar
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACTO ── */}
      <section id="contacto" className="relative">
        {/* Wave top */}
        <div className="w-full overflow-hidden leading-none bg-white">
          <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="w-full h-16 fill-[#1a3fcf]">
            <path d="M0,80 C400,0 1040,60 1440,20 L1440,80 Z" />
          </svg>
        </div>

        <div className="bg-[#1a3fcf] pb-20 px-6">
          <div className="max-w-xl mx-auto text-center">
            <h2 className="text-white font-black text-2xl uppercase tracking-wide mb-6">Contacto</h2>
            <p className="text-white text-xs uppercase leading-relaxed mb-10 max-w-md mx-auto">
              Se Tiver Alguma Dúvida, Sugestão ou Encontrar Algum Problema na Utilização da Plataforma, Entre em Contacto Connosco. Estamos Disponíveis para Apoiar e Melhorar Continuamente a Experiência do Netdown.
            </p>
            <form className="flex flex-col gap-6 text-left">
              <div>
                <label className="text-white text-xs font-bold uppercase tracking-widest block mb-1">Nome</label>
                <input
                  type="text"
                  name="nome"
                  className="w-full bg-transparent border-b border-white/60 focus:border-white text-white text-sm py-2 outline-none placeholder-white/30"
                />
              </div>
              <div>
                <label className="text-white text-xs font-bold uppercase tracking-widest block mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  className="w-full bg-transparent border-b border-white/60 focus:border-white text-white text-sm py-2 outline-none placeholder-white/30"
                />
              </div>
              <div>
                <label className="text-white text-xs font-bold uppercase tracking-widest block mb-1">Mensagem</label>
                <input
                  type="text"
                  name="mensagem"
                  className="w-full bg-transparent border-b border-white/60 focus:border-white text-white text-sm py-2 outline-none placeholder-white/30"
                />
              </div>
              <button
                type="submit"
                className="mt-2 bg-red-600 hover:bg-red-700 text-white text-xs font-bold uppercase tracking-widest py-4 transition-colors duration-200 w-full"
              >
                Enviar Mensagem
              </button>
            </form>
          </div>
        </div>
      </section>

    </div>
  )
}