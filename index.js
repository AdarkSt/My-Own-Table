import { renderTable } from "./Table/table.js";
import { standardCollumnsInRow } from "./Table/config.js"
import { data } from "./Data/data.js"
import { handleObjectChange, handleDataChange } from "./data_change_handling.js"
import { makeDataProxy } from "./helpers.js"
import { renderTableSearch } from "./Table/search.js";

const main = document.querySelector(".main");
const navbar = document.querySelector("nav");

const dataChangeListener = {
    get: function(target, prop) {
        if (['[object Object]', '[object Array]'].indexOf(Object.prototype.toString.call(target[prop])) > -1) {
            return new Proxy(target[prop], dataChangeListener);
        }
        return target[prop];
    },
    set: function(target, property, value) {
        target[property] = value;
        if (property == "length") {
            handleDataChange(myData, table);
        } else {
            handleObjectChange(target[property], standardCollumnsInRow, table, myData);
        }
        return true;
    }
};

let myData;

if (localStorage.getItem("data")) {
    myData = makeDataProxy(JSON.parse(localStorage.getItem("data")), dataChangeListener);
} else {
    localStorage.setItem("data", JSON.stringify(data));
    myData = makeDataProxy(data, dataChangeListener);
}

const table = renderTable(myData, standardCollumnsInRow, main);
renderTableSearch(navbar, table, standardCollumnsInRow);