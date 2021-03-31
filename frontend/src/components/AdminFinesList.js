import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";

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

export default function AdminBorrowedBookList({ id, fine }) {
    const classes = useStyles();
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Card className={classes.root} elevation="0">
            <div className={classes.info}>
                <Typography variant="h6" color="textSecondary">
                    {"Member ID: " + id}
                </Typography>
                <Typography variant="h6" color="textSecondary">
                    {"Fines: " + fine}
                </Typography>
            </div>

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
