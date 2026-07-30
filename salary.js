// =======================================
// CUSTOM TTA MANAGER
// SALARY.JS
// PART 2R
// =======================================

"use strict";

window.SLOT_SALARY = 500;

// =========================
// INIT
// =========================

TTA.getSalaryData = function(){

    if(!Array.isArray(TTA.database.salary)){
        TTA.database.salary = [];
    }

    return TTA.database.salary;

};

// =========================
// RECALCULATE
// =========================

TTA.calculateSalary = function(){

    const result = {};

    const slots = TTA.getSlots();

    slots.forEach(slot=>{

        if(!slot.ctv){
            return;
        }

        if(!result[slot.ctv]){

            result[slot.ctv]={

                username:slot.ctv,

                totalSlot:0,

                salary:0,

                paid:0,

                debt:0

            };

        }

        result[slot.ctv].totalSlot++;

    });

    Object.values(result).forEach(item=>{

        item.salary =
        item.totalSlot * SLOT_SALARY;

        item.debt =
        item.salary - item.paid;

    });

    TTA.database.salary =
    Object.values(result);

    TTA.saveDatabase();

};

// =========================
// GET USER
// =========================

TTA.getSalaryUser=function(username){

    return TTA.getSalaryData().find(
        x=>x.username===username
    );

};

// =========================
// PAY
// =========================

TTA.paySalary=function(username,amount){

    let user=
    TTA.getSalaryUser(username);

    if(!user){
        return;
    }

    amount=Number(amount);

    if(isNaN(amount)){
        return;
    }

    user.paid+=amount;

    user.debt=
    user.salary-user.paid;

    TTA.saveDatabase();

};

// =========================
// RENDER
// =========================

TTA.renderSalary=function(){

    const box=
    document.getElementById(
        "salaryList"
    );

    if(!box){
        return;
    }

    TTA.calculateSalary();

    const data=
    TTA.getSalaryData();

    if(data.length===0){

        box.innerHTML=
        "<div class='card'>Chưa có dữ liệu</div>";

        return;

    }

    box.innerHTML="";

    data.forEach(item=>{

        const div=
        document.createElement("div");

        div.className="card";

        div.innerHTML=`

            <h3>${item.username}</h3>

            <p>Slot: ${item.totalSlot}</p>

            <p>Lương: ${item.salary.toLocaleString()}đ</p>

            <p>Đã trả: ${item.paid.toLocaleString()}đ</p>

            <p>Còn nợ: ${item.debt.toLocaleString()}đ</p>

            ${
                TTA.isAdmin()
                ?
                `<button onclick="salaryPayPrompt('${item.username}')">
                Trả lương
                </button>`
                :
                ""
            }

        `;

        box.appendChild(div);

    });

};

// =========================
// PAY PROMPT
// =========================

window.salaryPayPrompt=function(username){

    let money=
    prompt("Số tiền trả");

    if(!money){
        return;
    }

    TTA.paySalary(
        username,
        money
    );

    TTA.renderSalary();

};

// =========================
// AUTO
// =========================

document.addEventListener(
"DOMContentLoaded",
function(){

    TTA.renderSalary();

});
