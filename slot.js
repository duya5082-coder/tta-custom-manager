// =======================================
// CUSTOM TTA MANAGER
// SLOT.JS
// PART 3B-1
// FULL TABLE + SLOT CORE ENGINE
// =======================================

"use strict";


// =======================================
// INIT
// =======================================

TTA.tables = TTA.tables || [];


TTA.TABLE_STORAGE_KEY =
"CUSTOM_TTA_TABLES";



// =======================================
// SAVE TABLES
// =======================================

TTA.saveTables = function(){


    try{


        localStorage.setItem(

            TTA.TABLE_STORAGE_KEY,

            JSON.stringify(
                TTA.tables
            )

        );


    }
    catch(e){


        console.error(
            "SAVE TABLE ERROR",
            e
        );


    }


};




// =======================================
// LOAD TABLES
// =======================================

TTA.loadTables = function(){


    try{


        let data =
        localStorage.getItem(
            TTA.TABLE_STORAGE_KEY
        );



        if(data){


            TTA.tables =
            JSON.parse(data);


        }
        else{


            TTA.tables=[];


        }



    }
    catch(e){


        console.error(
            "LOAD TABLE ERROR",
            e
        );


        TTA.tables=[];


    }


};




// =======================================
// CREATE TABLE
// =======================================

TTA.createTable=function(name){



    let table={


        id:
        Date.now(),


        name:name,


        status:"OPEN",


        created:
        Date.now(),


        slots:[]


    };



    // tạo 12 slot

    for(
        let i=1;
        i<=12;
        i++
    ){


        table.slots.push({


            number:i,


            team:"",


            paid:false,


            ctv:"",


            customer:"",


            phone:"",


            balanceUsed:0,


            salaryAdded:false,


            created:null


        });


    }



    TTA.tables.push(table);



    TTA.saveTables();



    return table;


};





// =======================================
// GET TABLE ĐANG MỞ
// =======================================

TTA.getOpenTable=function(){



    let table =

    TTA.tables.find(

        t=>

        t.status==="OPEN"

    );



    if(table){

        return table;

    }




    let index =
    TTA.tables.length;



    let name =

    String.fromCharCode(

        65 + index

    );



    return TTA.createTable(name);



};





// =======================================
// GET ALL SLOTS
// =======================================

TTA.getSlots=function(){


    let result=[];



    TTA.tables.forEach(table=>{


        table.slots.forEach(slot=>{


            result.push(slot);


        });


    });



    return result;


};





// =======================================
// ADD TEAM TO SLOT
// =======================================

TTA.addTeamToSlot=function(
teamName,
ctv
){



    let table =
    TTA.getOpenTable();



    let slot =

    table.slots.find(

        s=>

        !s.team

    );




    // nếu bàn đầy

    if(!slot){



        table.status="FULL";


        TTA.saveTables();



        return TTA.addTeamToSlot(

            teamName,

            ctv

        );


    }





    slot.team =
    teamName;



    slot.ctv =
    ctv || "";



    slot.created =
    Date.now();



    slot.customer =
    teamName;



    slot.balanceUsed =
    5000;



    // kiểm tra full bàn

    if(

        table.slots.every(

            s=>s.team

        )

    ){


        table.status="FULL";


    }



    TTA.saveTables();




    if(
        window.refreshDashboard
    ){


        window.refreshDashboard();


    }





    return{


        table:
        table.name,


        slot:
        slot.number


    };



};





// =======================================
// REMOVE TEAM
// =======================================

TTA.removeTeamFromSlot=function(

tableName,

slotNumber

){



    let table =

    TTA.tables.find(

        t=>

        t.name===tableName

    );



    if(!table)
    return;



    let slot =

    table.slots.find(

        s=>

        s.number===slotNumber

    );



    if(!slot)
    return;




    slot.team="";


    slot.customer="";


    slot.phone="";


    slot.paid=false;


    slot.ctv="";


    slot.balanceUsed=0;


    slot.salaryAdded=false;


    slot.created=null;




    table.status="OPEN";



    TTA.saveTables();



    if(
        window.refreshDashboard
    ){


        window.refreshDashboard();


    }



};





// =======================================
// PAYMENT STATUS
// =======================================

TTA.updateSlotPayment=function(

tableName,

slotNumber,

status

){



    let table =

    TTA.tables.find(

        t=>

        t.name===tableName

    );



    if(!table)
    return;



    let slot =

    table.slots.find(

        s=>

        s.number===slotNumber

    );



    if(!slot)
    return;



    slot.paid =
    status;



    TTA.saveTables();



    if(
        window.refreshDashboard
    ){

        window.refreshDashboard();

    }



};





// =======================================
// INIT SYSTEM
// =======================================


TTA.loadTables();



if(

    TTA.tables.length===0

){


    TTA.createTable("A");


}

// =======================================
// SLOT PAGE RENDER
// =======================================


TTA.renderSlots=function(){


    let box =
    document.getElementById(
        "slotList"
    );


    if(!box)
    return;



    box.innerHTML="";



    (TTA.tables || [])
    .forEach(table=>{


        let html=`


        <div class="card">


        <h3>
        🪑 BÀN ${table.name}
        </h3>


        `;



        table.slots.forEach(slot=>{


            html += `


            <div class="slot-card">


            <b>
            SLOT ${slot.number}
            </b>


            <br>


            ${
                slot.team
                ?
                "🔴 "+slot.team
                :
                "🟢 Trống"
            }


            <br>


            ${
                slot.paid
                ?
                "💸 Đã thanh toán"
                :
                "🚫 Chưa thanh toán"
            }


            <br>


            <button onclick="
            TTA.selectSlot(
            '${table.id}',
            ${slot.number}
            )
            ">

            Chọn

            </button>


            </div>


            `;


        });



        html+="</div>";



        box.innerHTML += html;



    });



};


console.log(
"SLOT PAGE RENDER READY"
);
