"use client";

import { useState } from "react";

export default function TestDocx() {
  const [nome, setNome] = useState("");
  const [idade, setIdade] = useState("");
  const [curso, setCurso] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/docx", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nome,
          idade: Number(idade),
          curso,
        }),
      });

      if (!res.ok) {
        throw new Error("Erro ao gerar documento");
      }

      // receber o arquivo
      const blob = await res.blob();

      // criar URL temporária
      const url = window.URL.createObjectURL(blob);

      // criar link invisível
      const a = document.createElement("a");
      a.href = url;
      a.download = "resultado.docx";
      document.body.appendChild(a);
      a.click();

      // limpar
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      alert("Erro ao gerar documento");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Teste de Geração de DOCX</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <input
            placeholder="Nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </div>

        <div>
          <input
            type="number"
            placeholder="Idade"
            value={idade}
            onChange={(e) => setIdade(e.target.value)}
            required
          />
        </div>

        <div>
          <input
            placeholder="Curso"
            value={curso}
            onChange={(e) => setCurso(e.target.value)}
            required
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Gerando..." : "Gerar DOCX"}
        </button>
      </form>
    </div>
  );
}