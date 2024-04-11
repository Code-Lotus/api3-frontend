import { Component } from "react";
import Style from "./footer.module.scss"

export default class Footer extends Component{
    render(){
        return(
            <footer className={Style.rodape}>
                <p>Developed by CodeLotus</p>
            </footer>
        );
    }
}