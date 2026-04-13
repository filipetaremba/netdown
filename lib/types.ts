// lib/types.ts
export type TipoDocumento =
  | "requerimento"
  | "declaracao_vinculo"
  | "rendimento_pedagogico"
  | "certificado_conclusao"
  | "diploma"

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