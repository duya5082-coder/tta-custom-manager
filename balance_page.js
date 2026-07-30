// =======================================
// CUSTOM TTA MANAGER
// BALANCE PAGE ENGINE
// PART 3O
// =======================================

"use strict";



// =======================================
// CONFIG
// =======================================

TTA.SLOT_PRICE = 
TTA.SLOT_PRICE || 5000;



// =======================================
// RENDER BALANCE
// =======================================

TTA.renderBalancePage=function(){


    const box =
    document.getElementById(
        "balanceList"
    );


    if(!box){

        console.warn(
            "Không tìm thấy balanceList"
        );

        return;

    }



    box.innerHTML="";



    let debtList=[];



    TTA.tables.forEach(table=>{


        table.slots.forEach(slot=>{


            if(
                slot.team &&
                !slot.paid
            ){


                debtList.push({

                    table:
                    table.name,


                    slot:
                    slot.number,


                    team:
                    slot.team,


                    ctv:
                    slot.ctv || "Không có",


                    money:
                    TTA.SLOT_PRICE


                });


            }


        });


    });





    let html=`


    <div class="card">


    <h2>
    💰 Danh sách dư
    </h2>


    <table width="100%">


    <tr>

    <th>Bàn</th>

    <th>Slot</th>

    <th>Team</th>

    <th>CTV</th>

    <th>Số tiền</th>

    </tr>


    `;



    let total=0;



    debtList.forEach(item=>{


        total += item.money;



        html += `


        <tr>


        <td>
        ${item.table}
        </td>


        <td>
        ${item.slot}
        </td>


        <td>
        ${item.team}
        </td>


        <td>
        ${item.ctv}
        </td>


        <td>

        ${item.money.toLocaleString()}đ

        </td>


        </tr>


        `;


    });





    if(
        debtList.length===0
    ){


        html += `


        <tr>

        <td colspan="5">

        Không có khoản dư

        </td>

        </tr>


        `;


    }




    html += `


    </table>


    <hr>


    <h3>

    Tổng còn thiếu:
    ${total.toLocaleString()}đ

    </h3>


    </div>


    `;



    box.innerHTML=html;



};





// =======================================
// AUTO OPEN PAGE
// =======================================


let oldOpenPageBalance =
window.openPage;



window.openPage=function(page){



    if(oldOpenPageBalance){

        oldOpenPageBalance(page);

    }



    if(page==="balance"){


        setTimeout(()=>{


            TTA.renderBalancePage();


        },100);


    }


};





console.log(
"BALANCE PAGE ENGINE 3O READY"
);
