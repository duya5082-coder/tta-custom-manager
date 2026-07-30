// =======================================
// CUSTOM TTA MANAGER
// DASHBOARD.JS
// NEW SLOT SYSTEM
// =======================================

"use strict";



// =======================================
// COUNT SLOT
// =======================================


TTA.getTotalSlot=function(){


    let total=0;


    if(!Array.isArray(TTA.slotData))
    return 0;



    TTA.slotData.forEach(box=>{


        box.boards.forEach(board=>{


            total += board.slots.length;


        });


    });



    return total;


};





// =======================================
// COUNT FULL
// =======================================


TTA.getFullSlot=function(){


    let total=0;


    if(!Array.isArray(TTA.slotData))
    return 0;



    TTA.slotData.forEach(box=>{


        box.boards.forEach(board=>{


            if(
                board.slots.every(
                    s=>s.team
                )
            ){

                total++;

            }


        });


    });



    return total;


};





// =======================================
// COUNT TEAM
// =======================================


TTA.getTeamCount=function(){


    let total=0;


    if(!Array.isArray(TTA.slotData))
    return 0;



    TTA.slotData.forEach(box=>{


        box.boards.forEach(board=>{


            board.slots.forEach(slot=>{


                if(slot.team){

                    total++;

                }


            });


        });


    });



    return total;


};





// =======================================
// COUNT CTV
// =======================================


TTA.getCTVCount=function(){



    if(!Array.isArray(TTA.accounts))
    return 0;



    return TTA.accounts.filter(

        u=>u.role==="CTV"

    ).length;



};





// =======================================
// UPDATE DASHBOARD
// =======================================


TTA.updateDashboard=function(){



    let totalSlot =
    document.getElementById(
        "totalSlot"
    );


    let fullSlot =
    document.getElementById(
        "fullSlot"
    );


    let player =
    document.getElementById(
        "totalPlayer"
    );


    let ctv =
    document.getElementById(
        "totalCTV"
    );



    if(totalSlot)

    totalSlot.innerHTML =
    TTA.getTotalSlot();




    if(fullSlot)

    fullSlot.innerHTML =
    TTA.getFullSlot();




    if(player)

    player.innerHTML =
    TTA.getTeamCount();




    if(ctv)

    ctv.innerHTML =
    TTA.getCTVCount();



    if(
        TTA.renderDashboardSlots
    ){

        TTA.renderDashboardSlots();

    }



};





window.refreshDashboard=function(){

    TTA.updateDashboard();

};



setTimeout(function(){


    TTA.updateDashboard();


},1000);



console.log(
"DASHBOARD NEW SYSTEM READY"
);
