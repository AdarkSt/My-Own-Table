import { removeAllChildNodes } from "./helpers.js";
import { tableRendrer } from "./table.js";

export function objectChangeHandle(object, config, table, data) {
    const tableRows = Array.from(table.children);
    for (let row of tableRows) {
        if (row.myId == object.id) {
            removeAllChildNodes(row);
            for (let collumn of config) {
                collumn.renderMethod(row, object, data);
            }
            break;
        }
    }
}

export function dataChangeHandle(data, config, main) {
    removeAllChildNodes(main);
    tableRendrer(data, config, main);
}