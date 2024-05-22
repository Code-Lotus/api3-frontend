import { Component } from "react";
import Chart from "react-apexcharts";
import Style from "./pie.module.scss"
import InputPizza from "../../inputPizza";
import SelectPizza from "../../selectPizza";
// import ApexCharts from "apexcharts";

type Props = {
  valores: Array<number>
  legenda: Array<string>
}

export default class Pizza extends Component<Props> {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(props: Props){
    super(props)
  }
  public state = {
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
          <SelectPizza valores={["Mês", "Ano", "Preço Máximo", "Preço Mínimo"]}/>
          <InputPizza value=""/>
        </div>
      </div>
    );
  }
}
