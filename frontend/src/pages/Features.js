import { Container, Typography, Box } from "@material-ui/core";
import React, { useState } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import MenuBookOutlinedIcon from "@material-ui/icons/MenuBookOutlined";
import UpdateIcon from "@material-ui/icons/Update";
import BookmarksOutlinedIcon from "@material-ui/icons/BookmarksOutlined";

const useStyles = makeStyles((theme) => ({
    second: {
        backgroundColor: "#E7ECEF",
        height: "45vh",
    },
    features: {
        display: "flex",
        height: "100%",
    },
    card: {
        display: "grid",
        gridTemplateRows: "60% 20% 20%",
        justifyItems: "center",
        alignItems: "end",
    },
    icon: {
        transform: "scale(3)",
        marginBottom: "40px",
    },
}));

export default function Features() {
    const classes = useStyles();

    return (
        <Container maxWidth="false" className={classes.second}>
            <Container maxWidth="lg" className={classes.features}>
                <Grid container xs={4} className={classes.card}>
                    <MenuBookOutlinedIcon
                        color="primary"
                        className={classes.icon}
                    />
                    <Box>
                        <Typography variant="h6" color="textPrimary">
                            Extensive Collection
                        </Typography>
                        <Typography variant="subtitle1" color="textSecondary">
                            More than a thousand books available
                        </Typography>
                    </Box>
                </Grid>
                <Grid container xs={4} className={classes.card}>
                    <UpdateIcon color="primary" className={classes.icon} />
                    <Box>
                        <Typography variant="h6" color="textPrimary">
                            Frequently Updated
                        </Typography>
                        <Typography variant="subtitle1" color="textSecondary">
                            All the newest collections
                        </Typography>
                    </Box>
                </Grid>
                <Grid container xs={4} className={classes.card}>
                    <BookmarksOutlinedIcon
                        color="primary"
                        className={classes.icon}
                    />
                    <Box>
                        <Typography variant="h6" color="textPrimary">
                            Online Booking and Reservations
                        </Typography>
                        <Typography variant="subtitle1" color="textSecondary">
                            Quick and intuitive
                        </Typography>
                    </Box>
                </Grid>
            </Container>
        </Container>
    );
}
