import React from "react";
import {Button, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/styles";
import {sendText} from "./chromeFunctions";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1
    },
    content: {
        marginTop: "20px"
    },
    area: {},
    button: {
        margin: "5px"
    }
}));

const UserComponent = (props) => {
    const classes = useStyles();
    console.log(props.templates)
    console.log(props.templates.length)
    return (
        <div>
            {props.templates.length > 0 && <div>
                <Typography variant={"subtitle1"} gutterBottom>Custom:</Typography>
                {props.templates.map((template) => {
                    return (<Button className={classes.button} variant={"contained"} color={"secondary"}
                            onClick={() => sendText(template)}>{template.name}</Button>)
                }) }
            </div>
            }
        </div>
    )
}

export default UserComponent;