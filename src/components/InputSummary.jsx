import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles({
    summary: {
        display: "flex",
        flexWrap: "wrap",
    },
    root: {
        width: "28%",
        height: 110,
        // alignItems: "center",
        // justify: "center",
        // justifyContent: "center",
        // textAlign: "center",
    },
    title: {
        fontSize: 16,
    },
    subTitle: {
        fontSize: 16,
        // fontWeight: "bold",
        marginBottom: "10px",
    },
    // pos: {
    //     marginBottom: 12,
    // },
});

export default function SimpleCard(props) {
    const classes = useStyles();
    return (
        <div className={classes.summary}>
            <CardContent className={classes.root}>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                    NO. OF C'PARTIES
                </Typography>
                <Typography className={classes.subTitle}>
                    {props.summary.noOfCParties || 0}
                </Typography>
            </CardContent>
            <CardContent className={classes.root}>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                    TOTAL EXPOSURE
                </Typography>
                <Typography className={classes.subTitle}>
                    {Math.round(props.summary.sumEAD).toLocaleString() || 0}
                </Typography>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                    AVERAGE EXPOSURE
                </Typography>
                <Typography className={classes.subTitle}>
                    {Math.round(props.summary.avgEAD).toLocaleString() || 0}
                </Typography>
            </CardContent>
            <CardContent className={classes.root}>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                    AVERAGE PD
                </Typography>
                <Typography className={classes.subTitle}> {props.summary.avgPD || 0}</Typography>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                    HIGHEST PD
                </Typography>
                <Typography className={classes.subTitle}> {props.summary.maxPD || 0}</Typography>
            </CardContent>
        </div>
        // <div>
        //     <Grid container spacing={0}>
        //         <Grid item xs={12} sm={4}>
        //             {/* <Paper>xs=6 sm=3</Paper> */}
        //             <Card className={classes.root}>
        //                 <CardContent>
        //                     <Typography
        //                         className={classes.title}
        //                         color="textSecondary"
        //                         gutterBottom
        //                     >
        //                         No. of C'parties
        //                     </Typography>
        //                     <Typography variant="h5" component="h2">
        //                         {props.summary.noOfCParties || 0}
        //                     </Typography>
        //                 </CardContent>
        //             </Card>
        //         </Grid>
        //         <Grid item xs={12} sm={4}>
        //             {/* <Paper>xs=6 sm=3</Paper> */}
        //             <Card className={classes.root}>
        //                 <CardContent>
        //                     <Typography
        //                         className={classes.title}
        //                         color="textSecondary"
        //                         gutterBottom
        //                     >
        //                         Total Exposure
        //                     </Typography>
        //                     <Typography variant="h5" component="h2">
        //                         {props.summary.sumEAD || 0}
        //                     </Typography>
        //                     <Typography
        //                         className={classes.subTitle}
        //                         color="textSecondary"
        //                         gutterBottom
        //                     >
        //                         Highest Expsoure
        //                     </Typography>
        //                     <Typography variant="h6" component="h2">
        //                         {props.summary.maxEAD || 0}
        //                     </Typography>
        //                     <Typography
        //                         className={classes.subTitle}
        //                         color="textSecondary"
        //                         gutterBottom
        //                     >
        //                         Average Expsoure
        //                     </Typography>
        //                     <Typography variant="h6" component="h2">
        //                         {props.summary.avgEAD || 0}
        //                     </Typography>
        //                 </CardContent>
        //             </Card>
        //         </Grid>
        //         <Grid item xs={12} sm={4}>
        //             {/* <Paper>xs=6 sm=3</Paper> */}
        //             <Card className={classes.root}>
        //                 <CardContent>
        //                     <Typography
        //                         className={classes.title}
        //                         color="textSecondary"
        //                         gutterBottom
        //                     >
        //                         Average PD
        //                     </Typography>
        //                     <Typography variant="h5" component="h2">
        //                         {props.summary.avgPD || 0}
        //                     </Typography>
        //                     <br />
        //                     <Typography
        //                         className={classes.subTitle}
        //                         color="textSecondary"
        //                         gutterBottom
        //                     >
        //                         Highest PD
        //                     </Typography>
        //                     <Typography variant="h6" component="h2">
        //                         {props.summary.maxPD || 0}
        //                     </Typography>
        //                 </CardContent>
        //             </Card>
        //         </Grid>
        //     </Grid>
        // </div>
    );
}
