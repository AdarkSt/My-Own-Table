export const deleter = function(event, data) {
    let index = 0;
    const currentRow = event.target.parentNode.parentNode;
    for (let object of data) {
        if (object.id == currentRow.myId) {
            data.splice(index, 1);
            break;
        }
        index++
    }

    return data;
}

export const updater = function(event, data) {
    const currentRow = event.target.parentNode.parentNode;
    const childrens = Array.from(currentRow.children);

    for (let object of data) {
        if (currentRow.myId == object.id) {
            for (let child of childrens) {
                object[child.memory] = child.textContent;
            }
        }
    }
    return data;
}