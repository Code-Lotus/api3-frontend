// Comissao.js
import React from 'react';
import DadosController from "../../scripts/controllers/dados-controller";
import Card from "../card";
import StatusStyle from "../grid/status.module.scss";
import ComissaoStyle from "../grid/comissao.module.scss"; 

const dadosController = new DadosController();

export default function Comissao() {
    return (
        <ul className={`${StatusStyle.box} ${ComissaoStyle.box}`}> 
            <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet' />
            <li className={`${StatusStyle.li} ${ComissaoStyle.li}`}>
                <Card classeCss="bx bxs-dollar-circle" quantidade={dadosController.mascaraPreco("43.502,89")} titulo="Comissão total" />
            </li>
        </ul>
    );
}
