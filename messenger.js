// =======================================
// CUSTOM TTA MANAGER
// MESSENGER.JS
// PHẦN 2I
// MESSENGER COPY SYSTEM
// =======================================




// =======================================
// SELECTED SLOT
// =======================================

TTA.selectedSlots =
TTA.selectedSlots || [];




// =======================================
// TOGGLE SLOT SELECT
// =======================================

window.toggleMessengerSlot = function(id){



    let index =
    TTA.selectedSlots.indexOf(id);



    if(index === -1){


        TTA.selectedSlots.push(id);


    }else{


        TTA.selectedSlots.splice(
            index,
            1
        );


    }



    TTA.renderSlots();


};






// =======================================
// GET SELECTED SLOTS
// =======================================

TTA.getSelectedMessengerSlots = function(){



    return TTA.getSlots()
    .filter(
        slot =>
        TTA.selectedSlots.includes(
            slot.id
        )
    );


};







// =======================================
// FORMAT MULTI SLOT MESSAGE
// =======================================

TTA.formatMultiSlotMessage = function(){



    let slots =
    TTA.getSelectedMessengerSlots();



    if(
        slots.length === 0
    ){


        return "Chưa chọn Slot";


    }



    let text =
    "📢 LỊCH SLOT CUSTOM TTA\n\n";




    slots.forEach(
        (slot,index)=>{


            text +=

            `

${index + 1}. 📌 ${slot.title}

📅 Ngày: ${slot.date}

⏰ ${slot.startTime} - ${slot.endTime}

📊 ${slot.status}


`;



        }
    );



    return text.trim();



};







// =======================================
// COPY MULTI SLOT
// =======================================

window.copyAllMessengerSlot = function(){



    let text =
    TTA.formatMultiSlotMessage();



    navigator.clipboard
    .writeText(
        text
    )
    .then(
        function(){


            alert(
                "Đã copy lịch Slot Messenger"
            );


        }
    );


};








// =======================================
// COPY SINGLE SLOT
// =======================================

window.copySingleMessengerSlot = function(id){



    let slot =
    TTA.findSlot(id);



    if(!slot){

        return;

    }



    navigator.clipboard
    .writeText(
        TTA.formatSlotMessage(
            slot
        )
    )
    .then(
        function(){

            alert(
                "Đã copy Slot"
            );

        }
    );


};








// =======================================
// RENDER MESSENGER TOOL
// =======================================

TTA.renderMessengerTool = function(){



    let box =
    document.getElementById(
        "messengerTool"
    );



    if(!box){

        return;

    }



    box.innerHTML =


    `

    <button onclick="copyAllMessengerSlot()">

    📋 Copy tất cả Slot đã chọn

    </button>


    `;



};







// =======================================
// ADD CHECKBOX SLOT
// =======================================

TTA.renderSlotMessengerCheck = function(){



    let slots =
    document.querySelectorAll(
        "#slotList .card"
    );



    slots.forEach(
        (card,index)=>{


            let slot =
            TTA.getSlots()[index];



            if(!slot){

                return;

            }



            let check =
            document.createElement(
                "input"
            );



            check.type =
            "checkbox";



            check.onclick =
            function(){


                toggleMessengerSlot(
                    slot.id
                );


            };



            card.prepend(
                check
            );



        }
    );


};







// =======================================
// PAGE HOOK
// =======================================


let oldMessengerOpenPage =
window.openPage;



window.openPage = function(page){



    oldMessengerOpenPage(page);



    if(
        page === "slot"
    ){


        setTimeout(
            function(){


                TTA.renderSlotMessengerCheck();


            },
            300
        );


    }



};







// =======================================
// AUTO LOAD
// =======================================

document.addEventListener(
"DOMContentLoaded",
function(){


    TTA.renderMessengerTool();


});





// =======================================
// END PART 2I
// =======================================
