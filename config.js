import { deleteButtonHandler, updateButtonHandler } from "./table_handlers.js"

const collumnHeaderRender = function(trElement) {
    const thElement = document.createElement("th");
    thElement.textContent = this.label;
    trElement.append(thElement);
}

const buttonRender = function(trElement, object = null, data = null) {
    const tdElement = document.createElement("td");
    tdElement.editable = this.editable;

    for (let button of this.form) {
        const buttonElement = document.createElement("button");

        buttonElement.className = "btn btn-outline-secondary btn-sm btn-block "
        buttonElement.textContent = button.type;
        buttonElement.handler = button.handleId;
        buttonElement.addEventListener("click", (event) => {
            button.handleMethod(event, data);
        })

        tdElement.append(buttonElement)
    }

    trElement.append(tdElement);
}

const textRender = function(trElement, object = null, data = null) {
    const tdElement = document.createElement("td");
    tdElement.className = this.collumnClass;
    tdElement.editable = this.editable;

    const spanElement = document.createElement("span");
    spanElement.className += this.innerClass;

    spanElement.textContent = object[this.key];

    tdElement.memory = this.key;
    trElement.myId = object.id;
    tdElement.append(spanElement);
    trElement.append(tdElement);
}

const iconRender = function(trElement, object = null, data = null) {
    const tdElement = document.createElement("td");
    tdElement.className = this.collumnClass;
    tdElement.editable = this.editable;

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
        editable: true,
        renderMethod: textRender,
        headerRender: collumnHeaderRender,
    },
    {
        key: "teams",
        label: "Teams",
        collumnClass: "",
        innerClass: "",
        editable: true,
        renderMethod: textRender,
        headerRender: collumnHeaderRender,
    },
    {
        key: "date",
        label: "Date",
        collumnClass: "",
        innerClass: "",
        editable: true,
        renderMethod: textRender,
        headerRender: collumnHeaderRender,
    },
    {
        key: "icon",
        label: "Icon",
        collumnClass: "",
        innerClass: "",
        editable: false,
        renderMethod: iconRender,
        headerRender: collumnHeaderRender,
    },
    {
        key: "result",
        label: "Result",
        collumnClass: "",
        innerClass: "",
        editable: true,
        renderMethod: textRender,
        headerRender: collumnHeaderRender,
    },
    {
        key: "action",
        label: "Action",
        editable: false,
        form: [{
                type: "Update",
                handleMethod: updateButtonHandler,
            },
            {
                type: "Delete",
                handleMethod: deleteButtonHandler,
            }
        ],
        renderMethod: buttonRender,
        headerRender: collumnHeaderRender,
    }
]