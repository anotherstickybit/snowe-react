/* global chrome */

chrome.runtime.onMessage.addListener(gotMessage);

function gotMessage(message, sender, sendResponse) {
    if (message.type === 'suspend') {
        document.getElementById('gsft_main').contentWindow.document.getElementById('activity-stream-comments-textarea').value = message.message
    }
    if (message.type === 'close') {
        document.getElementById('gsft_main').contentWindow.document.getElementById('incident.close_notes').value = message.message
    }
}

let oldHref = document.location.href;
window.onload = function () {
    let bodyList = document.querySelector("body")
        , observer = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
            setTimeout(function () {
                if (oldHref !== document.location.href) {
                    oldHref = document.location.href;
                    if (document.location.href.includes("change_task")) {
                        incidentAndTask();
                    }
                }
            }, 1000)

        });
    });
    let config = {
        childList: true,
        subtree: true
    };
    observer.observe(bodyList, config);
};

function incidentAndTask() {
    if (document.getElementById('gsft_main')) {
        let saveButton = document.getElementById('gsft_main').contentWindow.document.getElementById('sysverb_update_and_stay');
        let updateButton = document.getElementById('gsft_main').contentWindow.document.getElementById('sysverb_update');
        if (saveButton && updateButton) {
            saveButton.disabled = true;
            updateButton.disabled = true;
            let timeWorkedMins = document.getElementById('gsft_main').contentWindow.document.querySelector('[id^="otmr"][id$="min"]');
            let minutes = timeWorkedMins.innerHTML;
            timeWorkedMins.addEventListener('DOMSubtreeModified', () => {
                if (timeWorkedMins.innerHTML % 5 === 0 || timeWorkedMins.innerHTML === minutes) {
                    saveButton.disabled = false;
                    updateButton.disabled = false;
                    timeWorkedMins.style.backgroundColor = "";
                }
                if (timeWorkedMins.innerHTML % 5 !== 0) {
                    saveButton.disabled = true;
                    updateButton.disabled = true;
                    timeWorkedMins.style.backgroundColor = "red";
                }
            })
        }
    }
}
