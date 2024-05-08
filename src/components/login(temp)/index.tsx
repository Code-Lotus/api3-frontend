import { Component } from "react";
import { Link } from "react-router-dom";
import Style from "./loginescolha.module.scss";

export default class LoginEscolha extends Component {
    render() {
        return(
            <>
                <div className={Style.divGeral}>
                    <h1>Quem esta logando?</h1> 
                </div>
                <div className={Style.divGeral2}>
                    <div className={Style.divDentro}>
                        <Link to="/dashboardVendedor" className={Style.card}>
                            <span className={Style.letra}>Vendedor</span>
                        </Link>

                        <Link to="/insercaoExcel" className={Style.card}>
                            <span className={Style.letra}>Administrador</span>
                        </Link>
                    </div>
                </div>
            </>
        );
    }
}