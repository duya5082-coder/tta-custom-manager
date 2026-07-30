// =======================================
// CUSTOM TTA MANAGER
// SLOT_GENERATOR.JS
// PART 3F
// AUTO TABLE SYSTEM
// =======================================


"use strict";




// =======================================
// CHECK FULL TABLE
// =======================================


TTA.checkAutoCreateTable=function(){



TTA.tables.forEach(table=>{



if(
table.slots.every(
s=>s.team
)
){


table.status="FULL";



let next =
String.fromCharCode(
65 + TTA.tables.length
);



let exist =
TTA.tables.find(
t=>t.name===next
);



if(!exist){


TTA.createTable(
next
);



TTA.notify(

"Đã tạo BÀN "+next

);



}


}



});



};





setInterval(()=>{


TTA.checkAutoCreateTable();


},3000);





console.log(
"AUTO TABLE 3F READY"
);
