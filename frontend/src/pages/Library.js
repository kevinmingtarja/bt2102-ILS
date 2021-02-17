import React, { useState } from "react";
import books from "./Books";
import BookCard from "./BookCard";
import Grid from "@material-ui/core/Grid";

export default function Library() {
    return (
        <React.Fragment>
            <Grid container xs={12}>
                {books.map((book) => {
                    return (
                        <BookCard
                            id={book._id}
                            title={book.title}
                            url={book.thumbnailUrl}
                            author={book.authors}
                        />
                    );
                })}
            </Grid>
            <h1>Hello</h1>
        </React.Fragment>
    );
}
