import { getRandomInt } from "./helpers.js";
import { EventHandling } from "./table_handlers.js";

export const collumnHeaderRender = function(trElement) {
    const thElement = document.createElement("th");
    thElement.textContent = this.label;
    trElement.append(thElement);
}

export const collumnRender = function(trElement, object = null, handler = null) {
    const tdElement = document.createElement("td");
    tdElement.textContent = object[this.key];
    trElement.myId = object.id;
    trElement.append(tdElement);
}

export const buttonRender = function(trElement, object = null, handler) {
    const tdElement = document.createElement("td");
    for (let button of this.form) {
        const buttonElement = document.createElement("button");
        buttonElement.className = "btn btn-outline-secondary btn-sm btn-block "
        buttonElement.textContent = button.type;
        buttonElement.handler = button.handleId;
        buttonElement.addEventListener("click", handler)
        tdElement.append(buttonElement)
    }
    trElement.append(tdElement);
}

export const tableRendrer = function(data, config, element) {
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