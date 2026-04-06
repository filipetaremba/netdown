"use client";

import { useState } from "react";

export default function TestDocx() {
  const [nome, setNome] = useState("");
  const [idade, setIdade] = useState("");
  const [curso, setCurso] = useState("");
  const [template, setTemplate] = useState("contrato");
  

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const res = await fetch("/api/docx", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nome,
        idade: Number(idade),
        curso,
        template,
      }),
    });

    const blob = await res.blob();
    const url = URL.createObjectURL(blob);

    const filename = `${template}_${nome}.docx`;


    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();

    URL.revokeObjectURL(url);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Nome"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
      />

      <input
        type="number"
        placeholder="Idade"
        value={idade}
        onChange={(e) => setIdade(e.target.value)}
      />

      <input
        placeholder="Curso"
        value={curso}
        onChange={(e) => setCurso(e.target.value)}
      />

      <select
        value={template}
        onChange={(e) => setTemplate(e.target.value)}
      >
        <option value="certificado">Certificado</option>
        <option value="declaracao">Declaração</option>
        <option value="rendimento">Rendimento</option>
      </select>

      <button type="submit">Gerar</button>
    </form>
  );
}