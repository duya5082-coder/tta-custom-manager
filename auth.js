// =======================================
// CUSTOM TTA MANAGER
// AUTH.JS
// PHẦN 2D
// LOGIN SYSTEM
// =======================================



// =======================================
// LOGIN FUNCTION
// =======================================

window.login = function(){


    let username =
    document.getElementById(
        "username"
    ).value.trim();



    let password =
    document.getElementById(
        "password"
    ).value.trim();




    let error =
    document.getElementById(
        "loginError"
    );



    let result =
    TTA.login(
        username,
        password
    );




    if(!result.success){


        if(error){

            error.innerHTML =
            result.message;

        }


        return;

    }




    // LƯU PHIÊN

    localStorage.setItem(

        "CUSTOM_TTA_SESSION",

        JSON.stringify(
            result.user
        )

    );




    TTA.currentUser =
    result.user;




    showApp();



};





// =======================================
// SHOW APP
// =======================================

function showApp(){



    let loginPage =
    document.getElementById(
        "loginPage"
    );


    let app =
    document.getElementById(
        "app"
    );



    if(loginPage){

        loginPage.classList.add(
            "hidden"
        );

    }



    if(app){

        app.classList.remove(
            "hidden"
        );

    }



    updateUserInfo();



    openPage(
        "dashboard"
    );



}





// =======================================
// UPDATE USER INFO
// =======================================

function updateUserInfo(){



    let user =
    TTA.currentUser;



    if(!user){

        return;

    }



    let box =
    document.getElementById(
        "userInfo"
    );



    let welcome =
    document.getElementById(
        "welcomeUser"
    );



    if(box){


        box.innerHTML =

        `

        👤 ${user.name}

        <br>

        🔑 ${user.role}

        `;


    }



    if(welcome){


        welcome.innerHTML =

        "Xin chào " +
        user.name;


    }



}





// =======================================
// LOGOUT
// =======================================

window.logout = function(){



    localStorage.removeItem(
        "CUSTOM_TTA_SESSION"
    );



    TTA.currentUser = null;



    let app =
    document.getElementById(
        "app"
    );



    let loginPage =
    document.getElementById(
        "loginPage"
    );



    if(app){

        app.classList.add(
            "hidden"
        );

    }



    if(loginPage){

        loginPage.classList.remove(
            "hidden"
        );

    }


};






// =======================================
// LOAD SESSION
// =======================================

TTA.loadSession = function(){



    let session =
    localStorage.getItem(
        "CUSTOM_TTA_SESSION"
    );



    if(!session){

        return false;

    }



    try{


        TTA.currentUser =
        JSON.parse(
            session
        );



        showApp();



        return true;



    }catch(e){


        console.error(
            "Session lỗi",
            e
        );


        return false;

    }



};





// =======================================
// CHECK ADMIN
// =======================================

TTA.requireAdmin = function(){



    if(
        !TTA.isAdmin()
    ){


        alert(
            "Bạn không có quyền truy cập"
        );


        openPage(
            "dashboard"
        );


        return false;


    }



    return true;


};






// =======================================
// AUTO LOAD
// =======================================

document.addEventListener(
"DOMContentLoaded",
function(){


    TTA.loadSession();


});




// =======================================
// END PART 2D
// =======================================
