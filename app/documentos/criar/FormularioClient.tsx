"use client"

import type { ChangeEvent } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useState, useRef, useEffect } from "react"
import { useFormStore } from "@/store/useFormStore"
import FormField from "@/components/FormField"

const TITULO_DOCUMENTO: Record<string, string> = {
  rendimento_pedagogico: "Rendimento Pedagógico",
  declaracao_vinculo: "Declaração de Vínculo",
  certificado_conclusao: "Certificado de Conclusão de Curso",
  diploma: "Diploma",
  requerimento: "Requerimento",
}

const TIPOS_LISTA = Object.entries(TITULO_DOCUMENTO)

const PROVINCIAS = [
  "Cabo Delgado","Gaza","Inhambane","Manica",
  "Maputo Cidade","Maputo Província","Nampula",
  "Niassa","Sofala","Tete","Zambézia",
]

// ── Autocomplete de Província ──────────────────────────────────────────────
function ProvinciaField({
  value,
  onChange,
}: {
  value: string
  onChange: (val: string) => void
}) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const sugestoes = value.length > 0
    ? PROVINCIAS.filter((p) => p.toLowerCase().includes(value.toLowerCase()))
    : PROVINCIAS

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [])

  return (
    <div className="flex flex-col gap-1 relative" ref={ref}>
      <label className="text-xs font-medium text-[#1a3fcf] uppercase tracking-wide">
        Província
      </label>
      <input
        type="text"
        autoComplete="off"
        value={value}
        placeholder="Ex: Maputo Cidade"
        onChange={(e) => { onChange(e.target.value); setOpen(true) }}
        onFocus={() => setOpen(true)}
        className="border-b border-blue-300 py-2 text-sm outline-none focus:border-[#1a3fcf] bg-transparent placeholder-gray-300"
      />
      {open && sugestoes.length > 0 && (
        <ul className="absolute top-full left-0 right-0 z-20 bg-white border border-gray-200 rounded-lg shadow-lg mt-1 overflow-hidden">
          {sugestoes.map((p) => (
            <li
              key={p}
              onMouseDown={() => { onChange(p); setOpen(false) }}
              className={`px-4 py-2.5 text-sm cursor-pointer transition-colors hover:bg-[#1a3fcf] hover:text-white ${
                p === value ? "bg-[#1a3fcf]/10 text-[#1a3fcf] font-semibold" : "text-gray-700"
              }`}
            >
              {p}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

// ── Telefone com prefixo +258 ──────────────────────────────────────────────
function TelefoneField({
  value,
  onChange,
}: {
  value: string
  onChange: (val: string) => void
}) {
  const digits = value.startsWith("+258") ? value.slice(4) : value

  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs font-medium text-[#1a3fcf] uppercase tracking-wide">
        Contacto
      </label>
      <div className="flex items-end border-b border-blue-300 focus-within:border-[#1a3fcf] transition-colors">
        <span className="text-sm text-gray-400 pb-2 pr-1 select-none">+258</span>
        <input
          type="tel"
          inputMode="numeric"
          value={digits}
          placeholder="84 000 0000"
          maxLength={9}
          onChange={(e) => {
            const clean = e.target.value.replace(/\D/g, "").slice(0, 9)
            onChange("+258" + clean)
          }}
          className="flex-1 py-2 text-sm outline-none bg-transparent placeholder-gray-300"
        />
      </div>
    </div>
  )
}

// ── Dropdown de tipo de documento ──────────────────────────────────────────
function TipoDropdown({
  tipo,
  onChange,
}: {
  tipo: string
  onChange: (t: string) => void
}) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [])

  return (
    <div className="relative" ref={ref}>
      <p className="text-xs font-medium text-[#1a3fcf] uppercase tracking-wide mb-1">
        Minuta para
      </p>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 bg-[#1a3fcf] text-white text-xs font-bold uppercase tracking-widest px-4 py-2 rounded hover:bg-[#1530a8] transition-colors w-full text-left"
      >
        <span className="flex-1">{TITULO_DOCUMENTO[tipo] ?? tipo}</span>
        <svg
          className={`w-3.5 h-3.5 shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <ul className="absolute top-full left-0 right-0 z-20 bg-white border border-gray-200 rounded-lg shadow-xl mt-1 overflow-hidden">
          {TIPOS_LISTA.map(([t, label]) => (
            <li
              key={t}
              onMouseDown={() => { onChange(t); setOpen(false) }}
              className={`px-4 py-2.5 text-xs cursor-pointer font-bold uppercase tracking-wide transition-colors hover:bg-[#1a3fcf] hover:text-white ${
                t === tipo ? "bg-[#1a3fcf] text-white" : "text-gray-700"
              }`}
            >
              {label}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

// ── Página principal ───────────────────────────────────────────────────────
export default function FormularioClient() {
  const router = useRouter()
  const params = useSearchParams()
  const { dados, setDados, setTipo } = useFormStore()

  const [tipo, setTipoLocal] = useState(params.get("tipo") || "requerimento")

  const changeTipo = (t: string) => {
    setTipoLocal(t)
    window.history.replaceState(null, "", `/documentos/criar?tipo=${t}`)
  }

  const handle = (field: string) => (e: ChangeEvent<HTMLInputElement>) =>
    setDados({ [field]: e.target.value })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setTipo(tipo as any)
    setDados({ data_actual: new Date().toLocaleDateString("pt-MZ") })
    router.push("/documentos/download")
  }

  return (
    <div className="min-h-screen bg-white pt-24 pb-16 px-6">
      <div className="max-w-3xl mx-auto">

        {/* Cabeçalho */}
        <div className="text-center mb-10">
          <h1 className="text-2xl font-black text-[#1a3fcf] uppercase tracking-widest mb-3">
            Formulário
          </h1>
          <p className="text-gray-500 text-xs uppercase tracking-wide max-w-xl mx-auto">
            Preencha os campos com as suas informações para gerar o documento.
            Certifique-se de que os dados estão correctos antes de prosseguir.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

            {/* ── Dropdown de tipo — ocupa as 2 colunas, topo da grelha ── */}
            <div className="md:col-span-2">
              <TipoDropdown tipo={tipo} onChange={changeTipo} />
            </div>

            {/* ── Campos do formulário ── */}
            <FormField label="Nome Completo" name="nome"
              value={dados.nome || ""} onChange={handle("nome")} />

            <FormField label="Número do Bilhete de Identidade" name="bi_numero"
              placeholder="Ex: 120101234567B"
              value={dados.bi_numero || ""} onChange={handle("bi_numero")} />

            <FormField label="Local de Emissão do BI" name="bi_emissao_local"
              placeholder="Ex: Beira"
              value={dados.bi_emissao_local || ""} onChange={handle("bi_emissao_local")} />

            <FormField label="Data de Emissão do BI" name="bi_emissao_data" type="date"
              value={dados.bi_emissao_data || ""} onChange={handle("bi_emissao_data")} />

            <FormField label="Residência do Estudante" name="cidade"
              placeholder="Ex: Dondo"
              value={dados.cidade || ""} onChange={handle("cidade")} />

            <ProvinciaField
              value={dados.provincia || ""}
              onChange={(val) => setDados({ provincia: val })}
            />

            <FormField label="Nacionalidade" name="nacionalidade"
              value={dados.nacionalidade || "Moçambicana"} onChange={handle("nacionalidade")} />

            <FormField label="Período de Frequência" name="periodo"
              placeholder="Ex: Diurno"
              value={dados.periodo || ""} onChange={handle("periodo")} />

            <FormField label="Faculdade" name="faculdade"
              placeholder="Ex: Faculdade de Ciências e Tecnologia"
              value={dados.faculdade || ""} onChange={handle("faculdade")} />

            <FormField label="Ano Lectivo" name="ano_lectivo"
              placeholder="Ex: 2026"
              value={dados.ano_lectivo || ""} onChange={handle("ano_lectivo")} />

            <FormField label="Número do Estudante (Registo)" name="registo_n"
              placeholder="Ex: 20242321"
              value={dados.registo_n || ""} onChange={handle("registo_n")} />

            <FormField label="Curso" name="curso"
              placeholder="Ex: Engenharia Informática"
              value={dados.curso || ""} onChange={handle("curso")} />

            <FormField label="Ano Actual" name="ano_actual" type="number"
              placeholder="Ex: 3"
              value={dados.ano_actual?.toString() || ""}
              onChange={(e) => setDados({ ano_actual: Number(e.target.value) })} />

            <TelefoneField
              value={dados.contacto || ""}
              onChange={(val) => setDados({ contacto: val })}
            />

            {/* Justificativo — linha inteira */}
            <div className="md:col-span-2 flex flex-col gap-1">
              <label className="text-xs font-medium text-[#1a3fcf] uppercase tracking-wide">
                Justificativo
              </label>
              <input
                name="justificativo"
                type="text"
                value={dados.justificativo || ""}
                onChange={(e) => setDados({ justificativo: e.target.value })}
                placeholder="Ex: Para fins de estágio profissional na empresa X."
                className="border-b border-blue-300 py-2 text-sm outline-none focus:border-[#1a3fcf] bg-transparent placeholder-gray-300"
              />
            </div>

          </div>

          {/* Botão */}
          <div className="mt-12 flex justify-center">
            <button
              type="submit"
              className="bg-red-600 hover:bg-red-700 text-white text-xs font-bold uppercase tracking-widest px-16 py-4 transition-colors duration-200"
            >
              Gerar Documento
            </button>
          </div>
        </form>

      </div>
    </div>
  )
}