import { tableRender } from "./table.js";
import { standardCollumnsInRow } from "./config.js"
import { data } from "./data.js"
import { dataInnerObjectChangeHandle, dataChangeHandle } from "./data_change_handling.js"
import { dataProxyMaker } from "./helpers.js"

const main = document.querySelector(".main");

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
            dataChangeHandle(myData, table);
        } else {
            dataInnerObjectChangeHandle(value, standardCollumnsInRow, table, myData);
        }
        return true;
    }
};

let myData;

if (localStorage.getItem("data")) {
    myData = dataProxyMaker(JSON.parse(localStorage.getItem("data")), dataChangeListener);
} else {
    localStorage.setItem("data", JSON.stringify(data));
    myData = dataProxyMaker(data, dataChangeListener);
}

const table = tableRender(myData, standardCollumnsInRow, main);