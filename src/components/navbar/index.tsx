import { Component } from "react";
import Style from "./navbar.module.scss";

export default class Navbar extends Component{
    render(){
        return(
            <header className={Style.navbar}>
                <h1>Dashboard</h1>
                <h1>Comissões</h1>
            </header>
        );
    }
}