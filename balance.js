// =======================================
// CUSTOM TTA MANAGER
// BALANCE.JS
// NEW SLOT SYSTEM
// =======================================

"use strict";



TTA.renderBalance=function(){


    const box =
    document.getElementById(
        "balanceList"
    );


    if(!box)
    return;



    let html=`

    <h2>
    💰 Danh sách dư / nợ
    </h2>

    `;



    if(
        !Array.isArray(
            TTA.slotData
        )
    ){

        box.innerHTML=
        html+
        "<p>Chưa có dữ liệu.</p>";

        return;

    }



    TTA.slotData.forEach(timeData=>{


        timeData.boards.forEach(board=>{


            board.slots.forEach(slot=>{


                if(
                    slot.team &&
                    !slot.paid
                ){


                    html+=`

                    <div class="card">

                    <b>${slot.team}</b>

                    <br>

                    ⏰ ${timeData.time}

                    <br>

                    📦 Box ${timeData.box}

                    <br>

                    🅰️ Bàn ${board.name}

                    <br>

                    🎮 Slot ${slot.number}

                    <br>

                    🚫 Chưa thanh toán

                    </div>

                    `;


                }


            });


        });


    });



    box.innerHTML=html;


};



console.log(
"BALANCE NEW SYSTEM READY"
);
