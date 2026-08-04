// =======================================
// CUSTOM TTA MANAGER
// CONFIG.JS
// PART 4A-1
// SYSTEM CONFIG
// =======================================

"use strict";

window.TTA = window.TTA || {};


// =======================================
// VERSION
// =======================================

TTA.version = "3.0.0";


// =======================================
// STORAGE
// =======================================

TTA.STORAGE_KEY = "CUSTOM_TTA_SLOTDATA";

TTA.BALANCE_KEY = "CUSTOM_TTA_BALANCE";

TTA.SALARY_KEY = "CUSTOM_TTA_SALARY";

TTA.CTV_KEY = "CUSTOM_TTA_CTV";

TTA.SETTING_KEY = "CUSTOM_TTA_SETTING";

TTA.HISTORY_KEY = "CUSTOM_TTA_HISTORY";


// =======================================
// SLOT
// =======================================

TTA.SLOT_PRICE = 5000;

TTA.SLOT_COUNT = 12;


// =======================================
// BOX
// =======================================

TTA.BOXES = [

1,2,3,4,5,

6,7,8,9,10

];


// =======================================
// TIME
// =======================================

TTA.TIMES = [

"10H00",

"13H00",

"15H00",

"18H00",

"20H00",

"22H00",

"23H50"

];


// =======================================
// BOARD
// =======================================

TTA.BOARDS = [

"A",

"B",

"C",

"D",

"E"

];


// =======================================
// PAYMENT STATUS
// =======================================

TTA.PAYMENT = {

PAID : "PAID",

UNPAID : "UNPAID",

BALANCE : "BALANCE"

};


// =======================================
// SALARY
// =======================================

TTA.SALARY_PER_SLOT = 500;

TTA.SALARY_DELAY = 2 * 60 * 60 * 1000;


// =======================================
// SLOT DEFAULT
// =======================================

TTA.createEmptySlot = function(number){

    return{

        number:number,

        team:"",

        customer:"",

        ctv:"",

        box:null,

        paid:false,

        paymentType:"UNPAID",

        created:0,

        paymentTime:0,

        salaryAdded:false

    };

};


// =======================================
// TABLE DEFAULT
// =======================================

TTA.createBoard=function(name){

    let board={

        name:name,

        status:"OPEN",

        slots:[]

    };

    for(

        let i=1;

        i<=TTA.SLOT_COUNT;

        i++

    ){

        board.slots.push(

            TTA.createEmptySlot(i)

        );

    }

    return board;

};


// =======================================
// READY
// =======================================

console.log("CONFIG 4A-1 READY");
