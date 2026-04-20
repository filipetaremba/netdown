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
    anoPretendeLevantar: "",
    semestrePretendido: "",
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
      alert("Por favor preencha os campos obrigatórios: Nome, Nº Estudante, Curso e Tipo de Documento.");
      return;
    }

    if (form.tipoDocumento === "rendimento-pedagogico" && (!form.anoPretendeLevantar || !form.semestrePretendido)) {
      alert("Por favor preencha o ano e o semestre pretendido para o rendimento pedagógico.");
      return;
    }

    setIsGenerating(true);
  };

  const documentTypeMap: Record<string, string> = {
    "rendimento-pedagogico": "rendimento_pedagogico",
    "declaracao-vinculo": "declaracao_vinculo",
    "certificado-conclusao": "certificado_conclusao",
    diploma: "rendimento_pedagogico",
  };

  const handleGenerateComplete = useCallback(() => {
    const apiTipo = documentTypeMap[form.tipoDocumento] ?? form.tipoDocumento;

    const payload = {
      tipo: apiTipo,
      dados: {
        nome: form.nome,
        bi_numero: form.numeroBilhete,
        bi_emissao_local: form.localEmissao,
        bi_emissao_data: form.dataEmissao,
        cidade: form.residencia,
        provincia: form.provincia,
        nacionalidade: form.nacionalidade,
        periodo: form.periodoFrequencia,
        faculdade: form.faculdade,
        ano_lectivo: form.anoLectivo,
        registo_n: form.numeroEstudante,
        curso: form.curso,
        ano_actual: Number(form.ano) || 0,
        ano_pretende_levantar: Number(form.anoPretendeLevantar) || 0,
        semestre_pretendido: form.semestrePretendido,
        data_actual: new Date().toLocaleDateString("pt-MZ"),
      },
    };
    const encoded = encodeURIComponent(JSON.stringify(payload));
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

              {form.tipoDocumento === "rendimento-pedagogico" && (
                <>
                  <Input
                    label="Ano que pretende levantar"
                    name="anoPretendeLevantar"
                    type="number"
                    placeholder="Ex: 3"
                    value={form.anoPretendeLevantar}
                    onChange={handleChange}
                  />

                  <div className="flex flex-col gap-1">
                    <label className="text-primary text-xs font-semibold uppercase tracking-widest font-heading">
                      Semestre pretendido
                    </label>
                    <select
                      name="semestrePretendido"
                      value={form.semestrePretendido}
                      onChange={handleChange}
                      className="border border-primary/30 rounded px-3 py-2.5 text-sm text-gray-800 outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 bg-white transition-colors duration-200"
                    >
                      <option value="">Selecione o semestre</option>
                      <option value="1º Semestre">1º Semestre</option>
                      <option value="2º Semestre">2º Semestre</option>
                      <option value="1º e 2º Semestre">1º e 2º Semestre</option>
                    </select>
                  </div>
                </>
              )}

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
