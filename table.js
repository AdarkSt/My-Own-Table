export const tableRendrer = function(data = [], collumnsInRow, element) {
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

        for (const collumn of collumnsInRow) {
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