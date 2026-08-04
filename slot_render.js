// =======================================
// CUSTOM TTA MANAGER
// SLOT_RENDER.JS
// PART 4A-3.1
// SLOT UI ENGINE
// =======================================

"use strict";

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

TTA.renderSlots = function(){

    const root = document.getElementById("slotList");

    if(!root) return;

    let html = "";

    TTA.TIME_LIST.forEach(time=>{

        html += `
        <div class="slot-time-card">

            <div class="slot-time-title">
                ⏰ ${time}
            </div>

            <div class="slot-box-list">
        `;

        TTA.BOX_LIST.forEach(box=>{

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
                id="board_${time.replace(/[^0-9]/g,'')}"
                class="slot-board-area">

                <div class="slot-empty">

                    Chọn BOX để hiển thị bảng

                </div>

            </div>

        </div>
        `;

    });

    root.innerHTML = html;

};

TTA.selectBox = function(time,box){

    const id =
    "board_" +
    time.replace(/[^0-9]/g,'');

    const board =
    document.getElementById(id);

    if(!board) return;

    board.innerHTML = `
        <div class="slot-board">

            <div class="board-header">

                ⏰ ${time}
                &nbsp;&nbsp;
                💸 5K
                &nbsp;&nbsp;
                BOX ${box}
                &nbsp;&nbsp;
                BẢNG A

            </div>

            <div class="board-prize">

                👑 5K - 25K / 10K / 5K

            </div>

            <div class="slot-list">

                ${TTA.renderBoardSlots()}

            </div>

        </div>
    `;

};

TTA.renderBoardSlots = function(){

    let html = "";

    for(let i=1;i<=12;i++){

        let number =
        String(i).padStart(2,"0");

        html += `
        <div class="slot-item">

            <span class="slot-number">

                ${number}

            </span>

            <span class="slot-team">

                Trống

            </span>

        </div>
        `;

    }

    return html;

};

document.addEventListener(
"DOMContentLoaded",
function(){

    setTimeout(function(){

        TTA.renderSlots();

    },300);

});

console.log(
"PART 4A-3.1 READY"
);
// =======================================
// PART 4A-3.2
// HIỂN THỊ DỮ LIỆU THẬT CỦA SLOT
// =======================================

TTA.getBoardData = function(time, box, boardName){

    if(!Array.isArray(TTA.slotData)) return null;

    const timeData = TTA.slotData.find(t=>t.time===time);

    if(!timeData) return null;

    const boxData = timeData.boxes.find(b=>b.box==box);

    if(!boxData) return null;

    return boxData.boards.find(
        b=>b.name===boardName
    ) || null;

};


TTA.renderBoardSlots = function(time,box,boardName){

    const board =
    TTA.getBoardData(
        time,
        box,
        boardName
    );

    let html="";

    if(!board){

        for(let i=1;i<=12;i++){

            html+=`
            <div class="slot-item">

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


    board.slots.forEach(slot=>{

        let pay="🚫";

        if(slot.paid){

            pay="💸";

        }

        html+=`

        <div
        class="slot-item">

            <span
            class="slot-number">

            ${String(slot.number).padStart(2,"0")}

            </span>

            <span
            class="slot-team">

            ${slot.team || "Trống"}

            </span>

            <span>

            BOX ${slot.box || "-"}

            </span>

            <span>

            ${pay}

            </span>

        </div>

        `;

    });

    return html;

};



TTA.selectBox=function(time,box){

    const id =
    "board_"+time.replace(/[^0-9]/g,'');

    const root =
    document.getElementById(id);

    if(!root) return;

    root.innerHTML=`

    <div class="slot-board">

        <div class="board-header">

            ⏰ ${time}
            &nbsp;&nbsp;
            💸 5K
            &nbsp;&nbsp;
            BOX ${box}
            &nbsp;&nbsp;
            BẢNG A

        </div>

        <div class="board-prize">

            👑 5K - 25K / 10K / 5K

        </div>

        <div class="slot-list">

            ${TTA.renderBoardSlots(
                time,
                box,
                "A"
            )}

        </div>

    </div>

    `;

};
// =======================================
// PART 4A-3.3
// MULTI BOARD RENDER
// =======================================

TTA.BOARD_LIST=[
"A",
"B",
"C",
"D",
"E"
];

TTA.selectBox=function(time,box){

    const id=
    "board_"+time.replace(/[^0-9]/g,'');

    const root=
    document.getElementById(id);

    if(!root) return;

    let html="";

    TTA.BOARD_LIST.forEach(function(boardName){

        const board=
        TTA.getBoardData(
            time,
            box,
            boardName
        );

        if(
            boardName!="A" &&
            !board
        ){
            return;
        }

        html+=`

        <div class="slot-board">

            <div class="board-header">

                ⏰ ${time}
                &nbsp;&nbsp;
                💸 5K
                &nbsp;&nbsp;
                BOX ${box}
                &nbsp;&nbsp;
                BẢNG ${boardName}

            </div>

            <div class="board-prize">

                👑 5K - 25K / 10K / 5K

            </div>

            <div class="slot-list">

                ${
                TTA.renderBoardSlots(
                    time,
                    box,
                    boardName
                )
                }

            </div>

        </div>

        `;

    });

    root.innerHTML=html;

};
// =======================================
// PART 4A-3.4
// AUTO CREATE BOARD A→E
// =======================================

TTA.createNextBoard=function(time,box){

    const data=TTA.slotData.find(
        t=>t.time===time
    );

    if(!data) return;

    const boxData=data.boxes.find(
        b=>b.box==box
    );

    if(!boxData) return;

    const boardNames=["A","B","C","D","E"];

    for(let i=0;i<boardNames.length-1;i++){

        const current=
        boxData.boards.find(
            b=>b.name===boardNames[i]
        );

        if(!current) break;

        const full=
        current.slots.every(
            s=>s.team
        );

        if(!full) break;

        let next=
        boxData.boards.find(
            b=>b.name===boardNames[i+1]
        );

        if(next) continue;

        next={

            name:boardNames[i+1],

            slots:[]

        };

        for(let n=1;n<=12;n++){

            next.slots.push({

                number:n,

                team:"",

                paid:false,

                box:box,

                ctv:""

            });

        }

        boxData.boards.push(next);

        if(TTA.saveSlots){

            TTA.saveSlots();

        }

        if(TTA.notify){

            TTA.notify(
                `🎉 ${time} BOX ${box} - Bảng ${boardNames[i+1]} đã được tạo`
            );

        }else{

            alert(
                `🎉 ${time} BOX ${box}\nĐã tạo bảng ${boardNames[i+1]}`
            );

        }

    }

};


// =======================================
// TỰ KIỂM TRA
// =======================================

setInterval(function(){

    if(!Array.isArray(TTA.slotData)) return;

    TTA.slotData.forEach(function(time){

        time.boxes.forEach(function(box){

            TTA.createNextBoard(
                time.time,
                box.box
            );

        });

    });

},3000);

console.log("PART 4A-3.4 READY");
// =======================================
// PART 4A-3.5
// COPY MESSENGER
// =======================================

TTA.copyMessenger=function(time,box,boardName){

    const board=
    TTA.getBoardData(
        time,
        box,
        boardName
    );

    if(!board){

        alert("Không có dữ liệu.");

        return;

    }

    let text="";

    text+=`⏰ ${time} ⏰ 💸 5K 💸 Bảng ${boardName}\n`;

    text+="👑 5K - 25K / 10K / 5K\n";
    text+="────────────────\n";

    board.slots.forEach(function(slot){

        let num=
        String(slot.number)
        .padStart(2,"0");

        let pay=
        slot.paid
        ?
        "💸"
        :
        "🚫";

        let team=
        slot.team
        ?
        slot.team
        :
        "";

        let boxText=
        slot.box
        ?
        ` (BOX ${slot.box})`
        :
        "";

        text+=`${num} ${team}${boxText} ${pay}\n`;

    });

    navigator.clipboard.writeText(text);

    alert("📋 Đã sao chép qua Messenger");

};
// =======================================
// PART 4A-3.6
// SLOT QUICK ACTION
// =======================================

TTA.slotMenu=function(time,box,boardName,slotNumber){

    const board=
    TTA.getBoardData(
        time,
        box,
        boardName
    );

    if(!board) return;

    const slot=
    board.slots.find(
        s=>s.number==slotNumber
    );

    if(!slot) return;

    let choose=
    prompt(

`===== SLOT ${slotNumber} =====

1 = Đổi tên Team
2 = 💸 Thanh toán rồi nha
3 = 🚫 Chưa thanh toán ní ơi
4 = 💰 Trừ dư nhé
5 = 🗑️ Xóa Team

Nhập lựa chọn:`

    );

    if(choose==="1"){

        let team=
        prompt(
            "Tên Team:",
            slot.team||""
        );

        if(team!==null){

            slot.team=team;

        }

    }

    else if(choose==="2"){

        slot.paid=true;

    }

    else if(choose==="3"){

        slot.paid=false;

    }

    else if(choose==="4"){

        slot.paid=true;

        if(TTA.useBalance){

            TTA.useBalance(
                slot.team,
                5000
            );

        }

    }

    else if(choose==="5"){

        if(confirm("Xóa Team?")){

            slot.team="";
            slot.paid=false;
            slot.ctv="";
            slot.salary=0;

        }

    }

    if(TTA.saveSlots){

        TTA.saveSlots();

    }

    TTA.selectBox(
        time,
        box
    );

};
// =====================================
// SLOT POPUP
// PART 4A-3.7
// =====================================

TTA.currentSlot=null;

TTA.openSlotPopup=function(
time,
box,
boardName,
slotNumber
){

    const board=
    TTA.getBoardData(
        time,
        box,
        boardName
    );

    if(!board) return;

    const slot=
    board.slots.find(
        s=>s.number==slotNumber
    );

    if(!slot) return;

    TTA.currentSlot={
        time,
        box,
        boardName,
        slotNumber,
        slot
    };

    document
    .getElementById("slotPopup")
    .classList.remove("hidden");

    document
    .getElementById("slotPopupTitle")
    .innerHTML=
    "SLOT "+slotNumber;

    document
    .getElementById("slotPopupInfo")
    .innerHTML=

`
<div>

<b>Team:</b>

${slot.team||"Trống"}

</div>

<br>

<div>

<b>Thanh toán:</b>

${slot.paid?"💸 Đã thanh toán":"🚫 Chưa thanh toán"}

</div>

`;

};
