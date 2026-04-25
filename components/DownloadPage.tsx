"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Button from "@/components/Button";

const documentLabels: Record<string, string> = {
  "rendimento-pedagogico": "Rendimento Pedagógico",
  "declaracao-vinculo": "Declaração de Vínculo",
  "certificado-conclusao": "Certificado de Conclusão",
  "diploma": "Diploma",
};

type DownloadPayload = {
  tipo: string;
  dados: Record<string, unknown>;
  formato?: "docx" | "pdf";
};

export default function DownloadPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [tipoLabel, setTipoLabel] = useState("");
  const [payload, setPayload] = useState<DownloadPayload | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const raw = searchParams.get("data");
    if (!raw) {
      router.replace("/gerar-documento");
      return;
    }

    try {
      const parsed = JSON.parse(decodeURIComponent(raw)) as DownloadPayload;
      const label =
        documentLabels[parsed.tipo] ??
        documentLabels[parsed.tipo.replace(/_/g, "-")] ??
        parsed.tipo;
      setTipoLabel(label);
      setPayload(parsed);
    } catch {
      router.replace("/gerar-documento");
    }
  }, [searchParams, router]);

  const handleDownload = async (format: "docx" | "pdf") => {
    if (!payload) return;

    setLoading(true);
    setError(null);

    try {
      if (format === "docx") {
        // Download direto DOCX
        const downloadPayload = { ...payload, formato: format };
        const response = await fetch("/api/docx", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(downloadPayload),
        });

        if (!response.ok) {
          const text = await response.text();
          throw new Error(text || "Erro ao gerar o documento");
        }

        const blob = await response.blob();
        downloadFile(blob, "docx", payload.tipo, payload.dados.nome as string);
      } else {
        // PDF via CloudConvert
        const downloadPayload = { ...payload, formato: "docx" };
        
        // 1. Gerar DOCX
        const docxResponse = await fetch("/api/docx", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(downloadPayload),
        });

        if (!docxResponse.ok) {
          const text = await docxResponse.text();
          throw new Error(text || "Erro ao gerar o documento");
        }

        const docxBlob = await docxResponse.blob();

        // 2. Enviar para CloudConvert
        const formData = new FormData();
        const fileName = `${payload.tipo}_${String(payload.dados.nome ?? "documento").replace(/\s+/g, "_").toLowerCase()}.docx`;
        formData.append("file", docxBlob, fileName);
        formData.append("fileName", fileName);

        const convertResponse = await fetch("/api/convert", {
          method: "POST",
          body: formData,
        });

        if (!convertResponse.ok) {
          const errorText = await convertResponse.text();
          console.error('Erro CloudConvert:', errorText);
          try {
            const errorJson = JSON.parse(errorText);
            throw new Error(errorJson.error || "Erro ao converter para PDF");
          } catch (e) {
            if (e instanceof SyntaxError) {
              throw new Error(errorText || "Erro ao converter para PDF");
            }
            throw e;
          }
        }

        const pdfBlob = await convertResponse.blob();
        downloadFile(pdfBlob, "pdf", payload.tipo, payload.dados.nome as string);
      }
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const downloadFile = (blob: Blob, extension: string, tipo: string, nome: string) => {
    const fileName = `${tipo}_${String(nome ?? "documento").replace(/\s+/g, "_").toLowerCase()}.${extension}`;
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = fileName;
    link.style.display = "none";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => URL.revokeObjectURL(link.href), 1000);
  };

  if (!tipoLabel) return null;

  return (
    <section className="w-full px-6 md:px-40 py-20">
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h1 className="text-primary font-bold text-3xl md:text-4xl tracking-wide font-heading mb-4">
          Documento Gerado com Sucesso
        </h1>
        <p className="text-neutral-dark/60 text-sm md:text-base font-sans leading-relaxed max-w-xl mx-auto">
          O teu requerimento de <span className="text-primary font-semibold">{tipoLabel}</span> está pronto para download.
        </p>
      </div>

      {error && <p className="text-red-600 mb-4">{error}</p>}
      <div className="flex justify-center gap-4">
        <Button label="FAZER DOWNLOAD DO DOCX" variant="primary" onClick={() => handleDownload("docx")} disabled={loading} />
        <Button label="FAZER DOWNLOAD DO PDF" variant="primary" onClick={() => handleDownload("pdf")} disabled={loading} />
      </div>
    </section>
  );
}
