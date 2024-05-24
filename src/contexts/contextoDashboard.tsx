import { createContext } from "react"
import ContextoDashboardType from "./contextoDashboardType"

const ContextoDashboard = createContext<ContextoDashboardType>({
    valorInputTempo: '',
    opcaoSelecionadaTempo: '',
    valorInputValor: '',
    opcaoSelecionadaValor: '',
    setData: () => {}
})

export default ContextoDashboard
