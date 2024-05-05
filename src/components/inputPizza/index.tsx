import { Component } from "react";
import ContextoDashboard from "../../contexts/contextoDashboard";

type State = {
    value: string,
}

export default class InputPizza extends Component<State> {
    static contextType = ContextoDashboard;
    state = {
        value: ''
    };

    handleValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({value: event.target.value})

        const contexto: any = this.context
        contexto.setData(event.target.value, contexto.opcaoSelecionadaPizza, contexto.valorInputLinha, contexto.opcaoSelecionadaLinha, contexto.valorInputColuna, contexto.opcaoSelecionadaColuna)
    }

    render(){
    let contexto: any = this.context
    let minimo = 1
    let maximo = 99999999

    if(contexto.opcaoSelecionadaPizza.includes("Mês")){
        maximo = 12
    }
    
    if(contexto.opcaoSelecionadaPizza.includes("Ano")){
        maximo = new Date().getFullYear()
        minimo = 2000
    }

        return (
            <>
                <input type="number" onChange={this.handleValueChange} max={maximo} min={minimo} defaultValue={1} />
            </>
        )
    }
}