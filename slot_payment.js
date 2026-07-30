// =======================================
// CUSTOM TTA MANAGER
// SLOT PAYMENT SYSTEM
// PART 3D
// =======================================

"use strict";



// =======================================
// PAYMENT SLOT
// =======================================


TTA.paySlot=function(
time,
box,
board,
slotNumber
){



    let data =
    TTA.getBox(
        time,
        box
    );



    if(!data)
    return;



    let table =
    data.boards.find(
        b=>b.name===board
    );



    if(!table)
    return;



    let slot =
    table.slots.find(
        s=>s.number==slotNumber
    );



    if(!slot)
    return;



    if(!slot.team){


        alert(
        "Slot chưa có team"
        );


        return;

    }



    slot.paid=true;



    slot.paymentTime =
    Date.now();



    // ==========================
    // TRỪ TIỀN
    // ==========================


    slot.moneyUsed =
    TTA.SLOT_PRICE;



    // ==========================
    // CỘNG LƯƠNG CTV
    // ==========================


    slot.salaryAdded=true;



    slot.salary =
    500;



    if(
        TTA.addCTVSalary
    ){

        TTA.addCTVSalary(
            slot.ctv,
            500
        );

    }





    TTA.saveSlots();



    if(TTA.renderSlots){

        TTA.renderSlots();

    }



};





// =======================================
// UNPAY
// =======================================


TTA.unPaySlot=function(
time,
box,
board,
slotNumber
){



    let data =
    TTA.getBox(
        time,
        box
    );



    let table =
    data.boards.find(
        b=>b.name===board
    );



    let slot =
    table.slots.find(
        s=>s.number==slotNumber
    );



    slot.paid=false;



    TTA.saveSlots();



    TTA.renderSlots();



};





// =======================================
// COUNT PAYMENT
// =======================================


TTA.getPaymentTotal=function(){



    let total=0;



    TTA.slotData.forEach(box=>{


        box.boards.forEach(board=>{


            board.slots.forEach(slot=>{


                if(slot.paid){


                    total +=
                    TTA.SLOT_PRICE;


                }


            });



        });



    });



    return total;


};





console.log(
"SLOT PAYMENT 3D READY"
);
