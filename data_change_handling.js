import { removeAllChildNodes } from "./helpers.js";

export function dataInnerObjectChangeHandle(object, collumnsInRow, table, data) {
    const tableRows = Array.from(table.lastElementChild.children);
    const changableRow = tableRows.find(row => row.getAttribute("myId") == object.id.value);

    removeAllChildNodes(changableRow);
    for (const collumn of collumnsInRow) {
        collumn.renderMethod(changableRow, object, data);
    }
}

export function dataChangeHandle(data, table) {
    const rows = Array.from(table.lastElementChild.children);

    const rowIdCollection = rows.map((row) => {
        return Number(row.getAttribute("myId"));
    })

    const objectIdCollection = data.map((object) => {
        return Number(object.id.value);
    })

    let removableRowId;

    rowIdCollection.forEach(item => {
        if (objectIdCollection.indexOf(item, 0) == -1) {
            removableRowId = item;
        }
    })

    const removableRow = rows.find(item => Number(item.getAttribute("myId")) == removableRowId);
    removableRow.remove();
}