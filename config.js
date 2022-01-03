const collumnHeaderRender = function(trElement) {
    const thElement = document.createElement("th");
    thElement.textContent = this.label;
    trElement.append(thElement);
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

const rendrer = function(trElement, object = null, handler = null) {
    const tdElement = document.createElement("td");
    tdElement.className = this.collumnClass;

    const inner = document.createElement(`${this.type}`);
    inner.className += this.innerClass;
    inner.textContent = object[this.key];
    inner.src = inner.href = object[this.key];

    trElement.myId = object.id;
    tdElement.memory = this.key;

    tdElement.append(inner);
    trElement.append(tdElement);
}

export const standard = [{
        key: "league",
        label: "League",
        type: "span",
        collumnClass: "",
        innerClass: "",
        renderMethod: rendrer,
        hederRender: collumnHeaderRender,
    },
    {
        key: "teams",
        label: "Teams",
        type: "span",
        collumnClass: "",
        innerClass: "",
        renderMethod: rendrer,
        hederRender: collumnHeaderRender,
    },
    {
        key: "date",
        label: "Date",
        type: "span",
        collumnClass: "",
        innerClass: "",
        renderMethod: rendrer,
        hederRender: collumnHeaderRender,
    },
    {
        key: "icon",
        label: "Icon",
        type: "img",
        collumnClass: "",
        innerClass: "",
        renderMethod: rendrer,
        hederRender: collumnHeaderRender,
    },
    {
        key: "result",
        label: "Result",
        type: "span",
        collumnClass: "",
        innerClass: "",
        renderMethod: rendrer,
        hederRender: collumnHeaderRender,
    },
    {
        key: "button",
        label: "Action",
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
    }
]