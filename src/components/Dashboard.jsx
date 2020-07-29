import React from "react";
import DonutChart from "./DonutChart";
import Paper from "@material-ui/core/Paper";
import { CardContent } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
    summary: {
        display: "flex",
        flexWrap: "wrap",
    },
    root: {
        width: "22%",
        height: 80,
        margin: "5px",
        // borderRight: "2px solid rgba(0, 0, 0, 0.54)",
    },
    bullet: {
        display: "inline-block",
        margin: "2 2px",
        transform: "scale(0.8)",
    },
    title: {
        fontSize: 16,
    },
    subTitle: {
        fontSize: 16,
        // fontWeight: "bold",
    },
    pos: {
        marginBottom: 12,
    },
});

export default function Dashboard(props) {
    const classes = useStyles();
    return (
        <Paper>
            <br />
            <div
                style={{
                    marginLeft: "20px",
                    fontSize: 20,
                    display: "flex",
                    justifyContent: "left",
                    alignItems: "left",
                }}
            >
                C'Party Default Risk
            </div>
            <DonutChart data={props.data} />
            <div className={classes.summary}>
                <CardContent className={classes.root}>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                        {<br />}
                    </Typography>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                        Sum
                    </Typography>
                    <Typography className={classes.title}>% of the portfolio</Typography>
                </CardContent>
                <CardContent className={classes.root}>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                        EXPECTED LOSS
                    </Typography>
                    <Typography className={classes.subTitle}>
                        {Math.round(props.outputSummary.sumEL).toLocaleString() || 0}
                    </Typography>
                    <Typography className={classes.subTitle}>
                        {((props.outputSummary.sumEL / props.inputSummary.sumEAD) * 100).toFixed(
                            2
                        ) + "%" || 0}
                    </Typography>
                </CardContent>
                <CardContent className={classes.root}>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                        UNEXPECTED LOSS
                    </Typography>
                    <Typography className={classes.subTitle}>
                        {Math.round(props.outputSummary.sumUL).toLocaleString() || 0}
                    </Typography>
                    <Typography className={classes.subTitle}>
                        {((props.outputSummary.sumUL / props.inputSummary.sumEAD) * 100).toFixed(
                            2
                        ) + "%" || 0}
                    </Typography>
                </CardContent>
                <CardContent>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                        CVaR
                    </Typography>
                    <Typography className={classes.subTitle}>
                        {Math.round(props.outputSummary.sumCVAR).toLocaleString() || 0}
                    </Typography>
                    <Typography className={classes.subTitle}>
                        {((props.outputSummary.sumCVAR / props.inputSummary.sumEAD) * 100).toFixed(
                            2
                        ) + "%" || 0}
                    </Typography>
                </CardContent>
            </div>
        </Paper>
    );
}
