// =======================================
// CUSTOM TTA MANAGER
// SALARY MANAGER
// PART 3U
// =======================================

"use strict";



// =======================================
// CONFIG
// =======================================


TTA.SALARY_PER_SLOT = 500;


TTA.SALARY_KEY =
"CUSTOM_TTA_SALARY";




// =======================================
// GET SALARY DATA
// =======================================


TTA.getSalaryData=function(){


    try{


        return JSON.parse(

            localStorage.getItem(
                TTA.SALARY_KEY
            )
            ||
            "[]"

        );


    }
    catch(e){

        return [];

    }


};





TTA.saveSalaryData=function(data){


    localStorage.setItem(

        TTA.SALARY_KEY,

        JSON.stringify(data)

    );


};





// =======================================
// ADD SALARY
// =======================================


TTA.addSalarySlot=function(slot){



    if(
        !slot.ctv ||
        slot.salaryAdded
    )
    return;



    let data =
    TTA.getSalaryData();



    data.push({


        id:Date.now(),


        ctv:slot.ctv,


        team:slot.team,


        amount:TTA.SALARY_PER_SLOT,


        time:new Date()
        .toLocaleString()



    });



    TTA.saveSalaryData(data);



    slot.salaryAdded=true;



    if(TTA.saveTables){

        TTA.saveTables();

    }



};





// =======================================
// GET CTV SALARY
// =======================================


TTA.getCTVSalary=function(
username
){



    let data =
    TTA.getSalaryData();



    return data.filter(

        s=>
        s.ctv===username

    );


};





// =======================================
// RENDER SALARY PAGE
// =======================================


TTA.renderSalary=function(){



    let box =
    document.getElementById(
        "salary"
    );



    if(!box)
    return;



    let user =
    TTA.currentUser;



    if(!user)
    return;



    let list=[];



    if(
        user.role==="ADMIN"
    ){


        list =
        TTA.getSalaryData();


    }
    else{


        list =
        TTA.getCTVSalary(
            user.username
        );


    }





    let total =
    list.reduce(

        (sum,item)=>

        sum + item.amount,

        0

    );





    let html=`


    <h2>
    📊 Bảng lương
    </h2>


    <div class="card">

    Tổng:

    ${total.toLocaleString()}đ


    </div>


    `;



    list.forEach(item=>{


        html += `


        <div class="card">


        👤 ${item.ctv}


        <br>


        🎮 ${item.team}


        <br>


        💰 ${item.amount}đ


        <br>


        ⏰ ${item.time}


        </div>


        `;


    });



    box.innerHTML=html;



};





// =======================================
// PAGE HOOK
// =======================================


let oldSalaryOpen =
window.openPage;



window.openPage=function(page){



    if(oldSalaryOpen){

        oldSalaryOpen(page);

    }



    if(page==="salary"){


        setTimeout(()=>{


            TTA.renderSalary();


        },100);


    }



};





console.log(
"SALARY MANAGER 3U READY"
);
