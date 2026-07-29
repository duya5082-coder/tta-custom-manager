// =======================================
// CUSTOM TTA MANAGER
// TEAM.JS
// PHẦN 2O
// TEAM MANAGEMENT SYSTEM
// =======================================




// =======================================
// GET TEAM DATA
// =======================================


TTA.getTeams = function(){


    if(
        !Array.isArray(
            TTA.database.teams
        )
    ){

        TTA.database.teams = [];

    }


    return TTA.database.teams;


};






// =======================================
// CREATE TEAM
// =======================================


window.createTeam = function(){



    if(
        !TTA.hasPermission("all")
    ){

        alert(
            "Chỉ Admin được tạo Team"
        );

        return;

    }




    let name =
    prompt(
        "Tên Team"
    );



    let leader =
    prompt(
        "Tên trưởng nhóm"
    );



    if(!name){

        return;

    }



    let teams =
    TTA.getTeams();



    teams.push({

        id:
        Date.now(),

        name:name,

        leader:
        leader || "Chưa có",

        members:[],

        created:
        new Date()
        .toISOString()


    });



    TTA.saveDatabase();



    TTA.renderTeams();



};








// =======================================
// RENDER TEAM
// =======================================


TTA.renderTeams = function(){



    let box =
    document.getElementById(
        "teamList"
    );



    if(!box){

        return;

    }




    let teams =
    TTA.getTeams();



    if(
        teams.length === 0
    ){


        box.innerHTML =

        `

        <div class="card">

        Chưa có Team

        </div>

        `;


        return;

    }



    box.innerHTML = "";




    teams.forEach(
        team=>{


            let div =
            document.createElement(
                "div"
            );



            div.className =
            "card";



            div.innerHTML =


            `

            <h3>
            👥 ${team.name}
            </h3>


            <p>
            👑 Trưởng nhóm:
            ${team.leader}
            </p>


            <p>
            👤 Thành viên:
            ${team.members.length}
            </p>



            <button onclick="assignCTV(${team.id})">

            + Gán CTV

            </button>



            <button onclick="deleteTeam(${team.id})">

            Xóa

            </button>


            `;



            box.appendChild(
                div
            );


        }
    );



};








// =======================================
// ASSIGN CTV
// =======================================


window.assignCTV = function(teamId){



    if(
        !TTA.isAdmin()
    ){

        alert(
            "Không có quyền"
        );


        return;

    }




    let username =
    prompt(
        "Nhập username CTV"
    );



    if(!username){

        return;

    }




    let user =
    TTA.getUsers()
    .find(
        u =>
        u.username === username
    );



    if(
        !user ||
        user.role !== "CTV"
    ){


        alert(
            "Không tìm thấy CTV"
        );


        return;


    }





    let team =
    TTA.getTeams()
    .find(
        t =>
        t.id === teamId
    );




    if(
        !team.members.includes(
            username
        )
    ){


        team.members.push(
            username
        );


    }





    TTA.saveDatabase();


    TTA.renderTeams();



};








// =======================================
// DELETE TEAM
// =======================================


window.deleteTeam = function(id){



    if(
        !TTA.isAdmin()
    ){

        return;

    }



    if(
        confirm(
            "Xóa Team này?"
        )
    ){



        TTA.database.teams =

        TTA.getTeams()
        .filter(
            t =>
            t.id !== id
        );



        TTA.saveDatabase();



        TTA.renderTeams();


    }



};








// =======================================
// PAGE HOOK
// =======================================


let oldTeamOpenPage =
window.openPage;



window.openPage = function(page){



    oldTeamOpenPage(page);



    if(
        page === "team"
    ){


        TTA.renderTeams();


    }



};








// =======================================
// AUTO LOAD
// =======================================

document.addEventListener(
"DOMContentLoaded",
function(){


    TTA.renderTeams();


});




// =======================================
// END PART 2O
// =======================================
