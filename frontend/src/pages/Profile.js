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
    const [active, setActive] = useState("Borrowed");
    const [loading, setLoading] = useState(true);
    const alert = useAlert();

    if (data != null) {
        console.log(data.length == 0);
    }

    useEffect(() => {
        // let userid = props.id
        // if (!props.id) {
        //     userid = await axios.get("http://localhost:8000/server/current_user/", {
        //         headers: {
        //             Authorization: `JWT ${localStorage.getItem("token")}`,
        //         },
        //     })
        //     .then(res => res.json())
        //     .then(json => json.id)
        //     .catch(err => {return ""});
        // }

        setTimeout(() => {
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
        }, 300);
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
                </Container>
            </main>
        </React.Fragment>
    );
}
