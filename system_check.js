// =======================================
// CUSTOM TTA MANAGER
// SYSTEM CHECK
// PART 3K
// =======================================

"use strict";


TTA.systemCheck=function(){


console.log(
"========== TTA SYSTEM CHECK =========="
);



let checks={};



checks.TTA =
typeof TTA;


checks.tables =
Array.isArray(TTA.tables);



checks.slot =
typeof TTA.addTeamToSlot;


checks.dashboard =
typeof TTA.renderTablesDashboard;


checks.payment =
typeof TTA.renderPayment;


checks.salary =
typeof TTA.renderSalary;


checks.ctv =
typeof TTA.renderCTVManager;


checks.finance =
typeof TTA.getFinance;


checks.search =
typeof TTA.globalSearch;


checks.backup =
typeof TTA.backup;


checks.messenger =
typeof TTA.copyMessenger;



console.table(checks);



let error=[];



Object.keys(checks)
.forEach(key=>{


if(
checks[key]===false
||
checks[key]==="undefined"
){

error.push(key);

}


});




if(error.length){


console.error(
"❌ LỖI:",
error
);


}else{


console.log(
"✅ TTA SYSTEM OK"
);


}



return checks;


};





console.log(
"SYSTEM CHECK 3K READY"
);
