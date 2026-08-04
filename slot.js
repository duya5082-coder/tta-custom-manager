// =======================================
// CUSTOM TTA MANAGER
// SLOT.JS
// PART 4A-2.1
// SLOT CORE
// =======================================

"use strict";

TTA = window.TTA || {};

const SLOT_KEY = "CUSTOM_TTA_SLOT_DATA";

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

TTA.TABLE_LIST = [
    "A",
    "B",
    "C",
    "D",
    "E"
];

TTA.SLOT_PRICE = 5000;

TTA.slotData = [];



// ===============================
// SAVE
// ===============================

TTA.saveSlots = function(){

    localStorage.setItem(
        SLOT_KEY,
        JSON.stringify(TTA.slotData)
    );

};



// ===============================
// LOAD
// ===============================

TTA.loadSlots = function(){

    try{

        const data = JSON.parse(
            localStorage.getItem(SLOT_KEY)
        );

        if(Array.isArray(data)){

            TTA.slotData = data;
            return;

        }

    }catch(e){}

    TTA.slotData = [];

};



// ===============================
// GET BOX
// ===============================

TTA.getBox=function(time,box){

    return TTA.slotData.find(v=>

        v.time===time &&
        v.box==box

    );

};



// ===============================
// GET ALL SLOT
// ===============================

TTA.getSlots=function(){

    let arr=[];

    TTA.slotData.forEach(group=>{

        group.boards.forEach(board=>{

            board.slots.forEach(slot=>{

                arr.push(slot);

            });

        });

    });

    return arr;

};



// ===============================
// CREATE SLOT
// ===============================

TTA.createSlot=function(number){

    return{

        number:number,

        team:"",

        paid:false,

        paymentType:"",

        paymentTime:null,

        ctv:"",

        salary:false,

        box:0

    };

};



console.log("SLOT CORE 4A-2.1 READY");
// =======================================
// PART 4A-2.2
// CREATE BOX - BOARD - SLOT
// =======================================

// Tạo 1 bảng (A,B,C,D,E)
TTA.createBoard=function(name){

    const board={

        name:name,

        status:"OPEN",

        slots:[]

    };

    for(let i=1;i<=12;i++){

        board.slots.push(

            TTA.createSlot(i)

        );

    }

    return board;

};



// Tạo 1 Box

TTA.createBox=function(time,box){

    return{

        time:time,

        box:box,

        boards:[

            TTA.createBoard("A")

        ]

    };

};




// Khởi tạo toàn bộ dữ liệu

TTA.createDefaultSlotData=function(){

    TTA.slotData=[];

    TTA.TIME_LIST.forEach(time=>{

        TTA.BOX_LIST.forEach(box=>{

            TTA.slotData.push(

                TTA.createBox(

                    time,

                    box

                )

            );

        });

    });

    TTA.saveSlots();

};




// Nếu chưa có dữ liệu thì tạo

TTA.loadSlots();

if(

    !Array.isArray(TTA.slotData) ||

    TTA.slotData.length===0

){

    TTA.createDefaultSlotData();

}




// =======================================
// AUTO CREATE BOARD
// =======================================

TTA.checkAutoCreateBoard=function(){

    TTA.slotData.forEach(group=>{

        group.boards.forEach((board,index)=>{

            const full=

            board.slots.every(

                slot=>slot.team

            );

            if(full){

                board.status="FULL";

                const next=

                TTA.TABLE_LIST[index+1];

                if(

                    next &&

                    !group.boards.find(

                        b=>b.name===next

                    )

                ){

                    group.boards.push(

                        TTA.createBoard(next)

                    );

                }

            }

        });

    });

};




// chạy mỗi 2 giây

setInterval(function(){

    TTA.checkAutoCreateBoard();

},2000);



console.log(
"BOARD SYSTEM 4A-2.2 READY"
);
// =======================================
// PART 4A-2.3
// TEAM MANAGER
// =======================================


// ===============================
// FIND BOARD
// ===============================

TTA.findBoard=function(time,box,board){

    const data=TTA.getBox(time,box);

    if(!data) return null;

    return data.boards.find(

        b=>b.name===board

    );

};


// ===============================
// FIND SLOT
// ===============================

TTA.findSlot=function(

    time,
    box,
    board,
    slot

){

    const tb=

    TTA.findBoard(
        time,
        box,
        board
    );

    if(!tb) return null;

    return tb.slots.find(

        s=>s.number==slot

    );

};



// ===============================
// ADD TEAM
// ===============================

TTA.addTeam=function(

    time,
    box,
    board,
    slotNumber,
    team,
    ctv

){

    const slot=

    TTA.findSlot(

        time,
        box,
        board,
        slotNumber

    );

    if(!slot) return false;

    slot.team=team||"";
    slot.ctv=ctv||"";
    slot.box=box;

    if(slot.team!=""){

        slot.createTime=Date.now();

    }

    TTA.saveSlots();

    if(TTA.renderSlots){

        TTA.renderSlots();

    }

    if(TTA.updateDashboard){

        TTA.updateDashboard();

    }

    return true;

};




// ===============================
// EDIT TEAM
// ===============================

TTA.editTeam=function(

    time,
    box,
    board,
    slotNumber,
    newName

){

    const slot=

    TTA.findSlot(

        time,
        box,
        board,
        slotNumber

    );

    if(!slot) return;

    slot.team=newName;

    TTA.saveSlots();

    if(TTA.renderSlots){

        TTA.renderSlots();

    }

};




// ===============================
// REMOVE TEAM
// ===============================

TTA.removeTeam=function(

    time,
    box,
    board,
    slotNumber

){

    const slot=

    TTA.findSlot(

        time,
        box,
        board,
        slotNumber

    );

    if(!slot) return;

    slot.team="";
    slot.paid=false;
    slot.paymentType="";
    slot.paymentTime=null;
    slot.ctv="";
    slot.salary=false;
    slot.salaryAdded=false;

    TTA.saveSlots();

    if(TTA.renderSlots){

        TTA.renderSlots();

    }

    if(TTA.updateDashboard){

        TTA.updateDashboard();

    }

};




// ===============================
// CHANGE BOX
// ===============================

TTA.changeBox=function(

    time,
    oldBox,
    oldBoard,
    oldSlot,

    newBox,
    newBoard,
    newSlot

){

    const oldData=

    TTA.findSlot(

        time,
        oldBox,
        oldBoard,
        oldSlot

    );

    const newData=

    TTA.findSlot(

        time,
        newBox,
        newBoard,
        newSlot

    );

    if(!oldData || !newData){

        return;

    }

    Object.assign(

        newData,

        JSON.parse(

            JSON.stringify(oldData)

        )

    );

    oldData.team="";
    oldData.paid=false;
    oldData.paymentType="";
    oldData.paymentTime=null;
    oldData.ctv="";

    TTA.saveSlots();

    if(TTA.renderSlots){

        TTA.renderSlots();

    }

};

console.log("TEAM MANAGER 4A-2.3 READY");
