import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { CardMedia } from "@material-ui/core";

const useStyles = makeStyles({
    root: {
        width: 275,
        minHeight: 400,
        color: "black",
        margin: "20px",
        backgroundColor: "white",
        display: "grid",
        gridTemplateRows: "80% 20%",
    },
    cover: {
        width: "100%",
    },
    info: {
        padding: 0,
        backgroundColor: "white",
    },
});

export default function BookCard(props) {
    const classes = useStyles();
    return (
        <Card className={classes.root} elevation="0">
            <img src={props.url} alt="Book Cover" className={classes.cover} />
            <CardContent className={classes.info}>
                <Typography variant="h6" align="left">
                    {props.title}
                </Typography>
                <Typography
                    variant="subtitle1"
                    align="left"
                    color="textSecondary"
                >
                    {props.author[0]}
                </Typography>
            </CardContent>
        </Card>
    );
}
