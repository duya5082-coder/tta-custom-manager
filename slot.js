// =======================================
// CUSTOM TTA MANAGER
// SLOT CORE
// PART 3A NEW SYSTEM
// BOX + TIME + TABLE
// =======================================

"use strict";


window.TTA = window.TTA || {};



// =======================================
// CONFIG
// =======================================


TTA.SLOT_PRICE = 5000;


TTA.SLOT_TIMES = [

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



// =======================================
// DATA
// =======================================


TTA.slotData =
TTA.slotData || [];




// =======================================
// CREATE SLOT
// =======================================


TTA.createSlot=function(number){


    return {

        number:number,

        team:"",

        customer:"",

        ctv:"",

        paid:false,

        created:null,

        salary:false

    };


};




// =======================================
// CREATE TABLE A
// =======================================


TTA.createBoard=function(name){


    let board={


        name:name,


        slots:[]


    };



    for(let i=1;i<=12;i++){


        board.slots.push(

            TTA.createSlot(i)

        );


    }



    return board;


};




// =======================================
// CREATE BOX
// =======================================


TTA.createBox=function(
time,
box
){



    return {


        id:
        Date.now()
        +
        Math.random(),


        time:time,


        box:box,


        boards:[

            TTA.createBoard("A")

        ]

    };


};




// =======================================
// INIT SLOT SYSTEM
// =======================================


TTA.initSlots=function(){



    let old =
    localStorage.getItem(
        "CUSTOM_TTA_SLOT_DATA"
    );



    if(old){


        try{


            TTA.slotData =
            JSON.parse(old);



            return;


        }
        catch(e){}



    }




    TTA.slotData=[];



    TTA.SLOT_TIMES.forEach(time=>{


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




// =======================================
// SAVE
// =======================================


TTA.saveSlots=function(){


    localStorage.setItem(

        "CUSTOM_TTA_SLOT_DATA",

        JSON.stringify(
            TTA.slotData
        )

    );


};





// =======================================
// GET BOX
// =======================================


TTA.getBox=function(
time,
box
){


    return TTA.slotData.find(

        x=>

        x.time===time
        &&
        x.box==box

    );


};





// =======================================
// START
// =======================================


TTA.initSlots();



console.log(
"SLOT CORE 3A NEW SYSTEM READY"
);
