import { generateDocx } from "../../../lib/gerarDocument";

export async function POST(req: Request) {
    try {
        const data = await req.json();

        const buffer = generateDocx(data);

       const fileName = `${data.template}_${data.nome_estudante.replace(/\s+/g, "_").toLowerCase()}.docx`;

        return new Response(Buffer.from(buffer), {
            headers: {
                "Content-Type":
                    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                "Content-Disposition": `attachment; filename="${fileName}"`,
            },
        });

    } catch (error) {
        return new Response("Erro ao gerar documento", { status: 500 });
    }
}