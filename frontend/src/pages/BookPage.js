import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import books from "./Books";
import Navbar from "../components/Navbar.js";
import { Container, CssBaseline, Button, Box } from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";
import FadeLoader from "react-spinners/FadeLoader";
import { css } from "@emotion/react";

const useStyles = makeStyles({
    container: {
        display: "grid",
        gridTemplateRows: "1% 49% ma50%",
        paddingTop: "100px",
        justifyContent: "center",
    },
    book: {
        marginTop: "50px",
        width: "100%",
        height: "50vh",
        display: "grid",
        gridTemplateColumns: "50% 50%",
        justifyContent: "center",
    },
    cover: {
        height: "100%",
        justifySelf: "end",
        marginRight: "20px",
    },
    bookInfo: {
        justifySelf: "start",
    },
});

const RoundedButton = withStyles((theme) => ({
    root: {
        width: "200px",
        height: "50px",
        borderRadius: "10px",
    },
}))(Button);

export default function BookPage({ match, location, id }) {
    console.log(id);
    const classes = useStyles();
    const [book, setBook] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios
            .get(
                `http://localhost:8000/server/booklist/${match.params.bookID}/`
            )
            .then((res) => {
                console.log(res.data);
                setBook(res.data);
                setLoading(false);
            });
    }, []);

    const handleBorrow = (bookID, memberID) => {
        // POST request
    };

    return (
        <React.Fragment>
            <CssBaseline />
            {loading ? (
                <div className={classes.loading}>
                    <FadeLoader
                        loading={loading}
                        color="#2176ff"
                        css={css}
                        size={150}
                    />
                </div>
            ) : (
                <main>
                    <Container maxWidth="md" className={classes.container}>
                        <CardContent className={classes.book}>
                            <img
                                src={book.thumbnailUrl}
                                alt="Book Cover"
                                className={classes.cover}
                            />
                            <CardContent className={classes.bookInfo}>
                                <Typography variant="h3" align="left">
                                    {book.title}
                                </Typography>
                                <Typography
                                    variant="h4"
                                    align="left"
                                    color="textSecondary"
                                >
                                    by {book.authors.replace(/[\[\]']+/g, "")}
                                </Typography>

                                <RoundedButton
                                    variant="contained"
                                    color="primary"
                                    href="#"
                                    size="large"
                                    onClick={() =>
                                        handleBorrow(match.params.bookID, id)
                                    }
                                >
                                    Borrow
                                </RoundedButton>

                                <RoundedButton
                                    variant="contained"
                                    color="primary"
                                    href="#"
                                    size="large"
                                >
                                    Reserve
                                </RoundedButton>
                            </CardContent>
                        </CardContent>
                        <Typography variant="h6">
                            {book.longDescription ? "Description" : null}
                        </Typography>
                        <Typography
                            variant="subtitle1"
                            align="left"
                            color="textSecondary"
                        >
                            {book.longDescription
                                ? book.longDescription
                                : book.shortDescription}
                        </Typography>
                    </Container>
                </main>
            )}
        </React.Fragment>
    );
}
