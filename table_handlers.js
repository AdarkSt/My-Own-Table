import { deleter, saver, canceller, updater } from "./data_manipulations.js"
import { changeEditableityOfNodes, cloneDeep } from "./helpers.js";

const clones = [];

export function deleteButtonHandler(currentButton, data = null) {
    const currentRowId = currentButton.parentNode.parentNode.getAttribute("myId");
    Swal.fire({
        title: 'Do you really want to delete this row?',
        icon: 'question',
        showDenyButton: true,
        confirmButtonText: 'Delete',
        denyButtonText: `Cencel`,
    }).then((result) => {
        if (result.isConfirmed) {
            deleter(currentRowId, data);
            Swal.fire('Deleted')
        } else if (result.isDenied) {
            Swal.fire('Cancelled')
        }
    })
}

export function updateButtonHandler(currentButton, data = null) {
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
    const observerOfCurrentRowChanges = updater(currentRow, cloneOfCurrentObject);
    clones.push({
        clone: cloneOfCurrentObject,
        cloneObserver: observerOfCurrentRowChanges,
    });
}

export function saveButtonHandler(currentButton, data = null) {
    const currentRowId = currentButton.parentNode.parentNode.getAttribute("myId");

    Swal.fire({
        title: 'Your changes have been saved \n \n Edit mode for this row DISABLED! \n Please click Update button again for Enable',
        icon: 'warning',
    })

    const wantedObject = clones.find(item => item.clone.id.value == Number(currentRowId));
    clones.splice(clones.findIndex(item => item.clone.id.value == Number(currentRowId)), 1)
    saver(data, wantedObject);
}

export function cancelButtonHandler(currentButton, data = null, collumnsInRow = null) {
    const currentRow = currentButton.parentNode.parentNode;

    Swal.fire({
        title: 'Your changes have been cancelled \n \n Edit mode for this row DISABLED! \n Please click Update button again for Enable',
        icon: 'warning',
    })

    canceller(currentRow, data, collumnsInRow);
}