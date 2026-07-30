// =======================================
// FINANCE.JS
// PART 3J
// =======================================

"use strict";


TTA.getFinance=function(){


let total=0;

let paid=0;

let unpaid=0;



TTA.tables.forEach(table=>{


table.slots.forEach(slot=>{


if(slot.team){


total += 5000;


if(slot.paid){

paid += 5000;

}
else{

unpaid += 5000;

}


}



});


});



return {

total,
paid,
unpaid

};


};





TTA.renderFinance=function(){


let data =
TTA.getFinance();



console.log(data);



return data;


};



console.log(
"FINANCE ENGINE 3J READY"
);
