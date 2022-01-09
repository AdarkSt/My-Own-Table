  import { tableRendrer } from "./table.js";
  import { standard } from "./config.js"
  import { data } from "./data.js"
  import { objectChangeHandle, dataChangeHandle } from "./data_change_handling.js"

  const main = document.querySelector(".main");



  const objectChangeListener = {
      set: function(target, property, value) {
          target[property] = value;
          if (property != "id") {
              objectChangeHandle(target, standard, table, myData);
          }
          return true;
      }
  }

  const dataChangeListener = {
      set: function(target, property, value) {
          target[property] = value;
          if (property == "length") {
              dataChangeHandle(myData, standard, main);
          }
          return true;
      }
  };

  function dataProxyMaker(data) {
      const dataOfProxyObj = []
      for (let obj of data) {
          dataOfProxyObj.push(new Proxy(obj, objectChangeListener));
      }

      let proxyOfData = new Proxy(dataOfProxyObj, dataChangeListener);
      return proxyOfData;
  }

  let myData;

  if (sessionStorage.getItem("data")) {
      myData = dataProxyMaker(JSON.parse(sessionStorage.getItem("data")))
  } else {
      sessionStorage.setItem("data", JSON.stringify(data))
      myData = dataProxyMaker(JSON.parse(sessionStorage.getItem("data")))
  }


  const table = tableRendrer(myData, standard, main);