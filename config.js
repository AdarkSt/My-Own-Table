import { deleteButtonListener, updateButtonListener, saveButtonListener, cancelButtonListener } from "./table_buttons_listeners.js"
import { inputElementCreate } from "./helpers.js"
import { updateHandler } from "./data_manipulations.js"


function collumnHeaderRender(trElement) {
    const thElement = document.createElement("th");
    thElement.textContent = this.label;
    trElement.append(thElement);
}

function buttonRender(trElement, object = null, data = null) {
    const tdElement = document.createElement("td");
    tdElement.className = this.collumnClass;

    for (let button of this.inner) {
        const buttonElement = document.createElement("button");
        buttonElement.hidden = button.hidden;

        buttonElement.className = "btn btn-outline-secondary btn-sm btn-block "
        buttonElement.textContent = button.name;

        buttonElement.addEventListener("click", (event) => {
            const currentButton = event.target;
            button.handleMethod(currentButton, data, standardCollumnsInRow);
        })

        tdElement.append(buttonElement)
    }

    trElement.append(tdElement);
}

function textRender(trElement, object = null) {
    const tdElement = document.createElement("td");
    const inputElement = inputElementCreate("text", object[this.key], this.innerClass);
    inputElement.style.width = (inputElement.value.length + 5) * 8 + "px";
    inputElement.addEventListener("change", (event) => {
        const currentInputValue = event.target.value;
        updateHandler(currentInputValue, object, this.key)
    })

    tdElement.append(inputElement);
    trElement.append(tdElement);
}

function numberRender(trElement, object = null) {
    const tdElement = document.createElement("td");
    const inputElement = inputElementCreate("number", object[this.key], this.innerClass);
    inputElement.style.width = (inputElement.value.length + 5) * 8 + "px";
    inputElement.addEventListener("change", (event) => {
        const currentInputValue = event.target.value;
        updateHandler(currentInputValue, object, this.key)
    })

    tdElement.append(inputElement);
    trElement.append(tdElement);
}

function dateRender(trElement, object = null) {
    const tdElement = document.createElement("td");
    const inputElement = inputElementCreate("date", object[this.key], this.innerClass);
    inputElement.style.width = (inputElement.value.length + 10) * 8 + "px";
    inputElement.addEventListener("change", (event) => {
        const currentInputValue = event.target.value;
        updateHandler(currentInputValue, object, this.key)
    })

    tdElement.append(inputElement);
    trElement.append(tdElement);
}

function calcRender(trElement, object = null) {
    const tdElement = document.createElement("td", {});
    tdElement.className = this.collumnClass;
    tdElement.textContent = object[this.call1Key].value - object[this.call2Key].value;
    tdElement.setAttribute("readonly", "true");
    trElement.append(tdElement);
}

function iconRender(trElement, object = null) {
    const tdElement = document.createElement("td");
    const imgElement = document.createElement("img");

    imgElement.className += "imgClass";
    imgElement.setAttribute("src", object[this.key].value);
    if (object[this.key].editable) {
        const inputElement = inputElementCreate("file", object[this.key], this.innerClass);
        inputElement.hidden = "true";
        const key = this.key

        inputElement.addEventListener("change", (event) => {
            const fReader = new FileReader();
            fReader.readAsDataURL(event.target.files[0]);
            fReader.onloadend = function(event) {
                imgElement.src = event.target.result;
                const currentInputValue = imgElement.src;
                updateHandler(currentInputValue, object, key);
            }
        })
        tdElement.append(inputElement);
    }
    tdElement.append(imgElement);
    trElement.append(tdElement);
}

export const standardCollumnsInRow = [{
        key: "league",
        label: "League",
        innerClass: "input",
        renderMethod: textRender,
        headerRender: collumnHeaderRender,
    },
    {
        key: "teams",
        label: "Teams",
        innerClass: "input",
        renderMethod: textRender,
        headerRender: collumnHeaderRender,
    },
    {
        key: "date",
        label: "Date",
        innerClass: "input",
        renderMethod: dateRender,
        headerRender: collumnHeaderRender,
    },
    {
        key: "icon",
        label: "Icon",
        innerClass: "fileInput form-control",
        renderMethod: iconRender,
        headerRender: collumnHeaderRender,
    },
    {
        key: "result",
        label: "Result",
        innerClass: "input",
        renderMethod: textRender,
        headerRender: collumnHeaderRender,
    },
    {
        key: "matches",
        label: "Matches",
        innerClass: "input",
        renderMethod: numberRender,
        headerRender: collumnHeaderRender,
    },
    {
        key: "draw",
        label: "Draws",
        innerClass: "input",
        renderMethod: numberRender,
        headerRender: collumnHeaderRender,
    },
    {
        call1Key: "matches",
        call2Key: "draw",
        key: "advantage",
        label: "Advantage",
        innerClass: "input",
        renderMethod: calcRender,
        headerRender: collumnHeaderRender,
    },
    {
        key: "action",
        label: "Action",
        innerClass: "",
        inner: [{
                name: "Update",
                hidden: false,
                handleMethod: updateButtonListener,
            },
            {
                name: "Save",
                hidden: true,
                handleMethod: saveButtonListener,
            },
            {
                name: "Delete",
                hidden: false,
                handleMethod: deleteButtonListener,
            },
            {
                name: "Cancel",
                hidden: true,
                handleMethod: cancelButtonListener,
            }
        ],
        renderMethod: buttonRender,
        headerRender: collumnHeaderRender,
    },
]