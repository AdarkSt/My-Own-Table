import { deleteHandler, saveHandler, cancelHandler, updateHandler } from "./data_manipulations.js"
import { changeEditableityOfNodes, cloneDeep } from "./helpers.js";

const clones = [];

/**
 * *deleteButtonListener metod should listen click event in table Delete button
 * @method deleteButtonListener is calling @method deleteHandler method for handling click event
 * @export
 * @param {*} currentButton // button element target of event
 * @param {*} [data=null] // data which should manipulated by button
 * this methot attached to button in @method buttonRender method config.js, and sets as a @method handleMethod in @method collumnsInRow object
 */
export function deleteButtonListener(currentButton, data = null) {
    const currentRowId = currentButton.parentNode.parentNode.getAttribute("myId");
    Swal.fire({
        title: 'Do you really want to delete this row?',
        icon: 'question',
        showDenyButton: true,
        confirmButtonText: 'Delete',
        denyButtonText: `Cencel`,
    }).then((result) => {
        if (result.isConfirmed) {
            deleteHandler(currentRowId, data);
            Swal.fire('Deleted')
        } else if (result.isDenied) {
            Swal.fire('Cancelled')
        }
    })
}

/**
 * *updateButtonListener metod should listen click event in table Update button
 * @method updateButtonListener is calling @method updateHandler method for handling click event
 * @export
 * @param {*} currentButton // button element target of event
 * @param {*} [data=null] // data which should manipulated by button
 * this methot attached to button in @method buttonRender method config.js, and sets as a @method handleMethod in @method collumnsInRow object
 */
export function updateButtonListener(currentButton, data = null) {
    const currentCell = currentButton.parentNode;
    const currentCellChildrens = Array.from(currentCell.children);
    const currentRow = currentButton.parentNode.parentNode;
    const childrensOfCurrentRow = currentRow.children;

    changeEditableityOfNodes(childrensOfCurrentRow, true);
    for (const button of currentCellChildrens) {
        button.hidden = !button.hidden;
    }

    Swal.fire({
        title: 'Edit mode for this row ENABLED! \n \n Please click Save button for Save your changes or Cancel button for cancel your changes',
        icon: 'warning',
    })

    const currentObject = data.find(item => item.id.value == Number(currentRow.getAttribute("myId")));
    const cloneOfCurrentObject = cloneDeep({}, currentObject)
    const observerOfCurrentRowChanges = updateHandler(currentRow, cloneOfCurrentObject);
    clones.push({
        clone: cloneOfCurrentObject,
        cloneObserver: observerOfCurrentRowChanges,
    });
}

/**
 * *saveButtonListener metod should listen click event in table Save button
 * @method saveButtonListener is calling @method saveHandler method for handling click event
 * @export 
 * @param {*} currentButton // button element target of event
 * @param {*} [data=null] // data which should manipulated by button
 * this methot attached to button in @method buttonRender method config.js, and sets as a @method handleMethod in @method collumnsInRow object
 */
export function saveButtonListener(currentButton, data = null) {
    const currentRowId = currentButton.parentNode.parentNode.getAttribute("myId");

    Swal.fire({
        title: 'Your changes have been saved \n \n Edit mode for this row DISABLED! \n Please click Update button again for Enable',
        icon: 'warning',
    })

    const substituteObject = clones.find(item => item.clone.id.value == Number(currentRowId));
    clones.splice(clones.findIndex(item => item.clone.id.value == Number(currentRowId)), 1)
    saveHandler(data, substituteObject);
}

/**
 * *cancelButtonListener metod should listen click event in table Save button
 * @method cancelButtonListener is calling @method cancelHandler method for handling click event
 * @export
 * @param {*} currentButton // button element target of event
 * @param {*} [data=null] // data which should manipulated by button
 * @param {*} [collumnsInRow=null] // collumns in row which should rerendered by @method cancelHandler
 * this methot attached to button in @method buttonRender method config.js, and sets as a @method handleMethod in @method collumnsInRow object
 */
export function cancelButtonListener(currentButton, data = null, collumnsInRow = null) {
    const currentRow = currentButton.parentNode.parentNode;

    Swal.fire({
        title: 'Your changes have been cancelled \n \n Edit mode for this row DISABLED! \n Please click Update button again for Enable',
        icon: 'warning',
    })

    cancelHandler(currentRow, data, collumnsInRow);
}