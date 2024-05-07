import { Component } from "react";
import ContextoDashboard from "../../contexts/contextoDashboard";
import Style from "./input.module.scss"

type State = {
    value: string,
}

export default class InputColuna extends Component<State> {
    static contextType = ContextoDashboard;
    state = {
        value: ''
    };

    handleValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({value: event.target.value})

        const contexto: any = this.context
        contexto.setData(contexto.valorInputPizza, contexto.opcaoSelecionadaPizza, contexto.valorInputLinha, contexto.opcaoSelecionadaLinha, event.target.value, contexto.opcaoSelecionadaColuna)
    }

    render(){
    let contexto: any = this.context
    let minimo = 1
    let maximo = 99999999

    let padrao = contexto.valorInputColuna

        return (
            <>
                <input className={Style.input}type="number" onChange={this.handleValueChange} max={maximo} min={minimo} defaultValue={padrao} />
            </>
        )
    }
}