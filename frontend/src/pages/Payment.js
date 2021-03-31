import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "react-credit-cards";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { useFirebaseBtnStyles } from "@mui-treasury/styles/button/firebase";
import "react-credit-cards/es/styles-compiled.css";
import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { useAlert } from "react-alert";

const useStyles = makeStyles((theme) => ({
    container: {
        display: "grid",
        paddingTop: "10vh",
        justifyContent: "center",
    },
    smallContainer: {
        display: "flex",
    },
    cvc: {
        marginLeft: "20px",
    },
    button: {
        marginTop: "20px",
        width: "100%",
        padding: "12px",
    },
    dropdown: {
        marginTop: "20px",
        width: "100%",
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

export default function Payment(props) {
    const alert = useAlert();
    const [fine, setFine] = useState("");
    const styles = useFirebaseBtnStyles();
    const classes = useStyles();
    const [cvc, setCvc] = useState("");
    const [expiry, setExpiry] = useState("");
    const [focus, setFocus] = useState("");
    const [name, setName] = useState("");
    const [number, setNumber] = useState("");
    const [method, setMethod] = useState("");
    const [open, setOpen] = useState(false);

    useEffect(() => {
        props.setActive("payments");
        axios
            .get(`http://localhost:8000/server/fine/${props.id}/`, {
                headers: {
                    Authorization: "JWT " + localStorage.getItem("token"),
                },
            })
            .then((res) => {
                console.log(res.data);
                setFine(res.data["res"]);
            });
    });

    const handleInputFocus = (e) => {
        setFocus(e.target.name);
    };

    const handleCvcChange = (e) => {
        setCvc(e.target.value);
    };

    const handleExpiryChange = (e) => {
        setExpiry(e.target.value);
    };

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleNumberChange = (e) => {
        if (number.length <= 16) {
            setNumber(e.target.value);
        } else {
            setNumber(e.target.value.substring(0, 16));
        }
    };

    const handleDropdown = (event) => {
        setMethod(event.target.value);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handlePayFine = () => {
        //console.log(localStorage.getItem("token"));
        // POST request
        axios
            .post(
                "http://localhost:8000/server/payfine/",
                {
                    paymentmethod: method,
                    memberid: props.id,
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
                setCvc("");
                setExpiry("");
                setName("");
                setNumber("");
                setMethod("");
                setFocus("");
            })
            .catch((err) => {
                if (
                    err.response.status === 401 ||
                    err.response.status === 404
                ) {
                    alert.show("Payment Unsuccesful");
                } else {
                    console.log(err.response);
                    console.log(err.response.data.res);
                    alert.show(err.response.data.res);
                }
            });
    };

    console.log(fine);

    return (
        <div>
            {props.username ? (
                <div className={classes.container}>
                    <h1>
                        {fine == "No Fines"
                            ? "You Have no Fines"
                            : "Fine: " + fine}
                    </h1>
                    <Card
                        number={number}
                        name={name}
                        expiry={expiry}
                        cvc={cvc}
                        focused={focus}
                    />
                    <form>
                        <div className={classes.dropdown}>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={method}
                                onChange={handleDropdown}
                                style={{ width: "100%" }}
                            >
                                <MenuItem value="" disabled>
                                    Method
                                </MenuItem>
                                <MenuItem value={"DEBIT CARD"}>Debit</MenuItem>
                                <MenuItem value={"CREDIT CARD"}>
                                    Credit
                                </MenuItem>
                            </Select>
                        </div>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            label="Card Number"
                            autoFocus
                            onChange={handleNumberChange}
                            onFocus={handleInputFocus}
                            value={number}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            label="Name"
                            autoFocus
                            onChange={handleNameChange}
                            onFocus={handleInputFocus}
                            value={name}
                        />
                        <div className={classes.smallContainer}>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                label="Valid Thru"
                                autoFocus
                                onChange={handleExpiryChange}
                                onFocus={handleInputFocus}
                                pattern="\d\d/\d\d"
                                value={expiry}
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                label="CVC"
                                autoFocus
                                onChange={handleCvcChange}
                                onFocus={handleInputFocus}
                                pattern="\d{3,4}"
                                className={classes.cvc}
                                value={cvc}
                            />
                        </div>
                        <div className="form-actions">
                            <Button
                                className={classes.button}
                                classes={styles}
                                variant={"contained"}
                                color={"primary"}
                                onClick={handlePayFine}
                                disabled={fine == "No Fines" ? true : false}
                            >
                                PAY
                            </Button>
                        </div>
                    </form>
                </div>
            ) : (
                <div style={{ paddingTop: "40vh" }}>
                    <h1>Please Log In</h1>
                </div>
            )}
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
                        <h2 id="transition-modal-title">Payment Successful</h2>
                    </div>
                </Fade>
            </Modal>
        </div>
    );
}
