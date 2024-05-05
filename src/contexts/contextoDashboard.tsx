import { createContext } from "react"
import ContextoDashboardType from "./contextoDashboardType"

const ContextoDashboard = createContext<ContextoDashboardType>({
    valorInputPizza: '',
    opcaoSelecionadaPizza: '',
    valorInputLinha: '',
    opcaoSelecionadaLinha: '',
    valorInputColuna: '',
    opcaoSelecionadaColuna: '',
    setData: () => {}
})

export default ContextoDashboard
