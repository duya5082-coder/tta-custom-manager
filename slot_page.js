// =======================================
// CUSTOM TTA MANAGER
// SLOT PAGE ENGINE
// PART 3M
// =======================================

"use strict";



// =======================================
// RENDER SLOT PAGE
// =======================================

TTA.renderSlotPage = function(){


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



    box.innerHTML="";



    if(
        !TTA.tables ||
        TTA.tables.length===0
    ){

        box.innerHTML =
        `
        <div class="card">

        Chưa có bàn

        </div>
        `;

        return;

    }




    TTA.tables.forEach(table=>{



        let html = `


        <div class="card">


        <h2>
        🪑 BÀN ${table.name}
        ${
            table.status==="FULL"
            ?
            " 🔒"
            :
            " 🟢"
        }
        </h2>



        <div class="slot-grid">


        `;



        table.slots.forEach(slot=>{


            let status =
            "🟢 Trống";


            let team =
            "Chưa có team";



            if(slot.team){


                team =
                slot.team;


                status =
                slot.paid
                ?
                "💸 Đã thanh toán"
                :
                "🚫 Chưa thanh toán";


            }





            html += `


            <div class="slot-card">


            <h3>

            SLOT ${slot.number}

            </h3>



            <p>

            ${team}

            </p>



            <p>

            ${status}

            </p>



            <button
            onclick="
            TTA.selectSlot(
            '${table.id}',
            ${slot.number}
            )
            "
            >

            Chọn

            </button>


            ${
                slot.team
                ?

                `
                <button
                onclick="
                TTA.removeTeamFromSlot(
                '${table.name}',
                ${slot.number}
                );
                TTA.renderSlotPage();
                "
                >

                Xóa

                </button>
                `

                :

                ""

            }



            </div>


            `;


        });



        html += `

        </div>


        </div>

        `;



        box.innerHTML += html;



    });



};





// =======================================
// CREATE TABLE BUTTON
// =======================================


TTA.createNewTable=function(){


    let index =
    TTA.tables.length;


    let name =
    String.fromCharCode(
        65 + index
    );


    TTA.createTable(name);


    TTA.renderSlotPage();


};





// =======================================
// AUTO REFRESH WHEN OPEN PAGE
// =======================================


let oldOpenPage =
window.openPage;



window.openPage=function(page){


    if(oldOpenPage){

        oldOpenPage(page);

    }



    if(page==="slot"){


        setTimeout(()=>{


            TTA.renderSlotPage();


        },100);


    }


};




console.log(
"SLOT PAGE ENGINE 3M READY"
);
