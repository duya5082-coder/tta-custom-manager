// =======================================
// CUSTOM TTA MANAGER
// SLOT ACTION
// PART 3C NEW SYSTEM
// =======================================

"use strict";



// =======================================
// SELECT SLOT
// =======================================


TTA.selectedSlot = null;



TTA.selectNewSlot=function(
time,
box,
board,
slotNumber
){



    let data =

    TTA.getBox(
        time,
        box
    );



    if(!data)
    return;



    let table =

    data.boards.find(

        b=>b.name===board

    );



    if(!table)
    return;



    let slot =

    table.slots.find(

        s=>s.number==slotNumber

    );



    if(!slot)
    return;



    TTA.selectedSlot={


        boxData:data,

        board:table,

        slot:slot


    };



    TTA.openSlotRegister();



};





// =======================================
// OPEN FORM
// =======================================


TTA.openSlotRegister=function(){



    let old =
    document.getElementById(
        "slotModal"
    );


    if(old)
    old.remove();




    let modal=`


    <div id="slotModal"
    class="slot-modal">


    <div class="slot-modal-box">


    <h3>
    📝 Đăng ký SLOT
    </h3>



    <input
    id="newTeamName"
    placeholder="Tên team">



    <input
    id="newCTVName"
    placeholder="Tên CTV">



    <label>

    <input
    id="newPaid"
    type="checkbox">

    💸 Đã thanh toán 5K

    </label>



    <br><br>



    <button onclick="
    TTA.confirmNewSlot()
    ">

    Xác nhận

    </button>



    <button onclick="
    TTA.closeNewSlot()
    ">

    Hủy

    </button>



    </div>


    </div>


    `;



    document.body.insertAdjacentHTML(

        "beforeend",

        modal

    );



};





// =======================================
// SAVE SLOT
// =======================================


TTA.confirmNewSlot=function(){



    let team =

    document.getElementById(
        "newTeamName"
    ).value;



    let ctv =

    document.getElementById(
        "newCTVName"
    ).value;



    let paid =

    document.getElementById(
        "newPaid"
    ).checked;




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



    data.slot.paid =
    paid;



    data.slot.created =
    Date.now();





    TTA.checkBoardFull(

        data.boxData

    );




    TTA.saveSlots();



    TTA.closeNewSlot();



    TTA.renderSlots();



};





// =======================================
// CHECK FULL BOARD
// =======================================


TTA.checkBoardFull=function(boxData){



    let last =

    boxData.boards[
        boxData.boards.length-1
    ];



    let full =

    last.slots.every(

        s=>s.team

    );



    if(!full)
    return;





    let next =

    String.fromCharCode(

        last.name.charCodeAt(0)+1

    );



    if(next <= "E"){



        boxData.boards.push(


            TTA.createBoard(
                next
            )


        );



        console.log(

        "Tạo bảng",

        next

        );


    }



};





// =======================================
// CLOSE
// =======================================


TTA.closeNewSlot=function(){



    let box =

    document.getElementById(
        "slotModal"
    );



    if(box)

    box.remove();



    TTA.selectedSlot=null;



};





console.log(
"SLOT ACTION 3C NEW READY"
);
