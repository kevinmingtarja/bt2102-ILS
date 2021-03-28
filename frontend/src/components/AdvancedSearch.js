import React, { useState } from "react";
import {
    CategoryProvider,
    CategoryTitle,
    CategoryItem,
} from "@mui-treasury/components/menu/category";
import { makeStyles } from "@material-ui/core/styles";
import { YearPicker } from "react-dropdown-date";
import Button from "@material-ui/core/Button";
import { useFirebaseBtnStyles } from "@mui-treasury/styles/button/firebase";

const useStyles = makeStyles({
    container: {
        backgroundColor: "#E7ECEF",
        borderRadius: "10px",
        marginTop: "5vh",
        padding: "1rem",
        paddingTop: 0,
        height: "130vh",
        width: "20vw",
        display: "grid",
        rowGap: 0,
        textAlign: "left",
        paddingLeft: "1rem",
    },
    active: {
        margin: 0,
        padding: 0,
        fontWeight: "bold",
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

export default function AdvancedSearch(props) {
    const styles = useFirebaseBtnStyles();
    const classes = useStyles();

    return (
        <div className={classes.container}>
            <CategoryProvider>
                <CategoryTitle>Published Year</CategoryTitle>
                <YearPicker
                    defaultValue={"Select Year"}
                    start={1993} // default is 1900
                    end={2020} // default is current year
                    reverse // default is ASCENDING
                    value={props.year} // mandatory
                    onChange={(year) => {
                        // mandatory
                        props.setYear(year);
                    }}
                    id={"year"}
                    name={"year"}
                />

                <CategoryTitle>Categories</CategoryTitle>
                {categories.map((category) => {
                    return (
                        <CategoryItem
                            className={
                                props.category == category
                                    ? classes.active
                                    : null
                            }
                            onClick={() => props.setCategory(category)}
                            style={{ cursor: "pointer" }}
                        >
                            {category}
                        </CategoryItem>
                    );
                })}
                <Button
                    style={{ marginTop: "1.5rem", width: "95%" }}
                    classes={styles}
                    variant={"contained"}
                    color={"primary"}
                    onClick={() =>
                        props.handleFilter(props.year, props.category)
                    }
                >
                    Filter
                </Button>
            </CategoryProvider>
        </div>
    );
}
