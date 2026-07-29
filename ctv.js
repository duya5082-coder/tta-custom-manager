// =======================================
// CUSTOM TTA MANAGER
// CTV.JS
// PHẦN 2H
// CTV MANAGEMENT SYSTEM
// =======================================




// =======================================
// RENDER CTV LIST
// =======================================

TTA.renderCTV = function(){


    let box =
    document.getElementById(
        "userList"
    );



    if(!box){

        return;

    }



    let users =
    TTA.getUsers();



    let ctv =
    users.filter(
        user =>
        user.role === "CTV"
    );




    if(
        ctv.length === 0
    ){

        box.innerHTML =

        `

        <div class="card">

        Chưa có CTV

        </div>

        `;


        return;

    }




    box.innerHTML = "";



    ctv.forEach(
        user => {



            let salaryText = "";



            // ADMIN THẤY LƯƠNG

            if(
                TTA.isAdmin()
            ){

                salaryText =

                `

                💰 Lương:
                ${user.salary || 0}

                `;

            }



            let div =
            document.createElement(
                "div"
            );



            div.className =
            "card";



            div.innerHTML =


            `

            <h3>

            ${user.name}

            </h3>


            <p>

            👤
            ${user.username}

            </p>



            <p>

            🔑
            ${user.role}

            </p>


            <p>

            ${salaryText}

            </p>



            ${
            TTA.isAdmin()

            ?

            `

            <button onclick="deleteCTV(${user.id})">

            Xóa

            </button>

            `

            :

            ""

            }



            `;



            box.appendChild(
                div
            );


        }
    );


};







// =======================================
// CREATE CTV
// =======================================

window.createCTV = function(){



    if(
        !TTA.isAdmin()
    ){


        alert(
            "Chỉ Admin được tạo CTV"
        );


        return;

    }




    let name =
    prompt(
        "Tên CTV"
    );



    let username =
    prompt(
        "Tài khoản"
    );



    let password =
    prompt(
        "Mật khẩu"
    );



    if(
        !username ||
        !password
    ){

        return;

    }




    TTA.createUser({

        name:name,

        username:username,

        password:password,

        role:"CTV"

    });





    TTA.renderCTV();



};








// =======================================
// DELETE CTV
// =======================================

window.deleteCTV = function(id){



    if(
        !TTA.isAdmin()
    ){

        return;

    }



    if(
        confirm(
            "Xóa CTV này?"
        )
    ){



        TTA.database.users =

        TTA.getUsers()
        .filter(
            user =>
            user.id != id
        );



        TTA.saveDatabase();



        TTA.renderCTV();


    }


};







// =======================================
// BLOCK SALARY PAGE
// =======================================

TTA.checkSalaryAccess = function(){



    if(
        !TTA.isAdmin()
    ){



        let box =
        document.getElementById(
            "salaryList"
        );



        if(box){


            box.innerHTML =

            `

            <div class="card">

            🔒 Bạn không có quyền xem lương

            </div>

            `;


        }



        return false;


    }



    return true;


};






// =======================================
// PAGE HOOK
// =======================================


let oldCTVOpenPage =
window.openPage;



window.openPage = function(page){



    oldCTVOpenPage(page);



    if(
        page === "ctv"
    ){


        TTA.renderCTV();


    }



    if(
        page === "salary"
    ){


        TTA.checkSalaryAccess();


    }



};







// =======================================
// AUTO LOAD
// =======================================

document.addEventListener(
"DOMContentLoaded",
function(){


    TTA.renderCTV();


});





// =======================================
// END PART 2H
// =======================================
