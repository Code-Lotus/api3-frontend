import React, { Component } from "react";
import Style from "./comisssaoVendidos.module.scss";

type Props = {
    comissao: Array<{ nome: string; porcentagem: number }>;
  };
  
  export default class ComissaoDeVendasComponent extends Component<Props> {
    constructor(props: Props) {
      super(props);
    }
  
    render() {
      const { comissao } = this.props;
  
      return (
        <div className={Style.comissao_order}>
          <div className={Style.comissao_head__NWAsZ}>
            <h3>Comissão de Vendas</h3>
          </div>
          <table>
            <thead>
              <tr>
                <th>Tipo</th>
                <th>Porcentagem</th>
              </tr>
            </thead>
            <tbody>
              {comissao.map((item, index) => (
                <tr key={index}>
                  <td>{item.nome}</td>
                  <td>
                    <span className={`Tipo${index + 1}`}>{item.porcentagem}%</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }
  }
  