 import { tableRendrer } from "./table.js";
 import { matches } from "./data.js"
 import { standard } from "./config.js"

 const main = document.querySelector(".main");
 tableRendrer(matches, standard, main);