 import { tableRendrer } from "./table.js";
 import { data } from "./data.js"
 import { standard } from "./config.js"
 import { removeAllChildNodes } from "./helpers.js";

 let currentLength = data.length;

 const main = document.querySelector(".main");
 tableRendrer(data, standard, main);

 function rerendrer(data) {
     if (data.length != currentLength) {
         currentLength = data.length;
         removeAllChildNodes(main);
         tableRendrer(data, standard, main);
     }
 }

 setInterval(() => {
     rerendrer(data);
 }, 0)