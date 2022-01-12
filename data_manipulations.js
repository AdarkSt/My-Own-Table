import { removeAllChildNodes } from "./helpers.js";

export const deleter = function(event, data) {
    const currentRow = event.target.parentNode.parentNode;

    const currentObjectIndex = data.findIndex(item => item.id.value == Number(currentRow.getAttribute("myId")));
    data.splice(currentObjectIndex, 1)

    localStorage.setItem("data", JSON.stringify(data));
}

export const updater = function(currentRow, cloneOfCurrentObject) {

    const observer = new MutationObserver((MutationRecord, observer) => {
        for (const key of Object.keys(cloneOfCurrentObject)) {
            if (MutationRecord.findIndex(item => item.oldValue == `${cloneOfCurrentObject[key].value}`) > -1) {
                const editablity = cloneOfCurrentObject[key].editable

                cloneOfCurrentObject[key] = {
                    value: MutationRecord[0].target.textContent,
                    editable: editablity,
                }
            }
        }
    });
    observer.observe(currentRow, {
        subtree: true,
        childList: true,
        characterDataOldValue: true,
        characterData: true
    });
}

export const saver = function(event, data, cloneOfCurrentObject) {

    const changableObjectIndex = data.findIndex(item => item.id.value == cloneOfCurrentObject.id.value);
    data[changableObjectIndex] = cloneOfCurrentObject;

    localStorage.setItem("data", JSON.stringify(data));
}

export const canceller = function(event, data, config) {
    const currentRow = event.target.parentNode.parentNode;
    removeAllChildNodes(currentRow);

    const currentObject = data.find(item => item.id.value == Number(currentRow.getAttribute("myId")));

    for (let collumn of config) {
        collumn.renderMethod(currentRow, currentObject, data);
    }
}