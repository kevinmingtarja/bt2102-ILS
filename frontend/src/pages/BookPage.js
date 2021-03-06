import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, CssBaseline, Button, Box } from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";
import FadeLoader from "react-spinners/FadeLoader";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { css } from "@emotion/react";
import { useAlert } from "react-alert";

const useStyles = makeStyles((theme) => ({
    container: {
        display: "grid",
        paddingTop: "100px",
        justifyContent: "center",
    },
    book: {
        width: "100%",
        height: "50vh",
        display: "grid",
        gridTemplateColumns: "30% 70%",
        justifyContent: "center",
    },
    cover: {
        height: "100%",
        marginRight: "20px",
    },
    bookInfo: {
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        marginLeft: "2vw",
        marginTop: "4vh",
    },
    button: {
        marginRight: "1vw",
        padding: 0,
    },
    buttons: {
        marginTop: "4vh",
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
}));

const RoundedButton = withStyles((theme) => ({
    root: {
        width: "100px",
        height: "50px",
        borderRadius: "10px",
    },
}))(Button);

export default function BookPage({ match, location, id }) {
    const classes = useStyles();
    const [book, setBook] = useState({});
    const [open, setOpen] = useState(false);
    const [borrow, setBorrow] = useState(false);
    const [loading, setLoading] = useState(true);
    const alert = useAlert();

    useEffect(() => {
        axios
            .get(
                `http://localhost:8000/server/booklist/${match.params.bookID}/`
            )
            .then((res) => {
                console.log(res.data);
                setBook(res.data);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleBorrow = (bookID, memberID) => {
        //console.log(localStorage.getItem("token"));
        // POST request
        axios
            .post(
                "http://localhost:8000/server/borrowbook/",
                {
                    bookid: match.params.bookID,
                    memberid: id,
                },
                {
                    headers: {
                        Authorization: "JWT " + localStorage.getItem("token"),
                    },
                }
            )
            .then((res) => {
                console.log(res);
                console.log(res.data);
                handleOpen();
            })
            .catch((err) => {
                if (
                    err.response.status === 401 ||
                    err.response.status === 404
                ) {
                    alert.show("Please Log In before Borrowing");
                } else {
                    console.log(err.response);
                    console.log(err.response.data.res);
                    alert.show(err.response.data.res);
                }
            });
    };

    const handleReserve = (bookID, memberID) => {
        axios
            .post(
                `http://localhost:8000/server/reservebook/`,
                {
                    bookid: match.params.bookID,
                    memberid: id,
                },
                {
                    headers: {
                        Authorization: "JWT " + localStorage.getItem("token"),
                    },
                }
            )
            .then((res) => {
                console.log(res);
                console.log(res.data);
                handleOpen();
            })
            .catch((err) => {
                if (
                    err.response.status === 401 ||
                    err.response.status === 404
                ) {
                    alert.show("Please Log In before Reserving");
                } else {
                    console.log(err.response);
                    console.log(err.response.data.res);
                    alert.show(err.response.data.res);
                }
            });
    };

    return (
        <React.Fragment>
            <CssBaseline />
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
                <main>
                    <Container maxWidth="md" className={classes.container}>
                        <CardContent className={classes.book}>
                            <img
                                src={book.thumbnailUrl}
                                alt="Book Cover"
                                className={classes.cover}
                                onClick={handleOpen}
                            />
                            <CardContent className={classes.bookInfo}>
                                <Typography variant="h3" align="left">
                                    {book.title}
                                </Typography>
                                <Typography
                                    variant="h4"
                                    align="left"
                                    color="textSecondary"
                                >
                                    by {book.authors.replace(/[\[\]']+/g, "")}
                                </Typography>
                                <div className={classes.buttons}>
                                    <RoundedButton
                                        className={classes.button}
                                        variant="contained"
                                        color="primary"
                                        href="#"
                                        size="large"
                                        onClick={() => {
                                            setBorrow(true);
                                            handleBorrow(
                                                match.params.bookID,
                                                id
                                            );
                                        }}
                                    >
                                        Borrow
                                    </RoundedButton>

                                    <RoundedButton
                                        className={classes.button}
                                        variant="contained"
                                        color="primary"
                                        href="#"
                                        size="large"
                                        onClick={() => {
                                            setBorrow(false);
                                            handleReserve(
                                                match.params.bookID,
                                                id
                                            );
                                        }}
                                    >
                                        Reserve
                                    </RoundedButton>
                                </div>
                            </CardContent>
                        </CardContent>
                        <Typography
                            variant="h5"
                            style={{ margin: "3vh", fontWeight: "bold" }}
                        >
                            {book.longDescription ? "Description" : null}
                        </Typography>
                        <Typography
                            variant="h6"
                            align="left"
                            color="textSecondary"
                        >
                            {book.longDescription
                                ? book.longDescription
                                : book.shortDescription}
                        </Typography>
                    </Container>

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
                                <h2 id="transition-modal-title">
                                    {borrow
                                        ? "Book Succesfully borrowed"
                                        : "Book succesfully reserved"}
                                </h2>
                            </div>
                        </Fade>
                    </Modal>
                </main>
            )}
        </React.Fragment>
    );
}
