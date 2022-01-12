import { removeAllChildNodes } from "./helpers.js";

export function dataInnerObjectChangeHandle(object, config, table, data) {
    console.log(object);
    const tableRows = Array.from(table.lastElementChild.children);
    for (let row of tableRows) {
        if (row.getAttribute("myId") == object.id.value) {
            removeAllChildNodes(row);
            for (let collumn of config) {
                collumn.renderMethod(row, object, data);
            }
            break;
        }
    }
}

export function dataChangeHandle(data, config, table) {
    const rows = Array.from(table.lastElementChild.children);

    const rowIdCollection = rows.map((row) => {
        return Number(row.getAttribute("myId"));
    })

    let removableRowId;

    const objectIdCollection = data.map((object) => {
        return Number(object.id.value);
    })

    rowIdCollection.forEach(item => {
        if (objectIdCollection.indexOf(item, 0) == -1) {
            removableRowId = item;
        }
    })

    const removableRow = rows.find(item => Number(item.getAttribute("myId")) == removableRowId);
    removableRow.remove();

}