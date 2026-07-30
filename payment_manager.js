// =======================================
// CUSTOM TTA MANAGER
// PAYMENT MANAGER
// PART 3T
// =======================================

"use strict";



// =======================================
// PAYMENT UPDATE
// =======================================


TTA.markPaid=function(
tableId,
slotNumber
){


    let table =
    TTA.tables.find(
        t=>String(t.id)===String(tableId)
    );



    if(!table)
    return;



    let slot =
    table.slots.find(
        s=>s.number==slotNumber
    );



    if(!slot)
    return;



    slot.paid=true;



    slot.paidTime =
    Date.now();



    TTA.saveTables();



    if(TTA.renderPaymentPage){

        TTA.renderPaymentPage();

    }



    if(TTA.updateDashboard){

        TTA.updateDashboard();

    }



};





// =======================================
// PAYMENT LIST
// =======================================


TTA.renderPaymentPage=function(){



    let box =
    document.getElementById(
        "payment"
    );



    if(!box)
    return;



    let html=`


    <h2>
    💸 Quản lý thanh toán
    </h2>


    <div class="card">


    `;



    let count=0;



    TTA.tables.forEach(table=>{


        table.slots.forEach(slot=>{


            if(slot.team){


                count++;


                let status =
                slot.paid
                ?
                "💸 Đã thanh toán"
                :
                "🚫 Chưa thanh toán";



                html += `


                <div class="card">


                🪑 Bàn ${table.name}

                -

                Slot ${slot.number}


                <br>


                👥 ${slot.team}


                <br>


                ${status}



                ${
                    slot.paid
                    ?
                    ""
                    :
                    `

                    <button onclick="
                    TTA.markPaid(
                    '${table.id}',
                    ${slot.number}
                    )
                    ">

                    Thanh toán

                    </button>

                    `
                }


                </div>


                `;


            }


        });


    });



    if(count===0){

        html +=
        "Chưa có slot";


    }



    html += `

    </div>

    `;



    box.innerHTML=html;



};





// =======================================
// OPEN PAGE HOOK
// =======================================


let oldPaymentOpen =
window.openPage;



window.openPage=function(page){



    if(oldPaymentOpen){

        oldPaymentOpen(page);

    }



    if(page==="payment"){


        setTimeout(()=>{


            TTA.renderPaymentPage();


        },100);


    }



};





console.log(
"PAYMENT MANAGER 3T READY"
);
