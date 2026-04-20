// app/documentos/download/page.tsx
"use client"
import { useFormStore } from "@/store/useFormStore"
import { useState, useEffect } from "react"

export default function DownloadPage() {
  const { dados, tipo } = useFormStore()
  const [loadingFormat, setLoadingFormat] = useState<"docx" | "pdf" | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [autoDownloaded, setAutoDownloaded] = useState(false)

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

  useEffect(() => {
    if (hasData && !autoDownloaded) {
      setAutoDownloaded(true)
      download("docx")
    }
  }, [autoDownloaded, hasData])

  return (
    <div className="min-h-screen bg-neutral-light flex items-center justify-center px-6 py-20">
      <div className="max-w-3xl w-full bg-white rounded-3xl shadow-xl p-10 text-center">
        <h1 className="text-3xl font-bold text-primary mb-4">Documento Pronto</h1>
        <p className="text-neutral-dark/60 mb-8">
          O teu requerimento está pronto para download. Escolhe o formato que preferes.
        </p>

        {error ? (
          <div className="space-y-4">
            <p className="text-red-600 mb-4">{error}</p>
            <p className="text-neutral-dark/70 text-sm">
              Por favor volte ao formulário e verifique os dados antes de tentar novamente.
            </p>
          </div>
        ) : loadingFormat ? (
          <p className="text-neutral-dark/70 text-sm">A iniciar o download do documento... aguarde.</p>
        ) : hasData ? (
          <p className="text-neutral-dark/70 text-sm">
            Se o download não iniciar automaticamente, atualize a página ou volte ao formulário.
          </p>
        ) : (
          <p className="text-red-600 mt-6">
            Não há dados suficientes para gerar o documento. Volte ao formulário.
          </p>
        )}
      </div>
    </div>
  )
}