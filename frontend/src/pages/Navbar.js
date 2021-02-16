import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
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

export default function Navbar() {
    const classes = useStyles();
    const styles = useFirebaseBtnStyles();
    const gutterStyles = usePushingGutterStyles();

    return (
        <div className={classes.root}>
            <AppBar position="static" className={classes.navbar}>
                <Toolbar className={classes.container}>
                    <Typography variant="h3">LOGO</Typography>
                    <Box height={48} display={"flex"}>
                        <NavMenu useStyles={useLineNavigationMenuStyles}>
                            <NavItem active>
                                <Typography variant="h6">Library</Typography>
                            </NavItem>
                            <NavItem>
                                <Typography variant="h6">
                                    Borrow a Book
                                </Typography>
                            </NavItem>
                            <NavItem>
                                <Typography variant="h6">
                                    Reservation
                                </Typography>
                            </NavItem>
                        </NavMenu>
                    </Box>
                    <div className={gutterStyles.parent}>
                        <Button classes={styles}>Login</Button>
                        <Button
                            classes={styles}
                            variant={"contained"}
                            color={"primary"}
                        >
                            Register
                        </Button>
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    );
}
