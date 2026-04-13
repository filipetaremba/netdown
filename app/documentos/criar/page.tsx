import { Suspense } from "react"
import FormularioClient from "./FormularioClient"

export const dynamic = "force-dynamic"

export default function Page() {
  return (
    <Suspense fallback={null}>
      <FormularioClient />
    </Suspense>
  )
}
