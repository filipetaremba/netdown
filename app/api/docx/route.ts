import { generateDocx } from "../../../lib/gerarDocument";

type DocxRequestBody = {
  nome: string;
  idade: number;
  curso: string;
  template?: string;
  formato?: string;
};

function validateBody(data: unknown): data is DocxRequestBody {
  return (
    typeof data === "object" &&
    data !== null &&
    "nome" in data &&
    "idade" in data &&
    "curso" in data
  );
}

export async function POST(req: Request) {
    try {
        const body = await req.json();

        if (!validateBody(body)) {
            return new Response(JSON.stringify({ error: "Dados inválidos" }), {
                status: 400,
                headers: { "Content-Type": "application/json" },
            });
        }

        const data = {
            nome: body.nome,
            idade: body.idade,
            curso: body.curso,
            template: body.template ?? "rendimento",
            formato: body.formato ?? "docx",
        };

        const buffer = generateDocx(data as any);

        const fileName = `${data.template}_${data.nome}.docx`;

        return new Response(Buffer.from(buffer), {
            headers: {
                "Content-Type":
                    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                "Content-Disposition": `attachment; filename="${fileName}"`,
            },
        });

    } catch (error) {
        console.error("Erro na API /api/docx:", error);
        return new Response(JSON.stringify({ error: "Erro ao gerar documento" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}
