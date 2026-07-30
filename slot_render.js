// =======================================
// CUSTOM TTA MANAGER
// SLOT RENDER
// FIX 4A
// =======================================

"use strict";


TTA.renderSlots=function(){


    const box =
    document.getElementById(
        "slotList"
    );


    if(!box){

        console.warn(
            "Không tìm thấy slotList"
        );

        return;

    }



    let html="";



    if(!TTA.tables || TTA.tables.length===0){


        html=
        `
        <div class="card">

        Chưa có bàn nào

        </div>
        `;


        box.innerHTML=html;

        return;

    }





    TTA.tables.forEach(table=>{


        html+=`

        <div class="card">


        <h3>
        🪑 ${table.name}
        </h3>


        `;



        table.slots.forEach(slot=>{


            html+=`

            <div class="slot-card">


            Slot ${slot.number}

            <br>


            ${
            slot.team
            ?
            "🔴 "+slot.team
            :
            "🟢 Trống"
            }


            <br>


            <button onclick="
            TTA.selectSlot(
            '${table.id}',
            ${slot.number}
            )
            ">

            Đăng ký

            </button>


            </div>


            `;


        });



        html+=`

        </div>

        `;



    });



    box.innerHTML=html;



};



console.log(
"SLOT RENDER FIX READY"
);
