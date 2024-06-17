import { Component } from "react";
import ContextoDashboard from "../../contexts/contextoDashboard";
import Style from "./input.module.scss"

type State = {
    value: string,
    max: number,
    min: number
}

type Props = {
    tipo: string
}

export default class Input extends Component<Props, State> {
    static contextType = ContextoDashboard;
    constructor(props: Props){
        super(props);
        this.state = {
            value: '',
            max: 1,
            min: 1
        };
    }

    handleValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({value: event.target.value})

        const contexto: any = this.context

        if(this.props.tipo === "tempo"){
            contexto.setData(event.target.value, contexto.opcaoSelecionadaTempo, contexto.valorInputValor, contexto.opcaoSelecionadaValor)
            if(contexto.opcaoSelecionadaTempo === "Ano"){
                this.setState({min: 2000, max: new Date().getFullYear()})
            } else {
                this.setState({min: 1, max: 12})
            }
        }

        if(this.props.tipo === "valor"){
            contexto.setData(contexto.valorInputTempo, contexto.opcaoSelecionadaTempo, event.target.value, contexto.opcaoSelecionadaValor)
            this.setState({min: 500, max: 99999999})
        }
    }

    render(){
    let contexto: any = this.context
    let minimo = this.state.min;
    let maximo = this.state.max;
    let padrao = "";

    if(this.props.tipo === "tempo"){
        padrao = contexto.opcaoSelecionadaTempo
    } else {
        padrao = contexto.opcaoSelecionadaValor
    }

        return (
            <>
                <input className={Style.inputCustom} type="number" onChange={this.handleValueChange} max={maximo} min={minimo} defaultValue={padrao} />
            </>
        )
    }
}