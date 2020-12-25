/* global chrome */
const isSnow = (url) => {
    if (url.includes("excalibur.service-now")) {
        return true;
    } else {
        return false;
    }
}

export const sendText = (message) => {
    chrome.tabs.query({currentWindow: true, active: true},
        function (tabs) {
            if (isSnow(tabs[0].url)) {
                chrome.tabs.sendMessage(tabs[0].id, message)
            }
        })
}