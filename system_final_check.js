// =======================================
// CUSTOM TTA MANAGER
// SYSTEM FINAL CHECK
// SLOT SYSTEM NEW
// =======================================

"use strict";


setTimeout(function(){



let ok = true;



function check(
name,
condition
){

    if(condition){

        console.log(
        "✅ "+name
        );

    }
    else{

        console.error(
        "❌ "+name
        );

        ok=false;

    }

}




// CORE

check(
"SLOT DATA",
Array.isArray(
TTA.slotData
)
);



check(
"SAVE SLOT",
typeof TTA.saveSlots==="function"
);



// SLOT ACTION

check(
"SLOT ACTION",
typeof TTA.selectNewSlot==="function"
);



// PAYMENT

check(
"SLOT PAYMENT",
typeof TTA.confirmPayment==="function"
);



// RENDER

check(
"SLOT RENDER",
typeof TTA.renderSlots==="function"
);





if(ok){

console.log(
"🎮 CUSTOM TTA SLOT SYSTEM READY"
);


}



},1000);
