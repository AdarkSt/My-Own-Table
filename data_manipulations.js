import { notConvertToNaN, removeAllChildNodes } from "./helpers.js";


export const deleter = function(event, data) {
    const currentRow = event.target.parentNode.parentNode;

    const currentObjectIndex = data.findIndex(item => item.id == Number(currentRow.getAttribute("myId")));
    data.splice(currentObjectIndex, 1)

    localStorage.setItem("data", JSON.stringify(data));
}

export const saver = function(event, data) {
    const currentRow = event.target.parentNode.parentNode;
    const childrens = Array.from(currentRow.children);

    const currentObject = data.find(item => item.id == Number(currentRow.getAttribute("myId")));

    childrens.forEach(child => {
        if (Object.keys(currentObject).includes(child.getAttribute("memory"))) {
            currentObject[child.getAttribute("memory")] = child.textContent;
        }
    })

    localStorage.setItem("data", JSON.stringify(data));
}

export const canceller = function(event, data, config) {
    const currentRow = event.target.parentNode.parentNode;
    removeAllChildNodes(currentRow);

    const currentObject = data.find(item => item.id == Number(currentRow.getAttribute("myId")));

    for (let collumn of config) {
        collumn.renderMethod(currentRow, currentObject, data);
    }
}