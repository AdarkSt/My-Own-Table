import { cloneDeep, removeAllChildNodes } from "./helpers.js";

const clones = {}

export function deleteHandler(currentRowId, data = null) {
    const currentObjectIndex = data.findIndex(item => item.id.value == currentRowId);
    data.splice(currentObjectIndex, 1)
    localStorage.setItem("data", JSON.stringify(data));
}

export function updateHandler(newValue, object, key) {
    const cloneObject = cloneDeep({}, object);
    cloneObject[key].value = newValue;
    clones[cloneObject.id.value] = cloneObject;
}

export function saveHandler(currentRowId, data) {
    const changableObjectIndex = data.findIndex(item => item.id.value == currentRowId);
    data[changableObjectIndex] = clones[currentRowId];
    localStorage.setItem("data", JSON.stringify(data));
}

export function cancelHandler(currentRow, data = null, standardCollumnsInRow) {
    const currentRowId = currentRow.getAttribute("myId");
    const currentObject = data.find(item => item.id.value == currentRowId);
    removeAllChildNodes(currentRow);

    for (const collumn of standardCollumnsInRow) {
        collumn.renderMethod(currentRow, currentObject, data);
    }
}