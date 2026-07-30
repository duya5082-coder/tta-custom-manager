// =======================================
// CUSTOM TTA MANAGER
// RESET.JS
// PART 3G
// AUTO DAILY RESET
// =======================================


"use strict";





TTA.resetDaily=function(){



    TTA.tables.forEach(table=>{


        table.status="OPEN";


        table.slots.forEach(slot=>{


            slot.team="";

            slot.paid=false;

            slot.ctv="";

            slot.created=null;


        });



    });




    TTA.saveTables();



    console.log(
        "Đã reset slot ngày mới"
    );



};





// CHECK NGÀY


let lastDate =
localStorage.getItem(
"CUSTOM_TTA_DATE"
);



let today =
new Date()
.toDateString();




if(
lastDate
&&
lastDate!==today
){


    TTA.resetDaily();


}



localStorage.setItem(
"CUSTOM_TTA_DATE",
today
);





console.log(
"AUTO RESET 3G READY"
);
