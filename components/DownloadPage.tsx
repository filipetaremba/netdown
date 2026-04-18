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

export default function DownloadPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [tipoLabel, setTipoLabel] = useState("");

  useEffect(() => {
    const raw = searchParams.get("data");
    if (!raw) { router.replace("/gerar-documento"); return; }
    try {
      const parsed = JSON.parse(decodeURIComponent(raw));
      setTipoLabel(documentLabels[parsed.tipoDocumento] ?? parsed.tipoDocumento);
    } catch {
      router.replace("/gerar-documento");
    }
  }, [searchParams, router]);

  const handleDownload = () => {
    // Integra aqui a tua API de geração de PDF
    // Ex: window.open("/api/gerar-pdf?data=...", "_blank")
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

      <div className="flex justify-center">
        <Button label="FAZER DOWNLOAD DO PDF" variant="primary" onClick={handleDownload} />
      </div>
    </section>
  );
}
