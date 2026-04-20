
//import path from "path";
import fs from "fs";
import PizZip from "pizzip";
import Docxtemplater from "docxtemplater";
import path from "path";
import libreofficeConvert from "libreoffice-convert";

type DocxData = {
  // Dados do estudante
  nome_estudante: string;
  numero_BI: string;
  cidade_emissaoBI: string;
  data_emissaoBI: string;
  provincia_emissaoBI: string;

  // Dados académicos
  periodo_frequentado: string;
  faculdade_: string;
  ano_actual: string;
  codigo_estudante: string;
  curso_frequentado: string;

  // Dados do requerimento
  ano_pretende_levantar: number;
  semestre_pretendido: string;
  data_do_dia: string;

  // Contacto
  contacto_estudante: string;

  // Metadados do documento
  template: "rendimento" | "declaracao" | "certificado";
  formato: "docx" | "pdf";
};

const TEMPLATE_MAP = {
  rendimento: "rendimento_pedagogico.docx",
  declaracao: "declaracao_vinculo.docx",
  certificado: "certificado.docx",
} as const;

export async function generateDocx(data: DocxData): Promise<Buffer> {
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
    // Dados do estudante
    nome_estudante: data.nome_estudante,
    numero_BI: data.numero_BI,
    cidade_emissaoBI: data.cidade_emissaoBI,
    data_emissaoBI: data.data_emissaoBI,
    provincia_emissaoBI: data.provincia_emissaoBI,

    // Dados académicos
    periodo_frequentado: data.periodo_frequentado,
    faculdade_: data.faculdade_,
    ano_actual: data.ano_actual,
    codigo_estudante: data.codigo_estudante,
    curso_frequentado: data.curso_frequentado,

    // Dados do requerimento
    ano_pretende_levantar: data.ano_pretende_levantar,
    semestre_pretendido: data.semestre_pretendido,
    data_do_dia: data.data_do_dia,

    // Contacto
    contacto_estudante: data.contacto_estudante,
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

  if (data.formato === "pdf") {
    return await new Promise<Buffer>((resolve, reject) => {
      libreofficeConvert.convert(docxBuffer, ".pdf", undefined, (err, done) => {
        if (err) {
          console.error("Erro na conversão para PDF:", err);
          reject(new Error("Falha ao converter documento para PDF. Verifique se o LibreOffice está instalado."));
          return;
        }
        resolve(done as Buffer);
      });
    });
  }

  return docxBuffer;
}