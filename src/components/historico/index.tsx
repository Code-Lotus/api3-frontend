import { Component } from 'react';
import Style from './historico.module.scss';
import CampoProduto from '../../scripts/models/campoProduto';
import DadosController from '../../scripts/controllers/dados-controller';

const dadosController = new DadosController()

type Props = {
    campos: Array<CampoProduto>,
    cabecalho: Array<string>
}

export default class Historico extends Component<Props> {
    // eslint-disable-next-line @typescript-eslint/no-useless-constructor
    constructor(props: Props){
        super(props)
    }

    render(){
        const {campos, cabecalho} = this.props
        return (
            <div id={Style.content}>
                <div className={Style.main}>
                    <div className={Style.dateTable}>
                        <div className={Style.order}>
                            <div className={Style.head}>
                                <h3>Últimas Vendas</h3>
                            </div>
                            <table>
                                <thead>
                                    <tr>
                                        {cabecalho.map((titulo, index) => (
                                            <th key={index}>
                                                {titulo}
                                            </th>
                                        ))}
                                    </tr>
                                    <hr/>
                                </thead>
                                <tbody>
                                    {campos.map((colunas, index) => (
                                        <tr key={index}>
                                            <td> {dadosController.ajustaDate(new Date(colunas.ultimaVenda._data))} </td>
                                            <td> {colunas.produto._nome} </td>
                                            <td> {colunas.ultimaVenda._cliente._nome} </td>
                                            <td> {dadosController.mascaraPreco(colunas.precoUni.toString())} </td>
                                        </tr>
                                    ))}                                    
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
