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
    const {value, limite} = this.state

        return (
            <>
                <input type="number" onChange={this.handleValueChange}/>
                {/*Fazer coisas relacionadas a passar tipo de função de um pro outro pra reduzir o limite do input number*/}
            </>
        )
    }
}