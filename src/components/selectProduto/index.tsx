import { Component } from "react";
import ContextoDashboard from "../../contexts/contextoDashboard";

type Props = {
    valores: Array<string>
}

type State = {
    selectedOption1: string,
    selectedOption2: string,
    selectedOption3: string
}

export default class SelectProduto extends Component<Props, State>{
    static contextType = ContextoDashboard
    constructor(props: Props){
        super(props)
        this.state = {
            selectedOption1: '',
            selectedOption2: '',
            selectedOption3: ''
        };
    }
    
    handleSelect1Change = (event: React.ChangeEvent<HTMLSelectElement>) => {
        this.setState({selectedOption1: event.target.value})

        const contexto: any = this.context
        contexto.setData(contexto.valorInputPizza, contexto.opcaoSelecionadaPizza, contexto.valorInputLinha, contexto.opcaoSelecionadaLinha, contexto.valorInputColuna, contexto.opcaoSelecionadaColuna, event.target.value, contexto.prod2, contexto.prod3)
    }

    handleSelect2Change = (event: React.ChangeEvent<HTMLSelectElement>) => {
        this.setState({selectedOption2: event.target.value})

        const contexto: any = this.context
        contexto.setData(contexto.valorInputPizza, contexto.opcaoSelecionadaPizza, contexto.valorInputLinha, contexto.opcaoSelecionadaLinha, contexto.valorInputColuna, contexto.opcaoSelecionadaColuna, contexto.prod1, event.target.value, contexto.prod3)
    }

    handleSelect3Change = (event: React.ChangeEvent<HTMLSelectElement>) => {
        this.setState({selectedOption3: event.target.value})

        const contexto: any = this.context
        contexto.setData(contexto.valorInputPizza, contexto.opcaoSelecionadaPizza, contexto.valorInputLinha, contexto.opcaoSelecionadaLinha, contexto.valorInputColuna, contexto.opcaoSelecionadaColuna, contexto.prod1, contexto.prod2, event.target.value)
    }

    render(){
        const {valores} = this.props
        const {selectedOption1} = this.state
        const {selectedOption2} = this.state
        const {selectedOption3} = this.state
        let contexto: any = this.context

        return (
            <div>
                <select value={selectedOption1} onChange={this.handleSelect1Change}>
                    {valores.map((option, index) => (
                        <option key={index} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
                <select value={selectedOption2} onChange={this.handleSelect2Change}>
                    {valores.map((option, index) => (
                        <option key={index} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
                <select value={selectedOption3} onChange={this.handleSelect3Change}>
                    {valores.map((option, index) => (
                        <option key={index} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
            </div>
        )
    }
}