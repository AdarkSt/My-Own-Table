import { deleter, saver, canceller, updater } from "./data_manipulations.js"
import { changeEditableityOfNodes, cloneDeep } from "./helpers.js";

const clones = [];

export function deleteButtonHandler(event, data = null) {
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

    const currentObject = data.find(item => item.id.value == Number(currentRow.getAttribute("myId")));

    const cloneOfCurrentObject = cloneDeep({}, currentObject)

    updater(currentRow, cloneOfCurrentObject);
    clones.push(cloneOfCurrentObject);

    changeEditableityOfNodes(childrensOfCurrentRow, true);

    for (const button of currentCellChildrens) {
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

    const wantedObject = clones.find(item => item.id.value == Number(currentRow.getAttribute("myId")));

    saver(event, data, wantedObject);

    changeEditableityOfNodes(childrensOfCurrentRow, false);

    for (const button of currentCellChildrens) {
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

    for (const button of currentCellChildrens) {
        button.hidden = !button.hidden;
    }
}