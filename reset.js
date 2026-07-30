// =======================================
// CUSTOM TTA MANAGER
// RESET.JS
// PART 3G
// AUTO DAILY RESET
// =======================================

"use strict";


(function(){



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


const resetLastDate =
localStorage.getItem(
"CUSTOM_TTA_DATE"
);



const resetToday =
new Date()
.toDateString();





if(
resetLastDate
&&
resetLastDate !== resetToday
){


    TTA.resetDaily();


}





localStorage.setItem(
"CUSTOM_TTA_DATE",
resetToday
);




console.log(
"AUTO RESET 3G READY"
);



})();
