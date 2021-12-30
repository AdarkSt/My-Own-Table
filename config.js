const collumnHeaderRender = function(trElement) {
    const thElement = document.createElement("th");
    thElement.textContent = this.label;
    trElement.append(thElement);
}

const textRender = function(trElement, object = null, handler = null) {
    const tdElement = document.createElement("td");
    tdElement.textContent = object[this.key];
    tdElement.memory = this.key;
    trElement.myId = object.id;
    trElement.append(tdElement);
}

const buttonRender = function(trElement, object = null, handler = null) {
    const tdElement = document.createElement("td");
    for (let button of this.form) {
        const buttonElement = document.createElement("button");
        buttonElement.className = "btn btn-outline-secondary btn-sm btn-block "
        buttonElement.textContent = button.type;
        buttonElement.handler = button.handleId;
        buttonElement.addEventListener("click", handler)
        tdElement.append(buttonElement)
    }
    trElement.append(tdElement);
}

const iconRender = function(trElement, object = null, handler = null) {
    const tdElement = document.createElement("td");
    const imgElement = document.createElement("img");
    imgElement.src = object[this.key];
    tdElement.append(imgElement);
    trElement.append(tdElement);
}

export const standard = [{
        key: "league",
        label: "League",
        renderMethod: textRender,
        hederRender: collumnHeaderRender,
    },
    {
        key: "teams",
        label: "Teams",
        renderMethod: textRender,
        hederRender: collumnHeaderRender,
    },
    {
        key: "date",
        label: "Date",
        renderMethod: textRender,
        hederRender: collumnHeaderRender,
    },
    {
        key: "icon",
        label: "Icon",
        renderMethod: iconRender,
        hederRender: collumnHeaderRender,
    },
    {
        key: "result",
        label: "Result",
        renderMethod: textRender,
        hederRender: collumnHeaderRender,
    },
    {
        key: "button",
        label: "Buttons",
        form: [{
                type: "Update",
                handleId: 1,
            },
            {
                type: "Delete",
                handleId: 2,
            }
        ],
        renderMethod: buttonRender,
        hederRender: collumnHeaderRender,
    },

]