import Style from "../comissao-total/comissao-total.module.scss";
import Card from "../card";
import DadosController from "../../scripts/controllers/dados-controller";

const dadosController = new DadosController()

export default function Comissao() {
    return (
            <ul className={Style.box}>
                    <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'></link>

                <li className={Style.li}>
                    <Card classeCss="bx bxs-dollar-circle" quantidade={dadosController.mascaraPreco("50.451.78")} titulo="Total em vendas"/>
                </li>
            </ul>
    );
}