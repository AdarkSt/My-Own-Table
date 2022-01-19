export function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

export function changeEditableityOfInputs(childrens) {
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

export function createInputElement(type, object = { value: "", editable: "" }, className, hidden = false) {
    const inputElement = document.createElement("input");
    inputElement.setAttribute("type", `${type}`);
    inputElement.setAttribute("value", `${object.value}`);
    inputElement.setAttribute("editable", `${object.editable}`);
    inputElement.setAttribute("readonly", "true");
    if (hidden) {
        inputElement.setAttribute("hidden", "true");
    }
    inputElement.className = className;
    return inputElement;
}

export function dataProxyMaker(data, listener) {
    const proxyOfData = new Proxy(data, listener);
    return proxyOfData;
}

export function readFileInImg(file, imgElement, fileLoadCallBack, ...callBackArgs) {
    const fReader = new FileReader();
    fReader.readAsDataURL(file);
    fReader.onload = function(event) {
        imgElement.setAttribute("src", event.target.result);
        const resultValue = event.target.result;
        fileLoadCallBack(resultValue, ...callBackArgs);
    }
}

export function changeVisiblityOfButtons(buttonContainer) {
    for (const button of buttonContainer) {
        button.hidden = !button.hidden;
    }
}