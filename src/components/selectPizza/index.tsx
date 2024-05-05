import { Component } from "react";
import ContextoDashboard from "../../contexts/contextoDashboard";

type Props = {
    valores: Array<string>
}

type State = {
    selectedOption: string
}

export default class SelectPizza extends Component<Props, State>{
    static contextType = ContextoDashboard
    constructor(props: Props){
        super(props)
        this.state = {
            selectedOption: ''
        };
    }
    
    handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        this.setState({selectedOption: event.target.value})

        const contexto: any = this.context
        contexto.setData(contexto.valorInputPizza, event.target.value, contexto.valorInputLinha, contexto.opcaoSelecionadaLinha, contexto.valorInputColuna, contexto.opcaoSelecionadaColuna)
    }

    render(){
        const {valores} = this.props
        const {selectedOption} = this.state
        let contexto: any = this.context

        return (
            <>
                <select value={selectedOption} onChange={this.handleSelectChange}>
                    {valores.map((option, index) => (
                        <option key={index} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
            </>
        )
    }
}