// =======================================
// CUSTOM TTA MANAGER
// DASHBOARD.JS
// PART 3A-3
// DASHBOARD ENGINE
// =======================================

"use strict";


// =======================================
// UPDATE STATISTICS
// =======================================


TTA.updateDashboard = function(){



    // ===== SLOT DATA =====


    let slots =
    TTA.getSlots
    ?
    TTA.getSlots()
    :
    [];



    // Nếu dùng hệ thống bàn mới

    if(
        slots.length===0 &&
        TTA.tables
    ){

        TTA.tables.forEach(table=>{

            table.slots.forEach(slot=>{

                slots.push(slot);

            });

        });

    }



    let totalSlot =
    slots.length;



    let fullSlot =
    slots.filter(
        s=>s.team
    ).length;



    let openSlot =
    totalSlot-fullSlot;



    // ===== PLAYER =====


    let totalPlayer =
    fullSlot;



    // ===== CTV =====


    let ctv=[];


    slots.forEach(s=>{

        if(
            s.ctv &&
            !ctv.includes(s.ctv)
        ){

            ctv.push(s.ctv);

        }

    });



    // ===== UPDATE UI =====


    setValue(
        "totalSlot",
        totalSlot
    );


    setValue(
        "fullSlot",
        fullSlot
    );


    setValue(
        "totalPlayer",
        totalPlayer
    );


    setValue(
        "totalCTV",
        ctv.length
    );



};




// =======================================
// RENDER TABLES
// =======================================


TTA.renderTablesDashboard=function(){



    const box =
    document.getElementById(
        "dashboardTables"
    );



    if(!box) return;



    if(
        !TTA.tables ||
        TTA.tables.length===0
    ){

        box.innerHTML=
        "Chưa có bàn";

        return;

    }




    let html="";



    TTA.tables.forEach(table=>{


        html += `

        <div class="tta-table">


        <h3>

        BÀN ${table.name}

        ${
            table.status==="FULL"
            ?
            "🔒"
            :
            "🟢"
        }

        </h3>


        <div class="slot-list">

        `;




        table.slots.forEach(slot=>{


            let icon="⭕";


            if(slot.team){

                icon =
                slot.paid
                ?
                "💸"
                :
                "🚫";

            }



            html += `


            <div class="slot-item">


            <b>
            Slot ${slot.number}
            </b>


            <br>


            ${
                slot.team
                ||
                "Trống"
            }


            <br>


            ${icon}


            </div>


            `;


        });




        html += `

        </div>

        </div>

        `;


    });



    box.innerHTML=html;



};




// =======================================
// SET VALUE
// =======================================


function setValue(id,value){


    const el =
    document.getElementById(id);



    if(el){

        el.textContent=value;

    }


}




// =======================================
// REFRESH BUTTON
// =======================================


window.refreshDashboard=function(){


    TTA.updateDashboard();

    TTA.renderTablesDashboard();


};




// =======================================
// AUTO START
// =======================================


document.addEventListener(

"DOMContentLoaded",

function(){


    TTA.updateDashboard();


    TTA.renderTablesDashboard();


});




// =======================================
// AUTO SYNC DISPLAY
// =======================================


setInterval(()=>{


    TTA.updateDashboard();


    TTA.renderTablesDashboard();


},3000);



console.log(
"DASHBOARD ENGINE READY"
);
