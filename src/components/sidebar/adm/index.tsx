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
                <li>
                    <Link to="/cadastro" className={Style.a}>
                        <i className='bx bx-user-plus' id={Style.bx}></i> 
                        <span className={Style.text}>Cadastro Usuário</span>
                    </Link>
                </li>
                <li>
                    <Link to="/usuarios" className={Style.a}>
                        <i className='bx bx-user' id={Style.bx}></i> 
                        <span className={Style.text}>Usuários</span>
                    </Link>
                </li>
                <li>
                    <Link to="/produtos" className={Style.a}>
                        <i className='bx bx-package' id={Style.bx}></i> 
                        <span className={Style.text}>Produtos</span>
                    </Link>
                </li>
                <li>
                    <Link to="/clientes" className={Style.a}>
                        <i className='bx bx-male' id={Style.bx}></i> 
                        <span className={Style.text}>Clientes</span>
                    </Link>
                </li>
                <li>
                    <Link to="/vendas" className={Style.a}>
                        <i className='bx bx-cart' id={Style.bx}></i> 
                        <span className={Style.text}>Vendas</span>
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