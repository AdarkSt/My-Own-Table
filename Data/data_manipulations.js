import { removeAllChildNodes } from "../helpers.js";

const changedObjects = {}

export function handleDelete(currentRowId, data = null) {
    const currentObjectIndex = data.findIndex(item => item.id.value == currentRowId);
    data.splice(currentObjectIndex, 1)
    localStorage.setItem("data", JSON.stringify(data));
}

export function handleUpdate(value, object, key, id, isEditable = true) {
    const myObject = {};
    myObject[key] = {...object[key], ... { value: value, editable: isEditable } };
    !changedObjects[id] ? changedObjects[id] = myObject : changedObjects[id][key] = myObject[key];
}

export function handleSave(currentRowId, data) {
    const changableObjectIndex = data.findIndex(item => item.id.value == currentRowId);
    data[changableObjectIndex] = {...data[changableObjectIndex], ...changedObjects[currentRowId] }
    delete changedObjects[currentRowId];
    localStorage.setItem("data", JSON.stringify(data));
}

export function handleCencel(currentRow, data = null, standardCollumnsInRow) {
    const currentRowId = currentRow.getAttribute("myId");
    const currentObject = data.find(item => item.id.value == currentRowId);
    removeAllChildNodes(currentRow);

    for (const collumn of standardCollumnsInRow) {
        collumn.renderMethod(currentRow, currentObject, data);
    }
}