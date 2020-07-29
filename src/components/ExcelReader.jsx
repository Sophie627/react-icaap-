import React, { Component } from "react";
import XLSX from "xlsx";
import { make_cols } from "../utils/MakeColumns";
import { SheetJSFT } from "../utils/types";
import ncdf from "../utils/normal_dist";
import NormSInv from "../utils/inverse_normal_dist";
import { Input, Button } from "@material-ui/core";
import Dashboard from "./Dashboard";
import Grid from "@material-ui/core/Grid";
import InputTable from "./InputTable";
import OutputTable from "./OutputTable";
import InputSummary from "./InputSummary";
import Paper from "@material-ui/core/Paper";
import InputBarChart from "./InputBarChart";
import OutputChart from "./OutputChart";

class ExcelReader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            file: {},
            data: [
                {
                    Name: "Bank of America",
                    PD: 0.0101,
                    LGD: 0.5,
                    EAD: 34000000,
                    w: 0.2,
                    tableData: {
                        id: 0,
                    },
                },
                {
                    Name: "Goldman Sachs",
                    PD: 0.04946,
                    LGD: 0.5,
                    EAD: 24000000,
                    w: 0.2,
                    tableData: {
                        id: 1,
                    },
                },
                {
                    Name: "NatWest",
                    PD: 0.015,
                    LGD: 0.5,
                    EAD: 21780000,
                    w: 0.2,
                    tableData: {
                        id: 2,
                    },
                },
                {
                    Name: "Virgin Bank",
                    PD: 0.02,
                    LGD: 0.5,
                    EAD: 15097828,
                    w: 0.2,
                    tableData: {
                        id: 3,
                    },
                },
                {
                    Name: "Northern Trust",
                    PD: 0.03,
                    LGD: 0.5,
                    EAD: 14923886,
                    w: 0.2,
                    tableData: {
                        id: 4,
                    },
                },
            ],
            cols: [],
            output: [],
            inputSummary: {},
            outputSummary: {},
        };
        this.handleFile = this.handleFile.bind(this);
        this.handleChange = this.handleChange.bind(this);
        // this.handleClick = this.handleClick.bind(this);
    }
    componentDidMount() {
        const op = this.runComputation();
        const is = this.computeInputSummary(this.state.data);
        const os = this.computeOutputSummary(op);

        this.setState({ outputSummary: os, inputSummary: is, output: op });
    }
    runComputation() {
        let outData = [];
        this.state.data.forEach(function (d) {
            let ul = computeUL(d.PD, d.LGD, d.EAD, d.w);
            let el = computeEL(d.PD, d.LGD, d.EAD);
            let cvar = Math.round(ul - el);
            outData.push({ Name: d.Name, UL: ul, EL: el, CVAR: cvar });
        });
        // this.setState({ output: outData });
        return outData;
    }
    computeInputSummary(inputData) {
        let sumEAD = 0;
        let sumPD = 0;
        let noOfCparties = this.state.data.length;
        let maxPD = 0,
            maxEAD = 0;
        inputData.forEach(function (d) {
            sumEAD += d.EAD;
            sumPD += d.PD;
            if (d.PD > maxPD) maxPD = d.PD;
            if (d.EAD > maxEAD) maxEAD = d.EAD;
        });
        let avgPD = sumPD / noOfCparties;
        let avgEAD = sumEAD / noOfCparties;

        const summary = {
            avgPD: (avgPD * 100).toFixed(2) + "%",
            // avgEAD: Math.round(avgEAD).toLocaleString(),
            avgEAD: avgEAD,
            // sumEAD: Math.round(sumEAD).toLocaleString(),
            sumEAD: sumEAD,
            noOfCParties: noOfCparties,
            maxPD: (maxPD * 100).toFixed(2) + "%",
            // maxEAD: Math.round(maxEAD).toLocaleString(),
            maxEAD: maxEAD,
        };
        // this.setState({ inputSummary: summary });
        return summary;
    }
    computeOutputSummary(outputData) {
        let sumEL = outputData.map((d) => d.EL).reduce((prev, next) => prev + next);
        let sumUL = outputData.map((d) => d.UL).reduce((prev, next) => prev + next);
        let sumCVAR = outputData.map((d) => d.CVAR).reduce((prev, next) => prev + next);

        let summary = { sumEL: sumEL, sumUL: sumUL, sumCVAR: sumCVAR };

        // this.setState({ outputSummary: summary });
        return summary;
    }

    handleChange(e) {
        const files = e.target.files;
        if (files && files[0]) {
            this.handleFile(files[0]);
            this.setState({ file: files[0] });
        }
    }

    handleFile(file) {
        /* Boilerplate to set up FileReader */
        const reader = new FileReader();
        const rABS = !!reader.readAsBinaryString;

        reader.onload = (e) => {
            /* Parse data */
            try {
                const bstr = e.target.result;
                const wb = XLSX.read(bstr, { type: rABS ? "binary" : "array", bookVBA: true });
                /* Get first worksheet */
                console.log("Workbook", wb);
                const wsname = wb.SheetNames[0];
                const ws = wb.Sheets[wsname];
                console.log("Worksheet", ws);
                /* Convert array of arrays */
                const data = XLSX.utils.sheet_to_json(ws);
                /* Update state */
                this.setState({ data: data, cols: make_cols(ws["!ref"]) }, () => {
                    console.log(JSON.stringify(this.state.data, null, 2));
                });
            } catch (error) {
                alert("Wrong Input Format!");
            }
            const op = this.runComputation();
            const is = this.computeInputSummary(this.state.data);
            const os = this.computeOutputSummary(op);

            this.setState({ outputSummary: os, inputSummary: is, output: op });
        };

        if (rABS) {
            reader.readAsBinaryString(file);
        } else {
            reader.readAsArrayBuffer(file);
        }
    }
    render() {
        return (
            <div>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Paper>
                                    <InputSummary summary={this.state.inputSummary} />
                                </Paper>
                            </Grid>
                            <Grid item xs={12}>
                                <Paper>
                                    <Input
                                        type="file"
                                        className="form-control"
                                        id="file"
                                        accept={SheetJSFT}
                                        onChange={this.handleChange}
                                    />
                                    Import data or type in using (+) button!
                                    {/* <Button onClick={this.handleFile}>RUN COMPUTATION</Button> */}
                                    <InputTable data={this.state.data}></InputTable>
                                </Paper>
                            </Grid>
                            <Grid item xs={12}>
                                <Paper>
                                    <OutputChart
                                        indata={this.state.data}
                                        outData={this.state.output}
                                    />
                                </Paper>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Paper>
                                    <Dashboard
                                        data={this.state.output}
                                        inputSummary={this.state.inputSummary}
                                        outputSummary={this.state.outputSummary}
                                    />
                                </Paper>
                            </Grid>
                            <Grid item xs={12}>
                                <OutputTable data={this.state.output}></OutputTable>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        );
    }
}
function computeUL(pd, lgd, ead, rho) {
    // ead*lgd*NORMSDIST((NORMSINV(pd)-rho*NORMSINV(1-0.995))/(SQRT(1-E^2)))
    let ul =
        ead *
        lgd *
        ncdf((NormSInv(pd) - rho * NormSInv(1 - 0.995)) / Math.sqrt(1 - rho * rho), 0, 1);
    return Math.round(ul);
}
function computeEL(pd, lgd, ead) {
    return Math.round(pd * lgd * ead);
}

export default ExcelReader;
