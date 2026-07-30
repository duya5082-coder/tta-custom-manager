// =======================================
// CUSTOM TTA MANAGER
// SLOT RENDER
// PART 3B NEW SYSTEM UPDATE
// =======================================

"use strict";



// =======================================
// CURRENT VIEW
// =======================================

TTA.currentSlotView = {

    time:"10H00",

    box:1

};




// =======================================
// RENDER SLOT PAGE
// =======================================


TTA.renderSlots=function(){


    let area =
    document.getElementById(
        "slotList"
    );


    if(!area)
    return;



    let html="";



    // =============================
    // KHUNG GIỜ
    // =============================


    html += `

    <div class="card">

    <h3>
    ⏰ KHUNG GIỜ
    </h3>


    `;



    TTA.SLOT_TIMES.forEach(time=>{


        html += `

        <button onclick="
        TTA.changeSlotTime('${time}')
        ">

        ${time}

        </button>

        `;


    });



    html += `

    </div>

    `;




    // =============================
    // BOX
    // =============================


    html += `

    <div class="card">

    <h3>
    📦 BOX
    </h3>

    `;



    TTA.BOX_LIST.forEach(box=>{


        html += `


        <button onclick="
        TTA.changeSlotBox(${box})
        ">

        ${box}

        </button>


        `;


    });



    html += `

    </div>

    `;





    let data =

    TTA.getBox(

        TTA.currentSlotView.time,

        TTA.currentSlotView.box

    );



    if(!data){

        area.innerHTML =
        "Không có dữ liệu";

        return;

    }






    // =============================
    // HEADER
    // =============================



    html += `


    <div class="card">


    <h2>

    ⏰ ${data.time}

    </h2>


    <h3>

    📦 BOX ${data.box}

    </h3>


    <h3>

    💸 5K

    </h3>


    </div>


    `;






    // =============================
    // BOARD
    // =============================


    data.boards.forEach(board=>{


        html += `


        <div class="card">


        <h2>

        🅰️ BẢNG ${board.name}

        </h2>


        `;



        board.slots.forEach(slot=>{


            let num =
            String(slot.number)
            .padStart(2,"0");



            html += `


            <div class="slot-item"

            onclick="
            TTA.selectNewSlot(
            '${data.time}',
            ${data.box},
            '${board.name}',
            ${slot.number}
            )
            ">


            ${num}️⃣



            ${
            slot.team
            ?
            slot.team
            :
            "Trống"
            }



            <br>


            ${
            slot.paid
            ?
            "💸 5K"
            :
            "🚫"
            }


            </div>


            `;


        });



        html += `

        </div>

        `;



    });





    area.innerHTML=html;



};







// =======================================
// CHANGE TIME
// =======================================


TTA.changeSlotTime=function(time){


    TTA.currentSlotView.time=time;


    TTA.renderSlots();


};






// =======================================
// CHANGE BOX
// =======================================


TTA.changeSlotBox=function(box){


    TTA.currentSlotView.box=box;


    TTA.renderSlots();


};





console.log(
"SLOT RENDER 3B NEW READY"
);
