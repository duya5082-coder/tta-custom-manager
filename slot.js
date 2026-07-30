// =======================================
// CUSTOM TTA MANAGER
// SLOT.JS
// PHẦN 2F
// SLOT UI SYSTEM
// =======================================



// =======================================
// RENDER SLOT LIST
// =======================================

TTA.renderSlots = function(){



    let box =
    document.getElementById(
        "slotList"
    );



    if(!box){

        return;

    }



    let slots =
    TTA.getSlots();



    if(
        slots.length === 0
    ){

        box.innerHTML =

        `

        <div class="card">

        Chưa có Slot

        </div>

        `;


        return;

    }




    box.innerHTML = "";




    slots.forEach(
        slot => {



            let div =
            document.createElement(
                "div"
            );



            div.className =
            "card";



            div.innerHTML =


            `

            <h3>
            ${slot.title}
            </h3>


            <p>
            📅 ${slot.date}
            </p>


            <p>
            ⏰ ${slot.startTime}
            -
            ${slot.endTime}
            </p>


            <p>
            📊 ${slot.status}
            </p>



            <button onclick="copySlot(${slot.id})">

            Sao chép

            </button>



            <button onclick="copyMessengerSlot(${slot.id})">

            Copy Messenger

            </button>



            <button onclick="deleteSlotUI(${slot.id})">

            Xóa

            </button>


            `;



            box.appendChild(
                div
            );


        }
    );


};





// =======================================
// CREATE SLOT UI
// =======================================

window.createNewSlot = function(){



    let title =
    prompt(
        "Tên Slot"
    );



    let date =
    prompt(
        "Ngày"
    );



    let start =
    prompt(
        "Giờ bắt đầu"
    );



    let end =
    prompt(
        "Giờ kết thúc"
    );



    if(
        !title ||
        !date
    ){

        return;

    }



    TTA.createSlot({

        title:title,

        date:date,

        startTime:start,

        endTime:end

    });



    TTA.renderSlots();



    TTA.updateDashboard();



};





// =======================================
// COPY SLOT
// =======================================

window.copySlot = function(id){



    let newSlot =
    TTA.copySlot(
        id
    );



    if(newSlot){


        alert(
            "Đã sao chép Slot"
        );


        TTA.renderSlots();


        TTA.updateDashboard();


    }



};





// =======================================
// DELETE SLOT
// =======================================

window.deleteSlotUI = function(id){



    if(
        confirm(
            "Xóa Slot này?"
        )
    ){


        TTA.deleteSlot(
            id
        );


        TTA.renderSlots();


        TTA.updateDashboard();


    }


};





// =======================================
// COPY MESSENGER
// =======================================

window.copyMessengerSlot = function(id){



    let slot =
    TTA.findSlot(
        id
    );



    if(!slot){

        return;

    }



    let text =
    TTA.formatSlotMessage(
        slot
    );



    navigator.clipboard
    .writeText(
        text
    )
    .then(
        function(){


            alert(
                "Đã copy nội dung Messenger"
            );


        }
    );


};





// =======================================
// LOAD SLOT PAGE
// =======================================

let oldSlotOpenPage =
window.openPage;



window.openPage = function(page){



    oldSlotOpenPage(page);



    if(
        page === "slot"
    ){

        TTA.renderSlots();

    }


};





// =======================================
// AUTO LOAD
// =======================================

document.addEventListener(
"DOMContentLoaded",
function(){


    TTA.renderSlots();


});




// =======================================
// END PART 2F
// =======================================
// =======================================
// CUSTOM TTA MANAGER
// PHẦN 3A
// AUTO TABLE & SLOT GENERATOR
// =======================================

"use strict";

TTA.tables = TTA.tables || [];

// Tạo bàn
TTA.createTable = function(name){

    const table = {

        id: Date.now(),

        name: name,

        slots: [],

        status: "OPEN"

    };

    for(let i = 1; i <= 12; i++){

        table.slots.push({

            number: i,

            team: "",

            paid: false,

            ctv: "",

            created: Date.now()

        });

    }

    TTA.tables.push(table);

    return table;

};

// Lấy bàn đang mở
TTA.getOpenTable = function(){

    let table = TTA.tables.find(t=>t.status==="OPEN");

    if(table) return table;

    let letter =
    String.fromCharCode(
        65 + TTA.tables.length
    );

    return TTA.createTable(letter);

};

// Thêm team vào slot
TTA.addTeamToSlot = function(teamName){

    let table = TTA.getOpenTable();

    let slot =
    table.slots.find(
        s=>!s.team
    );

    if(!slot){

        table.status="FULL";

        return TTA.addTeamToSlot(teamName);

    }

    slot.team=teamName;

    if(
        table.slots.every(
            s=>s.team!==""
        )
    ){

        table.status="FULL";

    }

    return {

        table:table.name,

        slot:slot.number

    };

};

// Demo
if(TTA.tables.length===0){

    TTA.createTable("A");

}

console.log("AUTO TABLE READY");
