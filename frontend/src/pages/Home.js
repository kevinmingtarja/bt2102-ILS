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

import Landing from "./Landing";
import Features from "./Features";

const useStyles = makeStyles((theme) => ({}));

export default function Home() {
    const classes = useStyles();

    return (
        <React.Fragment>
            <CssBaseline />
            <Navbar />
            <main>
                <Landing />
                <Features />
            </main>
        </React.Fragment>
    );
}
