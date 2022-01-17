/**
 * *tableRender method shuld render table from data in element with standard collumns
 * @param {Array} data // root data for table
 * @param {Object} standardCollumnsInRow // collumns standard in one row
 * @param {HTMLElement} element // element wher shuld be rendered table
 */

export const tableRender = function(data = [], standardCollumnsInRow, element) {
    const table = document.createElement("table");
    table.className = "my-table-style table table-dark table-striped table-bordered table-hover table-responsive blockquote text-center"

    const thead = document.createElement("thead");
    const tbody = document.createElement("tbody");
    table.append(thead);
    table.append(tbody);

    let index = 0;
    const headerRow = document.createElement("tr");
    thead.append(headerRow)

    for (const object of data) {

        const currentRow = document.createElement("tr");
        currentRow.setAttribute("myId", object.id.value);

        for (const collumn of standardCollumnsInRow) {
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