import { Component } from "react";
import "./navbar.css";

export default class Navbar extends Component{
    render(){
        return(
            <section>
                <nav>
                    <link href='https://unpkg.com/boxicons@2.0.9/css/boxicons.min.css' rel='stylesheet'></link>
                    <i className='bx bx-menu'></i>
                    <form action="#">
                        <div className="formInput">
                            <input type="search" placeholder="Pesquisar..."></input>
                            <button type="submit" className="search-btn"><i className='bx bx-search' ></i></button>
                        </div>
                    </form>
                    <input type="checkbox" id="switch-mode" hidden></input>
                    <label className="switch-mode"></label>
                    <a href="#" className="notification">
                        <i className='bx bxs-bell' ></i>
                        <span className="num">2</span>
                    </a>
                    <a href="#" className="profile">
                        <img></img>
                    </a>
                </nav>
            </section>
        );
    }
}