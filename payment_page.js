// =======================================
// CUSTOM TTA MANAGER
// PAYMENT PAGE ENGINE
// PART 3N
// =======================================

"use strict";



// =======================================
// RENDER PAYMENT PAGE
// =======================================


TTA.renderPaymentPage=function(){


    const box =
    document.getElementById(
        "paymentList"
    );


    if(!box){

        console.warn(
            "Không tìm thấy paymentList"
        );

        return;

    }



    box.innerHTML="";



    let html=`


    <div class="card">


    <h3>
    💸 Danh sách thanh toán
    </h3>


    <table width="100%">


    <tr>

    <th>
    Bàn
    </th>

    <th>
    Slot
    </th>

    <th>
    Team
    </th>

    <th>
    Trạng thái
    </th>

    <th>
    Action
    </th>

    </tr>


    `;



    let count=0;



    TTA.tables.forEach(table=>{


        table.slots.forEach(slot=>{


            if(slot.team){


                count++;



                html += `


                <tr>


                <td>
                ${table.name}
                </td>


                <td>
                ${slot.number}
                </td>


                <td>
                ${slot.team}
                </td>


                <td>


                ${
                    slot.paid

                    ?

                    "💸 Đã thanh toán"

                    :

                    "🚫 Chưa thanh toán"

                }


                </td>



                <td>



                ${
                    slot.paid

                    ?

                    `
                    <button
                    onclick="
                    TTA.unPaidSlot(
                    '${table.name}',
                    ${slot.number}
                    )
                    "
                    >

                    Hủy

                    </button>
                    `


                    :


                    `
                    <button
                    onclick="
                    TTA.paySlot(
                    '${table.name}',
                    ${slot.number}
                    )
                    "
                    >

                    Thanh toán

                    </button>
                    `


                }



                </td>



                </tr>


                `;


            }


        });


    });




    if(count===0){


        html += `

        <tr>

        <td colspan="5">

        Chưa có team

        </td>

        </tr>

        `;


    }



    html += `

    </table>


    </div>

    `;



    box.innerHTML=html;



};





// =======================================
// THANH TOÁN
// =======================================


TTA.paySlot=function(
tableName,
slotNumber
){


    let table =
    TTA.tables.find(
        t=>t.name===tableName
    );


    if(!table)
    return;



    let slot =
    table.slots.find(
        s=>s.number===slotNumber
    );


    if(!slot)
    return;



    slot.paid=true;


    TTA.saveTables();



    TTA.renderPaymentPage();


    if(
        TTA.updateDashboard
    ){

        TTA.updateDashboard();

    }


};





// =======================================
// HỦY THANH TOÁN
// =======================================


TTA.unPaidSlot=function(
tableName,
slotNumber
){


    let table =
    TTA.tables.find(
        t=>t.name===tableName
    );


    if(!table)
    return;



    let slot =
    table.slots.find(
        s=>s.number===slotNumber
    );


    if(!slot)
    return;



    slot.paid=false;



    TTA.saveTables();



    TTA.renderPaymentPage();



};





// =======================================
// AUTO OPEN PAGE
// =======================================


let oldOpenPagePayment =
window.openPage;



window.openPage=function(page){



    if(oldOpenPagePayment){

        oldOpenPagePayment(page);

    }



    if(page==="payment"){


        setTimeout(()=>{


            TTA.renderPaymentPage();


        },100);


    }


};




console.log(
"PAYMENT PAGE ENGINE 3N READY"
);
