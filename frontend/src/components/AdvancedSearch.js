import React, { useState } from "react";
import {
    CategoryProvider,
    CategoryTitle,
    CategoryItem,
} from "@mui-treasury/components/menu/category";
import { makeStyles } from "@material-ui/core/styles";
import { Container } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
    container: {
        backgroundColor: "#E7ECEF",
        borderRadius: "10px",
        marginTop: "5vh",
        height: "130vh",
        width: "20vw",
        display: "grid",
        rowGap: 0,
        textAlign: "left",
        paddingLeft: "1rem",
    },
    item: {
        margin: 0,
        padding: 0,
    },
});

const categories = [
    "Open Source",
    "Mobile",
    "Java",
    "Software Engineering",
    "Internet",
    "Web Development",
    "Miscellaneous",
    "Microsoft .NET",
    "Microsoft",
    "Next Generation Databases",
    "PowerBuilder",
    "Client-Server",
    "Computer Graphics",
    "Object-Oriented Programming",
    "Networking",
    "Theory",
    "Programming",
    "Python",
    "Mobile Technology",
    "Business",
    "XML",
    "Perl",
    "java",
    "Microsoft/.NET",
    "Miscellaneous",
    "Object-Technology Programming",
    "internet",
    ".NET",
    "Algorithmic Art",
    "PHP",
    "SOA",
    "Computer Graph",
    "Client Server",
    "In Action",
    "Software Development",
];

export default function AdvancedSearch() {
    const classes = useStyles();
    return (
        <div className={classes.container}>
            <CategoryProvider>
                <CategoryTitle>Published Year</CategoryTitle>
                <CategoryTitle>Categories</CategoryTitle>
                {categories.map((category) => {
                    return (
                        <CategoryItem className={classes.item}>
                            {category}
                        </CategoryItem>
                    );
                })}
            </CategoryProvider>
        </div>
    );
}
