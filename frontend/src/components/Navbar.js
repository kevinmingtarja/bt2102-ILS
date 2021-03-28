import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { NavMenu, NavItem } from "@mui-treasury/components/menu/navigation";
import { useLineNavigationMenuStyles } from "@mui-treasury/styles/navigationMenu/line";
import { useFirebaseBtnStyles } from "@mui-treasury/styles/button/firebase";
import { usePushingGutterStyles } from "@mui-treasury/styles/gutter/pushing";

const useStyles = makeStyles((theme) => ({
    navbar: {
        backgroundColor: "white",
        color: theme.palette.primary.main,
        position: "fixed",
    },
    container: {
        display: "grid",
        gridTemplateColumns: "20% 60% 20%",
        justifyItems: "center",
    },
    pages: {
        display: "flex",
    },
    title: {
        margin: "1rem",
    },
}));

function ElevationScroll(props) {
    const { children, window } = props;
    // Note that you normally won't need to set the window ref as useScrollTrigger
    // will default to window.
    // This is only being set here because the demo is in an iframe.
    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 0,
        target: window ? window() : undefined,
    });

    return React.cloneElement(children, {
        elevation: trigger ? 4 : 0,
    });
}

export default function Navbar(props) {
    const classes = useStyles();
    const styles = useFirebaseBtnStyles();
    const gutterStyles = usePushingGutterStyles();

    return (
        <div className={classes.root}>
            <ElevationScroll {...props}>
                <AppBar position="static" className={classes.navbar}>
                    <Toolbar className={classes.container}>
                        <Link
                            to="/"
                            style={{
                                textDecoration: "none",
                                color: "#2176ff",
                            }}
                            onClick={() => props.setActive("")}
                        >
                            <Typography variant="h3">BT2102</Typography>
                        </Link>
                        <Box height={48} display={"flex"}>
                            <NavMenu useStyles={useLineNavigationMenuStyles}>
                                <Link
                                    to="/library"
                                    style={{
                                        textDecoration: "none",
                                    }}
                                >
                                    <NavItem
                                        active={
                                            props.active == "library"
                                                ? true
                                                : false
                                        }
                                    >
                                        <Typography variant="h6">
                                            Library
                                        </Typography>
                                    </NavItem>
                                </Link>
                                <NavItem
                                    active={
                                        props.active == "about" ? true : false
                                    }
                                >
                                    <Typography variant="h6">
                                        About Us
                                    </Typography>
                                </NavItem>
                                <Link
                                    to="/payment"
                                    style={{
                                        textDecoration: "none",
                                    }}
                                >
                                    <NavItem
                                        active={
                                            props.active == "payments"
                                                ? true
                                                : false
                                        }
                                    >
                                        <Typography variant="h6">
                                            Payments
                                        </Typography>
                                    </NavItem>
                                </Link>
                            </NavMenu>
                        </Box>
                        {!props.isLoggedIn ? (
                            <div className={gutterStyles.parent}>
                                <Link
                                    to="/login"
                                    style={{
                                        textDecoration: "none",
                                    }}
                                >
                                    <Button classes={styles}>Login</Button>
                                </Link>
                                <Link
                                    to="/register"
                                    style={{
                                        textDecoration: "none",
                                    }}
                                >
                                    <Button
                                        classes={styles}
                                        variant={"contained"}
                                        color={"primary"}
                                    >
                                        Register
                                    </Button>
                                </Link>
                            </div>
                        ) : (
                            <div className={gutterStyles.parent}>
                                <Link
                                    to="/profile"
                                    style={{
                                        textDecoration: "none",
                                    }}
                                >
                                    <Button classes={styles}>
                                        {props.username}
                                    </Button>
                                </Link>
                                <Link
                                    to="/"
                                    style={{
                                        textDecoration: "none",
                                    }}
                                >
                                    <Button
                                        classes={styles}
                                        variant={"contained"}
                                        color={"primary"}
                                        onClick={() => props.handleLogout()}
                                    >
                                        Sign Out
                                    </Button>
                                </Link>
                            </div>
                        )}
                    </Toolbar>
                </AppBar>
            </ElevationScroll>
        </div>
    );
}
