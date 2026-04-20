import { generateDocx } from "../../../lib/gerarDocument"
import type { DadosUsuario, TipoDocumento } from "@/lib/types"

type DocxApiRequest = {
  tipo?: TipoDocumento
  template?: "rendimento" | "declaracao" | "certificado"
  dados?: Partial<DadosUsuario>
  nome_estudante?: string
  numero_BI?: string
  cidade_emissaoBI?: string
  data_emissaoBI?: string
  provincia_emissaoBI?: string
  periodo_frequentado?: string
  faculdade_?: string
  ano_actual?: string | number
  codigo_estudante?: string
  curso_frequentado?: string
  ano_pretende_levantar?: number
  semestre_pretendido?: string
  data_do_dia?: string
  contacto_estudante?: string
  formato?: "docx" | "pdf"
}

type DocxData = {
  nome_estudante: string
  numero_BI: string
  cidade_emissaoBI: string
  data_emissaoBI: string
  provincia_emissaoBI: string
  periodo_frequentado: string
  faculdade_: string
  ano_actual: string
  codigo_estudante: string
  curso_frequentado: string
  ano_pretende_levantar: number
  semestre_pretendido: string
  data_do_dia: string
  contacto_estudante: string
  template: "rendimento" | "declaracao" | "certificado"
  formato: "docx" | "pdf"
}

const TEMPLATE_MAP: Record<TipoDocumento, DocxData["template"]> = {
  rendimento_pedagogico: "rendimento",
  declaracao_vinculo: "declaracao",
  certificado_conclusao: "certificado",
}

function normalizeTipo(tipo?: string): TipoDocumento | undefined {
  if (!tipo) return undefined
  const normalized = tipo.replace(/-/g, "_")
  if (normalized === "rendimento_pedagogico" || normalized === "declaracao_vinculo" || normalized === "certificado_conclusao") {
    return normalized as TipoDocumento
  }
  return undefined
}

function getTemplate(payload: DocxApiRequest): DocxData["template"] {
  if (payload.template) return payload.template
  const tipo = normalizeTipo(payload.tipo)
  if (tipo && TEMPLATE_MAP[tipo]) return TEMPLATE_MAP[tipo]
  throw new Error("Tipo de documento inválido ou não suportado")
}

function buildDocxData(payload: DocxApiRequest): DocxData {
  const source = (payload.dados ?? payload) as Partial<DadosUsuario> & DocxApiRequest
  const template = getTemplate(payload)
  const formato = payload.formato === "pdf" ? "pdf" : "docx"

  if (!source.nome && !source.nome_estudante) {
    throw new Error("Campo 'nome' é obrigatório")
  }

  return {
    nome_estudante: source.nome || source.nome_estudante || "",
    numero_BI: source.bi_numero || source.numero_BI || "",
    cidade_emissaoBI: source.bi_emissao_local || source.cidade_emissaoBI || "",
    data_emissaoBI: source.bi_emissao_data || source.data_emissaoBI || "",
    provincia_emissaoBI: source.provincia || source.provincia_emissaoBI || "",
    periodo_frequentado: source.periodo || source.periodo_frequentado || "",
    faculdade_: source.faculdade || source.faculdade_ || "",
    ano_actual: String(source.ano_actual ?? ""),
    codigo_estudante: source.registo_n || source.codigo_estudante || "",
    curso_frequentado: source.curso || source.curso_frequentado || "",
    ano_pretende_levantar: Number(source.ano_lectivo || source.ano_pretende_levantar || 0),
    semestre_pretendido: source.justificativo || source.semestre_pretendido || "",
    data_do_dia: source.data_actual || source.data_do_dia || new Date().toLocaleDateString("pt-MZ"),
    contacto_estudante: source.contacto || source.contacto_estudante || "",
    template,
    formato,
  }
}

export async function POST(req: Request) {
  try {
    const payload = (await req.json()) as DocxApiRequest
    const docxData = buildDocxData(payload)
    const buffer = await generateDocx(docxData)
    const extension = docxData.formato === "pdf" ? "pdf" : "docx"
    const contentType = docxData.formato === "pdf"
      ? "application/pdf"
      : "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    const fileName = `${docxData.template}_${docxData.nome_estudante.replace(/\s+/g, "_").toLowerCase()}.${extension}`

    return new Response(Buffer.from(buffer), {
      headers: {
        "Content-Type": contentType,
        "Content-Disposition": `attachment; filename="${fileName}"`,
      },
    })

  } catch (error) {
    return new Response((error as Error).message || "Erro ao gerar documento", { status: 500 })
  }
}