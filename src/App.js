import React from "react";
import Navbar from "./components/Navbar";
import ExcelReader from "./components/ExcelReader";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: "#eee",
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(3),
        textAlign: "center",
        color: theme.palette.text.secondary,
    },
}));

export default function App() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Navbar />
                </Grid>
                <Grid item xs={12}>
                    <ExcelReader />
                </Grid>
            </Grid>
        </div>
    );
}
