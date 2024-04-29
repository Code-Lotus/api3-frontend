import { Component } from "react";
import Sidebar from "../../../components/sidebar";
import Navbar from "../../../components/navbar";
import Style from "./cliAntigoProAntigo.module.scss"
import Card from "../../../components/card";

export default class CliAntigoProAntigo extends Component {
    render(){
        return(
            <>
                <Sidebar />
                <Navbar />
                <div className={Style.all}>
                    <div className={Style.topTitle}>
                        <h1>Cliente Novo / Produto Novo</h1>
                    </div>
                    <div className={Style.cards}>
                        <Card quantidade={"100"} titulo={"Vendas"} />
                        <Card quantidade={""} titulo={""} />
                    </div>
                </div>
                
            </>
        );
    }
}