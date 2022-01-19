import { deleteHandler, saveHandler, cancelHandler } from "./data_manipulations.js"
import { changeEditableityOfInputs, changeVisiblityOfButtons } from "./helpers.js";

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

export function updateButtonListener(currentButton) {
    const currentCell = currentButton.parentNode;
    const currentCellChildrens = Array.from(currentCell.children);
    const currentRow = currentButton.parentNode.parentNode;
    const childrensOfCurrentRow = Array.from(currentRow.children);

    changeEditableityOfInputs(childrensOfCurrentRow);
    changeVisiblityOfButtons(currentCellChildrens);

    Swal.fire({
        title: 'Edit mode for this row ENABLED! \n \n Please click Save button for Save your changes or Cancel button for cancel your changes',
        icon: 'warning',
    })
}

export function saveButtonListener(currentButton, data = null) {
    const currentRowId = currentButton.parentNode.parentNode.getAttribute("myId");

    Swal.fire({
        title: 'Your changes have been saved \n \n Edit mode for this row DISABLED! \n Please click Update button again for Enable',
        icon: 'warning',
    })
    saveHandler(currentRowId, data);
}

export function cancelButtonListener(currentButton, data = null, standardCollumnsInRow = null) {
    const currentRow = currentButton.parentNode.parentNode;

    Swal.fire({
        title: 'Your changes have been cancelled \n \n Edit mode for this row DISABLED! \n Please click Update button again for Enable',
        icon: 'warning',
    })
    cancelHandler(currentRow, data, standardCollumnsInRow);
}