import { Component } from "react";

interface TitulosProps {
    titulos: string[]
}

export default class Usuarios extends Component<TitulosProps> {
    // eslint-disable-next-line @typescript-eslint/no-useless-constructor
    constructor(props: TitulosProps){
        super(props)
    }

    public state = {
        titulos: this.props.titulos
    }
    render() {
        return (
            <th>
                {this.state.titulos.map(titulo => (
                    <></>
                ))}
            </th>
        )
    }
}