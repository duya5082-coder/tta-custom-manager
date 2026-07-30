// =======================================
// CUSTOM TTA MANAGER
// SLOT_ACTION.JS
// PART 3C
// SLOT INTERACTION
// =======================================

"use strict";



// =======================================
// CURRENT SELECT SLOT
// =======================================


TTA.selectedSlot = null;




// =======================================
// SELECT SLOT
// =======================================


TTA.selectSlot=function(
tableId,
slotNumber
){



    let table =

    TTA.tables.find(

        t=>

        String(t.id)
        ===
        String(tableId)

    );



    if(!table){

        alert(
            "Không tìm thấy bàn"
        );

        return;

    }




    let slot =

    table.slots.find(

        s=>

        s.number==slotNumber

    );



    if(!slot)
    return;




    TTA.selectedSlot={

        table:table,

        slot:slot

    };



    openSlotForm();



};





// =======================================
// OPEN FORM
// =======================================


function openSlotForm(){


    let html = `


    <div id="slotModal"
    class="slot-modal">


        <div class="slot-modal-box">


        <h3>
        Đăng ký SLOT
        </h3>



        <input
        id="slotTeamName"
        placeholder="Tên team">



        <input
        id="slotCTV"
        placeholder="Tên CTV">



        <button
        onclick="confirmAddSlot()">

        Xác nhận

        </button>



        <button
        onclick="closeSlotForm()">

        Hủy

        </button>


        </div>


    </div>



    `;



    document.body.insertAdjacentHTML(
        "beforeend",
        html
    );


};





// =======================================
// CONFIRM
// =======================================


window.confirmAddSlot=function(){



    let team =

    document.getElementById(
        "slotTeamName"
    ).value;



    let ctv =

    document.getElementById(
        "slotCTV"
    ).value;




    if(!team){

        alert(
            "Nhập tên team"
        );

        return;

    }




    let data =
    TTA.selectedSlot;



    data.slot.team =
    team;



    data.slot.customer =
    team;



    data.slot.ctv =
    ctv;



    data.slot.created =
    Date.now();




    // trừ số dư

    data.slot.balanceUsed =
    5000;




    // cộng lương CTV

    data.slot.salaryAdded =
    false;



    if(

        data.table.slots.every(

            s=>s.team

        )

    ){

        data.table.status="FULL";


        if(
            window.TTA_NOTIFY
        ){

            TTA_NOTIFY(
                "Bàn "
                +
                data.table.name
                +
                " đã đầy"
            );

        }


    }




    TTA.saveTables();
     if(TTA.afterAddSlot){

    TTA.afterAddSlot(data.slot);

}


    closeSlotForm();



    if(window.refreshDashboard){

        refreshDashboard();

    }



};





// =======================================
// CLOSE
// =======================================


window.closeSlotForm=function(){


    let modal =

    document.getElementById(
        "slotModal"
    );



    if(modal){

        modal.remove();

    }



    TTA.selectedSlot=null;


};





console.log(
"SLOT ACTION 3C READY"
);
