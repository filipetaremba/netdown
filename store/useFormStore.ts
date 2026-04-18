// store/useFormStore.ts
import { create } from "zustand"
import { DadosUsuario, TipoDocumento } from "@/lib/types"

interface FormStore {
  dados: Partial<DadosUsuario>
  tipo: TipoDocumento
  setDados: (dados: Partial<DadosUsuario>) => void
  setTipo: (tipo: TipoDocumento) => void
  reset: () => void
}

export const useFormStore = create<FormStore>((set) => ({
  dados: {},
  tipo: "rendimento_pedagogico",
  setDados: (dados) => set((s) => ({ dados: { ...s.dados, ...dados } })),
  setTipo: (tipo) => set({ tipo }),
  reset: () => set({ dados: {}, tipo: "rendimento_pedagogico" }),
}))