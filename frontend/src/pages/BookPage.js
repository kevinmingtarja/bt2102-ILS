import React, { useState } from "react";
import { Link } from "react-router-dom";
import books from "./Books";
import Navbar from "../components/Navbar.js";
import { Container, CssBaseline, Button, Box } from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";

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

export default function BookPage({ match, location }) {
    const classes = useStyles();
    const book = books.filter((x) => x._id == match.params.bookID)[0];
    console.log(book);
    return (
        <React.Fragment>
            <CssBaseline />
            <Navbar active="library" />
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
                                by {book.authors.join(", ")}
                            </Typography>
                            <Link
                                to="/library"
                                style={{
                                    textDecoration: "none",
                                    color: "white",
                                }}
                            >
                                <RoundedButton
                                    variant="contained"
                                    color="primary"
                                    href="#"
                                    size="large"
                                >
                                    Borrow
                                </RoundedButton>
                            </Link>
                            <Link
                                to="/library"
                                style={{
                                    textDecoration: "none",
                                    color: "white",
                                }}
                            >
                                <RoundedButton
                                    variant="contained"
                                    color="primary"
                                    href="#"
                                    size="large"
                                >
                                    Reserve
                                </RoundedButton>
                            </Link>
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
        </React.Fragment>
    );
}
