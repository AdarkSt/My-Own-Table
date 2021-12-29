import { collumnRender, collumnHeaderRender, buttonRender } from "./table.js"


export const standard = [{
        key: "league",
        label: "League",
        renderMethod: collumnRender,
        hederRender: collumnHeaderRender,
    },
    {
        key: "teams",
        label: "Teams",
        renderMethod: collumnRender,
        hederRender: collumnHeaderRender,
    },
    {
        key: "date",
        label: "Date",
        renderMethod: collumnRender,
        hederRender: collumnHeaderRender,
    },
    {
        key: "result",
        label: "Result",
        renderMethod: collumnRender,
        hederRender: collumnHeaderRender,
    },
    {
        key: "button",
        label: "Buttons",
        form: ["Update", "Delete"],
        renderMethod: buttonRender,
        hederRender: collumnHeaderRender,
    },
]