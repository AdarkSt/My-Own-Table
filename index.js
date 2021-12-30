 import { tableRendrer } from "./table.js";
 import { data } from "./data.js"
 import { standard } from "./config.js"


 const main = document.querySelector(".main");
 tableRendrer(data, standard, main);