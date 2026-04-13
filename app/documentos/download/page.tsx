// app/documentos/download/page.tsx
"use client"
import { useFormStore } from "@/store/useFormStore"
import { useEffect, useState } from "react"

export default function DownloadPage() {
  const { dados, tipo } = useFormStore()
  const [blobUrl, setBlobUrl] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!dados || !tipo || !dados.nome) {
      setError("Dados incompletos. Volte e preencha o formulário corretamente.")
      return
    }

    const controller = new AbortController()
    setLoading(true)
    setError(null)

    async function generateDocument() {
      try {
        const response = await fetch("/api/docx", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ tipo, dados }),
          signal: controller.signal,
        })

        if (!response.ok) {
          const text = await response.text()
          throw new Error(text || "Erro ao gerar o documento")
        }

        const blob = await response.blob()
        setBlobUrl(URL.createObjectURL(blob))
      } catch (err) {
        if ((err as any).name === "AbortError") return
        setError((err as Error).message)
      } finally {
        setLoading(false)
      }
    }

    generateDocument()

    return () => {
      controller.abort()
      if (blobUrl) {
        URL.revokeObjectURL(blobUrl)
      }
    }
  }, [dados, tipo])

  return (
    <div className="text-center p-12">
      <h1 className="text-xl font-bold">O teu documento está pronto</h1>
      {loading && <p>Gerando documento...</p>}
      {error && <p className="text-red-600">{error}</p>}
      {blobUrl && !loading && (
        <a
          href={blobUrl}
          download="documento.docx"
          className="mt-4 bg-blue-600 text-white px-6 py-2 rounded inline-block"
        >
          Fazer Download
        </a>
      )}
    </div>
  )
}