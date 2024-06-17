import { Component } from "react";
import ContextoDashboard from "../../contexts/contextoDashboard";
import Style from "./select.module.scss"

type Props = {
    tipo: string,
    valores: Array<string>
}

type State = {
    selectedOption: string
}

export default class Select extends Component<Props, State>{
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
        
        if(this.props.tipo === "tempo"){
            contexto.setData(contexto.valorInputTempo, event.target.value, contexto.valorInputValor, contexto.opcaoSelecionadaValor)
        }
        
        if(this.props.tipo === "valor"){
            contexto.setData(contexto.valorInputTempo, contexto.opcaoSelecionadaTempo, contexto.valorInputValor, event.target.value)
        }
    }

    render(){
        const {valores} = this.props
        let contexto: any = this.context
        let padrao = "";
        const {selectedOption} = this.state

        if(this.props.tipo === "tempo"){
            padrao = contexto.opcaoSelecionadaTempo
        }

        if(this.props.tipo === "valor"){
            padrao = contexto.opcaoSelecionadaValor
        }

        return (
            <>
                <select className={Style.selectCustom} value={selectedOption} onChange={this.handleSelectChange} defaultValue={padrao}>
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