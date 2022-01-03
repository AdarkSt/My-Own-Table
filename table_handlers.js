import { tableRendrer } from "./table.js";
import { removeAllChildNodes } from "./helpers.js"

export class EventHandling {
    constructor(data, config, element) {
        this.data = data;
        this.config = config;
        this.element = element;
    }

    deleter = function(event, data) {
        let index = 0;
        for (let object of data) {
            if (object.id == event.target.parentNode.parentNode.myId) {
                data.splice(index, 1);
                break;
            }
            index++
        }
        return data;
    }

    updater = function(event, data) {
        const currentRow = event.target.parentNode.parentNode;
        const childrens = Array.from(currentRow.children);
        for (let child of childrens) {
            child.setAttribute("contenteditable", "true");
            child.addEventListener("blur", event => {
                for (let object of data) {
                    if (currentRow.myId == object.id) {
                        object[child.memory] = event.target.textContent;
                    }
                }
            })
        }
        return data;
    }

    handleEvent(event) {
        if (event.target.handler == 2) {
            let answer = confirm("Do you really want to delete this row?");
            if (answer) {
                this.data = this.deleter(event, this.data)
                removeAllChildNodes(this.element);
                tableRendrer(this.data, this.config, this.element);
            }
        }
        if (event.target.handler == 1) {
            this.updater(event, this.data);
            event.target.removeEventListener("click", this)
            event.target.addEventListener("click", () => {
                const currentRow = event.target.parentNode.parentNode;
                const childrens = Array.from(currentRow.children);
                for (let child of childrens) {
                    child.setAttribute("contenteditable", "false");
                }
                event.target.addEventListener("click", this);
            })
        }
    }

}