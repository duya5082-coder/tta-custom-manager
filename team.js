// =======================================
// CUSTOM TTA MANAGER
// TEAM.JS
// PART 3E
// CTV ACCOUNT ENGINE
// =======================================

"use strict";


TTA.CTV_KEY =
"CUSTOM_TTA_ACCOUNTS";




// ===============================
// LOAD ACCOUNT
// ===============================


TTA.getCTVAccounts=function(){


    try{

        let data =
        localStorage.getItem(
            TTA.CTV_KEY
        );


        return data
        ?
        JSON.parse(data)
        :
        [];


    }
    catch(e){

        return [];

    }


};





// ===============================
// SAVE ACCOUNT
// ===============================


TTA.saveCTVAccounts=function(data){


    localStorage.setItem(

        TTA.CTV_KEY,

        JSON.stringify(data)

    );


};





// ===============================
// ADD CTV
// ===============================


TTA.addCTV=function(
username,
password
){



    let list =
    TTA.getCTVAccounts();



    let exist =
    list.find(
        x=>x.username===username
    );



    if(exist){

        return false;

    }



    list.push({


        id:Date.now(),


        username:username,


        password:password,


        role:"CTV",


        active:true


    });



    TTA.saveCTVAccounts(
        list
    );



    return true;


};





// ===============================
// DELETE CTV
// ===============================


TTA.removeCTV=function(username){



    let list =
    TTA.getCTVAccounts();



    list =
    list.filter(
        x=>x.username!==username
    );



    TTA.saveCTVAccounts(
        list
    );


};





console.log(
"CTV ENGINE 3E READY"
);
