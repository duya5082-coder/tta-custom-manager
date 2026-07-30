// =======================================
// CUSTOM TTA MANAGER
// SYSTEM CONNECTOR
// PART 3V
// =======================================

"use strict";




// =======================================
// PROCESS SLOT AFTER REGISTER
// =======================================


TTA.afterAddSlot=function(slot){



    if(!slot)
    return;



    // ======================
    // FINANCE
    // ======================


    if(
        TTA.addSlotFinance &&
        !slot.moneyDone
    ){

        TTA.addSlotFinance(slot);

    }




    // ======================
    // SALARY
    // ======================


    if(
        TTA.addSalarySlot &&
        !slot.salaryAdded
    ){

        TTA.addSalarySlot(slot);

    }





    // ======================
    // SAVE
    // ======================


    if(
        TTA.saveTables
    ){

        TTA.saveTables();

    }




    // ======================
    // REFRESH
    // ======================


    if(
        TTA.updateDashboard
    ){

        TTA.updateDashboard();

    }


    if(
        TTA.renderTablesDashboard
    ){

        TTA.renderTablesDashboard();

    }



    console.log(
        "AUTO CONNECT SLOT COMPLETE",
        slot.team
    );

};





console.log(
"SYSTEM CONNECTOR 3V READY"
);
