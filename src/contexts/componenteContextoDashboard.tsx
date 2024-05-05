import { Component, ReactElement } from "react"
import ContextoDashboard from "./contextoDashboard"

type ContextoDashboardPropsType = {
    child: ReactElement
}

type State = {
    valorInputPizza: string,
    opcaoSelecionadaPizza: string,
    valorInputLinha: string,
    opcaoSelecionadaLinha: string,
    valorInputColuna: string,
    opcaoSelecionadaColuna: string
}

export default class ComponenteContextoDashboard extends Component<ContextoDashboardPropsType, State>{
    constructor(props: any){
        super(props)
        this.state = {valorInputPizza: '', opcaoSelecionadaPizza: '', valorInputLinha: '', opcaoSelecionadaLinha: '', valorInputColuna: '', opcaoSelecionadaColuna: ''}
        this.setData = this.setData.bind(this)
    }

    setData(newValorInputPizza: string, newOpcaoSelecionadaPizza: string, newValorInputLinha: string, newOpcaoSelecionadaLinha: string, newValorInputColuna: string, newOpcaoSelecionadaColuna: string){
        let state = { valorInputPizza: newValorInputPizza, opcaoSelecionadaPizza: newOpcaoSelecionadaPizza, valorInputLinha: newValorInputLinha, opcaoSelecionadaLinha: newOpcaoSelecionadaLinha, valorInputColuna: newValorInputColuna, opcaoSelecionadaColuna: newOpcaoSelecionadaColuna, }
        this.setState(state)
    }

    render() {
        let contextData = {
            valorInputPizza: this.state.valorInputPizza,
            opcaoSelecionadaPizza: this.state.opcaoSelecionadaPizza,
            valorInputLinha: this.state.valorInputLinha,
            opcaoSelecionadaLinha: this.state.opcaoSelecionadaLinha,
            valorInputColuna: this.state.valorInputColuna,
            opcaoSelecionadaColuna: this.state.opcaoSelecionadaColuna,
            setData: this.setData
        }

        return (
            <ContextoDashboard.Provider value={contextData}>
                {this.props.child}
            </ContextoDashboard.Provider>
        )
    }
}