/* global chrome */
import React from "react";
import ReactDOM from 'react-dom';
import {Button, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1
    },
    content: {
        marginTop: "20px"
    },
    area: {

    },
    button: {
        margin: "5px"
    }
}));

const isSnow = (url) => {
    if (url.includes("excalibur.service-now")) {
        return true;
    } else {
        return false;
    }
}

const sendText = (message) => {
    chrome.tabs.query({currentWindow: true, active: true},
        function (tabs) {
            if (isSnow(tabs[0].url)) {
                chrome.tabs.sendMessage(tabs[0].id, message)
            }
        })
}

const storTemp = () => {
    chrome.storage.local.get(null, function(items) {
        for (let key in items) {
            if (key.includes("-suspend")) {
                getTemplatesFromStorage(key, "suspend")
            }
            if (key.includes("--close")) {
                getTemplatesFromStorage(key, "close")
            }
        }
    });
}

const getTemplatesFromStorage = (key, type) => {
    chrome.storage.local.get(key, function (result) {
        let div = document.getElementById("userTemplates")
        let message = {
            "type": type,
            "message": result[key]
        }
        ReactDOM.render(
            React.createElement(Button,
                {variant: "contained", color: "secondary", onClick: () => sendText(message)},
                key.substring(0, key.length - 8)),
            document.getElementById("userTemplates")
        );
    })
}

const TemplatesPage = () => {
    const classes = useStyles();
    let messageToClose = {
        "type": "close",
        "message": "What was done:\nWhat was changed and what result was achieved by this:\nWhat else should be done (if necessary):"
    }
    let messageToSuspend = {
        "type": "suspend",
        "message": "Last implemented action:\nNext planned action:\nPlanned date for next action:\nResponsible person:"
    }
    storTemp();

    return (
        <div className={classes.content}>
            <div className={classes.area}>
                <Typography variant={"subtitle1"} gutterBottom>Custom:</Typography>
                <div id="userTemplates" className={classes.area}>

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