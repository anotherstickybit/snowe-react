/* global chrome */
import React from "react";
import {Button, FormControlLabel, Radio, RadioGroup, TextareaAutosize, TextField, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1
    },
    content: {
        marginTop: "20px"
    },
    area: {
        marginTop: "10px",
    },
    button: {
        marginTop: "10px"
    }
}));

const saveTemplate = () => {
    let name = document.getElementById("name").value
    let commentText = document.getElementById("commentText").value
    let suspendCheck = document.getElementById("suspend")
    let closeCheck = document.getElementById("close")
    if (name === "" || commentText === "") {
        alert("One of fields is empty")
        return
    }
    if (suspendCheck.checked) {
        name += "-suspend"
        chrome.storage.local.set({[name]: commentText})
    }
    if (closeCheck.checked) {
        name += "---close"
        chrome.storage.local.set({[name]: commentText})
    }
}

const clearUserTemplates = () => {
    chrome.storage.local.clear()
}

const NewTemplatePage = () => {
    const classes = useStyles();

    const [value, setValue] = React.useState('suspend');

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    return (
        <div className={classes.content}>
            <Typography variant={"subtitle1"} gutterBottom>Create new:</Typography>
            <div className={classes.area}>
                <TextField id="name" size={"small"} label="Name" inputProps={{ maxLength: 15 }} variant="outlined" required={true}/>
            </div>
            <div className={classes.area}>
                <TextField id="commentText" variant={"outlined"} label="Content" required={true} fullWidth multiline rows={5} rowsMax={15} />
            </div>
            <div>
                <RadioGroup aria-label="type" name="commentType" value={value} onChange={handleChange}>
                    <FormControlLabel value="suspend" control={<Radio id="suspend" />} label="Notes" />
                    <FormControlLabel value="close" control={<Radio id="close" />} label="Resolution" />
                </RadioGroup>
            </div>
            <div className={classes.button}>
                <Button variant={"contained"} color={"primary"} onClick={() => saveTemplate()}>Create</Button>
            </div>
            <div className={classes.button}>
                <Button variant={"contained"} color={"primary"} onClick={() => clearUserTemplates()}>Clear Custom Templates</Button>
            </div>
        </div>
    )
}

export default NewTemplatePage;