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
    opcaoSelecionadaColuna: string,
    prod1: string,
    prod2: string,
    prod3: string
}

export default class ComponenteContextoDashboard extends Component<ContextoDashboardPropsType, State>{
    constructor(props: any){
        super(props)
        this.state = {valorInputPizza: '', opcaoSelecionadaPizza: '', valorInputLinha: '', opcaoSelecionadaLinha: '', valorInputColuna: '', opcaoSelecionadaColuna: '', prod1: '', prod2: '', prod3: ''}
        this.setData = this.setData.bind(this)
    }

    setData(newValorInputPizza: string, newOpcaoSelecionadaPizza: string, newValorInputLinha: string, newOpcaoSelecionadaLinha: string, newValorInputColuna: string, newOpcaoSelecionadaColuna: string, newProd1: string, newProd2: string, newProd3: string){
        let state = { valorInputPizza: newValorInputPizza, opcaoSelecionadaPizza: newOpcaoSelecionadaPizza, valorInputLinha: newValorInputLinha, opcaoSelecionadaLinha: newOpcaoSelecionadaLinha, valorInputColuna: newValorInputColuna, opcaoSelecionadaColuna: newOpcaoSelecionadaColuna, prod1: newProd1, prod2: newProd2, prod3: newProd3}
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
            prod1: this.state.prod1,
            prod2: this.state.prod2,
            prod3: this.state.prod3,
            setData: this.setData
        }

        return (
            <ContextoDashboard.Provider value={contextData}>
                {this.props.child}
            </ContextoDashboard.Provider>
        )
    }
}