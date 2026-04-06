export async function gerarDocx(data: {
  nome: string;
  idade: number;
  curso: string;
  template: string;
}) {
  const res = await fetch("/api/docx", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Erro ao gerar documento");
  }

  return res.blob();
}