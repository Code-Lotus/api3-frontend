import { Component, ReactElement } from "react"
import ContextoDashboard from "./contextoDashboard"

type ContextoDashboardPropsType = {
    child: ReactElement
}

type State = {
    valorInputTempo: string,
    opcaoSelecionadaTempo: string,
    valorInputValor: string,
    opcaoSelecionadaValor: string,
}

export default class ComponenteContextoDashboard extends Component<ContextoDashboardPropsType, State>{
    constructor(props: any){
        super(props)
        this.state = {valorInputTempo: '', opcaoSelecionadaTempo: '', valorInputValor: '', opcaoSelecionadaValor: ''}
        this.setData = this.setData.bind(this)
    }

    setData(newValorInputTempo: string, newOpcaoSelecionadaTempo: string, newValorInputValor: string, newOpcaoSelecionadaValor: string){
        let state = { valorInputTempo: newValorInputTempo, opcaoSelecionadaTempo: newOpcaoSelecionadaTempo, valorInputValor: newValorInputValor, opcaoSelecionadaValor: newOpcaoSelecionadaValor}
        this.setState(state)
    }

    render() {
        let contextData = {
            valorInputTempo: this.state.valorInputTempo,
            opcaoSelecionadaTempo: this.state.opcaoSelecionadaTempo,
            valorInputValor: this.state.valorInputValor,
            opcaoSelecionadaValor: this.state.opcaoSelecionadaValor,
            setData: this.setData
        }

        return (
            <ContextoDashboard.Provider value={contextData}>
                {this.props.child}
            </ContextoDashboard.Provider>
        )
    }
}