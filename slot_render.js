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
