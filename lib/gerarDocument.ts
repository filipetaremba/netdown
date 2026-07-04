
//import path from "path";
import fs from "fs";
import PizZip from "pizzip";
import Docxtemplater from "docxtemplater";
import path from "path";

type DocxData = {
  // Dados do estudante
  nome_estudante: string;
  numero_BI: string;
  cidade_emissaoBI: string;
  data_emissaoBI: string;
  provincia_emissaoBI: string;
  cidade_residencia: string;
  provincia_residencia: string;
  nacionalidade: string;

  // Dados académicos
  periodo_frequentado: string;
  faculdade_: string;
  ano_actual: string;
  ano_lectivo: string;
  codigo_estudante: string;
  curso_frequentado: string;
  ano_do_curso: string;

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

function buildTextoRequerimento(data: DocxData): string {
  const nacionalidade = data.nacionalidade || "moçambicana";
  const cidadeResidencia = data.cidade_residencia || data.cidade_emissaoBI || "";
  const provinciaResidencia = data.provincia_residencia || data.provincia_emissaoBI || "";
  const anoLectivo = data.ano_lectivo || data.ano_actual || "";
  const anoCurso = data.ano_do_curso ? `${data.ano_do_curso} ano` : "";

  if (data.template === "declaracao") {
    return [
      `Exmo. Senhor Director do Registo Acadêmico da Universidade Zambeze`,
      `Beira`,
      `${data.nome_estudante}, portador do B.I. nº ${data.numero_BI} passado pelo Arquivo de Identificação Civil de ${data.cidade_emissaoBI}, em ${data.data_emissaoBI}, residente na cidade da ${cidadeResidencia}, Província de ${provinciaResidencia}, de Nacionalidade ${nacionalidade}, estudante nesta Universidade no ano lectivo de ${anoLectivo}, no período ${data.periodo_frequentado} na ${data.faculdade_}, com o registo académico nr: ${data.codigo_estudante}, no curso de ${data.curso_frequentado}${anoCurso ? ` ${anoCurso}` : ""}, vem mui respeitosamente requerer a V. Excia se digne autorizar a emissão da declaração de vínculo, pelo que;`,
      "",
      "Pede deferimento",
      `Beira aos, ${data.data_do_dia}`,
      "———————————————————-",
      `(${data.nome_estudante})`,
      "",
      `Contacto: ${data.contacto_estudante}`,
    ].join("\n");
  }

  return [
    `Eu, ${data.nome_estudante},`,
    `portador do B.I nº ${data.numero_BI},`,
    `emitido pelo Arquivo de Identificação Civil da cidade da ${data.cidade_emissaoBI} em ${data.data_emissaoBI},`,
    `residente na cidade da ${cidadeResidencia},`,
    `província de ${provinciaResidencia},`,
    `de nacionalidade ${nacionalidade},`,
    `estudante desta universidade no período ${data.periodo_frequentado} na ${data.faculdade_},`,
    `no ano lectivo de ${anoLectivo},`,
    `com registro acadêmico nº ${data.codigo_estudante},`,
    `no curso de ${data.curso_frequentado},`,
    `vem, mui respeitosamente, requerer a V.Excia se digne a autorizar o levantamento do rendimento pedagógico do ${data.ano_pretende_levantar}º ano,`,
    `referente ao ${data.semestre_pretendido}, pelo que:`,
  ].join(" ");
}

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
    cidade_residencia: data.cidade_residencia || data.cidade_emissaoBI,
    provincia_residencia: data.provincia_residencia || data.provincia_emissaoBI,
    nacionalidade: data.nacionalidade,

    // Dados académicos
    periodo_frequentado: data.periodo_frequentado,
    faculdade_: data.faculdade_,
    ano_actual: data.ano_actual,
    ano_lectivo: data.ano_lectivo || data.ano_actual,
    codigo_estudante: data.codigo_estudante,
    curso_frequentado: data.curso_frequentado,
    ano_do_curso: data.ano_do_curso,

    // Dados do requerimento
    ano_pretende_levantar: data.ano_pretende_levantar,
    semestre_pretendido: data.semestre_pretendido,
    data_do_dia: data.data_do_dia,
    texto_requerimento: buildTextoRequerimento(data),

    // Contacto
    contacto_estudante: data.contacto_estudante,
  });

  try {
    doc.render();
  } catch (error) {
    console.error("Erro ao renderizar DOCX:", error);
    throw new Error("Falha ao preencher o documento");
  }

  // Sempre retornar DOCX - conversão para PDF é feita via CloudConvert no endpoint /api/convert
  const docxBuffer = doc.getZip().generate({
    type: "nodebuffer",
    compression: "DEFLATE",
  });

  return docxBuffer;
}