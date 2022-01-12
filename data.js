export let data = [{
        id: 81699,
        league: "QATAR: Stars League",
        date: "2021-12-29",
        teams: "Al Shamal - Al Rayyan SC",
        result: "2-3",
        matches: 10,
        draw: 3,
    },
    {
        id: 5562,
        league: "INTERNATIONAL: Suzuki Cup, Group Stage",
        date: "2021-12-29",
        teams: "Indonesia - Thailand",
        result: "3-3",
        matches: 6,
        draw: 2,
    },
    {
        id: 21806,
        league: "ENGLAND: Premier League",
        date: "2021-12-28",
        teams: "Leicester City - Liverpool",
        result: "0-4",
        matches: 9,
        draw: 1,
    },
    {
        id: 72019,
        league: "PORTUGAL: Liga Portugal",
        date: "2021-12-28",
        teams: "Moreirense - Estoril",
        result: "1-3",
        matches: 11,
        draw: 5,
    },
    {
        id: 40049,
        league: "ENGLAND: Premier League",
        date: "2021-12-28",
        teams: "Crystal Palace - Norwich City",
        result: "2-1",
        matches: 4,
        draw: 1,
    },
    {
        id: 30563,
        league: "ENGLAND: Premier League",
        date: "2021-12-28",
        teams: "Watford - West Ham United",
        result: "2-0",
        matches: 9,
        draw: 2,
    },
    {
        id: 92525,
        league: "PORTUGAL: Liga Portugal",
        date: "2021-12-28",
        teams: "Maritimo - Vizela",
        result: "0-0",
        matches: 12,
        draw: 4,
    },
    {
        id: 30926,
        league: "PORTUGAL: Liga Portugal",
        date: "2021-12-28",
        teams: "Tondela - Gil Vicente",
        result: "1-2",
        matches: 7,
        draw: 1,
    },
    {
        id: 62892,
        league: "INDIA: ISL",
        date: "2021-12-28",
        teams: "Hyderabad - Odisha",
        result: "2-2",
        matches: 4,
        draw: 0,
    },
    {
        id: 19651,
        league: "ENGLAND: Premier League",
        date: "2021-12-28",
        teams: "Newcastle United - Manchester United",
        result: "1-4",
        matches: 8,
        draw: 3,
    },
    {
        id: 15278,
        league: "BELGIUM: Jupiler Pro League",
        date: "2021-12-27",
        teams: "Charleroi - Oud-Heverlee",
        result: "0-0",
        matches: 13,
        draw: 5,
    },
    {
        id: 4561,
        league: "BELGIUM: Jupiler Pro League",
        date: "2021-12-27",
        teams: "Mechelen - RFC Seraing",
        result: "1-1",
        matches: 5,
        draw: 0,
    },
    {
        id: 69351,
        league: "BELGIUM: Jupiler Pro League",
        date: "2021-12-27",
        teams: "Beerschot-Wilrijk - Anderlecht",
        result: "3-3",
        matches: 11,
        draw: 2,
    },
    {
        id: 40342,
        league: "BELGIUM: Jupiler Pro League",
        date: "2021-12-27",
        teams: "Sint-Truiden - Eupen",
        result: "3-1",
        matches: 10,
        draw: 2,
    },
    {
        id: 91992,
        league: "ENGLAND: Championship",
        date: "2021-12-27",
        teams: "QPR - Bournemouth",
        result: "2-1",
        matches: 8,
        draw: 4,
    },
];


data.forEach(item => {
    for (let key of Object.keys(item)) {
        const myVal = item[key];
        if (key != "id") {
            item[key] = {
                value: myVal,
                editable: true,
            }
        } else {
            item[key] = {
                value: myVal,
                editable: false,
            }
        }
    }
})

// for (let mutation of MutationRecord) {
//     for (let key of Object.keys(cloneOfCurrentObject)) {
//         if (`${cloneOfCurrentObject[key].value}` == mutation.oldValue) {
//             const editablity = cloneOfCurrentObject[key].editable
//             cloneOfCurrentObject[key] = {
//                 value: MutationRecord[0].target.textContent,
//                 editable: editablity,
//             }
//         }
//     }
// }