import {
    CssBaseline,
    Container,
    Typography,
    Button,
    Box,
} from "@material-ui/core";
import React, { useState } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

import Navbar from "./Navbar";
import bookreading from "../static/bookreading.svg";
import bookreading3 from "../static/bookreading3.svg";
import MenuBookOutlinedIcon from "@material-ui/icons/MenuBookOutlined";
import UpdateIcon from "@material-ui/icons/Update";
import BookmarksOutlinedIcon from "@material-ui/icons/BookmarksOutlined";

const useStyles = makeStyles((theme) => ({
    top: {
        display: "flex",
        height: "90vh",
        padding: "80px",
    },
    right: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    left: {
        textAlign: "left",
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: "center",
        color: theme.palette.text.secondary,
    },
    topimg: {
        width: "100%",
    },
    second: {
        backgroundColor: "#E7ECEF",
        height: "40vh",
    },
    features: {
        display: "flex",
        height: "100%",
    },
    card: {
        display: "grid",
        gridTemplateRows: "60% 20% 20%",
        justifyItems: "center",
    },
    icon: {
        transform: "scale(4)",
    },
}));

const RoundedButton = withStyles((theme) => ({
    root: {
        width: "200px",
        height: "50px",
        borderRadius: "10px",
    },
}))(Button);

export default function Home() {
    const classes = useStyles();

    return (
        <React.Fragment>
            <CssBaseline />
            <Navbar />
            <main>
                <Container maxWidth="lg" className={classes.top}>
                    <Grid
                        container
                        xs={6}
                        className={classes.left}
                        alignItems="center"
                    >
                        <Box pr={10}>
                            <Box mb={2} mt={-9}>
                                <Typography variant="h2">
                                    Welcome to ILS
                                </Typography>
                            </Box>
                            <Box mb={6}>
                                <Typography variant="h5">
                                    Lorem ipsum dolor sit amet consectetur
                                    adipisicing elit.
                                </Typography>
                            </Box>
                            <RoundedButton
                                variant="contained"
                                color="primary"
                                href="#"
                                onClick={() => {
                                    alert("clicked");
                                }}
                                size="large"
                            >
                                Browse Books
                            </RoundedButton>
                        </Box>
                    </Grid>
                    <Grid item xs={6} className={classes.right}>
                        <img
                            src={bookreading3}
                            alt="Person reading a book"
                            className={classes.topimg}
                        />
                    </Grid>
                </Container>

                <Container maxWidth="false" className={classes.second}>
                    <Container maxWidth="lg" className={classes.features}>
                        <Grid
                            container
                            xs={4}
                            alignItems="center"
                            justify="center"
                            className={classes.card}
                        >
                            <MenuBookOutlinedIcon
                                color="primary"
                                className={classes.icon}
                            />
                            <Typography variant="h5">
                                Thousands of Books
                            </Typography>
                        </Grid>
                        <Grid
                            container
                            xs={4}
                            alignItems="center"
                            justify="center"
                            className={classes.card}
                        >
                            <UpdateIcon
                                color="primary"
                                className={classes.icon}
                            />
                            <Typography variant="h5">
                                Frequently Updated
                            </Typography>
                        </Grid>
                        <Grid
                            container
                            xs={4}
                            alignItems="center"
                            justify="center"
                            className={classes.card}
                        >
                            <BookmarksOutlinedIcon
                                color="primary"
                                className={classes.icon}
                            />
                            <Typography variant="h5">
                                Online Booking and Reservations
                            </Typography>
                        </Grid>
                    </Container>
                </Container>
            </main>
        </React.Fragment>
    );
}
