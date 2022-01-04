import { deleter, updater } from "./data_manipulations.js"

export function deleteButtonHandler(event, data) {
    const answer = confirm("do you realy want to delete this row");
    if (answer) {
        deleter(event, data);
    }
}

export function updateButtonHandler(event, data) {
    const currentRow = event.target.parentNode.parentNode;
    const childrens = Array.from(currentRow.children);

    function firstEvent() {
        for (let child of childrens) {
            child.setAttribute("contenteditable", "true");
            child.addEventListener("blur", event => {
                updater(event, data);
            })
        }
        event.target.removeEventListener("click", firstEvent);
        event.target.addEventListener("click", secondEvent);
    }

    function secondEvent() {
        for (let child of childrens) {
            child.setAttribute("contenteditable", "false");
        }
        event.target.removeEventListener("click", secondEvent);
        event.target.addEventListener("click", firstEvent);
    }
    event.target.addEventListener("click", firstEvent);
    firstEvent()
}