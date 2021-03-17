import React, { useState } from "react";
import { Link } from "react-router-dom";
import books from "./Books";
import BookCard from "../components/BookCard";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import BookList from "../components/BookList";

import AdvancedSearch from "../components/AdvancedSearch";
import SearchBar from "../components/SearchBar";
import Navbar from "../components/Navbar.js";
import {
    Container,
    CssBaseline,
    CardContent,
    Typography,
} from "@material-ui/core";

const useStyles = makeStyles({
    container: {
        display: "grid",
        gridTemplateRows: "50% 50%",
        paddingTop: "100px",
        height: "90vh",
    },
    icon: {
        height: "200px",
        width: "200px",
    },
    profile: {
        justifySelf: "start",
        display: "flex",
    },
});

export default function Profile() {
    const classes = useStyles();
    return (
        <React.Fragment>
            <CssBaseline />
            <Navbar />
            <main>
                <Container maxWidth="md" className={classes.container}>
                    <CardContent className={classes.profile}>
                        <AccountCircleIcon className={classes.icon} />
                        <CardContent className={classes.info}>
                            <Typography variant="h4">Username</Typography>
                        </CardContent>
                    </CardContent>
                    <CardContent className={classes.books}>
                        {books.map((book) => {
                            return <BookList book={book} />;
                        })}
                    </CardContent>
                </Container>
            </main>
        </React.Fragment>
    );
}
