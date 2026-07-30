// =======================================
// CUSTOM TTA MANAGER
// CTV_MANAGER.JS
// PART 3I
// =======================================

"use strict";



TTA.renderCTVManager=function(){


    let box =
    document.getElementById(
        "ctv"
    );


    if(!box)
    return;



    if(!TTA.isAdmin())
    {

        box.innerHTML=
        "<h2>Không có quyền</h2>";

        return;

    }



    let users =
    TTA.getAccounts();



    let html=`

    <h2>
    Quản lý CTV
    </h2>


    <button onclick="
    TTA.createCTVPrompt()
    ">
    ➕ Thêm CTV
    </button>


    <div>
    `;



    users
    .filter(
        u=>u.role==="CTV"
    )
    .forEach(u=>{


        html+=`

        <div class="card">


        👤 ${u.name}

        <br>

        User:
        ${u.username}


        <button onclick="
        TTA.deleteCTV('${u.username}')
        ">
        Xóa
        </button>


        </div>

        `;


    });



    html+="</div>";



    box.innerHTML=html;


};





TTA.createCTVPrompt=function(){


    let user =
    prompt(
        "Tên đăng nhập"
    );


    let pass =
    prompt(
        "Mật khẩu"
    );


    if(
        user &&
        pass
    ){


        TTA.addCTV(
            user,
            pass,
            user
        );


        TTA.renderCTVManager();


    }


};





console.log(
"CTV MANAGER 3I READY"
);
