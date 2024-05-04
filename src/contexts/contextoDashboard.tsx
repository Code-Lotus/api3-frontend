import { createContext } from "react"
import ContextoDashboardType from "./contextoDashboardType"

const ContextoDashboard = createContext<ContextoDashboardType>({
    valorInput: '',
    opcaoSelecionada: '',
    setData: () => {}
})

export default ContextoDashboard
