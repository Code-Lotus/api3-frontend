import { Component } from "react";
import LinhaDashed from "../../../components/graficos/linhaDashed";

export default class CliNovoProAntigo extends Component{
    render(){
        return(
            <>
                <LinhaDashed categoria={["JAneiro", "fev"]} nome={["A", "b"]} valor={[[1,2],[3,4]]} />
            </>
        );
    }
}