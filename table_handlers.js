import { deleter, updater } from "./data_manipulations.js"
import { changeEditableityOfNodes } from "./helpers.js";

export function deleteButtonHandler(event, data) {
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

export function updateButtonHandler(event, data) {
    const currentRow = event.target.parentNode.parentNode;
    const updateButtonFormerName = event.target.textContent;
    event.target.textContent = "Save";

    const cancelButton = event.target.nextElementSibling;
    const cancelButtonFormerName = cancelButton.textContent;
    cancelButton.textContent = "Cancel";

    const cancelButtonFormerListener = cancelButton.getEventListeners("click")[0].listener;
    const childrens = Array.from(currentRow.children);

    const contents = [];
    for (let child of childrens) {
        if (child.editable) {
            contents.push(child.textContent);
        }
    }

    function starter() {
        Swal.fire({
            title: 'Edit mode for this row ENABLED! \n \n Please click Save button for saving your changes or Cancel button for cancelling your changes',
            icon: 'warning',
        });

        changeEditableityOfNodes(childrens, true);

        event.target.removeEventListener("click", starter);
        event.target.addEventListener("click", saver);
        cancelButton.removeEventListener("click", cancelButtonFormerListener);
        cancelButton.addEventListener("click", canceller);
    }

    function saver() {
        Swal.fire({
            title: 'Your changes have been saved \n \n Edit mode for this row DISABLED! \n \n Please click Ubdate button again for enable',
            icon: 'warning',
        });

        updater(event, data);
        changeEditableityOfNodes(childrens, false);

        event.target.removeEventListener("click", saver);
        event.target.addEventListener("click", starter);
    }

    function canceller() {
        Swal.fire({
            title: 'Your changes have been cancelled \n \n Edit mode for this row DISABLED! \n \n Please click Ubdate button again for enable',
            icon: 'warning',
        });

        let index = 0;
        for (let child of childrens) {
            if (child.editable) {
                child.textContent = contents[index];
                child.setAttribute("contenteditable", "false");
                ++index;
            }
        }

        event.target.textContent = updateButtonFormerName;
        cancelButton.textContent = cancelButtonFormerName;

        event.target.removeEventListener("click", saver);
        event.target.addEventListener("click", starter);

        cancelButton.removeEventListener("click", canceller);
        cancelButton.addEventListener("click", cancelButtonFormerListener);
    }

    event.target.addEventListener("click", starter);
    starter();
}