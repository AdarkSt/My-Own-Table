import { deleter, updater } from "./data_manipulations.js"

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
    const childrens = Array.from(currentRow.children);

    function firstEvent() {
        Swal.fire({
            title: 'Edit mode for this row ENABLED! \n \n Please click again for disable',
            icon: 'warning',
        });
        for (let child of childrens) {
            if (child.editable) {
                child.setAttribute("contenteditable", "true");
                child.addEventListener("blur", event => {
                    updater(event, data);
                })
            }
        }
        event.target.removeEventListener("click", firstEvent);
        event.target.addEventListener("click", secondEvent);
    }

    function secondEvent() {
        Swal.fire({
            title: 'Edit mode for this row DISABLED! \n \n Please click again for enable',
            icon: 'warning',
        });
        for (let child of childrens) {
            if (child.editable) {
                child.setAttribute("contenteditable", "false");
            }
        }
        event.target.removeEventListener("click", secondEvent);
        event.target.addEventListener("click", firstEvent);
    }
    event.target.addEventListener("click", firstEvent);
    firstEvent()
}