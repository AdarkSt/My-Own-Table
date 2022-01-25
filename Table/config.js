import { listenDeleteBtn, listenUpdateBtn, listenSaveBtn, listenCencelBtn } from "./table_buttons_listeners.js"
import { changeEditableityOfProperty, createBtnElement, createInputElement } from "../helpers.js"
import { handleUpdate } from "../Data/data_manipulations.js"
import { readFileInImg } from "../helpers.js"

function renderCollHeader(trElement) {
    const thElement = document.createElement("th");
    thElement.textContent = this.label;
    trElement.append(thElement);
}

function renderActionColl(trElement, object = null, data = null) {
    const tdElement = document.createElement("td");
    tdElement.className = this.collumnClass;

    for (const btnCharacter of this.inner) {
        const btnElement = createBtnElement(btnCharacter, !object[this.key][btnCharacter.key]);

        btnElement.addEventListener("click", (event) => {
            const currentBtn = event.target;
            btnCharacter.handleMethod(currentBtn, data, standardCollumnsInRow);
        })
        tdElement.append(btnElement)
    }
    trElement.append(tdElement);
}

function renderTextColl(trElement, object = null) {
    const tdElement = document.createElement("td");
    const inputElement = createInputElement("text", object[this.key], this.innerClass);
    inputElement.style.width = (inputElement.value.length + 5) * 8 + "px";

    inputElement.addEventListener("change", (event) => {
        const saveBtn = trElement.querySelector(".disabled");
        if (saveBtn)
            saveBtn.classList.remove("disabled");

        const inputValue = event.target.value;
        const id = object.id.value;
        handleUpdate(inputValue, object, this.key, id)
    })

    tdElement.append(inputElement);
    trElement.append(tdElement);
}

function renderNumColl(trElement, object = null) {
    const tdElement = document.createElement("td");
    const inputElement = createInputElement("number", object[this.key], this.innerClass);
    inputElement.style.width = (inputElement.value.length + 5) * 8 + "px";

    inputElement.addEventListener("change", (event) => {
        const saveBtn = trElement.querySelector(".disabled");
        if (saveBtn)
            saveBtn.classList.remove("disabled");

        const inputValue = event.target.value;
        const id = object.id.value;
        if (this.maxValue) {
            var isEditable = changeEditableityOfProperty(inputValue, this.maxValue);
        }
        handleUpdate(inputValue, object, this.key, id, isEditable)
    })

    tdElement.append(inputElement);
    trElement.append(tdElement);
}

function renderDateColl(trElement, object = null) {
    const tdElement = document.createElement("td");
    const inputElement = createInputElement("date", object[this.key], this.innerClass);
    inputElement.style.width = (inputElement.value.length + 10) * 8 + "px";

    inputElement.addEventListener("change", (event) => {
        const saveBtn = trElement.querySelector(".disabled");
        if (saveBtn)
            saveBtn.classList.remove("disabled");

        const inputValue = event.target.value;
        const id = object.id.value;
        handleUpdate(inputValue, object, this.key, id)
    })

    tdElement.append(inputElement);
    trElement.append(tdElement);
}

function renderCalculatColl(trElement, object = null) {
    const tdElement = document.createElement("td");
    const inputElement = createInputElement("number", object[this.key], this.innerClass, false, true);
    inputElement.style.width = (inputElement.value.length + 5) * 8 + "px";

    inputElement.value = object[this.call1Key].value - object[this.call2Key].value;

    tdElement.append(inputElement);
    trElement.append(tdElement);
}

function renderIconColl(trElement, object = null) {
    const tdElement = document.createElement("td");

    const imgElement = document.createElement("img");
    imgElement.className += "imgClass";
    imgElement.setAttribute("src", object[this.key].value);

    if (object[this.key].editable) {
        const inputElement = createInputElement("file", object[this.key], this.innerClass, true);
        const key = this.key

        inputElement.addEventListener("change", (event) => {
            const saveBtn = trElement.querySelector(".disabled");
            if (saveBtn)
                saveBtn.classList.remove("disabled");

            const file = event.target.files[0]
            const id = object.id.value;
            readFileInImg(file, imgElement, handleUpdate, object, key, id);
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
        searchable: true,
        renderMethod: renderTextColl,
        headerRender: renderCollHeader,
    },
    {
        key: "teams",
        label: "Teams",
        innerClass: "input",
        searchable: true,
        renderMethod: renderTextColl,
        headerRender: renderCollHeader,
    },
    {
        key: "date",
        label: "Date",
        innerClass: "input",
        searchable: true,
        renderMethod: renderDateColl,
        headerRender: renderCollHeader,
    },
    {
        key: "icon",
        label: "Icon",
        innerClass: "fileInput form-control",
        searchable: false,
        renderMethod: renderIconColl,
        headerRender: renderCollHeader,
    },
    {
        key: "result",
        label: "Result",
        innerClass: "input",
        searchable: true,
        renderMethod: renderTextColl,
        headerRender: renderCollHeader,
    },
    {
        key: "matches",
        label: "Matches",
        innerClass: "input",
        searchable: true,
        maxValue: 14,
        renderMethod: renderNumColl,
        headerRender: renderCollHeader,
    },
    {
        key: "draw",
        label: "Draws",
        innerClass: "input",
        searchable: true,
        renderMethod: renderNumColl,
        headerRender: renderCollHeader,
    },
    {
        call1Key: "matches",
        call2Key: "draw",
        key: "advantage",
        label: "Advantage",
        innerClass: "input",
        searchable: true,
        renderMethod: renderCalculatColl,
        headerRender: renderCollHeader,
    },
    {
        key: "action",
        label: "Action",
        searchable: false,
        innerClass: "",
        inner: [{
                key: "update",
                name: "Update",
                className: "btn btn-outline-secondary btn-sm btn-block",
                handleMethod: listenUpdateBtn,
            },
            {
                key: "save",
                name: "Save",
                className: "disabled btn btn-outline-secondary btn-sm btn-block",
                handleMethod: listenSaveBtn,
            },
            {
                key: "delete",
                name: "Delete",
                className: "btn btn-outline-secondary btn-sm btn-block",
                handleMethod: listenDeleteBtn,
            },
            {
                key: "cancel",
                name: "Cancel",
                className: "btn btn-outline-secondary btn-sm btn-block",
                handleMethod: listenCencelBtn,
            }
        ],
        renderMethod: renderActionColl,
        headerRender: renderCollHeader,
    },
]