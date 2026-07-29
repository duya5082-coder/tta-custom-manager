// =======================================
// CUSTOM TTA MANAGER
// PERMISSION.JS
// PHẦN 2N
// ROLE PERMISSION SYSTEM
// =======================================





// =======================================
// ROLE LIST
// =======================================


TTA.ROLES = {


    ADMIN:{

        name:
        "Quản trị viên",

        permissions:[

            "all"

        ]

    },



    MANAGER:{

        name:
        "Quản lý",

        permissions:[

            "slot",

            "bill",

            "ctv"

        ]

    },



    CTV:{

        name:
        "Cộng tác viên",

        permissions:[

            "slot:view"

        ]

    }


};








// =======================================
// GET CURRENT ROLE
// =======================================

TTA.getRole = function(){



    if(
        !TTA.currentUser
    ){

        return null;

    }



    return TTA.currentUser.role;


};








// =======================================
// CHECK PERMISSION
// =======================================

TTA.hasPermission = function(permission){



    let role =
    TTA.getRole();



    if(!role){

        return false;

    }




    let data =
    TTA.ROLES[role];



    if(!data){

        return false;

    }





    if(
        data.permissions.includes(
            "all"
        )
    ){

        return true;

    }





    return data.permissions.includes(
        permission
    );



};








// =======================================
// REQUIRE PERMISSION
// =======================================

TTA.requirePermission = function(permission){



    if(
        !TTA.hasPermission(
            permission
        )
    ){


        alert(

            "Bạn không có quyền sử dụng chức năng này"

        );


        return false;


    }



    return true;



};








// =======================================
// HIDE MENU BY ROLE
// =======================================

TTA.updateMenuPermission = function(){



    let menu =
    document.querySelectorAll(
        ".menu-item"
    );



    menu.forEach(
        item=>{


            item.style.display =
            "block";


        }
    );



    let role =
    TTA.getRole();




    if(
        role === "CTV"
    ){



        let salary =
        document.querySelector(
            "[onclick=\"openPage('salary')\"]"
        );



        if(salary){

            salary.style.display =
            "none";

        }



        let setting =
        document.querySelector(
            "[onclick=\"openPage('setting')\"]"
        );



        if(setting){

            setting.style.display =
            "none";

        }


    }



};








// =======================================
// PROTECT PAGE
// =======================================

TTA.protectPage = function(page){



    let role =
    TTA.getRole();




    if(
        !role
    ){

        return false;

    }




    if(
        page === "salary"
    ){


        return TTA.hasPermission(
            "salary"
        );


    }




    if(
        page === "setting"
    ){


        return TTA.hasPermission(
            "all"
        );


    }





    return true;


};








// =======================================
// OPEN PAGE SECURITY
// =======================================


let oldPermissionOpenPage =
window.openPage;



window.openPage = function(page){



    if(
        !TTA.protectPage(
            page
        )
    ){


        alert(
            "Không thể truy cập trang này"
        );


        return;

    }



    oldPermissionOpenPage(page);



};








// =======================================
// AFTER LOGIN
// =======================================

let oldShowApp =
window.showApp;



window.showApp = function(){



    if(
        oldShowApp
    ){

        oldShowApp();

    }



    setTimeout(
        function(){


            TTA.updateMenuPermission();


        },
        200
    );



};








// =======================================
// END PART 2N
// =======================================
