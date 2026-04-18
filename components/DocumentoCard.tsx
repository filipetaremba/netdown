// components/DocumentoCard.tsx
import Link from "next/link"
import { TipoDocumento } from "@/lib/types"

interface Props {
  titulo: string
  descricao: string
  tipo: TipoDocumento
}

export default function DocumentoCard({ titulo, descricao, tipo }: Props) {
  return (
    <Link href={`/documentos/formulario?tipo=${tipo}`}>
      <div className="bg-blue-700 text-white p-4 rounded-lg hover:bg-blue-800 cursor-pointer">
        <h3 className="font-bold text-sm uppercase">{titulo}</h3>
        <p className="text-xs text-blue-200 mt-1">{descricao}</p>
      </div>
    </Link>
  )
}