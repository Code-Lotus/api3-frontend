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
                        <div className={Style.card}>
                            <Link to="/dashboardVendedor" className={Style.link}>
                            <span>Vendedor</span></Link>
                        </div>
                    
                        <div className={Style.card}>
                            <Link to="/dashboardAdm" className={Style.link}>
                            <span>Administrador</span></Link>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}