"use client";

import { useState, useEffect, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Input from "@/components/Input";
import Select from "@/components/Select";
import Button from "@/components/Button";
import ProgressModal from "@/components/ProgressModal";

const documentTypes = [
  { label: "Rendimento Pedagógico", value: "rendimento-pedagogico" },
  { label: "Declaração de Vínculo", value: "declaracao-vinculo" },
  { label: "Certificado de Conclusão", value: "certificado-conclusao" },
  { label: "Diploma", value: "diploma" },
];

export default function GerarDocumentoForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isGenerating, setIsGenerating] = useState(false);

  const [form, setForm] = useState({
    nome: "",
    numeroBilhete: "",
    localEmissao: "",
    dataEmissao: "",
    residencia: "",
    provincia: "",
    nacionalidade: "",
    periodoFrequencia: "",
    faculdade: "",
    anoLectivo: "",
    numeroEstudante: "",
    curso: "",
    ano: "",
    tipoDocumento: "",
  });

  useEffect(() => {
    const tipo = searchParams.get("tipo");
    if (tipo) {
      setForm((prev) => ({ ...prev, tipoDocumento: tipo }));
    }
  }, [searchParams]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!form.nome || !form.numeroEstudante || !form.curso || !form.tipoDocumento) {
      alert("Por favor preenche os campos obrigatórios: Nome, Nº Estudante, Curso e Tipo de Documento.");
      return;
    }
    setIsGenerating(true);
  };

  const handleGenerateComplete = useCallback(() => {
    const encoded = encodeURIComponent(JSON.stringify(form));
    router.push(`/download?data=${encoded}`);
  }, [form, router]);

  const documentoSelecionado = documentTypes.find(d => d.value === form.tipoDocumento);

  return (
    <>
      {isGenerating && <ProgressModal onComplete={handleGenerateComplete} />}

      <section className="w-full px-6 md:px-40 py-20">

        <div className="max-w-4xl mx-auto text-center mb-12">
          <h1 className="text-primary font-bold text-3xl md:text-4xl tracking-wide font-heading mb-4">
            Gerar Requerimento
          </h1>
          <p className="text-neutral-dark/60 text-sm md:text-base font-sans leading-relaxed max-w-xl mx-auto">
            Seleccione o tipo de documento e preencha os campos com as suas informações académicas.
          </p>
        </div>

        <div className="max-w-4xl mx-auto mb-10">
          <Select
            label="Seleccione o Tipo de Documento"
            name="tipoDocumento"
            value={form.tipoDocumento}
            options={documentTypes}
            onChange={handleChange}
          />
        </div>

        {form.tipoDocumento && (
          <div className="animate-fadeIn max-w-4xl mx-auto">

            <div className="flex items-center gap-4 mb-8">
              <div className="flex-1 h-[1px] bg-neutral-dark/20"></div>
              <p className="text-neutral-dark/50 text-xs uppercase tracking-widest font-heading">
                Preencha os seus dados
              </p>
              <div className="flex-1 h-[1px] bg-neutral-dark/20"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Input label="Nome" name="nome" placeholder="Ex: João Silva" value={form.nome} onChange={handleChange} />
              <Input label="Numero de Bilhete de Identidade" name="numeroBilhete" placeholder="Ex: 123456789A" value={form.numeroBilhete} onChange={handleChange} />
              <Input label="Local de Emissão" name="localEmissao" placeholder="Ex: Beira" value={form.localEmissao} onChange={handleChange} />
              <Input label="Data de Emissão" name="dataEmissao" type="date" value={form.dataEmissao} onChange={handleChange} />
              <Input label="Residência do Estudante" name="residencia" placeholder="Ex: Beira" value={form.residencia} onChange={handleChange} />
              <Input label="Província" name="provincia" placeholder="Ex: Sofala" value={form.provincia} onChange={handleChange} />
              <Input label="Nacionalidade" name="nacionalidade" placeholder="Ex: Moçambicana" value={form.nacionalidade} onChange={handleChange} />
              <Input label="Período de Frequência" name="periodoFrequencia" placeholder="Ex: Laboral/Pos Laboral" value={form.periodoFrequencia} onChange={handleChange} />
              <Input label="Faculdade" name="faculdade" placeholder="Ex: Faculdade de Ciências e Tecnologias" value={form.faculdade} onChange={handleChange} />
              <Input label="Ano Lectivo" name="anoLectivo" placeholder="Ex: 2025" value={form.anoLectivo} onChange={handleChange} />
              <Input label="Número do Estudante" name="numeroEstudante" placeholder="Ex: 2021001234" value={form.numeroEstudante} onChange={handleChange} />
              <Input label="Curso" name="curso" placeholder="Ex: Engenharia Informática" value={form.curso} onChange={handleChange} />
              <Input label="Ano" name="ano" placeholder="Ex: 4" value={form.ano} onChange={handleChange} />

              <div className="flex flex-col gap-1 w-full">
                <label className="text-primary text-xs font-semibold uppercase tracking-widest font-heading">
                  Minuta para Pedido de
                </label>
                <div className="w-full px-4 py-2 bg-primary rounded text-neutral-white text-sm font-heading font-semibold uppercase tracking-widest text-center">
                  {documentoSelecionado?.label}
                </div>
              </div>
            </div>

            <div className="flex justify-center mt-12">
              <Button label="GERAR DOCUMENTO" variant="primary" onClick={handleSubmit} />
            </div>

          </div>
        )}

      </section>
    </>
  );
}
