import { deleter, saver, canceller } from "./data_manipulations.js"
import { changeEditableityOfNodes } from "./helpers.js";

export function deleteButtonHandler(event, data = null, config = null) {
    Swal.fire({
        title: 'Do you really want to delete this row?',
        icon: 'question',
        showDenyButton: true,
        confirmButtonText: 'Delete',
        denyButtonText: `Cencel`,
    }).then((result) => {
        if (result.isConfirmed) {
            deleter(event, data);
            Swal.fire('Deleted')
        } else if (result.isDenied) {
            Swal.fire('Cancelled')
        }
    })

}


export function updateButtonHandler(event, data = null, config = null) {
    const currentButton = event.target;

    Swal.fire({
        title: 'Edit mode for this row ENABLED! \n \n Please click Save button for Save your changes or Cancel button for cancel your changes',
        icon: 'warning',
    })

    const currentCell = currentButton.parentNode;
    const currentCellChildrens = Array.from(currentCell.children);
    const currentRow = currentButton.parentNode.parentNode;
    const childrensOfCurrentRow = currentRow.children;

    changeEditableityOfNodes(childrensOfCurrentRow, true);

    for (let button of currentCellChildrens) {
        button.hidden = !button.hidden;
    }
}

export function saveButtonHandler(event, data = null, config = null) {
    const currentButton = event.target;

    Swal.fire({
        title: 'Your changes have been saved \n \n Edit mode for this row DISABLED! \n Please click Update button again for Enable',
        icon: 'warning',
    })

    const currentCell = currentButton.parentNode;
    const currentCellChildrens = Array.from(currentCell.children);
    const currentRow = currentButton.parentNode.parentNode;
    const childrensOfCurrentRow = currentRow.children;

    saver(event, data);

    changeEditableityOfNodes(childrensOfCurrentRow, false);

    for (let button of currentCellChildrens) {
        button.hidden = !button.hidden;
    }
}

export function cancelButtonHandler(event, data = null, config = null) {
    const currentButton = event.target;

    Swal.fire({
        title: 'Your changes have been cancelled \n \n Edit mode for this row DISABLED! \n Please click Update button again for Enable',
        icon: 'warning',
    })

    const currentCell = currentButton.parentNode;
    const currentCellChildrens = Array.from(currentCell.children);
    const currentRow = currentButton.parentNode.parentNode;
    const childrensOfCurrentRow = currentRow.children;

    canceller(event, data, config);

    changeEditableityOfNodes(childrensOfCurrentRow, false);

    for (let button of currentCellChildrens) {
        button.hidden = !button.hidden;
    }
}