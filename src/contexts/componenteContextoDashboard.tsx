import { Component, ReactElement } from "react"
import ContextoDashboard from "./contextoDashboard"

type ContextoDashboardPropsType = {
    child: ReactElement
}

type State = {
    valorInput: string,
    opcaoSelecionada: string
}

export default class ComponenteContextoDashboard extends Component<ContextoDashboardPropsType, State>{
    constructor(props: any){
        super(props)
        this.state = {valorInput: '', opcaoSelecionada: ''}
        this.setData = this.setData.bind(this)
    }

    setData(newValorInput: string, newOpcaoSelecionada: string){
        let state = { valorInput: newValorInput, opcaoSelecionada: newOpcaoSelecionada }
        this.setState(state)
    }

    render() {
        let contextData = {
            valorInput: this.state.valorInput,
            opcaoSelecionada: this.state.opcaoSelecionada,
            setData: this.setData
        }

        return (
            <ContextoDashboard.Provider value={contextData}>
                {this.props.child}
            </ContextoDashboard.Provider>
        )
    }
}