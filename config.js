import { deleteButtonListener, updateButtonListener, saveButtonListener, cancelButtonListener } from "./table_buttons_listeners.js"
import { createInputElement } from "./helpers.js"
import { updateHandler } from "./data_manipulations.js"
import { readFileInImg } from "./helpers.js"


function collumnHeaderRender(trElement) {
    const thElement = document.createElement("th");
    thElement.textContent = this.label;
    trElement.append(thElement);
}

function actionCollumnRender(trElement, object = null, data = null) {
    const tdElement = document.createElement("td");
    tdElement.className = this.collumnClass;

    for (let button of this.inner) {
        const buttonElement = document.createElement("button");
        buttonElement.hidden = !object[this.key][button.key];

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

function textCollumnRender(trElement, object = null) {
    const tdElement = document.createElement("td");
    const inputElement = createInputElement("text", object[this.key], this.innerClass);
    inputElement.style.width = (inputElement.value.length + 5) * 8 + "px";

    inputElement.addEventListener("change", (event) => {
        const inputValue = event.target.value;
        updateHandler(inputValue, object, this.key)
    })

    tdElement.append(inputElement);
    trElement.append(tdElement);
}

function numberRender(trElement, object = null) {
    const tdElement = document.createElement("td");
    const inputElement = createInputElement("number", object[this.key], this.innerClass);
    inputElement.style.width = (inputElement.value.length + 5) * 8 + "px";

    inputElement.addEventListener("change", (event) => {
        const inputValue = event.target.value;
        updateHandler(inputValue, object, this.key)
    })

    tdElement.append(inputElement);
    trElement.append(tdElement);
}

function dateCollumnRender(trElement, object = null) {
    const tdElement = document.createElement("td");
    const inputElement = createInputElement("date", object[this.key], this.innerClass);
    inputElement.style.width = (inputElement.value.length + 10) * 8 + "px";

    inputElement.addEventListener("change", (event) => {
        const inputValue = event.target.value;
        updateHandler(inputValue, object, this.key)
    })

    tdElement.append(inputElement);
    trElement.append(tdElement);
}

function calculateCollumnRender(trElement, object = null) {
    const tdElement = document.createElement("td", {});
    tdElement.textContent = object[this.call1Key].value - object[this.call2Key].value;
    tdElement.setAttribute("readonly", "true");
    trElement.append(tdElement);
}

function iconCollumnRender(trElement, object = null) {
    const tdElement = document.createElement("td");

    const imgElement = document.createElement("img");
    imgElement.className += "imgClass";
    imgElement.setAttribute("src", object[this.key].value);

    if (object[this.key].editable) {
        const inputElement = createInputElement("file", object[this.key], this.innerClass, true);
        const key = this.key

        inputElement.addEventListener("change", (event) => {
            const file = event.target.files[0]
            readFileInImg(file, imgElement, updateHandler, object, key);
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
        renderMethod: textCollumnRender,
        headerRender: collumnHeaderRender,
    },
    {
        key: "teams",
        label: "Teams",
        innerClass: "input",
        renderMethod: textCollumnRender,
        headerRender: collumnHeaderRender,
    },
    {
        key: "date",
        label: "Date",
        innerClass: "input",
        renderMethod: dateCollumnRender,
        headerRender: collumnHeaderRender,
    },
    {
        key: "icon",
        label: "Icon",
        innerClass: "fileInput form-control",
        renderMethod: iconCollumnRender,
        headerRender: collumnHeaderRender,
    },
    {
        key: "result",
        label: "Result",
        innerClass: "input",
        renderMethod: textCollumnRender,
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
        renderMethod: calculateCollumnRender,
        headerRender: collumnHeaderRender,
    },
    {
        key: "action",
        label: "Action",
        innerClass: "",
        inner: [{
                key: "update",
                name: "Update",
                handleMethod: updateButtonListener,
            },
            {
                key: "save",
                name: "Save",
                handleMethod: saveButtonListener,
            },
            {
                key: "delete",
                name: "Delete",
                handleMethod: deleteButtonListener,
            },
            {
                key: "cancel",
                name: "Cancel",
                handleMethod: cancelButtonListener,
            }
        ],
        renderMethod: actionCollumnRender,
        headerRender: collumnHeaderRender,
    },
]