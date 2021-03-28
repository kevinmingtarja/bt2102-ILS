import React, { useState, useEffect } from "react";
import axios from "axios";
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
        backgroundColor: "#fafafa",
        display: "grid",
    },
    cover: {
        width: "100%",
        minHeight: 320,
    },
    img: {
        width: "100%",
    },
    info: {
        padding: 0,
        backgroundColor: "#fafafa",
    },
});

export default function BookCard(props) {
    const classes = useStyles();
    const [bookData, setBookData] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios
            .get(`http://localhost:8000/server/bookdata/${props.id}/`)
            .then((res) => {
                setBookData(res.data);
                setLoading(false);
            });
    }, []);

    return (
        <Card className={classes.root} elevation="0">
            <div className={classes.cover}>
                <img src={props.url} alt="Book Cover" className={classes.img} />
            </div>
            <CardContent className={classes.info}>
                {bookData.availabilitystatus ? (
                    <Typography
                        variant="h6"
                        align="left"
                        style={{ color: "green" }}
                    >
                        Available
                    </Typography>
                ) : (
                    <Typography
                        variant="h6"
                        align="left"
                        style={{ color: "red" }}
                    >
                        Unavailable
                    </Typography>
                )}

                <Typography variant="h6" align="left" color="textSecondary">
                    {bookData.availabilitystatus
                        ? null
                        : "Due Date: " + bookData.expectedduedate}
                </Typography>
                <Typography variant="h6" align="left">
                    {props.title}
                </Typography>
                <Typography
                    variant="subtitle1"
                    align="left"
                    color="textSecondary"
                >
                    {props.author.replace(/[\[\]']+/g, "")}
                </Typography>
                <Typography
                    variant="subtitle1"
                    align="left"
                    color="textSecondary"
                >
                    {props.id}
                </Typography>
            </CardContent>
        </Card>
    );
}
