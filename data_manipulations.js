import { notConvertToNaN, removeAllChildNodes } from "./helpers.js";


export const deleter = function(event, data) {
    const currentRow = event.target.parentNode.parentNode;

    const currentObjectIndex = data.findIndex(item => item.id == Number(currentRow.getAttribute("myId")));
    data.splice(currentObjectIndex, 1)

    localStorage.setItem("data", JSON.stringify(data));
}


//save button@ sxmeluc kanchveluya saver funkcian vor gtnuma te vor toxi vrayi save buttonna sexmvel

//gtnuma et row-in hamapatasxan object@ data-um

// et toxi childrenneric{collumn}-eric sarquma array amen child-n unenumer ira memoryn vortex pahvumee
// te inq@ datai objecti vor propertyna ira mej pahel 

// qani vor im mot asenq objectum araji prop-@ kara lini ligan bayc table-um et property-in hamapatasxan@ collumn@ errord@
//dra hamar es collumni memory-um pahum em te inq@ vor prop-ina nkarel ira mej u heto gtnumem te et collumn-i popoxutyun@ 
//vor prop-in pti veragrem ete es hertov jnjem u vonc ka coll-eri hertakanutyun@ tenc lcnem objecti mej kstacvi vor asenq 
// date collumni mej @ngav liga-n resulti mej esim inch vopshm kxarnven 

//mi xosqov senc gtnumem popoxumem object-i property-neri value-ner@ u et popoxutyunner@ listena linum proxy-ic 
//proxy-in kanchuma method vor et tox@ jnjum taza nkaruma popoxvac objectov



//inch harcer kara ta Davon indz
//e tox xar@ lcvi objecti mej inch tarberutyun vonca hertakanutyun@ objectum meka method-t giti voric inch nkari

//ha harc chka axper method-@ giti voric inch nkari bayc ho saver-i logic-sel tenc chgiti vor objecti.league-in pti set ani
//henc en collumni content-@ vor@ vor pahuma league-a inq@ herrtov lcneluya ira herti mejel league-n 3-er shata jokum
//vor objectum eti arajinna bayc nayuma tenuma asenq ira memory-in league-na uremn ira meji arjeq@ seta anum 
//object[child.memory] es depqum object.league klni

//im jogelov axper es memory-i pah@ vat pah chi object orientid kayfot jokuma vorin inch pti qci :)

export const saver = function(event, data) {
    const currentRow = event.target.parentNode.parentNode;
    const childrens = Array.from(currentRow.children);

    const currentObject = data.find(item => item.id == Number(currentRow.getAttribute("myId")));

    childrens.forEach(child => {
        if (Object.keys(currentObject).includes(child.getAttribute("memory"))) {
            let editableProp = currentObject[child.getAttribute("memory")].editable;
            currentObject[child.getAttribute("memory")] = {
                value: child.textContent,
                editable: editableProp,
            };
        }
    })

    localStorage.setItem("data", JSON.stringify(data));
}

export const canceller = function(event, data, config) {
    const currentRow = event.target.parentNode.parentNode;
    removeAllChildNodes(currentRow);

    const currentObject = data.find(item => item.id == Number(currentRow.getAttribute("myId")));

    for (let collumn of config) {
        collumn.renderMethod(currentRow, currentObject, data);
    }
}