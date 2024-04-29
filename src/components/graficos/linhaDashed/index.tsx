import Chart from 'react-apexcharts'

export default function LinhaDashed({categoria, nome, valor}: {categoria: Array<string>, nome: Array<string>, valor: Array<Array<number>>}){
    const dados = {options: {
      chart: {
        id: 'apexchart-example'
      },
      xaxis: {
        categories: categoria
      }
    },
    series: [{
      name: nome[0],
      data: valor[0]
    },
    {
        name: nome[1],
        data: valor[1]
    }]
  };
  return (
  <div>
    <Chart options={dados.options} type="line" width={400} height={220} />
  </div>
  );
}