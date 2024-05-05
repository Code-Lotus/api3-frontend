import { createContext } from "react"
import ContextoDashboardType from "./contextoDashboardType"

const ContextoDashboard = createContext<ContextoDashboardType>({
    valorInputPizza: '',
    opcaoSelecionadaPizza: '',
    valorInputLinha: '',
    opcaoSelecionadaLinha: '',
    valorInputColuna: '',
    opcaoSelecionadaColuna: '',
    prod1: '',
    prod2: '',
    prod3: '',
    setData: () => {}
})

export default ContextoDashboard
