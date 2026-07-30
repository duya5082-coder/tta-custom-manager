// =======================================
// CUSTOM TTA MANAGER
// TEAM.JS
// PART 3E
// ACCOUNT + CTV MANAGER
// =======================================

"use strict";



TTA.ACCOUNT_KEY =
"CUSTOM_TTA_ACCOUNTS";



// =======================================
// GET ACCOUNTS
// =======================================


TTA.getAccounts=function(){

    try{

        let data =
        localStorage.getItem(
            TTA.ACCOUNT_KEY
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




// =======================================
// SAVE ACCOUNTS
// =======================================


TTA.saveAccounts=function(data){


    localStorage.setItem(

        TTA.ACCOUNT_KEY,

        JSON.stringify(data)

    );


};





// =======================================
// INIT DEFAULT ACCOUNT
// =======================================


TTA.initAccounts=function(){


    let accounts =
    TTA.getAccounts();



    if(accounts.length===0){


        accounts=[


            {

                id:1,

                username:"admin",

                password:"123456",

                role:"ADMIN",

                name:"Admin",

                active:true

            },


            {

                id:2,

                username:"ctv1",

                password:"123",

                role:"CTV",

                name:"CTV 1",

                active:true

            },


            {

                id:3,

                username:"ctv2",

                password:"123",

                role:"CTV",

                name:"CTV 2",

                active:true

            }


        ];



        TTA.saveAccounts(accounts);


    }


};





// =======================================
// ADD CTV
// =======================================


TTA.addCTV=function(
username,
password,
name
){


    let accounts =
    TTA.getAccounts();



    let exist =
    accounts.find(
        a=>a.username===username
    );



    if(exist){

        return false;

    }




    accounts.push({

        id:Date.now(),

        username:username,

        password:password,

        name:name || username,

        role:"CTV",

        active:true

    });



    TTA.saveAccounts(accounts);



    return true;


};





// =======================================
// DELETE CTV
// =======================================


TTA.deleteCTV=function(username){



    let accounts =
    TTA.getAccounts();



    accounts =
    accounts.filter(

        a=>

        a.username!==username

    );



    TTA.saveAccounts(accounts);


};





// =======================================
// FIND USER
// =======================================


TTA.findAccount=function(
username,
password
){


    let accounts =
    TTA.getAccounts();



    return accounts.find(

        a=>

        a.username===username
        &&
        a.password===password
        &&
        a.active

    );


};





// INIT

TTA.initAccounts();



console.log(
"ACCOUNT ENGINE 3E READY"
);
