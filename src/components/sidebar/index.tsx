import { Link, Outlet } from "react-router-dom";
import "./sidebar.css";

export default function Sidebar() {
    return(
        <section className="sidebar">
            <link href='https://unpkg.com/boxicons@2.0.9/css/boxicons.min.css' rel='stylesheet'></link>
            <a href="/" className="brand">
                <i className='bx bxs-home'></i> {/* SIMBOLO DE CASINHA */}
                <span>Home</span>
            </a>
            <ul className="side-menu top">
                <li className="active">
                    <Link to="/" className="a">
                        <i className='bx bxs-dashboard'></i> {/* SIMBOLO DE DASHBOARD */}
                        <span className="text">Dashboard</span>
                    </Link>
                </li>
                <li>
                    <Link to="/cliNovoProNovo" className="a">
                        <i className='bx bxl-product-hunt'></i> {/* SIMBOLO DE DASHBOARD */}
                        <span className="text">Produto Novo</span>
                    </Link>
                </li>
                <li>
                    <Link to="/" className="a">
                        <i className='bx bxl-product-hunt'></i> {/* SIMBOLO DE DASHBOARD */}
                        <span className="text">Produto Antigo</span>
                    </Link>
                </li>
            </ul>
            <ul className="side-menu">
                <li>
                    <Link to="/" className="a">
                        <i className='bx bxs-cog' ></i> {/* SIMBOLO DE DASHBOARD */}
                        <span className="text">Config</span>
                    </Link>
                </li>
                <li>
                    <Link to="/" className="a">
                        <i className='bx bxs-log-out-circle'></i> {/* SIMBOLO DE DASHBOARD */}
                        <span className="text">Sair</span>
                    </Link>
                </li>
            </ul>
            <Outlet />
        </section>
    );
}
