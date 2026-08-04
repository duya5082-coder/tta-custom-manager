// =======================================
// CUSTOM TTA MANAGER
// SLOT_RENDER.JS
// PART 4A-3.1
// SLOT UI ENGINE (REWRITE)
// =======================================

"use strict";

// =======================================
// DEFAULT DATA
// =======================================

window.TTA = window.TTA || {};

TTA.TIME_LIST = [
    "10H00",
    "13H00",
    "15H00",
    "18H00",
    "20H00",
    "22H00",
    "23H50"
];

TTA.BOX_LIST = [
    1,2,3,4,5,
    6,7,8,9,10
];

TTA.BOARD_LIST = [
    "A",
    "B",
    "C",
    "D",
    "E"
];

// =======================================
// SLOT PAGE
// =======================================

TTA.renderSlots = function(){

    const root =
    document.getElementById("slotList");

    if(!root){
        return;
    }

    let html = "";

    TTA.TIME_LIST.forEach(function(time){

        html += `

        <div class="slot-time-card">

            <div class="slot-time-header">

                <div class="slot-time-title">

                    ⏰ ${time}

                </div>

                <div class="slot-time-count">

                    ${TTA.BOX_LIST.length} BOX

                </div>

            </div>

            <div class="slot-box-list">

        `;

        TTA.BOX_LIST.forEach(function(box){

            html += `

            <button
                class="slot-box-btn"
                onclick="TTA.selectBox('${time}',${box})">

                BOX ${box}

            </button>

            `;

        });

        html += `

            </div>

            <div
                class="slot-board-area"
                id="board_${time.replace(/[^0-9]/g,"")}">

                <div class="slot-empty">

                    Chọn BOX để xem danh sách Slot

                </div>

            </div>

        </div>

        `;

    });

    root.innerHTML = html;

};

// =======================================
// BOARD ROOT
// =======================================

TTA.selectBox = function(time,box){

    const boardId =
    "board_" +
    time.replace(/[^0-9]/g,"");

    const root =
    document.getElementById(boardId);

    if(!root){
        return;
    }

    root.innerHTML = `

    <div class="slot-loading">

        Đang tải dữ liệu...

    </div>

    `;

    setTimeout(function(){

        if(typeof TTA.renderBoards==="function"){

            TTA.renderBoards(
                time,
                box
            );

        }

    },50);

};

// =======================================
// AUTO START
// =======================================

document.addEventListener(
    "DOMContentLoaded",
    function(){

        setTimeout(function(){

            TTA.renderSlots();

        },200);

    }
);

console.log(
    "PART 4A-3.1 READY"
);
// =======================================
// CUSTOM TTA MANAGER
// SLOT_RENDER.JS
// PART 4A-3.2
// BOARD RENDER ENGINE
// =======================================

"use strict";

// =======================================
// LẤY DỮ LIỆU BẢNG
// =======================================

TTA.getBoardData = function(time, box, boardName){

    if(!Array.isArray(TTA.slotData)){
        return null;
    }

    const timeData = TTA.slotData.find(
        item => item.time === time
    );

    if(!timeData){
        return null;
    }

    const boxData = timeData.boxes.find(
        item => item.box == box
    );

    if(!boxData){
        return null;
    }

    return boxData.boards.find(
        item => item.name === boardName
    ) || null;

};

// =======================================
// RENDER TOÀN BỘ BOARD
// =======================================

TTA.renderBoards = function(time,box){

    const boardId =
    "board_" +
    time.replace(/[^0-9]/g,"");

    const root =
    document.getElementById(boardId);

    if(!root){
        return;
    }

    let html = "";

    TTA.BOARD_LIST.forEach(function(boardName){

        const board =
        TTA.getBoardData(
            time,
            box,
            boardName
        );

        // Chỉ hiển thị bảng đã tồn tại
        // Riêng bảng A luôn hiển thị

        if(
            boardName !== "A" &&
            !board
        ){
            return;
        }

        html += `

        <div class="slot-board">

            <div class="board-header">

                <div>

                    ⏰ ${time}

                    &nbsp;&nbsp;

                    BOX ${box}

                    &nbsp;&nbsp;

                    BẢNG ${boardName}

                </div>

                <button
                    class="copy-board-btn"
                    onclick="TTA.copyMessenger('${time}',${box},'${boardName}')">

                    📋 Copy

                </button>

            </div>

            <div class="board-prize">

                👑 5K - 25K / 10K / 5K

            </div>

            <div class="slot-list">

                ${TTA.renderBoardSlots(
                    time,
                    box,
                    boardName
                )}

            </div>

        </div>

        `;

    });

    root.innerHTML = html;

};

// =======================================
// RENDER SLOT
// =======================================

TTA.renderBoardSlots = function(
time,
box,
boardName
){

    const board =
    TTA.getBoardData(
        time,
        box,
        boardName
    );

    let html = "";

    // Nếu chưa có bảng

    if(!board){

        for(let i=1;i<=12;i++){

            html += `

            <div class="slot-item empty">

                <span class="slot-number">

                    ${String(i).padStart(2,"0")}

                </span>

                <span class="slot-team">

                    Trống

                </span>

            </div>

            `;

        }

        return html;

    }

    board.slots.forEach(function(slot){

        const pay =
        slot.paid
        ? "💸"
        : "🚫";

        const team =
        slot.team && slot.team.trim()
        ? slot.team
        : "Trống";

        html += `

        <div
            class="slot-item"
            onclick="TTA.openSlotPopup(
                '${time}',
                ${box},
                '${boardName}',
                ${slot.number}
            )">

            <div class="slot-left">

                <span class="slot-number">

                    ${String(slot.number).padStart(2,"0")}

                </span>

                <span class="slot-team">

                    ${team}

                </span>

            </div>

            <div class="slot-right">

                <span class="slot-box">

                    BOX ${slot.box || box}

                </span>

                <span class="slot-pay">

                    ${pay}

                </span>

            </div>

        </div>

        `;

    });

    return html;

};

console.log(
    "PART 4A-3.2 READY"
);
// =======================================
// CUSTOM TTA MANAGER
// SLOT_RENDER.JS
// PART 4A-3.3
// SLOT POPUP & QUICK ACTION
// =======================================

"use strict";

// =======================================
// CURRENT SLOT
// =======================================

TTA.currentSlot = null;

// =======================================
// OPEN POPUP
// =======================================

TTA.openSlotPopup = function(
    time,
    box,
    boardName,
    slotNumber
){

    const board =
    TTA.getBoardData(
        time,
        box,
        boardName
    );

    if(!board){
        return;
    }

    const slot =
    board.slots.find(
        item => item.number == slotNumber
    );

    if(!slot){
        return;
    }

    TTA.currentSlot = {
        time,
        box,
        boardName,
        slotNumber,
        slot
    };

    const popup =
    document.getElementById("slotPopup");

    if(!popup){

        alert(

`SLOT ${slotNumber}

Team : ${slot.team || "Trống"}

Thanh toán :
${slot.paid ? "Đã thanh toán" : "Chưa thanh toán"}`

        );

        return;

    }

    document.getElementById(
        "slotPopupTitle"
    ).innerHTML =
    `SLOT ${String(slot.number).padStart(2,"0")}`;

    document.getElementById(
        "slotPopupInfo"
    ).innerHTML =

`
<div class="popup-row">

    <b>Team</b>

    <input
        id="slotTeamInput"
        value="${slot.team || ""}"
        placeholder="Tên Team">

</div>

<div class="popup-row">

    <b>BOX</b>

    ${slot.box || box}

</div>

<div class="popup-row">

    <b>Thanh toán</b>

    ${
        slot.paid
        ?
        "💸 Đã thanh toán"
        :
        "🚫 Chưa thanh toán"
    }

</div>

`;

    popup.classList.remove("hidden");

};

// =======================================
// CLOSE
// =======================================

TTA.closeSlotPopup = function(){

    const popup =
    document.getElementById(
        "slotPopup"
    );

    if(popup){

        popup.classList.add(
            "hidden"
        );

    }

    TTA.currentSlot = null;

};

// =======================================
// SAVE TEAM
// =======================================

TTA.saveSlotTeam = function(){

    if(!TTA.currentSlot){
        return;
    }

    const input =
    document.getElementById(
        "slotTeamInput"
    );

    if(input){

        TTA.currentSlot.slot.team =
        input.value.trim();

    }

    if(TTA.saveSlots){

        TTA.saveSlots();

    }

    TTA.renderBoards(
        TTA.currentSlot.time,
        TTA.currentSlot.box
    );

    TTA.closeSlotPopup();

};

// =======================================
// PAID
// =======================================

TTA.slotPaid = function(){

    if(!TTA.currentSlot){
        return;
    }

    TTA.currentSlot.slot.paid = true;

    if(TTA.saveSlots){

        TTA.saveSlots();

    }

    TTA.renderBoards(
        TTA.currentSlot.time,
        TTA.currentSlot.box
    );

    TTA.closeSlotPopup();

};

// =======================================
// UNPAID
// =======================================

TTA.slotUnpaid = function(){

    if(!TTA.currentSlot){
        return;
    }

    TTA.currentSlot.slot.paid = false;

    if(TTA.saveSlots){

        TTA.saveSlots();

    }

    TTA.renderBoards(
        TTA.currentSlot.time,
        TTA.currentSlot.box
    );

    TTA.closeSlotPopup();

};

// =======================================
// USE BALANCE
// =======================================

TTA.slotUseBalance = function(){

    if(!TTA.currentSlot){
        return;
    }

    TTA.currentSlot.slot.paid = true;

    if(
        typeof TTA.useBalance ===
        "function"
    ){

        TTA.useBalance(
            TTA.currentSlot.slot.team,
            5000
        );

    }

    if(TTA.saveSlots){

        TTA.saveSlots();

    }

    TTA.renderBoards(
        TTA.currentSlot.time,
        TTA.currentSlot.box
    );

    TTA.closeSlotPopup();

};

// =======================================
// DELETE TEAM
// =======================================

TTA.deleteSlot = function(){

    if(!TTA.currentSlot){
        return;
    }

    if(
        !confirm(
            "Xóa Team khỏi Slot?"
        )
    ){
        return;
    }

    const slot =
    TTA.currentSlot.slot;

    slot.team = "";
    slot.paid = false;
    slot.ctv = "";
    slot.salary = 0;

    if(TTA.saveSlots){

        TTA.saveSlots();

    }

    TTA.renderBoards(
        TTA.currentSlot.time,
        TTA.currentSlot.box
    );

    TTA.closeSlotPopup();

};

console.log(
    "PART 4A-3.3 READY"
);
// =======================================
// CUSTOM TTA MANAGER
// SLOT_RENDER.JS
// PART 4A-3.4
// AUTO CREATE BOARD A → E
// =======================================

"use strict";

// =======================================
// TẠO BOARD MỚI
// =======================================

TTA.createBoard = function(boxData, boardName, box){

    const board = {

        name: boardName,

        slots: []

    };

    for(let i=1;i<=12;i++){

        board.slots.push({

            number : i,

            team   : "",

            paid   : false,

            box    : box,

            ctv    : "",

            salary : 0

        });

    }

    boxData.boards.push(board);

    return board;

};

// =======================================
// KIỂM TRA BOARD ĐẦY
// =======================================

TTA.isBoardFull = function(board){

    if(!board){

        return false;

    }

    return board.slots.every(function(slot){

        return (
            slot.team &&
            slot.team.trim() !== ""
        );

    });

};

// =======================================
// TỰ ĐỘNG TẠO BOARD TIẾP
// =======================================

TTA.createNextBoard = function(time,box){

    const timeData =
    TTA.slotData.find(
        item=>item.time===time
    );

    if(!timeData){

        return;

    }

    const boxData =
    timeData.boxes.find(
        item=>item.box==box
    );

    if(!boxData){

        return;

    }

    for(

        let i=0;

        i<TTA.BOARD_LIST.length-1;

        i++

    ){

        const currentName =
        TTA.BOARD_LIST[i];

        const nextName =
        TTA.BOARD_LIST[i+1];

        const currentBoard =
        boxData.boards.find(
            item=>item.name===currentName
        );

        if(!currentBoard){

            break;

        }

        // chưa đầy

        if(
            !TTA.isBoardFull(
                currentBoard
            )
        ){

            break;

        }

        // đã có board tiếp

        const nextBoard =
        boxData.boards.find(
            item=>item.name===nextName
        );

        if(nextBoard){

            continue;

        }

        // tạo board

        TTA.createBoard(

            boxData,

            nextName,

            box

        );

        if(TTA.saveSlots){

            TTA.saveSlots();

        }

        if(

            typeof TTA.notify ===
            "function"

        ){

            TTA.notify(

                `🎉 ${time} | BOX ${box} | Đã tạo bảng ${nextName}`

            );

        }

        console.log(

            "CREATE",

            time,

            box,

            nextName

        );

        break;

    }

};

// =======================================
// CẬP NHẬT BOARD
// =======================================

TTA.refreshBoards = function(time,box){

    TTA.createNextBoard(

        time,

        box

    );

    TTA.renderBoards(

        time,

        box

    );

};

// =======================================
// SAVE + REFRESH
// =======================================

TTA.updateSlotData = function(){

    if(!TTA.currentSlot){

        return;

    }

    if(TTA.saveSlots){

        TTA.saveSlots();

    }

    TTA.refreshBoards(

        TTA.currentSlot.time,

        TTA.currentSlot.box

    );

};

// =======================================
// READY
// =======================================

console.log(
    "PART 4A-3.4 READY"
);
