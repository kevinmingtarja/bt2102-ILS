import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";
import SearchIcon from "@material-ui/icons/Search";

const useStyles = makeStyles((theme) => ({
    margin: {
        marginTop: 50,
        width: "75%",
    },
    resize: {
        fontSize: 26,
    },
}));

export default function SearchBar() {
    const classes = useStyles();

    return (
        <div>
            <TextField
                fullWidth
                className={classes.margin}
                placeholder="Search"
                size="medium"
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon fontSize="large" />
                        </InputAdornment>
                    ),
                    classes: {
                        input: classes.resize,
                    },
                }}
            />
        </div>
    );
}
