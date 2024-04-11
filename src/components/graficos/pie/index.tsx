import React, { Component } from "react";
import Chart from "react-apexcharts";
// import ApexCharts from "apexcharts";

type Props = {
  valores: Array<number>
  legenda: Array<string>
}

class Pizza extends Component<Props> {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(props: Props){
    super(props)
  }
  public state = {
      series: this.props.valores,
      options: {
        labels: this.props.legenda,
        chart: {
          id: "pie"
        },
      }
  };

  render() {
    return (
      <div>
        <Chart
          options={this.state.options}
          series={this.state.series}
          type="pie"
          width="400"
        />
      </div>
    );
  }
}

export default Pizza;
