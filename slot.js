// =======================================
// CUSTOM TTA MANAGER
// SLOT.JS
// CORE SLOT + TABLE ENGINE
// PART 2F + 3A CLEAN
// =======================================

"use strict";


// =======================================
// INIT
// =======================================

TTA.tables = TTA.tables || [];

TTA.TABLE_STORAGE_KEY =
"CUSTOM_TTA_TABLES";



// =======================================
// STORAGE
// =======================================


TTA.saveTables=function(){

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




TTA.loadTables=function(){

    try{

        let data =
        localStorage.getItem(
            TTA.TABLE_STORAGE_KEY
        );


        if(data){

            TTA.tables =
            JSON.parse(data);

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


        slots:[]


    };



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

            created:null

        });


    }



    TTA.tables.push(table);


    TTA.saveTables();


    return table;


};




// =======================================
// GET OPEN TABLE
// =======================================


TTA.getOpenTable=function(){



    let table =
    TTA.tables.find(
        t=>t.status==="OPEN"
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
// ADD TEAM
// =======================================


TTA.addTeamToSlot=function(teamName,ctv){



    let table =
    TTA.getOpenTable();



    let slot =
    table.slots.find(
        s=>!s.team
    );



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




    if(
        table.slots.every(
            s=>s.team
        )
    ){

        table.status="FULL";

    }



    TTA.saveTables();



    if(
        window.refreshTableDashboard
    ){

        window.refreshTableDashboard();

    }



    return {


        table:
        table.name,


        slot:
        slot.number


    };

};





// =======================================
// PART 3B
// SLOT CARD UI
// =======================================


TTA.renderSlots = function(){


    const box =
    document.getElementById("slotList")
    ||
    document.getElementById("slots")
    ||
    document.getElementById("slot");


    if(!box) return;


    box.innerHTML = "";


    let tables = TTA.tables || [];


    tables.forEach(table=>{


        let tableTitle =
        document.createElement("h3");


        tableTitle.innerHTML =
        "🪑 BÀN " + table.name;


        box.appendChild(tableTitle);



        let grid =
        document.createElement("div");


        grid.className =
        "slot-grid";



        table.slots.forEach(slot=>{


            let card =
            document.createElement("div");


            card.className =
            "slot-card";



            let status =
            slot.team
            ?
            "🔴 Đã có team"
            :
            "🟢 Trống";



            if(slot.team && slot.paid){

                status="💸 Đã thanh toán";

            }



            card.innerHTML = `

                <div class="slot-number">
                    SLOT ${slot.number}
                </div>


                <div class="slot-team">

                    ${
                        slot.team
                        ?
                        slot.team
                        :
                        "Chưa có team"
                    }

                </div>


                <div class="slot-status">

                    ${status}

                </div>


                <button onclick="
                TTA.selectSlot(${table.id},${slot.number})
                ">
                    Chọn
                </button>


            `;



            grid.appendChild(card);


        });



        box.appendChild(grid);


    });


};




// =======================================
// DELETE TEAM SLOT
// =======================================


TTA.removeTeamFromSlot=function(
tableName,
slotNumber
){


    let table =
    TTA.tables.find(
        t=>t.name===tableName
    );


    if(!table)
    return;



    let slot =
    table.slots.find(
        s=>s.number===slotNumber
    );



    if(!slot)
    return;



    slot.team="";

    slot.paid=false;

    slot.ctv="";

    slot.created=null;



    table.status="OPEN";



    TTA.saveTables();


};




// =======================================
// AUTO LOAD
// =======================================


TTA.loadTables();



if(
    TTA.tables.length===0
){

    TTA.createTable("A");

}



console.log(
"SLOT SYSTEM READY"
);
// =======================================
// CUSTOM TTA MANAGER
// PART 3B
// TABLE RENDER ENGINE
// =======================================

"use strict";


TTA.renderTables = function(){


    const container =
    document.getElementById("tableContainer");


    if(!container){

        console.warn(
            "Không tìm thấy tableContainer"
        );

        return;

    }



    container.innerHTML = "";



    TTA.tables.forEach(table=>{


        let html = `


        <div class="table-box">


        <h3>
        🪑 BÀN ${table.name}
        </h3>


        <div class="slot-grid">


        `;



        table.slots.forEach((slot,index)=>{


            html += `


            <div class="slot-card">


                <div>
                <b>SLOT ${index+1}</b>
                </div>


                <br>


                <div>

                ${
                    slot.team

                    ?

                    "🔴 "+slot.team

                    :

                    "🟢 Trống"

                }

                </div>


                <br>


                <button
                onclick="
                TTA.selectSlot('${table.id}',${index})
                "
                >

                [Chọn]

                </button>


            </div>


            `;


        });



        html += `

        </div>

        </div>

        `;



        container.innerHTML += html;



    });



};



// AUTO LOAD

window.addEventListener(
"load",
()=>{

    if(TTA.renderTables){

        TTA.renderTables();

    }

});
