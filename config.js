import { deleteButtonHandler, updateButtonHandler, saveButtonHandler, cancelButtonHandler } from "./table_handlers.js"
import { removeAllChildNodes } from "./helpers.js"

const collumnHeaderRender = function(trElement, merge = 0) {
    const thElement = document.createElement("th");
    thElement.textContent = this.label;
    trElement.append(thElement);
}

const buttonRender = function(trElement, object = null, data = null) {
    const tdElement = document.createElement("td");
    tdElement.className = this.collumnClass;
    tdElement.setAttribute("aria-readonly", "true");

    for (let button of this.inner) {
        const buttonElement = document.createElement("button");
        buttonElement.hidden = button.hidden;

        buttonElement.className = "btn btn-outline-secondary btn-sm btn-block "
        buttonElement.textContent = button.name;

        buttonElement.addEventListener("click", (event) => {
            button.handleMethod(event, data, standard);
        })

        tdElement.append(buttonElement)
    }

    trElement.append(tdElement);
}

const textRender = function(trElement, object = null, data = null) {
    const tdElement = document.createElement("td");
    tdElement.className = this.collumnClass;
    if (object[this.key].editable) {
        tdElement.setAttribute("aria-readonly", "false");
    } else {
        tdElement.setAttribute("aria-readonly", "true");
    }

    tdElement.textContent = object[this.key].value;

    trElement.append(tdElement);
}

const calcRender = function(trElement, object = null, data = null) {
    const tdElement = document.createElement("td", {});
    tdElement.className = this.collumnClass;
    tdElement.setAttribute("aria-readonly", "true");

    tdElement.textContent = object[this.call1Key].value - object[this.call2Key].value;

    trElement.append(tdElement);
}

const iconRender = function(trElement, object = null, data = null) {
    const tdElement = document.createElement("td");
    tdElement.className = this.collumnClass;
    tdElement.setAttribute("aria-readonly", "true")

    const imgElement = document.createElement("img");
    imgElement.className += this.innerClass;

    imgElement.src = object[this.key];
    tdElement.append(imgElement);
    trElement.append(tdElement);
}

export const standard = [{
        key: "league",
        label: "League",
        collumnClass: "",
        innerClass: "",
        renderMethod: textRender,
        headerRender: collumnHeaderRender,
    },
    {
        key: "teams",
        label: "Teams",
        collumnClass: "",
        innerClass: "",
        renderMethod: textRender,
        headerRender: collumnHeaderRender,
    },
    {
        key: "date",
        label: "Date",
        collumnClass: "",
        innerClass: "",
        renderMethod: textRender,
        headerRender: collumnHeaderRender,
    },
    {
        key: "icon",
        label: "Icon",
        collumnClass: "",
        innerClass: "",
        renderMethod: iconRender,
        headerRender: collumnHeaderRender,
    },
    {
        key: "result",
        label: "Result",
        collumnClass: "",
        innerClass: "",
        renderMethod: textRender,
        headerRender: collumnHeaderRender,
    },
    {
        key: "matches",
        label: "Matches",
        collumnClass: "",
        innerClass: "",
        renderMethod: textRender,
        headerRender: collumnHeaderRender,
    },
    {
        key: "draw",
        label: "Draws",
        collumnClass: "",
        innerClass: "",
        renderMethod: textRender,
        headerRender: collumnHeaderRender,
    },
    {
        call1Key: "matches",
        call2Key: "draw",
        key: "advantage",
        label: "Advantage",
        collumnClass: "",
        innerClass: "",
        renderMethod: calcRender,
        headerRender: collumnHeaderRender,
    },
    {
        key: "action",
        label: "Action",
        collumnClass: "",
        innerClass: "",
        inner: [{
                name: "Update",
                hidden: false,
                handleMethod: updateButtonHandler,
            },
            {
                name: "Save",
                hidden: true,
                handleMethod: saveButtonHandler,
            },
            {
                name: "Delete",
                hidden: false,
                handleMethod: deleteButtonHandler,
            },
            {
                name: "Cancel",
                hidden: true,
                handleMethod: cancelButtonHandler,
            }
        ],
        renderMethod: buttonRender,
        headerRender: collumnHeaderRender,
    },
]