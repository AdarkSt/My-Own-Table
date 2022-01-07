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
        if (child.editable) {
            if (editable) {
                child.setAttribute("contenteditable", "true");
            } else {
                child.setAttribute("contenteditable", "false");
            }

        }
    }
}