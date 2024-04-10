import React, { Component } from "react";
import Chart from 'react-apexcharts'

// type GraficoProps = {
//     categoria?: Array<string>,
//     nome?: string,
//     valor?: Array<number>
// } & React.HTMLAttributes<HTMLDivElement>;

export default class Grafico extends Component<{},{options: {}, series:ApexAxisChartSeries}> {
    public dados = {options: {
        chart: {
          id: 'apexchart-example'
        },
        xaxis: {
          categories: ["oi", "oia", "noia"]
        }
      },
      series: [{
        name: "nome",
        data: [13,17,22]
      }]}
    public mudaGrafico(categorias: Array<string>, nome: string, valor: Array<number>): void{
        this.dados.options.xaxis.categories = categorias
        this.dados.series[0].name = nome
        this.dados.series[0].data = valor

    }
    constructor({...props}) {
        super(props);    
        this.state = this.dados
    }
    render() {
        return (
            <div>
                <Chart options={this.state.options} series={this.state.series} type="line" width={500} height={320} />
            </div>
      )
    }
  }
  