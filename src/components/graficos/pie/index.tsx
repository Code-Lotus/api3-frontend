import React, { Component } from "react";
import Chart from "react-apexcharts";
import Style from "./pie.module.scss"
import Select from "../../select";
import { Database } from "../../../scripts/controllers/localStorage";
import Input from "../../input";
// import ApexCharts from "apexcharts";

type Props = {
  valores: Array<number>
  legenda: Array<string>
  // nome: string
}

export default class Pizza extends Component<Props> {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(props: Props){
    super(props)
  }
  public state = {
      listaFiltrada: Database.getPlanilhaVendas(),
      series: this.props.valores,
      options: {
        labels: this.props.legenda,
        chart: {
          id: "pie",
        },
        legend: {
          fontSize: '18px'
        }
      }
  };

  // public nome = this.props.nome

  render() {
    console.log(typeof(this.state.listaFiltrada))
    return (
      <div>
        <div className={Style.card}>
          <h1>Geral</h1>
          <Chart
            options={this.state.options}
            series={this.state.series}
            type="pie"
            width="705"
          />
          <Select valores={["Mês", "Ano", "Preço Máximo", "Preço Mínimo"]}/>
          <Input value="" limite=""/>
        </div>
        {/* <p>{JSON.stringify(this.state.listaFiltrada)}</p> */}
      </div>
    );
  }
}
