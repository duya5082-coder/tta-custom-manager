// =======================================
// CUSTOM TTA MANAGER
// PAYMENT MANAGER
// NEW SLOT SYSTEM
// =======================================

"use strict";




// =======================================
// RENDER PAYMENT
// =======================================


TTA.renderPaymentPage=function(){



    let box =
    document.getElementById(
        "paymentList"
    );



    if(!box)
    return;



    let html="";



    if(!Array.isArray(TTA.slotData)){


        box.innerHTML =
        "Chưa có dữ liệu";


        return;


    }





    TTA.slotData.forEach(data=>{


        data.boards.forEach(board=>{


            board.slots.forEach(slot=>{


                if(!slot.team)
                return;



                html += `


                <div class="card">


                🎮 ${slot.team}


                <br>


                CTV:
                ${slot.ctv || "-"}


                <br>


                Trạng thái:

                ${
                slot.paid
                ?
                "💸 Đã thanh toán"
                :
                "🚫 Chưa thanh toán"
                }



                ${
                !slot.paid

                ?

                `

                <br>

                <button onclick="
                TTA.confirmPayment(
                '${data.time}',
                ${data.box},
                '${board.name}',
                ${slot.number}
                )
                ">

                💸 Thu tiền

                </button>

                `

                :

                ""

                }



                </div>


                `;



            });



        });



    });




    box.innerHTML=html;



};





console.log(
"PAYMENT MANAGER NEW READY"
);
