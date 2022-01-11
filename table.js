import { getRandomInt } from "./helpers.js";


export const tableRendrer = function(data = [], config, element) {
    const table = document.createElement("table");
    table.className = "my-table-style table table-dark table-striped table-bordered table-hover table-responsive blockquote text-center"

    const thead = document.createElement("thead");
    const tbody = document.createElement("tbody");
    table.append(thead);
    table.append(tbody);

    let index = 0;
    let headerRow = document.createElement("tr");
    thead.append(headerRow)
    console.log(data);

    for (let object of data) {
        if (!object.hasOwnProperty("id")) {
            object.id = getRandomInt();
        }

        const currentRow = document.createElement("tr");
        currentRow.setAttribute("myId", object.id);

        for (let collumn of config) {
            if (index == 0) {
                collumn.headerRender(headerRow);
            }
            collumn.renderMethod(currentRow, object, data);
        }
        ++index;
        tbody.append(currentRow);
    }

    element.append(table);
    return table;
}