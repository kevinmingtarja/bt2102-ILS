import React, { useState } from "react";
import { Link } from "react-router-dom";
import books from "./Books";
import Box from "@material-ui/core/Box";
import { NavMenu, NavItem } from "@mui-treasury/components/menu/navigation";
import { useLineNavigationMenuStyles } from "@mui-treasury/styles/navigationMenu/line";
import { makeStyles } from "@material-ui/core/styles";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import BorrowedBookList from "../components/BorrowedBookList";
import ReservedBookList from "../components/ReservedBookList";

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
    const [data, setData] = useState(books);
    const [active, setActive] = useState("Borrowed");

    const handleChangeData = (newType) => {
        setActive(newType);
        if (newType == active) {
            return;
        }

        if (newType == "Borrowed") {
            // Fetch data of books
        } else if (newType == "Reserved") {
            // Fetch data of reserved books
        } else {
            // Fetch fine data
        }
    };

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
                                active={active == "Borrowed" ? true : false}
                                onClick={() => handleChangeData("Borrowed")}
                            >
                                <Typography variant="h6">
                                    Borrowed Books
                                </Typography>
                            </NavItem>
                            <NavItem
                                active={active == "Reserved" ? true : false}
                                onClick={() => handleChangeData("Reserved")}
                            >
                                <Typography variant="h6">
                                    Reserved Books
                                </Typography>
                            </NavItem>
                            <NavItem
                                active={active == "Fines" ? true : false}
                                onClick={() => handleChangeData("Fines")}
                            >
                                <Typography variant="h6">Fines</Typography>
                            </NavItem>
                        </NavMenu>
                    </Box>
                    <CardContent className={classes.books}>
                        {data.map((book) => {
                            if (active == "Borrowed") {
                                return <BorrowedBookList book={book} />;
                            } else if (active == "Reserved") {
                                return <ReservedBookList book={book} />;
                            }
                        })}
                    </CardContent>
                </Container>
            </main>
        </React.Fragment>
    );
}
