// =======================================
// CUSTOM TTA MANAGER
// APP.JS
// PHẦN 1A
// SYSTEM CORE
// =======================================

"use strict";

// =======================================
// APP
// =======================================

const TTA = {

    version: "2.0.0",

    appName: "CUSTOM TTA MANAGER",

    currentUser: null,

    currentRole: null,

    currentPage: "dashboard",

    loaded: false,

    ready: false,

    database: {

        users: [],

        slots: [],

        salaries: [],

        balances: [],

        settings: {

            slotLimit: 12,

            slotPrice: 5000,

            salaryPerSlot: 500,

            salaryDelay: 90

        }

    }

};

// =======================================
// STORAGE
// =======================================

const STORAGE_KEY = "CUSTOM_TTA_DATABASE";

// =======================================
// LOAD DATABASE
// =======================================

function loadDatabase(){

    try{

        const data = JSON.parse(
            localStorage.getItem(STORAGE_KEY)
        );

        if(data){

            TTA.database = data;

        }

    }catch(e){

        console.warn("Không thể đọc dữ liệu.");

    }

}

// =======================================
// SAVE DATABASE
// =======================================

function saveDatabase(){

    localStorage.setItem(

        STORAGE_KEY,

        JSON.stringify(TTA.database)

    );

}

// =======================================
// RESET DATABASE
// =======================================

function resetDatabase(){

    localStorage.removeItem(STORAGE_KEY);

    location.reload();

}

// =======================================
// APP START
// =======================================

function startApp(){

    loadDatabase();

    TTA.loaded = true;

    TTA.ready = true;

    console.log("================================");

    console.log(TTA.appName);

    console.log("Version:",TTA.version);

    console.log("Loaded");

    console.log("================================");

}

// =======================================
// START
// =======================================

window.addEventListener(

    "DOMContentLoaded",

    startApp

);
// =======================================
// CUSTOM TTA MANAGER
// APP.JS
// PHẦN 1B
// CORE DATABASE SYSTEM
// =======================================


// =======================================
// STORAGE HELPER
// =======================================

TTA.storage = {

    get(key, defaultValue){

        try{

            let data = localStorage.getItem(key);

            if(!data){
                return defaultValue;
            }

            return JSON.parse(data);

        }catch(error){

            console.error(
                "Storage GET lỗi:",
                error
            );

            return defaultValue;
        }

    },


    set(key,value){

        try{

            localStorage.setItem(
                key,
                JSON.stringify(value)
            );

            return true;

        }catch(error){

            console.error(
                "Storage SET lỗi:",
                error
            );

            return false;
        }

    },


    remove(key){

        localStorage.removeItem(key);

    }

};




// =======================================
// DATABASE INIT
// =======================================

TTA.initDatabase = function(){

    const defaultDB = {

        users: [],

        teams: [],

        slots: [],

        bills: [],

        logs: [],

        settings: {

            appName:
            "CUSTOM TTA MANAGER",

            version:
            "1.0.0"

        }

    };


    let database =
    TTA.storage.get(
        "CUSTOM_TTA_DATABASE",
        null
    );


    if(!database){

        database = defaultDB;


        TTA.storage.set(
            "CUSTOM_TTA_DATABASE",
            database
        );

    }


    TTA.database =
    database;


    console.log(
        "Database Loaded",
        TTA.database
    );


};




// =======================================
// SAVE DATABASE
// =======================================

TTA.saveDatabase = function(){

    if(!TTA.database){

        console.warn(
            "Database chưa tồn tại"
        );

        return;

    }


    TTA.storage.set(
        "CUSTOM_TTA_DATABASE",
        TTA.database
    );


};




// =======================================
// LOAD DATABASE
// =======================================

TTA.loadDatabase = function(){

    TTA.database =
    TTA.storage.get(
        "CUSTOM_TTA_DATABASE",
        {
            users:[],
            teams:[],
            slots:[],
            bills:[],
            logs:[]
        }
    );


};




// =======================================
// RESET DATABASE
// =======================================

TTA.resetDatabase = function(){

    if(
        confirm(
            "Xóa toàn bộ dữ liệu?"
        )
    ){

        localStorage.removeItem(
            "CUSTOM_TTA_DATABASE"
        );


        location.reload();

    }


};




// =======================================
// AUTO START DATABASE
// =======================================

TTA.initDatabase();



// =======================================
// END PART 1B
// =======================================
// =======================================
// CUSTOM TTA MANAGER
// APP.JS
// PHẦN 1C
// USER & PERMISSION SYSTEM
// =======================================



// =======================================
// USER DATABASE
// =======================================


TTA.getUsers = function(){

    if(!TTA.database.users){

        TTA.database.users = [];

    }


    return TTA.database.users;

};




// =======================================
// SAVE USERS
// =======================================


TTA.saveUsers = function(users){

    TTA.database.users = users;

    TTA.saveDatabase();

};




// =======================================
// CREATE USER
// =======================================


TTA.createUser = function(data){


    let users =
    TTA.getUsers();



    let newUser = {

        id:
        Date.now(),


        username:
        data.username,


        password:
        data.password,


        name:
        data.name || "User",


        role:
        data.role || "CTV",


        salary:
        data.salary || 0,


        created:
        new Date()
        .toISOString()

    };



    users.push(newUser);



    TTA.saveUsers(
        users
    );


    return newUser;


};




// =======================================
// FIND USER
// =======================================


TTA.findUser = function(username){


    let users =
    TTA.getUsers();



    return users.find(
        user =>
        user.username === username
    );


};




// =======================================
// LOGIN
// =======================================


TTA.login = function(
    username,
    password
){


    let user =
    TTA.findUser(
        username
    );



    if(!user){

        return {

            success:false,

            message:
            "Không tồn tại tài khoản"

        };

    }



    if(
        user.password !== password
    ){

        return {

            success:false,

            message:
            "Sai mật khẩu"

        };

    }



    TTA.currentUser =
    user;



    return {

        success:true,

        user:user

    };


};




// =======================================
// CHECK PERMISSION
// =======================================


TTA.hasRole = function(role){


    if(!TTA.currentUser){

        return false;

    }



    return (
        TTA.currentUser.role === role
    );


};




// =======================================
// ADMIN CHECK
// =======================================


TTA.isAdmin = function(){


    return TTA.hasRole(
        "ADMIN"
    );


};




// =======================================
// CTV VIEW FILTER
// ẨN LƯƠNG CTV
// =======================================


TTA.filterUserData = function(user){


    if(
        TTA.isAdmin()
    ){

        return user;

    }



    return {

        id:user.id,

        username:user.username,

        name:user.name,

        role:user.role

    };


};




// =======================================
// CREATE DEFAULT ADMIN
// =======================================


(function(){


    let users =
    TTA.getUsers();



    if(
        users.length === 0
    ){


        TTA.createUser({

            username:
            "admin",


            password:
            "123456",


            name:
            "Administrator",


            role:
            "ADMIN"

        });


        console.log(
            "Tạo tài khoản Admin mặc định"
        );


    }


})();




// =======================================
// END PART 1C
// =======================================
// =======================================
// CUSTOM TTA MANAGER
// APP.JS
// PHẦN 1D
// TEAM MANAGEMENT SYSTEM
// =======================================



// =======================================
// TEAM DATABASE
// =======================================


TTA.getTeams = function(){

    if(!TTA.database.teams){

        TTA.database.teams = [];

    }


    return TTA.database.teams;

};




// =======================================
// SAVE TEAM
// =======================================


TTA.saveTeams = function(teams){

    TTA.database.teams = teams;

    TTA.saveDatabase();

};




// =======================================
// CREATE TEAM
// =======================================


TTA.createTeam = function(data){


    let teams =
    TTA.getTeams();



    let newTeam = {

        id:
        Date.now(),


        name:
        data.name || "Team mới",


        leader:
        data.leader || null,


        members:
        [],


        created:
        new Date()
        .toISOString()

    };



    teams.push(
        newTeam
    );



    TTA.saveTeams(
        teams
    );


    return newTeam;


};




// =======================================
// FIND TEAM
// =======================================


TTA.findTeam = function(id){


    return TTA.getTeams()
    .find(
        team =>
        team.id == id
    );


};




// =======================================
// ADD MEMBER TO TEAM
// =======================================


TTA.addMemberToTeam = function(
    teamId,
    userId
){


    let team =
    TTA.findTeam(
        teamId
    );



    if(!team){

        return false;

    }



    if(
        !team.members.includes(userId)
    ){

        team.members.push(
            userId
        );

    }



    TTA.saveDatabase();


    return true;


};




// =======================================
// REMOVE MEMBER
// =======================================


TTA.removeMemberFromTeam = function(
    teamId,
    userId
){


    let team =
    TTA.findTeam(
        teamId
    );



    if(!team){

        return false;

    }



    team.members =
    team.members.filter(
        id =>
        id != userId
    );



    TTA.saveDatabase();


    return true;


};




// =======================================
// GET TEAM MEMBERS
// =======================================


TTA.getTeamMembers = function(
    teamId
){


    let team =
    TTA.findTeam(
        teamId
    );



    if(!team){

        return [];

    }



    return TTA.getUsers()
    .filter(
        user =>
        team.members.includes(
            user.id
        )
    );


};




// =======================================
// DELETE TEAM
// =======================================


TTA.deleteTeam = function(
    teamId
){


    TTA.database.teams =
    TTA.getTeams()
    .filter(
        team =>
        team.id != teamId
    );



    TTA.saveDatabase();


    return true;


};




// =======================================
// DEFAULT TEST TEAM
// =======================================


(function(){


    let teams =
    TTA.getTeams();



    if(
        teams.length === 0
    ){


        TTA.createTeam({

            name:
            "Team Demo"

        });


        console.log(
            "Đã tạo Team Demo"
        );


    }


})();




// =======================================
// END PART 1D
// =======================================
// =======================================
// CUSTOM TTA MANAGER
// APP.JS
// PHẦN 1E
// SLOT MANAGEMENT SYSTEM
// =======================================



// =======================================
// SLOT DATABASE
// =======================================


TTA.getSlots = function(){

    if(!TTA.database.slots){

        TTA.database.slots = [];

    }


    return TTA.database.slots;

};




// =======================================
// SAVE SLOTS
// =======================================


TTA.saveSlots = function(slots){

    TTA.database.slots = slots;

    TTA.saveDatabase();

};




// =======================================
// CREATE SLOT
// =======================================


TTA.createSlot = function(data){


    let slots =
    TTA.getSlots();



    let newSlot = {


        id:
        Date.now(),


        teamId:
        data.teamId || null,


        date:
        data.date || "",


        startTime:
        data.startTime || "",


        endTime:
        data.endTime || "",


        title:
        data.title || "Ca làm việc",


        assigned:
        data.assigned || [],


        status:
        "OPEN",


        created:
        new Date()
        .toISOString()


    };



    slots.push(
        newSlot
    );



    TTA.saveSlots(
        slots
    );


    return newSlot;


};




// =======================================
// FIND SLOT
// =======================================


TTA.findSlot = function(id){


    return TTA.getSlots()
    .find(
        slot =>
        slot.id == id
    );


};




// =======================================
// UPDATE SLOT
// =======================================


TTA.updateSlot = function(
    id,
    data
){


    let slot =
    TTA.findSlot(
        id
    );



    if(!slot){

        return false;

    }



    Object.assign(
        slot,
        data
    );



    TTA.saveDatabase();


    return true;


};




// =======================================
// DELETE SLOT
// =======================================


TTA.deleteSlot = function(id){


    TTA.database.slots =
    TTA.getSlots()
    .filter(
        slot =>
        slot.id != id
    );



    TTA.saveDatabase();


    return true;


};




// =======================================
// ADD USER TO SLOT
// =======================================


TTA.assignUserToSlot = function(
    slotId,
    userId
){


    let slot =
    TTA.findSlot(
        slotId
    );



    if(!slot){

        return false;

    }



    if(
        !slot.assigned.includes(userId)
    ){

        slot.assigned.push(
            userId
        );

    }



    TTA.saveDatabase();


    return true;


};




// =======================================
// REMOVE USER FROM SLOT
// =======================================


TTA.removeUserFromSlot = function(
    slotId,
    userId
){


    let slot =
    TTA.findSlot(
        slotId
    );



    if(!slot){

        return false;

    }



    slot.assigned =
    slot.assigned.filter(
        id =>
        id != userId
    );



    TTA.saveDatabase();


    return true;


};




// =======================================
// GET TEAM SLOTS
// =======================================


TTA.getTeamSlots = function(
    teamId
){


    return TTA.getSlots()
    .filter(
        slot =>
        slot.teamId == teamId
    );


};




// =======================================
// COPY SLOT
// SAO CHÉP KHUNG GIỜ
// =======================================


TTA.copySlot = function(
    slotId
){


    let oldSlot =
    TTA.findSlot(
        slotId
    );



    if(!oldSlot){

        return null;

    }



    let newSlot = {

        ...oldSlot,


        id:
        Date.now(),


        status:
        "OPEN",


        created:
        new Date()
        .toISOString()

    };



    TTA.database.slots.push(
        newSlot
    );



    TTA.saveDatabase();


    return newSlot;


};




// =======================================
// FORMAT SLOT MESSAGE
// CHUẨN BỊ GỬI MESSENGER
// =======================================


TTA.formatSlotMessage = function(
    slot
){


    return `

📌 ${slot.title}

📅 Ngày: ${slot.date}

⏰ Thời gian:
${slot.startTime} - ${slot.endTime}

📊 Trạng thái:
${slot.status}

    `.trim();


};




// =======================================
// END PART 1E
// =======================================
// =======================================
// CUSTOM TTA MANAGER
// APP.JS
// PHẦN 1F
// BILL MANAGEMENT SYSTEM
// =======================================



// =======================================
// GET BILLS
// =======================================

TTA.getBills = function(){

    if(!Array.isArray(TTA.database.bills)){

        TTA.database.bills = [];

    }


    return TTA.database.bills;

};




// =======================================
// SAVE BILLS
// =======================================

TTA.saveBills = function(){

    TTA.saveDatabase();

};




// =======================================
// CREATE BILL
// =======================================

TTA.createBill = function(data = {}){


    let bills =
    TTA.getBills();



    let bill = {


        id:
        Date.now(),



        userId:
        data.userId || null,



        teamId:
        data.teamId || null,



        slotId:
        data.slotId || null,



        title:
        data.title || "Bill mới",



        amount:
        Number(data.amount) || 0,



        status:
        "PENDING",



        note:
        data.note || "",



        created:
        new Date().toISOString()


    };



    bills.push(bill);



    TTA.saveBills();



    return bill;

};




// =======================================
// FIND BILL
// =======================================

TTA.findBill = function(id){


    return TTA.getBills()
    .find(
        bill =>
        bill.id == id
    );


};




// =======================================
// UPDATE BILL
// =======================================

TTA.updateBill = function(
    id,
    data = {}
){

    let bill =
    TTA.findBill(id);



    if(!bill){

        return false;

    }



    Object.assign(
        bill,
        data
    );



    TTA.saveBills();



    return true;

};




// =======================================
// DELETE BILL
// =======================================

TTA.deleteBill = function(id){


    TTA.database.bills =
    TTA.getBills()
    .filter(
        bill =>
        bill.id != id
    );



    TTA.saveBills();



    return true;

};




// =======================================
// CHANGE BILL STATUS
// =======================================

TTA.updateBillStatus = function(
    id,
    status
){

    let bill =
    TTA.findBill(id);



    if(!bill){

        return false;

    }



    bill.status = status;



    TTA.saveBills();



    return true;

};




// =======================================
// GET USER BILLS
// =======================================

TTA.getUserBills = function(
    userId
){


    return TTA.getBills()
    .filter(
        bill =>
        bill.userId == userId
    );


};




// =======================================
// TOTAL BILL
// =======================================

TTA.calculateTotalBill = function(
    bills = []
){


    return bills.reduce(
        (total,bill)=>{

            return total +
            Number(bill.amount || 0);

        },
        0
    );


};




// =======================================
// VIEW SALARY PERMISSION
// ADMIN XEM
// CTV ẨN
// =======================================

TTA.getSalaryView = function(
    userId
){


    let bills =
    TTA.getUserBills(
        userId
    );



    if(
        TTA.isAdmin()
    ){

        return {

            visible:true,

            total:
            TTA.calculateTotalBill(
                bills
            ),

            bills:bills

        };

    }



    return {

        visible:false,

        total:0,

        bills:[]

    };


};




// =======================================
// FORMAT BILL MESSAGE
// =======================================

TTA.formatBillMessage = function(
    bill
){


    return [

        "🧾 " + bill.title,

        "💰 Số tiền: " +
        bill.amount,

        "📌 Trạng thái: " +
        bill.status

    ].join("\n");


};




// =======================================
// END PART 1F
// =======================================
// =======================================
// CUSTOM TTA MANAGER
// APP.JS
// PHẦN 2A
// PAGE ROUTER SYSTEM
// =======================================



// =======================================
// CURRENT PAGE
// =======================================

TTA.currentPage =
TTA.currentPage || "dashboard";




// =======================================
// OPEN PAGE
// =======================================

window.openPage = function(page){


    let pages =
    document.querySelectorAll(
        ".page"
    );



    pages.forEach(
        item => {

            item.classList.add(
                "hidden"
            );

        }
    );



    let target =
    document.getElementById(
        page
    );



    if(target){

        target.classList.remove(
            "hidden"
        );


        TTA.currentPage =
        page;


        console.log(
            "Open page:",
            page
        );


    }else{


        console.warn(
            "Không tìm thấy page:",
            page
        );


    }


};




// =======================================
// MENU CLICK
// =======================================

window.menuClick = function(page){


    if(
        typeof window.openPage === "function"
    ){

        window.openPage(page);

    }


};




// =======================================
// CHECK LOGIN UI
// =======================================

TTA.checkLoginUI = function(){


    let user =
    TTA.currentUser;



    let box =
    document.getElementById(
        "userInfo"
    );



    if(
        !box
    ){

        return;

    }



    if(user){


        box.innerHTML =

        `

        👤 ${user.name}

        <br>

        🔑 ${user.role}

        `;


    }else{


        box.innerHTML =
        "Chưa đăng nhập";


    }


};




// =======================================
// LOGOUT
// =======================================

window.logout = function(){


    TTA.currentUser = null;


    TTA.checkLoginUI();


    openPage(
        "login"
    );


};




// =======================================
// INIT PAGE
// =======================================

TTA.initPage = function(){


    let first =
    document.querySelector(
        ".page"
    );



    if(first){

        document
        .querySelectorAll(
            ".page"
        )
        .forEach(
            p =>
            p.classList.add(
                "hidden"
            )
        );



        first.classList.remove(
            "hidden"
        );

    }



    console.log(
        "Page System Ready"
    );


};




// =======================================
// AUTO START PAGE
// =======================================

document.addEventListener(
"DOMContentLoaded",
function(){


    TTA.initPage();


    TTA.checkLoginUI();


});




// =======================================
// END PART 2A
// =======================================
// =======================================
// CUSTOM TTA MANAGER
// APP.JS
// PHẦN 2E
// DASHBOARD DATA SYSTEM
// =======================================



// =======================================
// COUNT SLOTS
// =======================================

TTA.countSlots = function(){


    return TTA.getSlots()
    .length;


};




// =======================================
// COUNT FULL SLOT
// =======================================

TTA.countFullSlots = function(){


    return TTA.getSlots()
    .filter(
        slot =>
        slot.status === "FULL"
    )
    .length;


};




// =======================================
// COUNT BILLS
// =======================================

TTA.countBills = function(){


    return TTA.getBills()
    .length;


};




// =======================================
// COUNT CTV
// =======================================

TTA.countCTV = function(){


    return TTA.getUsers()
    .filter(
        user =>
        user.role === "CTV"
    )
    .length;


};




// =======================================
// UPDATE DASHBOARD
// =======================================

TTA.updateDashboard = function(){



    let totalSlot =
    document.getElementById(
        "totalSlot"
    );



    let fullSlot =
    document.getElementById(
        "fullSlot"
    );



    let totalBill =
    document.getElementById(
        "totalBill"
    );



    let totalCTV =
    document.getElementById(
        "totalCTV"
    );




    if(totalSlot){

        totalSlot.innerHTML =
        TTA.countSlots();

    }



    if(fullSlot){

        fullSlot.innerHTML =
        TTA.countFullSlots();

    }



    if(totalBill){

        totalBill.innerHTML =
        TTA.countBills();

    }



    if(totalCTV){

        totalCTV.innerHTML =
        TTA.countCTV();

    }



};





// =======================================
// DASHBOARD REFRESH
// =======================================

TTA.refreshDashboard = function(){


    TTA.updateDashboard();


};





// =======================================
// OPEN PAGE HOOK
// =======================================

let oldOpenPage =
window.openPage;



window.openPage = function(page){


    oldOpenPage(page);



    if(
        page === "dashboard"
    ){

        TTA.refreshDashboard();

    }


};





// =======================================
// AUTO UPDATE
// =======================================

document.addEventListener(
"DOMContentLoaded",
function(){


    setTimeout(
        function(){

            TTA.updateDashboard();

        },
        500
    );


});




// =======================================
// END PART 2E
// =======================================
