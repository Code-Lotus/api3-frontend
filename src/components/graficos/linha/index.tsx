import Chart from 'react-apexcharts'

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
    <Chart options={dados.options} series={dados.series} type="line" width={400} height={220} />
  </div>
  );
}