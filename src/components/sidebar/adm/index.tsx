import { Link, Outlet } from "react-router-dom";
import Style from "./sidebaradm.module.scss";

export default function SidebarAdm() {
    return(
        <section className={Style.sidebar}>
            <link href='https://unpkg.com/boxicons@2.0.9/css/boxicons.min.css' rel='stylesheet'></link>
            <a href="/" className={Style.brand}>
                <i className='bx bxs-home' id={Style.bx}></i> {/* SIMBOLO DE CASINHA */}
                <span>Home</span>
            </a>
            <ul className={`${Style.sideMenu} ${Style.top}`}>
                {/* <li className={Style.active}> */}
                <li>
                    <Link to="/dashboardAdm" className={Style.a}>
                        <i className='bx bxs-dashboard' id={Style.bx}></i>
                        <span className={Style.text}>Dashboard</span>
                    </Link>
                </li>
                <li>
                    <Link to="/comissaoAdm" className={Style.a}>
                        <i className='bx bxl-product-hunt' id={Style.bx}></i>
                        <span className="text">Comissão De Vendas</span>
                    </Link>
                </li>
                <li>
                    <Link to="/insercaoExcel" className={Style.a}>
                        <i className='bx bx-upload' id={Style.bx}></i> 
                        <span className={Style.text}>Inserção</span>
                    </Link>
                </li>
            </ul>
            <ul className={Style.sideMenu}>
                <li>
                    <Link to="/" className={Style.a}>
                        <i className='bx bxs-cog'  id={Style.bx}></i> 
                        <span className="text">Config</span>
                    </Link>
                </li>
                <li className={Style.sair}>
                    <Link to="/" className={`${Style.a} ${Style.sair}`}>
                        <i className='bx bxs-log-out-circle' id={Style.bx}></i> 
                        <span className="text">Sair</span>
                    </Link>
                </li>
            </ul>
            <Outlet />
        </section>
    );
}