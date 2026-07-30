// =======================================
// CUSTOM TTA MANAGER
// FINANCE SLOT CONNECT
// PART 3S
// =======================================

"use strict";



// =======================================
// CONFIG
// =======================================


TTA.SLOT_PRICE = 5000;

TTA.CTV_SLOT_SALARY = 500;




// =======================================
// TRANSACTION STORAGE
// =======================================


TTA.FINANCE_KEY =
"CUSTOM_TTA_FINANCE";



TTA.getFinance=function(){


    try{


        let data =
        localStorage.getItem(
            TTA.FINANCE_KEY
        );


        return data
        ?
        JSON.parse(data)
        :
        [];


    }
    catch(e){

        return [];

    }


};





TTA.saveFinance=function(data){


    localStorage.setItem(

        TTA.FINANCE_KEY,

        JSON.stringify(data)

    );


};





// =======================================
// ADD SLOT MONEY
// =======================================


TTA.addSlotFinance=function(slot){



    let finance =
    TTA.getFinance();



    let item={


        id:Date.now(),


        type:"SLOT",


        team:slot.team,


        ctv:slot.ctv,


        amount:TTA.SLOT_PRICE,


        time:new Date()
        .toLocaleString()


    };



    finance.push(item);



    TTA.saveFinance(finance);



    console.log(
        "FINANCE ADD",
        item
    );


};





// =======================================
// ADD CTV SALARY
// =======================================


TTA.addCTVSalary=function(slot){



    if(!slot.ctv)
    return;



    let salaries =
    JSON.parse(

        localStorage.getItem(
            "CUSTOM_TTA_SALARY"
        )
        ||
        "[]"

    );



    salaries.push({


        ctv:slot.ctv,


        amount:TTA.CTV_SLOT_SALARY,


        slot:slot.team,


        time:Date.now()


    });



    localStorage.setItem(

        "CUSTOM_TTA_SALARY",

        JSON.stringify(
            salaries
        )

    );



};





// =======================================
// HOOK SLOT COMPLETE
// =======================================


TTA.processSlotMoney=function(slot){



    if(
        slot.moneyDone
    )
    return;



    TTA.addSlotFinance(slot);


    TTA.addCTVSalary(slot);



    slot.moneyDone=true;



    TTA.saveTables();



};





console.log(
"FINANCE SLOT 3S READY"
);
