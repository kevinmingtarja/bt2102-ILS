import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import SearchIcon from "@material-ui/icons/Search";

const useStyles = makeStyles((theme) => ({
    margin: {
        marginTop: 50,
        width: "80%",
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
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon />
                        </InputAdornment>
                    ),
                }}
            />
        </div>
    );
}
