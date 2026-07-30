// =======================================
// CUSTOM TTA MANAGER
// SLOT_MANAGER.JS
// PART 3H
// SLOT CONTROL ENGINE
// =======================================

"use strict";



// =======================================
// UPDATE SLOT
// =======================================


TTA.updateSlot=function(
tableName,
slotNumber,
team,
ctv
){



let table =

TTA.tables.find(

t=>t.name===tableName

);



if(!table)
return;



let slot =

table.slots.find(

s=>s.number==slotNumber

);



if(!slot)
return;




slot.team=team;

slot.ctv=ctv;



TTA.saveTables();



TTA.addHistory(
"UPDATE SLOT",
team
);



refreshDashboard();



};





// =======================================
// DELETE SLOT
// =======================================


TTA.deleteSlot=function(
tableName,
slotNumber
){



let table =

TTA.tables.find(

t=>t.name===tableName

);



if(!table)
return;



let slot =

table.slots.find(

s=>s.number==slotNumber

);



if(!slot)
return;



let oldTeam =
slot.team;



slot.team="";

slot.ctv="";

slot.paid=false;



table.status="OPEN";



TTA.saveTables();



TTA.addHistory(
"DELETE SLOT",
oldTeam
);



refreshDashboard();


};





// =======================================
// SEARCH TEAM
// =======================================


TTA.searchTeam=function(keyword){



let result=[];



TTA.tables.forEach(table=>{


table.slots.forEach(slot=>{


if(
slot.team
&&
slot.team
.toLowerCase()
.includes(
keyword.toLowerCase()
)

){


result.push({

table:table.name,

slot:slot.number,

team:slot.team,

ctv:slot.ctv

});


}



});


});



return result;


};





// =======================================
// FILTER SLOT
// =======================================


TTA.filterSlots=function(type){



let result=[];



TTA.tables.forEach(table=>{


table.slots.forEach(slot=>{


if(type==="all"){

result.push(slot);

}



if(
type==="empty"
&&
!slot.team
){

result.push(slot);

}




if(
type==="paid"
&&
slot.paid
){

result.push(slot);

}




if(
type==="unpaid"
&&
slot.team
&&
!slot.paid
){

result.push(slot);

}



});


});



return result;


};





console.log(
"SLOT MANAGER 3H READY"
);
