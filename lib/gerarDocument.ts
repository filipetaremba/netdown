import fs from "fs";
import path from "path";
import PizZip from "pizzip";
import Docxtemplater from "docxtemplater";

type DocxData = {
    nome: string;
    idade: number;
    curso: string;
    template: "rendimento" | "declaracao" | "certificado";
    formato: "docx" | "pdf";
};

// templates permitidos
const TEMPLATE_MAP = {
    rendimento: "rendimento.docx",
    declaracao: "declaracao.docx",
    certificado: "certificado.docx",
} as const;

export function generateDocx(data: DocxData): Buffer {
    const templateFile = TEMPLATE_MAP[data.template];

    if (!templateFile) {
        throw new Error("Template inválido");
    }

    const filePath = path.join(
        process.cwd(),
        "public",
        "templates",
        templateFile
    );

    if (!fs.existsSync(filePath)) {
        throw new Error("Arquivo de template não encontrado");
    }

    const content = fs.readFileSync(filePath, "binary");

    const zip = new PizZip(content);

    const doc = new Docxtemplater(zip, {
        paragraphLoop: true,
        linebreaks: true,
    });

    doc.setData({
        nome: data.nome,
        idade: data.idade,
        curso: data.curso,
    });

    try {
        doc.render();
    } catch (error) {
        console.error("Erro ao renderizar DOCX:", error);
        throw new Error("Falha ao preencher o documento");
    }

    const docxBuffer = doc.getZip().generate({
        type: "nodebuffer",
        compression: "DEFLATE",
    });

    // ✔️ FUTURO: conversão para PDF
    if (data.formato === "pdf") {
        throw new Error("Conversão para PDF ainda não implementada");
    }

    return docxBuffer;
}