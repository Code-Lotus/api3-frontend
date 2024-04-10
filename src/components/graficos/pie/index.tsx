import React, { Component } from "react";
import Chart from "react-apexcharts";
// import ApexCharts from "apexcharts";

class Pizza extends Component {
    public state = {
        series: [44, 55, 13, 43, 22],
        options: {
            chart: {
            id: "pie"
            },
            xaxis: {
            categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998]
            }
        }
    };

  render() {
    return (
      <div className="app">
        <div className="row">
          <div className="mixed-chart">
            <Chart
              options={this.state.options}
              series={this.state.series}
              type="pie"
              width="500"
            />
          </div>
        </div>

      </div>
    );
  }
}

export default Pizza;
