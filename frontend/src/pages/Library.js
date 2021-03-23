import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import BookCard from "../components/BookCard";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import AdvancedSearch from "../components/AdvancedSearch";
import SearchBar from "../components/SearchBar";
import { Container, CssBaseline } from "@material-ui/core";
import { css } from "@emotion/react";
import FadeLoader from "react-spinners/FadeLoader";
import readingImg from "../static/books.svg";

const useStyles = makeStyles({
    container: {
        display: "flex",
    },
    loading: {
        marginTop: "100px",
    },
    topimg: {
        marginTop: "100px",
        height: "50vh",
        width: "auto",
        marginBottom: "0",
    },
});

export default function Library(props) {
    const classes = useStyles();
    const [loading, setLoading] = useState(true);
    const [books, setBooks] = useState([]);

    useEffect(() => {
        props.setActive("library");
        axios
            .get("http://localhost:8000/server/booklist/")
            .then((res) => {
                const booklist = res.data;
                setBooks(booklist);
                setLoading(false);
            })
            .catch((error) => console.log(error));
    }, []);

    return (
        <React.Fragment>
            <CssBaseline />
            <img
                src={readingImg}
                alt="Person reading a book"
                className={classes.topimg}
            />
            <SearchBar />
            <main>
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
                )}
            </main>
        </React.Fragment>
    );
}
