import { getRandomInt } from "./helpers.js";
import { EventHandling } from "./table_handlers.js";

export const tableRendrer = function(data = [], config, element) {
    const handler = new EventHandling(data, config, element);
    const table = document.createElement("table");
    table.className = "table table-dark table-striped table-bordered table-hover table-responsive blockquote text-center"

    const thead = document.createElement("thead");
    const tbody = document.createElement("tbody");
    table.append(thead);
    table.append(tbody);

    let index = 0;
    let headerRow = document.createElement("tr");
    thead.append(headerRow)
    console.log(data);
    for (let object of data) {
        object.id = getRandomInt();
        const currentRow = document.createElement("tr");
        for (let collumn of config) {
            if (index == 0) {
                collumn.hederRender(headerRow);
            }
            collumn.renderMethod(currentRow, object, handler);
        }
        ++index;
        tbody.append(currentRow);

    }
    element.append(table);
}