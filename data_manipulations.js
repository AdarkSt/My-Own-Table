export const deleter = function(event, data) {
    let index = 0;

    for (let object of data) {
        if (object.id == event.target.parentNode.parentNode.myId) {
            data.splice(index, 1);
            break;
        }
        index++
    }

    return data;
}

export const updater = function(event, data) {
    const currentRow = event.target.parentNode;
    const child = event.target;

    for (let object of data) {
        if (currentRow.myId == object.id) {
            object[child.memory] = event.target.textContent;
        }
    }

    return data;
}