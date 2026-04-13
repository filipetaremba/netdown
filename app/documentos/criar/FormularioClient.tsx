"use client"
import type { ChangeEvent } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useFormStore } from "@/store/useFormStore"
import FormField from "@/components/FormField"

export default function FormularioClient() {
  const router = useRouter()
  const params = useSearchParams()
  const { dados, setDados, setTipo } = useFormStore()

  const tipo = params.get("tipo") || "requerimento"

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setTipo(tipo as any)
    setDados({ data_actual: new Date().toLocaleDateString("pt-MZ") })
    router.push("/documentos/download")
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto p-8">
      <h1 className="text-2xl font-bold text-blue-600 mb-6">Formulário</h1>
      <div className="grid grid-cols-2 gap-6">
        <FormField
          label="Nome"
          name="nome"
          value={dados.nome || ""}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setDados({ nome: e.target.value })}
        />
        <FormField
          label="Número do BI"
          name="bi_numero"
          value={dados.bi_numero || ""}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setDados({ bi_numero: e.target.value })}
        />
        {/* ... restantes campos ... */}
      </div>
      <button type="submit" className="mt-8 bg-red-600 text-white px-8 py-3 rounded">
        Gerar Documento
      </button>
    </form>
  )
}
