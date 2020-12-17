import React from "react";
import {TextareaAutosize} from "@material-ui/core";

const NewTemplatePage = () => {

    return (
        <div>
            <h3>New Template</h3>
            <TextareaAutosize aria-label="empty textarea" placeholder="Empty" />
        </div>
    )
}

export default NewTemplatePage;