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
        minWidth: 275,
        minHeight: 400,
        color: "black",
    },
    cover: {
        height: "50%",
    },
});

export default function BookCard(props) {
    const classes = useStyles();
    console.log(props.url);
    return (
        <Card className={classes.root}>
            <img src={props.url} alt="Book Cover" />
            <CardContent>
                <Typography variant="subtitle1">{props.title}</Typography>
                <Typography variant="subtitle1">{props.author[0]}</Typography>
            </CardContent>
        </Card>
    );
}
