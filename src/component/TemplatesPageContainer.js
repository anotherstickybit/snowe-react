/* global chrome */
import React from "react";
import TemplatesPage from "./TemplatesPage";

const getTemplatesFromStorage = () => {
    let userTemplates = []
    chrome.storage.local.get(null, function(items) {
        for (let key in items) {
            if (key.includes("-suspend")) {
                chrome.storage.local.get(key, function(result) {
                    let div = document.getElementById("userTemplates")
                    let message = {
                        "name": key.substring(0, key.length - 8),
                        "type": "suspend",
                        "message": result[key]
                    }
                    userTemplates.push(message)
                });
            }
            if (key.includes("--close")) {
                chrome.storage.local.get(key, function(result) {
                    let div = document.getElementById("userTemplates")
                    let message = {
                        "name": key.substring(0, key.length - 8),
                        "type": "close",
                        "message": result[key]
                    }
                    userTemplates.push(message)
                });
            }
        }
    });
    return userTemplates;
}


class TemplatesPageContainer extends React.Component {

    componentDidMount() {

    }

    render() {
        return (
            <TemplatesPage getTemplates={() => getTemplatesFromStorage()}/>
        )
    }
}

export default TemplatesPageContainer;