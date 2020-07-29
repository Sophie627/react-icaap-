import React, { Component } from "react";
import Chart from "react-apexcharts";

class DonutChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            series: [],
            lebels: [],
            options: {
                chart: {
                    width: 20,
                    type: "donut",
                },
                chartOptions: {
                    labels: ["Unexpected Loss", "Expected Loss", "CVaR"],
                },
                colors: ["#3690c0", "#fdcdac", "#a6611a"],
                dataLabels: {
                    enabled: false,
                },
                responsive: [
                    {
                        breakpoint: 380,
                        options: {
                            chart: {
                                width: 200,
                            },
                            legend: {
                                show: true,
                            },
                        },
                    },
                ],
                legend: {
                    position: "right",
                    offsetY: 0,
                    height: 230,
                },
            },
        };
    }
    static getDerivedStateFromProps(props, state) {
        console.log("Donut Props", props);
        if (props.data.length > 0) {
            const sumUL = props.data.map((d) => d.UL).reduce((prev, next) => prev + next);
            const sumEL = props.data.map((d) => d.EL).reduce((prev, next) => prev + next);
            const sumCVAR = props.data.map((d) => d.CVAR).reduce((prev, next) => prev + next);
            const labels = Object.keys(props.data[0]);
            return {
                series: [sumUL, sumEL, sumCVAR],
            };
        }
        return state;
    }
    render() {
        return (
            <div
                id="chart"
                style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
            >
                <Chart
                    options={this.state.options}
                    series={this.state.series}
                    type="donut"
                    width="350"
                />
            </div>
        );
    }
}

export default DonutChart;
