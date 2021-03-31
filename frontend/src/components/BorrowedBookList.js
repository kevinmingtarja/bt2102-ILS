import React, { useState, useEffect } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { useFirebaseBtnStyles } from "@mui-treasury/styles/button/firebase";
import { useAlert } from "react-alert";

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        height: 100,
        color: "black",
        margin: 10,
        marginBottom: 20,
        borderRadius: 10,
        border: "1px solid black",
    },
    cover: {
        width: "100%",
    },
    title: {},
    info: {
        margin: 20,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
    },
    modal: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: "2px solid #000",
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    buttons: {
        marginRight: 30,
    },
    button: {
        margin: 10,
        backgroundColor: "#14cc60",
        borderColor: "#14cc60",
    },
}));

export default function BorrowedBookList({ book }) {
    const styles = useFirebaseBtnStyles();
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [data, setData] = useState(book);
    const [bookdata, setBookdata] = useState({});
    const alert = useAlert();

    useEffect(() => {
        axios
            .get(`http://localhost:8000/server/booklist/${data.bookid}/`)
            .then((res) => {
                setBookdata(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const isReturned = data.expectedduedate == null;

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleReturn = () => {
        axios
            .post(
                "http://localhost:8000/server/returnbook/",
                {
                    bookid: data.bookid,
                    memberid: data.borrowerid,
                },
                {
                    headers: {
                        Authorization: "JWT " + localStorage.getItem("token"),
                    },
                }
            )
            .then((response) => {
                setData(response.data);
            })
            .catch((err) => {
                alert.show(err.response.data.res);
            });
    };

    const handleExtend = () => {
        axios
            .post(
                "http://localhost:8000/server/renewbook/",
                {
                    bookid: data.bookid,
                    memberid: data.borrowerid,
                },
                {
                    headers: {
                        Authorization: "JWT " + localStorage.getItem("token"),
                    },
                }
            )
            .then((response) => {
                setData(response.data);
            })
            .catch((err) => {
                console.log(err.response.data.res);
                alert.show(err.response.data.res);
            });
    };

    return (
        <Card className={classes.root} elevation="0">
            <div className={classes.info}>
                <Typography
                    variant="h5"
                    onClick={handleOpen}
                    className={classes.title}
                >
                    {bookdata.title}
                </Typography>
                <Typography variant="h6" color="textSecondary">
                    {!isReturned
                        ? "Return By: " + data.expectedduedate
                        : "Book Returned"}
                </Typography>
            </div>
            {!isReturned ? (
                <div className={classes.buttons}>
                    <Link
                        to="/profile"
                        style={{
                            textDecoration: "none",
                        }}
                    >
                        <Button
                            classes={styles}
                            variant={"contained"}
                            color={"primary"}
                            onClick={handleExtend}
                        >
                            Extend
                        </Button>
                    </Link>
                    <Link
                        to="/profile"
                        style={{
                            textDecoration: "none",
                        }}
                    >
                        <Button
                            classes={styles}
                            variant={"contained"}
                            color={"primary"}
                            className={classes.button}
                            onClick={handleReturn}
                        >
                            Return
                        </Button>
                    </Link>
                </div>
            ) : null}

            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <div className={classes.paper}>
                        <h2 id="transition-modal-title">Transition modal</h2>
                        <p id="transition-modal-description">
                            Info about the book
                        </p>
                    </div>
                </Fade>
            </Modal>
        </Card>
    );
}
