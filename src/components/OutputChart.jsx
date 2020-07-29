import React, { Component } from "react";
import Chart from "react-apexcharts";

const style = {
    chart: {
        fontFamily: `font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu",
       "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
   -webkit-font-smoothing: antialiased;
   -moz-osx-font-smoothing: grayscale`,
    },
};
const NUMBER_OF_COMPANIES = 10;

class OutputChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            series: [
                {
                    name: "Exposures",
                    type: "column",
                    data: [1.4, 2, 2.5, 1.5, 2.5, 2.8, 3.8, 4.6],
                },
                {
                    name: "Unexpected Loss",
                    type: "column",
                    data: [1.1, 3, 3.1, 4, 4.1, 4.9, 6.5, 8.5],
                },
                {
                    name: "PDs",
                    type: "line",
                    data: [20, 29, 37, 36, 44, 45, 50, 58],
                },
            ],
            options: {
                chart: {
                    type: "line",
                    stacked: false,
                },
                dataLabels: {
                    enabled: false,
                },
                stroke: {
                    width: [1, 1, 3],
                },
            },
        };
    }
    static getDerivedStateFromProps(props, state) {
        return {
            series: [
                {
                    name: "Exposures",
                    type: "column",
                    data: [1.4, 2, 2.5, 1.5, 2.5, 2.8, 3.8, 4.6],
                    data: props.indata.map((d) => d.EAD).slice(0, NUMBER_OF_COMPANIES),
                },
                {
                    name: "Unexpected Loss",
                    type: "column",
                    data: props.outData.map((d) => d.UL).slice(0, NUMBER_OF_COMPANIES),
                },
                {
                    name: "PDs",
                    type: "line",
                    data: props.indata.map((d) => d.PD).slice(0, NUMBER_OF_COMPANIES),
                },
            ],
            options: {
                chart: {
                    type: "line",
                    stacked: false,
                },
                dataLabels: {
                    enabled: false,
                },
                stroke: {
                    width: [1, 1, 4],
                },
                title: {
                    text: "Exposures, PDs, and C'Party Risk",
                    align: "left",
                    offsetX: 15,
                    offsetY: 20,
                    style: {
                        fontSize: "20px",
                        fontWeight: "normal",
                    },
                },
                colors: ["#737373", "#3690c0", "#045a8d"],
                xaxis: {
                    categories: props.indata.map((d) => d.Name).slice(0, NUMBER_OF_COMPANIES),
                },
                yaxis: [
                    {
                        axisTicks: {
                            show: true,
                        },
                        axisBorder: {
                            show: true,
                            color: "#737373",
                        },
                        labels: {
                            style: {
                                colors: "#737373",
                            },
                            formatter: function (value) {
                                return value / 1000000;
                            },
                        },
                        title: {
                            text: "Exposure (million)",
                            style: {
                                color: "#737373",
                            },
                        },
                        // tooltip: {
                        //     enabled: false,
                        // },
                    },
                    {
                        seriesName: "Income",
                        opposite: true,
                        axisTicks: {
                            show: true,
                        },
                        axisBorder: {
                            show: true,
                            color: "#737373",
                        },
                        labels: {
                            style: {
                                colors: "#737373",
                            },
                            formatter: function (value) {
                                return value / 1000000;
                            },
                        },
                        title: {
                            text: "Unexpected Loss (millions)",
                            style: {
                                color: "#737373",
                            },
                        },
                    },
                    {
                        seriesName: "PDs",
                        opposite: true,
                        axisTicks: {
                            show: true,
                        },
                        axisBorder: {
                            show: true,
                            color: "#737373",
                        },
                        labels: {
                            style: {
                                colors: "#737373",
                            },
                            formatter: function (value) {
                                return value.toFixed(2) * 100 + " %";
                            },
                        },
                        title: {
                            text: "PD",
                            style: {
                                color: "#737373",
                            },
                        },
                    },
                ],
                tooltip: {
                    float: {
                        enabled: false,
                        position: "topLeft", // topRight, topLeft, bottomRight, bottomLeft
                        offsetY: 30,
                        offsetX: 150,
                    },
                    style: {
                        fontSize: "8px",
                        fontFamily: undefined,
                    },
                    x: {
                        show: true,
                        formatter: undefined,
                    },
                    y: [
                        {
                            formatter: function (y) {
                                if (typeof y !== "undefined") {
                                    return y.toLocaleString();
                                }
                                return y;
                            },
                        },
                        {
                            formatter: function (y) {
                                if (typeof y !== "undefined") {
                                    return y.toLocaleString();
                                }
                                return y;
                            },
                        },
                        {
                            formatter: function (y) {
                                if (typeof y !== "undefined") {
                                    return y.toFixed(4) * 100 + " %";
                                }
                                return y;
                            },
                        },
                    ],
                },
                legend: {
                    horizontalAlign: "right",
                    offsetX: 40,
                },
            },
        };
    }
    render() {
        return (
            <div className={style.chart}>
                <Chart
                    options={this.state.options}
                    series={this.state.series}
                    type="line"
                    // width="100%"
                    // height={345}
                />
            </div>
        );
    }
}

export default OutputChart;
