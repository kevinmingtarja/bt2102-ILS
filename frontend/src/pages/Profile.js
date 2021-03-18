import React, { useState } from "react";
import { Link } from "react-router-dom";
import books from "./Books";
import Box from "@material-ui/core/Box";
import { NavMenu, NavItem } from "@mui-treasury/components/menu/navigation";
import { useLineNavigationMenuStyles } from "@mui-treasury/styles/navigationMenu/line";
import { makeStyles } from "@material-ui/core/styles";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import BookList from "../components/BookList";

import {
    Container,
    CssBaseline,
    CardContent,
    Typography,
} from "@material-ui/core";

const useStyles = makeStyles({
    container: {
        display: "grid",
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

export default function Profile(props) {
    const classes = useStyles();
    return (
        <React.Fragment>
            <CssBaseline />
            <main>
                <Container maxWidth="md" className={classes.container}>
                    <CardContent className={classes.profile}>
                        <AccountCircleIcon className={classes.icon} />
                        <CardContent className={classes.info}>
                            <Typography variant="h4">
                                {props.username}
                            </Typography>
                        </CardContent>
                    </CardContent>
                    <Box height={48} display={"flex"} justifyContent="center">
                        <NavMenu useStyles={useLineNavigationMenuStyles}>
                            <NavItem
                                active={
                                    props.active == "library" ? true : false
                                }
                            >
                                <Typography variant="h6">
                                    Borrowed Books
                                </Typography>
                            </NavItem>
                            <NavItem
                                active={props.active == "borrow" ? true : false}
                            >
                                <Typography variant="h6">
                                    Reserved Books
                                </Typography>
                            </NavItem>
                            <NavItem
                                active={
                                    props.active == "reservation" ? true : false
                                }
                            >
                                <Typography variant="h6">Fines</Typography>
                            </NavItem>
                        </NavMenu>
                    </Box>
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
