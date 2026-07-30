// =======================================
// CUSTOM TTA MANAGER
// DASHBOARD.JS
// PART 3B-2
// FULL DASHBOARD + TABLE RENDER
// =======================================

"use strict";



// =======================================
// UPDATE STATISTICS
// =======================================


TTA.updateDashboard=function(){



    let slots =
    TTA.getSlots
    ?
    TTA.getSlots()
    :
    [];



    let totalSlot =
    slots.length;



    let fullSlot =
    slots.filter(
        s=>s.team
    ).length;



    let totalCTV=[];



    slots.forEach(slot=>{


        if(
            slot.ctv &&
            !totalCTV.includes(slot.ctv)
        ){

            totalCTV.push(slot.ctv);

        }


    });




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
        fullSlot
    );



    setValue(
        "totalCTV",
        totalCTV.length
    );



};





// =======================================
// RENDER TABLES
// =======================================


TTA.renderTablesDashboard=function(){



    let box =
    document.getElementById(
        "dashboardTables"
    );



    if(!box)
    return;



    let html="";



    if(
        !TTA.tables ||
        TTA.tables.length===0
    ){

        box.innerHTML=
        "Chưa có bàn";

        return;

    }




    TTA.tables.forEach(table=>{



        html+=`

        <div class="table-box">


        <h3>

        🪑 BÀN ${table.name}

        ${
            table.status==="FULL"
            ?
            " 🔒"
            :
            " 🟢"
        }


        </h3>



        <div class="slot-grid">


        `;




        table.slots.forEach(slot=>{



            let status =
            "🟢 Trống";



            if(slot.team){


                status =
                slot.paid
                ?
                "💸 Đã thanh toán"
                :
                "🚫 Chưa thanh toán";


            }




            html+=`

            <div class="slot-card">


                <div class="slot-number">

                    SLOT ${slot.number}

                </div>



                <div class="slot-team">

                    ${
                        slot.team
                        ?
                        slot.team
                        :
                        "Trống"
                    }

                </div>



                <div class="slot-status">

                    ${status}

                </div>



                <button

                onclick="
                TTA.selectSlot(
                '${table.id}',
                ${slot.number}
                )
                "

                >

                [Chọn]

                </button>



            </div>


            `;



        });




        html+=`

        </div>


        </div>


        `;



    });




    box.innerHTML=html;



};





// =======================================
// SET VALUE
// =======================================


function setValue(
id,
value
){


    let el =
    document.getElementById(id);



    if(el){

        el.textContent=value;

    }


}





// =======================================
// REFRESH GLOBAL
// =======================================


window.refreshDashboard=function(){


    TTA.updateDashboard();


    TTA.renderTablesDashboard();


};





// =======================================
// START
// =======================================


window.addEventListener(
"load",
()=>{


    setTimeout(()=>{


        refreshDashboard();


    },500);


});





console.log(
"DASHBOARD 3B-2 READY"
);
