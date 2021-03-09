import React, { useState } from "react";
import {
    CategoryProvider,
    CategoryTitle,
    CategoryItem,
} from "@mui-treasury/components/menu/category";
import { makeStyles } from "@material-ui/core/styles";
import { Container } from "@material-ui/core";

const useStyles = makeStyles({
    container: {
        backgroundColor: "#E7ECEF",
        borderRadius: "10px",
        height: "80vh",
        marginTop: "5vh",
        width: "20vw",
    },
});

export default function AdvancedSearch() {
    const classes = useStyles();
    return (
        <div className={classes.container}>
            <CategoryProvider>
                <CategoryTitle>Advanced Search</CategoryTitle>
                <CategoryItem>Software Engineering</CategoryItem>
                <CategoryItem>Performance Monitors</CategoryItem>
                <CategoryItem>Training</CategoryItem>
                <CategoryItem>Motivation</CategoryItem>
                <CategoryItem>Cross skiing</CategoryItem>
                <CategoryItem>More</CategoryItem>
            </CategoryProvider>
        </div>
    );
}
