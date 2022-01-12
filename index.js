import { tableRendrer } from "./table.js";
import { standard } from "./config.js"
import { data } from "./data.js"
import { dataInnerObjectChangeHandle, dataChangeHandle } from "./data_change_handling.js"

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
            dataChangeHandle(myData, standard, table);
        } else {
            dataInnerObjectChangeHandle(value, standard, table, myData);
        }
        return true;
    }
};

function dataProxyMaker(data) {
    const proxyOfData = new Proxy(data, dataChangeListener);
    return proxyOfData;
}

let myData;

if (localStorage.getItem("data")) {
    myData = dataProxyMaker(JSON.parse(localStorage.getItem("data")));
} else {
    localStorage.setItem("data", JSON.stringify(data));
    myData = dataProxyMaker(data);
}

const table = tableRendrer(myData, standard, main);