import Chart from 'react-apexcharts'
import Style from "./linha.module.scss"

export default function Linha({categoria, nome, valor}: {categoria: Array<string>, nome: string, valor: Array<number>}){
    const dados = {options: {
      chart: {
        id: 'apexchart-example'
      },
      xaxis: {
        categories: categoria
      }
    },
    series: [{
      name: nome,
      data: valor
    }]
  };
  return (
  <div>
    <div className={Style.card}>
      <Chart options={dados.options} series={dados.series} type="line" width={700} height={220} />
      <select>
        <option value="mes">Mês</option>
        <option value="ano">Ano</option>
      </select>
    </div>
  </div>
  );
}