import { deleteButtonListener, updateButtonListener, saveButtonListener, cancelButtonListener } from "./table_buttons_listeners.js"

/**
 * *collumnHeaderRender method should render table header collumns in row
 * @param {*} trElement //row element wher must fit collumns
 */
const collumnHeaderRender = function(trElement) {
    const thElement = document.createElement("th");
    thElement.textContent = this.label;
    trElement.append(thElement);
}

/**
 * *buttonRender method should render collumn with buttons 
 * @param {*} trElement //row element wher must fit collumn
 * @param {*} [object=null] //?this parametr is excess
 * @param {*} [data=null] //data which should manipulate buttons in that collumn
 */
const buttonRender = function(trElement, object = null, data = null) {
    const tdElement = document.createElement("td");
    tdElement.className = this.collumnClass;
    tdElement.setAttribute("readonly", "true");

    for (let button of this.inner) {
        const buttonElement = document.createElement("button");
        buttonElement.hidden = button.hidden;

        buttonElement.className = "btn btn-outline-secondary btn-sm btn-block "
        buttonElement.textContent = button.name;

        buttonElement.addEventListener("click", (event) => {
            const currentButton = event.target;
            button.handleMethod(currentButton, data, collumnsInRow);
        })

        tdElement.append(buttonElement)
    }

    trElement.append(tdElement);
}

/**
 * *textRender methood should render collumn with text 
 * @param {*} trElement //row element wher must fit collumn
 * @param {*} [object=null] //object from data which content must be in current row
 */
const textRender = function(trElement, object = null) {
    const tdElement = document.createElement("td");
    tdElement.className = this.collumnClass;
    tdElement.textContent = object[this.key].value;

    if (object[this.key].editable) {
        tdElement.setAttribute("readonly", "false");
    } else {
        tdElement.setAttribute("readonly", "true");
    }

    trElement.append(tdElement);
}



/**
 * *calcRender method should render collumn with calculation other collumns values 
 * @param {*} trElement //row element wher must fit collumn
 * @param {*} [object=null] //object from data which content must be in current row
 */
const calcRender = function(trElement, object = null) {
    const tdElement = document.createElement("td", {});
    tdElement.className = this.collumnClass;
    tdElement.textContent = object[this.call1Key].value - object[this.call2Key].value;

    tdElement.setAttribute("readonly", "true");

    trElement.append(tdElement);
}

/**
 * *iconRender method should render collumn with image 
 * @param {*} trElement //row element wher must fit collumn
 * @param {*} [object=null] //object from data which content must be in current row
 */
const iconRender = function(trElement, object = null) {
    const tdElement = document.createElement("td");
    tdElement.className = this.collumnClass;
    tdElement.setAttribute("readonly", "true")

    const imgElement = document.createElement("img");
    imgElement.className += this.innerClass;

    imgElement.src = object[this.key];
    tdElement.append(imgElement);
    trElement.append(tdElement);
}

export const collumnsInRow = [{
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