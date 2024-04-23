import Style from "./status.module.scss"
import Card from "../card";
import "./status.css";

export default function Status() {
    return (
            <ul className={Style.box}>
                    <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'></link>
                <li className={Style.li}>
                    <i className='bx bxs-calendar-plus' id={Style.bx}></i>
                    <span>
                     <h3>66</h3>
                    <p>Vendas novas</p>
                    </span>
                <li>
                    <Card classeCss="bx bxs-calendar-plus" quantidade="66" titulo="Vendas novas"/>
                </li>

                <li className={Style.li}>
                    <i className='bx bxs-group' id={Style.bx}></i>
                    <span>
                    <h3>103</h3>
                    <p>Visitantes</p>
                     </span>
                </li>

                <li className={Style.li}>
                    <i className='bx bxs-dollar-circle' id={Style.bx} ></i>
                    <span>
                    <h3>$2001</h3>
                    <p>Total de vendas</p>
                    </span>
                </li>
            </ul>
    );
}