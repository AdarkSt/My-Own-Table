export const collumnHeaderRender = function(trElement) {
    const thElement = document.createElement("th");
    thElement.textContent = this.label;
    trElement.append(thElement);
}

export const collumnRender = function(trElement, object = null) {
    const tdElement = document.createElement("td");
    tdElement.textContent = object[this.key];
    trElement.append(tdElement);
}

export const buttonRender = function(trElement, object) {
    const tdElement = document.createElement("td");
    for (let type of this.form) {
        const buttonElement = document.createElement("button");
        buttonElement.className = "btn btn-outline-secondary btn-sm btn-block "
        buttonElement.textContent = type;
        tdElement.append(buttonElement)
    }
    trElement.append(tdElement);
}

export const tableRendrer = function(data, config, element) {
    const table = document.createElement("table");
    table.className = "table table-dark table-striped table-bordered table-hover table-responsive blockquote text-center"
    const thead = document.createElement("thead");
    const tbody = document.createElement("tbody");
    tbody.className = "";
    table.append(thead);
    table.append(tbody);

    let index = 0;
    let headerRow = document.createElement("tr");
    thead.append(headerRow)
    for (let object of data) {
        const currentRow = document.createElement("tr");
        const keyNames = Object.keys(object);
        for (let collumn of config) {
            if (index == 0) {
                collumn.hederRender(headerRow);
            }
            collumn.renderMethod(currentRow, object);
        }
        ++index;
        tbody.append(currentRow);
    }
    element.append(table);
}