// =======================================
// CUSTOM TTA MANAGER
// DASHBOARD.JS
// PART 3F
// DASHBOARD PRO ENGINE
// =======================================

"use strict";



// =======================================
// UPDATE DASHBOARD
// =======================================


TTA.updateDashboard=function(){



    let totalSlot=0;

    let usedSlot=0;

    let paidSlot=0;

    let revenue=0;

    let tables=0;



    if(TTA.tables){


        tables =
        TTA.tables.length;



        TTA.tables.forEach(table=>{


            table.slots.forEach(slot=>{


                totalSlot++;



                if(slot.team){

                    usedSlot++;


                }



                if(slot.paid){


                    paidSlot++;


                    revenue +=5000;


                }



            });


        });


    }



    let empty =
    totalSlot-usedSlot;



    setValue(
        "totalSlot",
        totalSlot
    );


    setValue(
        "fullSlot",
        usedSlot
    );



    setValue(
        "totalPlayer",
        usedSlot
    );



    setValue(
        "totalCTV",
        getCTVCount()
    );




    renderDashboardInfo({

        tables,

        empty,

        revenue,

        paidSlot


    });



};




// =======================================
// CTV COUNT
// =======================================


function getCTVCount(){


    let list=[];



    TTA.tables.forEach(t=>{


        t.slots.forEach(s=>{


            if(
                s.ctv
                &&
                !list.includes(s.ctv)
            ){

                list.push(s.ctv);

            }


        });


    });



    return list.length;


}





// =======================================
// EXTRA INFO
// =======================================


function renderDashboardInfo(data){


    let box =
    document.getElementById(
        "dashboardTables"
    );



    if(!box)
    return;



    let html="";



    html+=`

    <div class="dashboard-info">

    🪑 Số bàn:
    ${data.tables}

    <br>

    🟢 Slot trống:
    ${data.empty}

    <br>

    💸 Doanh thu:
    ${data.revenue.toLocaleString()}đ


    </div>

    `;



    html+=
    renderTablesHTML();



    box.innerHTML=html;


}






// =======================================
// TABLE HTML
// =======================================


function renderTablesHTML(){


let html="";



TTA.tables.forEach(table=>{


html+=`

<div class="tta-table">


<h3>
🪑 BÀN ${table.name}

${
table.status==="FULL"
?
" 🔒"
:
" 🟢"
}

</h3>


<div class="slot-grid">

`;



table.slots.forEach(slot=>{


html+=`

<div class="slot-card">


<b>
SLOT ${slot.number}
</b>


<br>


${
slot.team
?
slot.team
:
"🟢 Trống"
}



<br>



${
slot.paid
?
"💸"
:
slot.team
?
"🚫"
:
""
}



</div>


`;



});



html+=`

</div>

</div>

`;



});


return html;


}





function setValue(id,value){


let el =
document.getElementById(id);


if(el)
el.textContent=value;


}




window.refreshDashboard=function(){


TTA.updateDashboard();


};





window.addEventListener(
"load",
()=>{


setTimeout(()=>{


TTA.updateDashboard();


},500);



});





console.log(
"DASHBOARD PRO 3F READY"
);
