export function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

export function changeEditableityOfNodes(childrens) {
    childrens.forEach(item => {
        const input = item.querySelector("input")
        if (input) {
            input.removeAttribute("hidden")
            if (input.getAttribute("editable") == "true") {
                input.removeAttribute("readonly");
            }
        }
    })
}

export function cloneDeep(cloneObject, object) {
    for (const key in object) {
        if (object[key].constructor != Object) {
            cloneObject[key] = object[key];
        } else {
            cloneObject[key] = cloneDeep({}, object[key]);
        }
    }
    return cloneObject;
}

export function inputElementCreate(type, object, className) {
    const inputElement = document.createElement("input");
    inputElement.setAttribute("type", `${type}`);
    inputElement.setAttribute("value", `${object.value}`);
    inputElement.setAttribute("editable", `${object.editable}`);
    inputElement.setAttribute("readonly", "true");
    inputElement.className = className
    return inputElement;
}

export function dataProxyMaker(data, listener) {
    const proxyOfData = new Proxy(data, listener);
    return proxyOfData;
}