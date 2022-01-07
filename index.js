  import { tableRendrer } from "./table.js";
  import { standard } from "./config.js"
  import { data } from "./data.js"
  import { removeAllChildNodes } from "./helpers.js";

  const main = document.querySelector(".main");

  const objectChangeHandler = {
      set: function(target, property, value) {
          target[property] = value;
          if (property != "id") {
              removeAllChildNodes(main);
              tableRendrer(proxyOfData, standard, main);
          }
          return true;
      }
  }

  const dataChangeHandler = {
      set: function(target, property, value) {
          target[property] = value;
          if (property == "length") {
              removeAllChildNodes(main);
              tableRendrer(proxyOfData, standard, main);
          }
          return true;
      }
  };

  const dataOfProxyObj = []
  for (let obj of data) {
      dataOfProxyObj.push(new Proxy(obj, objectChangeHandler));
  }

  let proxyOfData = new Proxy(dataOfProxyObj, dataChangeHandler);
  tableRendrer(proxyOfData, standard, main);