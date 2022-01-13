import { removeAllChildNodes } from "./helpers.js";

export const deleter = function(currentRowId, data) {
    const currentObjectIndex = data.findIndex(item => item.id.value == Number(currentRowId));
    data.splice(currentObjectIndex, 1)

    localStorage.setItem("data", JSON.stringify(data));
}

export const updater = function(currentRow, cloneOfCurrentObject) {

    const observer = new MutationObserver((MutationRecord) => {
        for (const key of Object.keys(cloneOfCurrentObject)) {
            if (MutationRecord.findIndex(item => item.oldValue == `${cloneOfCurrentObject[key].value}`) > -1) {
                cloneOfCurrentObject[key] = {
                    value: MutationRecord[0].target.textContent,
                    editable: cloneOfCurrentObject[key].editable,
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
    return observer;
}

export const saver = function(data, cloneOfCurrentObject) {
    const changableObjectIndex = data.findIndex(item => item.id.value == cloneOfCurrentObject.clone.id.value);
    cloneOfCurrentObject.cloneObserver.disconnect();
    data[changableObjectIndex] = cloneOfCurrentObject.clone;
    localStorage.setItem("data", JSON.stringify(data));
}

export const canceller = function(currentRow, data, collumnsInRow) {
    const currentRowId = currentRow.getAttribute("myId");
    const currentObject = data.find(item => item.id.value == Number(currentRowId));
    removeAllChildNodes(currentRow);

    for (const collumn of collumnsInRow) {
        collumn.renderMethod(currentRow, currentObject, data);
    }
}