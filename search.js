// =======================================
// SEARCH SYSTEM
// PART 3J
// =======================================

"use strict";


TTA.globalSearch=function(keyword){


let result=[];



TTA.tables.forEach(table=>{


table.slots.forEach(slot=>{


if(
slot.team &&
slot.team
.toLowerCase()
.includes(
keyword.toLowerCase()
)
){


result.push({

team:slot.team,

table:table.name,

slot:slot.number,

paid:slot.paid


});


}


});


});



return result;


};



console.log(
"SEARCH SYSTEM 3J READY"
);
