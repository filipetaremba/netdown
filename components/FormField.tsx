"use client"

import type { ChangeEvent } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useFormStore } from "@/store/useFormStore"
import FormField from "@/components/FormField"

const TITULO_DOCUMENTO: Record<string, string> = {
  rendimento_pedagogico: "Rendimento Pedagógico",
  declaracao_vinculo: "Declaração de Vínculo",
  certificado_conclusao: "Certificado de Conclusão de Curso",
  diploma: "Diploma",
  requerimento: "Requerimento",
}

export default function FormularioClient() {
  const router = useRouter()
  const params = useSearchParams()
  const { dados, setDados, setTipo } = useFormStore()
  const tipo = params.get("tipo") || "requerimento"

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

        {/* Badge do tipo de documento */}
        <div className="flex justify-center mb-10">
          <span className="bg-[#1a3fcf] text-white text-xs font-bold uppercase tracking-widest px-5 py-2 rounded">
            Minuta para: {TITULO_DOCUMENTO[tipo] ?? tipo}
          </span>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

            <FormField
              label="Nome Completo"
              name="nome"
              value={dados.nome || ""}
              onChange={handle("nome")}
            />

            <FormField
              label="Número do Bilhete de Identidade"
              name="bi_numero"
              value={dados.bi_numero || ""}
              onChange={handle("bi_numero")}
            />

            <FormField
              label="Local de Emissão do BI"
              name="bi_emissao_local"
              value={dados.bi_emissao_local || ""}
              onChange={handle("bi_emissao_local")}
            />

            <FormField
              label="Data de Emissão do BI"
              name="bi_emissao_data"
              type="date"
              value={dados.bi_emissao_data || ""}
              onChange={handle("bi_emissao_data")}
            />

            <FormField
              label="Residência do Estudante"
              name="cidade"
              value={dados.cidade || ""}
              onChange={handle("cidade")}
            />

            <FormField
              label="Província"
              name="provincia"
              value={dados.provincia || ""}
              onChange={handle("provincia")}
            />

            <FormField
              label="Nacionalidade"
              name="nacionalidade"
              value={dados.nacionalidade || ""}
              onChange={handle("nacionalidade")}
            />

            <FormField
              label="Período de Frequência"
              name="periodo"
              value={dados.periodo || ""}
              onChange={handle("periodo")}
            />

            <FormField
              label="Faculdade"
              name="faculdade"
              value={dados.faculdade || ""}
              onChange={handle("faculdade")}
            />

            <FormField
              label="Ano Lectivo"
              name="ano_lectivo"
              value={dados.ano_lectivo || ""}
              onChange={handle("ano_lectivo")}
            />

            <FormField
              label="Número do Estudante (Registo)"
              name="registo_n"
              value={dados.registo_n || ""}
              onChange={handle("registo_n")}
            />

            <FormField
              label="Curso"
              name="curso"
              value={dados.curso || ""}
              onChange={handle("curso")}
            />

            <FormField
              label="Ano Actual"
              name="ano_actual"
              type="number"
              value={dados.ano_actual?.toString() || ""}
              onChange={(e) => setDados({ ano_actual: Number(e.target.value) })}
            />

            <FormField
              label="Contacto"
              name="contacto"
              type="tel"
              value={dados.contacto || ""}
              onChange={handle("contacto")}
            />

            {/* Justificativo — ocupa linha inteira */}
            <div className="md:col-span-2 flex flex-col gap-1">
              <label className="text-xs font-medium text-[#1a3fcf] uppercase tracking-wide">
                Justificativo
              </label>
              <input
                name="justificativo"
                type="text"
                value={dados.justificativo || ""}
                onChange={(e) => setDados({ justificativo: e.target.value })}
                className="border-b border-blue-300 py-2 text-sm outline-none focus:border-[#1a3fcf] bg-transparent"
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