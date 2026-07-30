// =======================================
// CUSTOM TTA MANAGER
// SALARY PAGE ENGINE
// PART 3P
// =======================================

"use strict";



// =======================================
// CONFIG
// =======================================


TTA.CTV_SLOT_SALARY =
TTA.CTV_SLOT_SALARY || 500;




// =======================================
// GET SALARY DATA
// =======================================


TTA.getSalaryData=function(){


    let salary={};



    TTA.tables.forEach(table=>{


        table.slots.forEach(slot=>{


            if(
                slot.team &&
                slot.ctv
            ){


                if(
                    !salary[slot.ctv]
                ){

                    salary[slot.ctv]={

                        name:slot.ctv,

                        slots:0,

                        money:0

                    };

                }



                salary[slot.ctv].slots++;


                salary[slot.ctv].money +=
                TTA.CTV_SLOT_SALARY;


            }


        });


    });



    return salary;


};





// =======================================
// RENDER SALARY PAGE
// =======================================


TTA.renderSalaryPage=function(){


    const box =
    document.getElementById(
        "salary"
    );


    if(!box)
    return;



    let data =
    TTA.getSalaryData();



    let user =
    TTA.currentUser;



    let html=`


    <h2>
    📊 Bảng lương CTV
    </h2>


    <div class="card">


    <table width="100%">


    <tr>

    <th>
    CTV
    </th>


    <th>
    Slot
    </th>


    <th>
    Lương
    </th>


    </tr>


    `;




    Object.values(data)
    .forEach(item=>{


        // ======================
        // QUYỀN ADMIN
        // ======================


        if(
            user &&
            user.role==="admin"
        ){


            html += `


            <tr>

            <td>
            ${item.name}
            </td>


            <td>
            ${item.slots}
            </td>


            <td>
            ${item.money.toLocaleString()}đ
            </td>


            </tr>


            `;


        }


        // ======================
        // QUYỀN CTV
        // ======================


        else
        if(
            user &&
            user.username===item.name
        ){


            html += `


            <tr>

            <td>
            ${item.name}
            </td>


            <td>
            ${item.slots}
            </td>


            <td>
            ${item.money.toLocaleString()}đ
            </td>


            </tr>


            `;


        }



    });




    html += `


    </table>


    </div>


    `;



    box.innerHTML=html;



};





// =======================================
// OPEN PAGE HOOK
// =======================================


let oldOpenPageSalary =
window.openPage;



window.openPage=function(page){



    if(oldOpenPageSalary){

        oldOpenPageSalary(page);

    }



    if(page==="salary"){


        setTimeout(()=>{


            TTA.renderSalaryPage();


        },100);


    }


};





console.log(
"SALARY PAGE ENGINE 3P READY"
);
