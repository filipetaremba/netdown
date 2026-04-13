// lib/types.ts
export type TipoDocumento =
  | "declaracao_vinculo"
  | "rendimento_pedagogico"
  | "certificado_conclusao"

export type DocxTemplate = "rendimento" | "declaracao" | "certificado"

export interface DadosUsuario {
  nome: string
  bi_numero: string
  bi_emissao_local: string
  bi_emissao_data: string
  cidade: string
  provincia: string
  nacionalidade: string
  periodo: string
  faculdade: string
  ano_lectivo: string
  registo_n: string
  curso: string
  ano_actual: number
  justificativo: string
  contacto: string
  data_actual: string
  tipo: TipoDocumento
}

export interface DocxRequestPayload {
  tipo: TipoDocumento
  dados: Partial<DadosUsuario>
}