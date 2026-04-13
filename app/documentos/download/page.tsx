// app/documentos/download/page.tsx
"use client"
import { useFormStore } from "@/store/useFormStore"
import { useEffect, useState } from "react"

export default function DownloadPage() {
  const { dados, tipo } = useFormStore()
  const [blob, setBlob] = useState<string | null>(null)

  useEffect(() => {
    // Chama Server Action ou API Route para gerar o documento
    fetch("/api/docx", {
      method: "POST",
      body: JSON.stringify({ dados, tipo }),
    })
      .then((r) => r.blob())
      .then((b) => setBlob(URL.createObjectURL(b)))
  }, [])

  return (
    <div className="text-center p-12">
      <h1 className="text-xl font-bold">O teu documento está pronto</h1>
      {blob && <a href={blob} download="documento.docx" className="mt-4 bg-blue-600 text-white px-6 py-2 rounded inline-block">
        Fazer Download
      </a>}
    </div>
  )
}