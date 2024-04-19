import { Component } from "react";
import Style from "./navbar.module.scss";
import { Link, Outlet } from "react-router-dom";

export default class Navbar extends Component{
    render(){
        return(
        <header className={Style.navbar}>
            <nav>
                
            </nav>
        </header>
        );
    }
}