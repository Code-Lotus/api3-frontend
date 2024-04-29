import { Component } from "react"
import Style from "./card.module.scss"

type Props = {
    classeCss?: string,
    quantidade: string
    titulo: string,
}

export default class Card extends Component<Props>{    
/* eslint-disable @typescript-eslint/no-useless-constructor */
    
    constructor(props: Props) {
        super(props)
    }

    public state = {
        classeCss: this.props.classeCss,
        quantidade: this.props.quantidade,
        titulo: this.props.titulo,
    }

    render() {
        return (
            <>
                <ul className={Style.box}>
                    <li className={Style.li}>
                        <i className={this.state.classeCss} id={Style.bx}></i>
                        <span>
                            <h3>{this.state.quantidade}</h3>
                            <p>{this.state.titulo}</p>
                        </span> 
                    </li>
                </ul>
            </>
        )
    }
}