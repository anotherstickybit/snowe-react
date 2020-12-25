/* global chrome */
import React, {useEffect, useState} from "react";
import ReactDOM from 'react-dom';
import {Button, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/styles";
import UserComponentContainer from "./UserComponentContainer";
import UserComponent from "./UserComponent";
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

const TemplatesPage = (props) => {
    let templates = props.getTemplates();

    const classes = useStyles();
    let messageToClose = {
        "type": "close",
        "message": "What was done:\nWhat was changed and what result was achieved by this:\nWhat else should be done (if necessary):"
    }
    let messageToSuspend = {
        "type": "suspend",
        "message": "Last implemented action:\nNext planned action:\nPlanned date for next action:\nResponsible person:"
    }

    return (
        <div className={classes.content}>
            <div className={classes.area}>

                <div id="userTemplates" className={classes.area}>
                    <UserComponentContainer waitBeforeShow={100}>
                        <UserComponent templates={templates}/>
                    </UserComponentContainer>
                </div>
                <Typography variant={"subtitle1"} gutterBottom>Default:</Typography>
                <Button className={classes.button} variant={"contained"} color={"primary"}
                        onClick={() => sendText(messageToSuspend)}>Suspend</Button>
                <Button className={classes.button} variant={"contained"} color={"primary"}
                        onClick={() => sendText(messageToClose)}>Close</Button>
            </div>
        </div>
    )
}

export default TemplatesPage;