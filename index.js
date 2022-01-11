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
      },
  }

  const dataChangeListener = {
      set: function(target, property, value) {
          target[property] = value;
          if (property == "length") {
              dataChangeHandle(myData, standard, table);
          }
          return true;
      }
  };
  //mi hat listener callbackerov

  function dataProxyMaker(data) {
      const dataOfProxyObj = []
      for (let obj of data) {
          dataOfProxyObj.push(new Proxy(obj, objectChangeListener));
      }

      let proxyOfData = new Proxy(dataOfProxyObj, dataChangeListener);
      return proxyOfData;
  }

  let myData;
  //sarqelem global storage-ov
  if (localStorage.getItem("data")) {
      myData = dataProxyMaker(JSON.parse(localStorage.getItem("data")));
  } else {
      localStorage.setItem("data", JSON.stringify(data));
      myData = dataProxyMaker(data);
  }
  //table-@ pahumem nra hamar vor karenam datan change aneluc et table-@ tam data change 
  //handlernerin vor iranq tableis vra popoxutyunner anenn
  const table = tableRendrer(myData, standard, main);