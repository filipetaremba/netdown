// app/documentos/download/page.tsx
"use client"
import { useFormStore } from "@/store/useFormStore"
import { useState } from "react"
import Button from "@/components/Button"

export default function DownloadPage() {
  const { dados, tipo } = useFormStore()
  const [loadingFormat, setLoadingFormat] = useState<"docx" | "pdf" | null>(null)
  const [error, setError] = useState<string | null>(null)

  const hasData = !!dados && !!tipo && !!dados.nome

  const download = async (formato: "docx" | "pdf") => {
    if (!hasData) {
      setError("Dados incompletos. Volte e preencha o formulário corretamente.")
      return
    }

    setError(null)
    setLoadingFormat(formato)

    try {
      const response = await fetch("/api/docx", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ tipo, dados, formato }),
      })

      if (!response.ok) {
        const text = await response.text()
        throw new Error(text || "Erro ao gerar o documento")
      }

      const blob = await response.blob()
      const extension = formato === "pdf" ? "pdf" : "docx"
      const fileName = `${tipo}_${String(dados.nome).replace(/\s+/g, "_").toLowerCase()}.${extension}`
      const url = URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.href = url
      link.download = fileName
      link.style.display = "none"
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      setTimeout(() => URL.revokeObjectURL(url), 1000)
    } catch (err) {
      setError((err as Error).message)
    } finally {
      setLoadingFormat(null)
    }
  }

  return (
    <div className="min-h-screen bg-neutral-light flex items-center justify-center px-6 py-20">
      <div className="max-w-3xl w-full bg-white rounded-3xl shadow-xl p-10 text-center">
        <h1 className="text-3xl font-bold text-primary mb-4">Documento Pronto</h1>
        <p className="text-neutral-dark/60 mb-8">
          O teu requerimento está pronto para download. Escolhe o formato que preferes.
        </p>

        {error && <p className="text-red-600 mb-4">{error}</p>}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Button
            label={loadingFormat === "docx" ? "A baixar DOCX..." : "FAZER DOWNLOAD DO DOCX"}
            variant="primary"
            onClick={() => download("docx")}
            disabled={!!loadingFormat}
          />
          <Button
            label={loadingFormat === "pdf" ? "A baixar PDF..." : "FAZER DOWNLOAD EM PDF"}
            variant="outline"
            onClick={() => download("pdf")}
            disabled={!!loadingFormat}
          />
        </div>

        {!hasData && (
          <p className="text-red-600 mt-6">
            Não há dados suficientes para gerar o documento. Volte ao formulário.
          </p>
        )}
      </div>
    </div>
  )
}