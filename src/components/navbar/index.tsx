import { Component } from "react";
import Style from "./navbar.module.scss";

export default class Navbar extends Component{
    render(){
        return(
            <section className={Style.section}>
                <nav className={Style.nav}>
                    <link href='https://unpkg.com/boxicons@2.0.9/css/boxicons.min.css' rel='stylesheet'></link>
                    <i className='bx bx-menu' id={Style.bx}></i>
                    <form action="#" className={Style.form}>
                        <div className={Style.formInput}>
                            <input type="search" placeholder="Pesquisar..." className={Style.pesquisa}></input>
                            <button type="submit" className={Style.lupa}><i className='bx bx-search' ></i></button>
                        </div>
                    </form>
                    <input type="checkbox" className={Style.trocaModo} hidden></input>
                    <label className="switch-mode"></label>
                    <a href="#" className={Style.notificacao} id={Style.a}>
                        <i className='bx bxs-bell'></i>
                        <span className={Style.num}>?</span>
                    </a>
                    <a href="#" className={Style.perfil} id={Style.a}>
                        <i className='bx bxs-user' id={Style.img}></i>
                    </a>
                </nav>
            </section>
        );
    }
}