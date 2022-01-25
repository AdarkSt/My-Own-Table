import { createInputElement } from "../helpers.js";

export function renderTableSearch(element, table, collumns) {
    const form = document.createElement("form");
    const img = document.createElement("img");
    const input = createInputElement("search", { value: "" }, "inputSearch", false, false);
    const select = document.createElement("select");
    select.className += "searchSelect";

    for (const coll of collumns) {
        if (coll.searchable) {
            const option = document.createElement("option");
            option.textContent = coll.label;
            option.className += "selectOption";
            select.append(option);
        }
    }

    input.setAttribute("placeholder", `Search...`)
    form.className += "searchForm";
    img.setAttribute("src", "images/download.png")

    input.addEventListener("keyup", (event) => {
        const value = event.target.value;
        handleSearch(value, table, select);
    })

    form.append(img, select, input);
    element.insertBefore(form, element.firstChild)
}

function handleSearch(value, table, select) {

    const headerRow = Array.from(table.getElementsByTagName("th"))
    const collumnIndex = headerRow.findIndex(item => item.textContent === select.value)
    const bodyRows = Array.from(table.lastChild.getElementsByTagName("tr"));

    bodyRows.forEach(row => {
        const collumnsInRow = Array.from(row.children);
        const input = collumnsInRow[collumnIndex].firstChild;
        if (input.value.includes(value)) {
            input.parentNode.parentNode.style.display = ""
        } else {
            input.parentNode.parentNode.style.display = "none"
        }
    })
}