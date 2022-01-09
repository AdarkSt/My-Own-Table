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
    console.log(data);
    sessionStorage.setItem("data", JSON.stringify(data));
    return data;
}

export const saver = function(event, data) {
    const currentRow = event.target.parentNode.parentNode;
    const childrens = Array.from(currentRow.children);

    for (let object of data) {
        if (currentRow.myId == object.id) {
            for (let child of childrens) {
                if (object.hasOwnProperty(`${child.memory}`)) {
                    object[child.memory] = child.textContent;
                }
            }
        }
    }
    sessionStorage.setItem("data", JSON.stringify(data));
    return data;
}

export const canceller = function(event, data, config) {
    const currentRow = event.target.parentNode.parentNode;
    const table = currentRow.parentNode.parentNode;
    currentRow.remove();

    let index = 1;
    for (let obj of data) {
        if (currentRow.myId == obj.id) {
            const newRow = table.insertRow(index);
            for (let collumn of config) {
                collumn.renderMethod(newRow, obj, data);
            }
            break;
        }
        ++index;
    }


}