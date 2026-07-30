// =======================================
// CUSTOM TTA MANAGER
// PAYMENT.JS
// PART 3D
// PAYMENT ENGINE
// =======================================

"use strict";



TTA.PAYMENT_STORAGE =
"CUSTOM_TTA_PAYMENTS";




// =======================================
// SAVE PAYMENT HISTORY
// =======================================


TTA.savePayments=function(data){


    localStorage.setItem(

        TTA.PAYMENT_STORAGE,

        JSON.stringify(data)

    );


};





// =======================================
// LOAD PAYMENT HISTORY
// =======================================


TTA.getPayments=function(){


    try{


        let data =
        localStorage.getItem(
            TTA.PAYMENT_STORAGE
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





// =======================================
// PAYMENT SLOT
// =======================================


TTA.paySlot=function(

tableName,

slotNumber

){



    let table =

    TTA.tables.find(

        t=>

        t.name===tableName

    );



    if(!table)
    return;



    let slot =

    table.slots.find(

        s=>

        s.number===slotNumber

    );



    if(!slot || !slot.team)
    return;




    slot.paid=true;



    // lưu lịch sử


    let history =
    TTA.getPayments();



    history.push({


        table:tableName,


        slot:slotNumber,


        team:slot.team,


        amount:5000,


        time:Date.now()


    });



    TTA.savePayments(
        history
    );




    // cộng lương CTV

    if(
        slot.ctv
    ){

        TTA.addSalary(
            slot.ctv,
            slot.team,
            500
        );

    }



    TTA.saveTables();



    if(window.refreshDashboard){

        refreshDashboard();

    }



};





// =======================================
// UNPAY
// =======================================


TTA.unPaySlot=function(

tableName,

slotNumber

){



    let table =

    TTA.tables.find(

        t=>

        t.name===tableName

    );



    if(!table)
    return;



    let slot =

    table.slots.find(

        s=>

        s.number===slotNumber

    );



    if(slot){


        slot.paid=false;


        TTA.saveTables();


    }


};





console.log(
"PAYMENT ENGINE 3D READY"
);
