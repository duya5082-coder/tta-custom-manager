// =======================================
// CUSTOM TTA MANAGER
// SLOT RENDER
// PART 3B NEW SYSTEM
// BOX + TIME + BOARD
// =======================================

"use strict";



// =======================================
// CURRENT SELECT
// =======================================


TTA.currentSlotView = {

    time:"10H00",

    box:1

};




// =======================================
// OPEN SLOT PAGE
// =======================================


TTA.renderSlots=function(){



    let box =
    document.getElementById(
        "slotList"
    );



    if(!box)
    return;



    let html = "";



    // =========================
    // TIME SELECT
    // =========================


    html += `


    <div class="card">


    <h3>
    ⏰ KHUNG GIỜ
    </h3>



    <div class="slot-filter">

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


    </div>


    `;



    // =========================
    // BOX SELECT
    // =========================


    html += `


    <div class="card">


    <h3>
    📦 BOX
    </h3>


    `;



    TTA.BOX_LIST.forEach(boxNumber=>{


        html += `


        <button onclick="
        TTA.changeSlotBox(${boxNumber})
        ">

        ${boxNumber}

        </button>


        `;


    });



    html += `

    </div>

    `;



    // =========================
    // LOAD DATA
    // =========================


    let data =

    TTA.getBox(

        TTA.currentSlotView.time,

        TTA.currentSlotView.box

    );



    if(!data)
    return;



    html += `


    <div class="card">


    <h2>

    ⏰ ${data.time}

    </h2>



    <h3>

    📦 BOX ${data.box}

    </h3>



    <h3>

    💸 ${TTA.SLOT_PRICE/1000}K

    </h3>


    `;



    data.boards.forEach(board=>{



        html += `


        <div class="card">


        <h2>

        🅱️ BẢNG ${board.name}

        </h2>


        <div>


        `;



        board.slots.forEach(slot=>{


            let number =
            String(slot.number)
            .padStart(2,"0");



            html += `


            <div class="slot-item">


            ${number}️⃣


            ${

            slot.team

            ?

            slot.team

            :

            ""

            }


            ${

            slot.paid

            ?

            "💸"

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


    });



    html += `

    </div>

    `;



    box.innerHTML = html;



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
"SLOT RENDER 3B READY"
);
