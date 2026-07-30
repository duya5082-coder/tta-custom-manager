// =======================================
// CUSTOM TTA MANAGER
// BALANCE.JS
// PART 3J
// DEBT MANAGEMENT
// =======================================

"use strict";


TTA.renderBalance=function(){


    let box =
    document.getElementById(
        "balance"
    );


    if(!box)
    return;



    let html=`

    <h2>
    💰 Danh sách dư / nợ
    </h2>

    `;



    TTA.tables.forEach(table=>{


        table.slots.forEach(slot=>{


            if(slot.team && !slot.paid){


                html+=`

                <div class="card">

                🏷️ ${slot.team}

                <br>

                Bàn ${table.name}
                -
                Slot ${slot.number}


                <br>

                🚫 Chưa thanh toán


                </div>

                `;


            }


        });


    });



    box.innerHTML=html;


};




console.log(
"BALANCE SYSTEM 3J READY"
);
