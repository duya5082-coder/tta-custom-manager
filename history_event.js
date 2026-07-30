// =======================================
// CUSTOM TTA MANAGER
// HISTORY EVENT SYSTEM
// PART 3W
// =======================================

"use strict";



// =======================================
// STORAGE
// =======================================


TTA.HISTORY_KEY =
"CUSTOM_TTA_HISTORY";




// =======================================
// GET HISTORY
// =======================================


TTA.getHistory=function(){


    try{


        return JSON.parse(

            localStorage.getItem(
                TTA.HISTORY_KEY
            )
            ||
            "[]"

        );


    }
    catch(e){

        return [];

    }


};





// =======================================
// SAVE HISTORY
// =======================================


TTA.saveHistory=function(data){


    localStorage.setItem(

        TTA.HISTORY_KEY,

        JSON.stringify(data)

    );


};





// =======================================
// ADD EVENT
// =======================================


TTA.addHistory=function(
action,
data
){



    let history =
    TTA.getHistory();



    history.unshift({


        id:
        Date.now(),


        action:
        action,


        data:
        data,


        user:
        TTA.currentUser
        ?
        TTA.currentUser.username
        :
        "SYSTEM",


        time:
        new Date()
        .toLocaleString()



    });



    // giữ tối đa 500 dòng


    if(history.length>500){

        history.pop();

    }



    TTA.saveHistory(history);



};





// =======================================
// HISTORY PAGE
// =======================================


TTA.renderHistory=function(){



    let box =
    document.getElementById(
        "history"
    );


    if(!box)
    return;




    let list =
    TTA.getHistory();



    let html=`


    <h2>
    📜 Lịch sử
    </h2>


    `;



    list.forEach(item=>{


        html += `


        <div class="card">


        <b>
        ${item.action}
        </b>


        <br>


        ${JSON.stringify(item.data)}


        <br>


        👤 ${item.user}


        <br>


        ⏰ ${item.time}


        </div>


        `;


    });



    box.innerHTML=html;



};





console.log(
"HISTORY EVENT 3W READY"
);
