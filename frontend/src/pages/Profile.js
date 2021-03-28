import React, { useState, useEffect } from "react";
import axios from "axios";
import Box from "@material-ui/core/Box";
import { NavMenu, NavItem } from "@mui-treasury/components/menu/navigation";
import { useLineNavigationMenuStyles } from "@mui-treasury/styles/navigationMenu/line";
import { makeStyles } from "@material-ui/core/styles";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import BorrowedBookList from "../components/BorrowedBookList";
import ReservedBookList from "../components/ReservedBookList";
import FadeLoader from "react-spinners/FadeLoader";
import { css } from "@emotion/react";
import { useAlert } from "react-alert";

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
    const [data, setData] = useState(null);
    const [reserved, setReserved] = useState([]);
    const [borrowed, setBorrowed] = useState([]);
    const [fines, setFines] = useState([]);
    const [active, setActive] = useState("Borrowed");
    const [loading, setLoading] = useState(true);
    const alert = useAlert();

    console.log("IS STAFF " + props.isStaff);
    console.log(reserved);
    console.log(borrowed);
    console.log(fines);

    if (data != null) {
        console.log(data.length == 0);
    }

    useEffect(() => {
        if (!props.isStaff) {
            axios
                .get(
                    `http://localhost:8000/server/borrowedbooks/${props.id}/`,
                    {
                        headers: {
                            Authorization:
                                "JWT " + localStorage.getItem("token"),
                        },
                    }
                )
                .then((res) => {
                    console.log(res.data);
                    setData(res.data);
                    setLoading(false);
                })
                .catch((err) => {
                    console.log(err);
                    alert.show("Please Login Again");
                });
        }
    }, []);

    useEffect(() => {
        if (props.isStaff) {
            axios
                .get(`http://localhost:8000/server/adminreservedbooks/`, {
                    headers: {
                        Authorization: "JWT " + localStorage.getItem("token"),
                    },
                })
                .then((res) => {
                    console.log(res.data);
                    setReserved(res.data);
                    setLoading(false);
                })
                .catch((err) => {
                    console.log(err);
                    alert.show("Please Login Again");
                });
        }
    }, []);

    useEffect(() => {
        if (props.isStaff) {
            axios
                .get(`http://localhost:8000/server/adminborrowedbooks/`, {
                    headers: {
                        Authorization: "JWT " + localStorage.getItem("token"),
                    },
                })
                .then((res) => {
                    console.log(res.data);
                    setBorrowed(res.data);
                })
                .catch((err) => {
                    console.log(err);
                    alert.show("Please Login Again");
                });
        }
    }, []);

    useEffect(() => {
        if (props.isStaff) {
            axios
                .get(`http://localhost:8000/server/adminunpaidfines/`, {
                    headers: {
                        Authorization: "JWT " + localStorage.getItem("token"),
                    },
                })
                .then((res) => {
                    console.log(res.data);
                    setFines(res.data);
                })
                .catch((err) => {
                    console.log(err);
                    alert.show("Please Login Again");
                });
        }
    }, []);

    const handleChangeData = (newType) => {
        setActive(newType);
        if (newType == active) {
            return;
        }

        if (newType == "Borrowed") {
            axios
                .get(
                    `http://localhost:8000/server/borrowedbooks/${props.id}/`,
                    {
                        headers: {
                            Authorization:
                                "JWT " + localStorage.getItem("token"),
                        },
                    }
                )
                .then((res) => {
                    console.log(res.data);
                    setData(res.data);
                    setLoading(false);
                })
                .catch((err) => {
                    console.log(err);
                    alert.show("Signature Has Expired, Please Login Again");
                });
        } else if (newType == "Reserved") {
            axios
                .get(
                    `http://localhost:8000/server/reservedbooks/${props.id}/`,
                    {
                        headers: {
                            Authorization:
                                "JWT " + localStorage.getItem("token"),
                        },
                    }
                )
                .then((res) => {
                    console.log(res.data);
                    setData(res.data);
                    setLoading(false);
                })
                .catch((err) => {
                    alert.show("Error Fetching Data");
                });
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
                            <Typography variant="h4">
                                {"Status: " +
                                    (props.isStaff ? "Staff" : "Member")}
                            </Typography>
                        </CardContent>
                    </CardContent>
                    {!props.isStaff ? (
                        <>
                            <Box
                                height={48}
                                display={"flex"}
                                justifyContent="center"
                            >
                                <NavMenu
                                    useStyles={useLineNavigationMenuStyles}
                                >
                                    <NavItem
                                        active={
                                            active == "Borrowed" ? true : false
                                        }
                                        onClick={() =>
                                            handleChangeData("Borrowed")
                                        }
                                    >
                                        <Typography variant="h6">
                                            Borrowed Books
                                        </Typography>
                                    </NavItem>
                                    <NavItem
                                        active={
                                            active == "Reserved" ? true : false
                                        }
                                        onClick={() =>
                                            handleChangeData("Reserved")
                                        }
                                    >
                                        <Typography variant="h6">
                                            Reserved Books
                                        </Typography>
                                    </NavItem>
                                    <NavItem
                                        active={
                                            active == "Fines" ? true : false
                                        }
                                        onClick={() =>
                                            handleChangeData("Fines")
                                        }
                                    >
                                        <Typography variant="h6">
                                            Fines
                                        </Typography>
                                    </NavItem>
                                </NavMenu>
                            </Box>
                            {loading ? (
                                <div className={classes.loading}>
                                    <FadeLoader
                                        loading={loading}
                                        color="#2176ff"
                                        css={css}
                                        size={150}
                                    />
                                </div>
                            ) : data.length != 0 ? (
                                <CardContent className={classes.books}>
                                    {data.map((book) => {
                                        if (active == "Borrowed") {
                                            return (
                                                <BorrowedBookList
                                                    book={book}
                                                    key={book.bookid}
                                                />
                                            );
                                        } else if (active == "Reserved") {
                                            return (
                                                <ReservedBookList
                                                    book={book}
                                                    id={props.id}
                                                    key={book.bookid}
                                                />
                                            );
                                        }
                                    })}
                                </CardContent>
                            ) : (
                                <CardContent>
                                    <Typography variant="h3">
                                        {active != "Fines"
                                            ? "No " + active + " Books"
                                            : "No Fines"}
                                    </Typography>
                                </CardContent>
                            )}
                        </>
                    ) : (
                        <>
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
                                <div>
                                    {reserved.map((book) => {
                                        return book.title;
                                    })}
                                    {borrowed.map((book) => {
                                        return book.title;
                                    })}
                                    {fines.map((fine) => {
                                        return fine.amount;
                                    })}
                                </div>
                            )}
                        </>
                    )}
                </Container>
            </main>
        </React.Fragment>
    );
}
