// =======================================
// CUSTOM TTA MANAGER
// AUTH CTV CONNECT
// PART 3Q
// =======================================

"use strict";



// =======================================
// LOGIN ACCOUNT CHECK
// =======================================


TTA.loginAccount=function(
username,
password
){


    let accounts =
    TTA.getAccounts
    ?
    TTA.getAccounts()
    :
    [];



    let user =
    accounts.find(
        u =>
        u.username===username &&
        u.password===password
    );



    if(!user){


        alert(
        "Sai tài khoản hoặc mật khẩu"
        );


        return false;

    }



    TTA.currentUser = user;



    localStorage.setItem(

        "CUSTOM_TTA_SESSION",

        JSON.stringify(user)

    );



    console.log(
        "LOGIN:",
        user.username,
        user.role
    );



    return true;


};





// =======================================
// LOAD SESSION
// =======================================


TTA.loadSession=function(){


    let data =
    localStorage.getItem(
        "CUSTOM_TTA_SESSION"
    );


    if(data){


        try{


            TTA.currentUser =
            JSON.parse(data);


        }
        catch(e){


            TTA.currentUser=null;


        }


    }


};





// =======================================
// PERMISSION MENU
// =======================================


TTA.applyCTVPermission=function(){


    let user =
    TTA.currentUser;



    if(!user)
    return;




    if(
        user.role==="CTV"
    ){


        let hideMenu=[

            "payment",
            "balance",
            "ctv",
            "setting"

        ];



        hideMenu.forEach(id=>{


            let menu =
            document.querySelector(
            `[onclick="openPage('${id}')"]`
            );


            if(menu){

                menu.style.display="none";

            }


        });



    }



};





window.addEventListener(
"load",
()=>{


    TTA.loadSession();


    TTA.applyCTVPermission();


});





console.log(
"AUTH CTV CONNECT 3Q READY"
);
