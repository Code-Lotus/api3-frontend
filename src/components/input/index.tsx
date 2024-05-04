import { Component } from "react";

type State = {
    value: string,
    limite: string
}

export default class Input extends Component<State> {
    
    state = {
        value: '',
        limite: ''
    };

    handleValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({value: event.target.value})
    }

    render(){
    const {limite} = this.state
    let minimo = 1
    let maximo = 999999999

    if(limite.includes("Mês")){
        maximo = 12
    }
    
    if(limite.includes("Ano")){
        maximo = new Date().getFullYear()
        minimo = 2000
    }

        return (
            <>
                <input type="number" onChange={this.handleValueChange} max={maximo} min={minimo}/>
            </>
        )
    }
}