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

export function changeEditableityOfProperty(inputValue, maxValue) {
    let editable;
    inputValue > maxValue ? editable = false : editable = true
    return editable;
}

export function createInputElement(type, object = { value: "", editable: "" }, className, hidden = false, readonly = true) {
    const inputElement = document.createElement("input");
    inputElement.setAttribute("type", `${type}`);
    inputElement.setAttribute("value", `${object.value}`);
    inputElement.setAttribute("editable", `${object.editable}`);

    readonly ? inputElement.setAttribute("readonly", `${readonly}`) : null;
    hidden ? inputElement.setAttribute("hidden", `${hidden}`) : null;
    inputElement.className = className;
    return inputElement;
}

export function createBtnElement(btnCharacter, hidden) {
    const btnElement = document.createElement("button");
    btnElement.className = btnCharacter.className;
    btnElement.textContent = btnCharacter.name;
    btnElement.hidden = hidden;
    return btnElement;
}

export function makeDataProxy(data, listener) {
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