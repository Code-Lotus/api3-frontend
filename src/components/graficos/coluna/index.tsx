import Chart from "react-apexcharts";
import Style from "./coluna.module.scss"

export default function Coluna(this: any, {valores, nome, categoria}: {valores: Array<Array<number>>, nome: Array<string>, categoria: Array<string>}) {
  const dados = {
    series: [{
      name: nome[0],
      data: valores[0]
    }, {
      name: nome[1],
      data: valores[1]
    }, {
      name: nome[2],
      data: valores[2]
    }, {
      name: nome[3],
      data: valores[3]
    }],
    options: {
      chart: {
        height: 350
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '55%',
          endingShape: 'rounded'
        },
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        show: true,
        width: 2,
        colors: ['transparent']
      },
      xaxis: {
        categories: categoria,
      },
      yaxis: {
        title: {
          text: 'Quantidade'
        }
      },
      fill: {
        opacity: 1
      },
    },
  }
  return(
    <>
    <div className={Style.card}>
      <Chart options={dados.options} series={dados.series} type="bar" height={350} />
    </div>
    </>
  );
}