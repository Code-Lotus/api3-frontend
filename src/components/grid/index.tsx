import Style from "./status.module.scss"
import Card from "../card";
import DadosController from "../../scripts/controllers/dados-controller";

const dadosController = new DadosController()

export default function Status() {
    return (
            <ul className={Style.box}>
                    <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'></link>
                <li className={Style.li}>
                    <Card classeCss="bx bxs-calendar-plus" quantidade={dadosController.mascaraQuantidade("66")} titulo="Vendas novas"/>
                </li>

                <li className={Style.li}>
                    <Card classeCss="bx bxs-group" quantidade={dadosController.mascaraQuantidade("103")} titulo="Visitantes"/>
                </li>

                <li className={Style.li}>
                    <Card classeCss="bx bxs-dollar-circle" quantidade={dadosController.mascaraPreco("2001")} titulo="Total em vendas"/>
                </li>
            </ul>
    );
}