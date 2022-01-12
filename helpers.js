export function findCountOf(arr, value) {
    let count = 0;
    for (let elem of arr) {
        if (elem === value)
            ++count;
    }
    return count;
}

export function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

export function getRandomInt(min = 100, max = 100000) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function changeEditableityOfNodes(childrens, editable) {
    for (let child of childrens) {
        if (child.ariaReadOnly != "true") {
            child.setAttribute("contenteditable", `${editable}`);
            if (editable) {
                child.classList.add("table-warning", "border", "border-secondary");
            } else {
                child.classList.remove("table-warning", "border", "border-secondary")
            }
        }
    }
}

export function cloneDeep(cloneObject, object) {
    for (let key in object) {
        if (object[key].constructor != Object) {
            cloneObject[key] = object[key];
        } else {
            cloneObject[key] = cloneDeep({}, object[key]);
        }
    }
    return cloneObject;
}

export function notConvertToNaN(value) {
    return !Number.isNaN(Number(value));
}