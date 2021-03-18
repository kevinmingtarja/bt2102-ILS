import {
    CssBaseline,
    Container,
    Typography,
    Button,
    Box,
} from "@material-ui/core";
import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Navbar from "../components/Navbar";
import Landing from "./Landing";
import Features from "./Features";

const useStyles = makeStyles((theme) => ({}));

export default function Home() {
    const classes = useStyles();

    return (
        <React.Fragment>
            <CssBaseline />
            <main>
                <Landing />
                <Features />
            </main>
        </React.Fragment>
    );
}
