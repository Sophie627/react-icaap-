import React, { Component } from "react";
import Chart from "react-apexcharts";

class InputBarChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            series: [
                {
                    name: "PDs",
                    type: "column",
                    data: this.props.data.map((d) => d.PD),
                },
                {
                    name: "Exposures",
                    type: "line",
                    data: this.props.data.map((d) => d.EAD),
                },
            ],
            options: {
                chart: {
                    height: 350,
                    type: "line",
                },
                stroke: {
                    width: [0, 4],
                },
                title: {
                    text: "Traffic Sources",
                },
                dataLabels: {
                    enabled: true,
                    enabledOnSeries: [1],
                },
                labels: this.props.data.map((d) => d.Name),
                xaxis: {
                    type: "datetime",
                },
                yaxis: [
                    {
                        title: {
                            text: "Website Blog",
                        },
                    },
                    {
                        opposite: true,
                        title: {
                            text: "Social Media",
                        },
                    },
                ],
            },
        };
    }
    static getDerivedStateFromProps(props, state) {
        return {
            series: [
                {
                    name: "Exposures",
                    type: "column",
                    // data: [23, 42, 35, 27, 43, 22, 17, 31, 22, 22, 12, 16],
                    data: props.data.map((d) => d.EAD).slice(0, 10),
                },
                {
                    name: "PDs",
                    type: "line",
                    // data: [440, 505, 414, 671, 227, 413, 201, 352, 752, 320, 257, 160],
                    data: props.data.map((d) => d.PD).slice(0, 10),
                },
            ],
            options: {
                chart: {
                    height: 350,
                    type: "line",
                },
                stroke: {
                    width: [0, 2],
                },
                title: {
                    text: "Largest Exposures and their PDs",
                    offsetY: 20,
                },
                dataLabels: {
                    enabled: false,
                    enabledOnSeries: [1],
                },
                labels: props.data.map((d) => d.Name).slice(0, 10),
                xaxis: {
                    // type: "datetime",
                },
                yaxis: [
                    {
                        opposite: true,
                        title: {
                            text: "Exposures",
                        },
                    },
                    {
                        title: {
                            text: "PDs",
                        },
                    },
                ],
            },
        };
    }
    render() {
        return (
            <div className="app">
                <div className="row">
                    <div className="mixed-chart">
                        <Chart
                            options={this.state.options}
                            series={this.state.series}
                            type="line"
                            width="100%"
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default InputBarChart;
