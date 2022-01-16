import { removeAllChildNodes } from "./helpers.js";

/**
 * *deleteHandler method should handle click event in table Delete button
 * @method deleteHandler is delete object from data and set data in localStorage
 * @export 
 * @param {*} currentRowId // row id which corresponds to deletable object id
 * @param {*} [data=null] // data from where should deleted object
 */
export const deleteHandler = function(currentRowId, data = null) {
    const currentObjectIndex = data.findIndex(item => item.id.value == Number(currentRowId));
    data.splice(currentObjectIndex, 1)

    localStorage.setItem("data", JSON.stringify(data));
}


/**
 * *updateHandler method should handle click event in table Update button
 * @method updateHandler creates a subscriber(observer) for listening changes in @param currentRow and sets this changes in @param cloneOfCurrentObject
 * @export 
 * @param {*} currentRow //row which shold be updated
 * @param {*} cloneOfCurrentObject // clone of @param currentRow corresponds object
 */
export const updateHandler = function(currentRow, cloneOfCurrentObject) {

    const currentRowObserver = new MutationObserver((MutationRecord) => {
        for (const key of Object.keys(cloneOfCurrentObject)) {
            if (MutationRecord.findIndex(item => item.oldValue == `${cloneOfCurrentObject[key].value}`) > -1) {
                cloneOfCurrentObject[key] = {
                    value: MutationRecord[0].target.textContent,
                    editable: cloneOfCurrentObject[key].editable,
                }
            }
        }
    });

    currentRowObserver.observe(currentRow, {
        subtree: true,
        childList: true,
        characterDataOldValue: true,
        characterData: true
    });
    return currentRowObserver;
}

/**
 * *saveHandler method should handle click event in table Save button
 * @method saveHandler findes changableObject in data and replace that with @param substituteObject, and diconnect subsriber(observer)
 * @export 
 * @param {*} data //data from where should replaced changableObject
 * @param {*} substituteObject // substitute object which replace changable object 
 */
export const saveHandler = function(data, substituteObject) {
    const changableObjectIndex = data.findIndex(item => item.id.value == substituteObject.clone.id.value);
    substituteObject.cloneObserver.disconnect();
    data[changableObjectIndex] = substituteObject.clone;
    localStorage.setItem("data", JSON.stringify(data));
}

/**
 * *cancelHandler method should handle click event in table Cancel button
 * @method cancelHandler removes @param currentRow childes and renders collumns in that with old data
 * @export 
 * @param {*} currentRow //row which cancell button is clicked
 * @param {*} data //data which must be used for cancelling changes in row
 * @param {*} collumnsInRow //standard which used for rendering new collumns in row 
 */
export const cancelHandler = function(currentRow, data = null, collumnsInRow) {
    const currentRowId = currentRow.getAttribute("myId");
    const currentObject = data.find(item => item.id.value == Number(currentRowId));
    removeAllChildNodes(currentRow);

    for (const collumn of collumnsInRow) {
        collumn.renderMethod(currentRow, currentObject, data);
    }
}