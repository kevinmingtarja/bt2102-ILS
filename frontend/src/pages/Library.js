import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import books from "./Books";
import BookCard from "../components/BookCard";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";

import AdvancedSearch from "../components/AdvancedSearch";
import SearchBar from "../components/SearchBar";
import Navbar from "../components/Navbar.js";
import { Container, CssBaseline } from "@material-ui/core";

const useStyles = makeStyles({
    container: {
        display: "flex",
        paddingTop: "100px",
    },
});

export default function Library(props) {
    const classes = useStyles();

    useEffect(() => {
        props.setActive("library");
    });

    return (
        <React.Fragment>
            <CssBaseline />
            <SearchBar />
            <main>
                <Container maxWidth="false" className={classes.container}>
                    <AdvancedSearch />
                    <Grid container xs={12}>
                        {books.map((book) => {
                            return (
                                <>
                                    <Link to={`/books/${book._id}`}>
                                        <BookCard
                                            id={book._id}
                                            title={book.title}
                                            url={book.thumbnailUrl}
                                            author={book.authors}
                                        />
                                    </Link>
                                </>
                            );
                        })}
                    </Grid>
                </Container>
            </main>
        </React.Fragment>
    );
}
