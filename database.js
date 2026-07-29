// =======================================
// CUSTOM TTA MANAGER
// DATABASE.JS
// VERSION 1.0
// =======================================

const DB_KEY = "CUSTOM_TTA_DATABASE";

// =======================================
// DATABASE MẶC ĐỊNH
// =======================================

const DEFAULT_DATABASE = {

    version: 1,

    users: [

        {
            id: 1,
            username: "admin",
            password: "123",
            role: "admin",
            name: "ADMIN",
            active: true
        },

        {
            id: 2,
            username: "ctv1",
            password: "101",
            role: "ctv",
            name: "CTV 1",
            active: true
        },

        {
            id: 3,
            username: "ctv2",
            password: "102",
            role: "ctv",
            name: "CTV 2",
            active: true
        }

    ],

    slots: [],

    salaries: [],

    balances: [],

    bills: [],

    notifications: [],

    logs: [],

    settings:{

        slotLimit:12,

        salaryPerSlot:500,

        deductMoney:5000,

        autoCreateTable:true,

        autoDeleteTomorrow:true,

        autoSalary:true

    }

};

// =======================================
// LOAD DATABASE
// =======================================

function loadDatabase(){

    const data = localStorage.getItem(DB_KEY);

    if(!data){

        saveDatabase(DEFAULT_DATABASE);

        return structuredClone(DEFAULT_DATABASE);

    }

    try{

        return JSON.parse(data);

    }catch(e){

        console.error(e);

        saveDatabase(DEFAULT_DATABASE);

        return structuredClone(DEFAULT_DATABASE);

    }

}

// =======================================
// SAVE DATABASE
// =======================================

function saveDatabase(db){

    localStorage.setItem(

        DB_KEY,

        JSON.stringify(db)

    );

}

// =======================================
// GLOBAL DATABASE
// =======================================

let DATABASE = loadDatabase();

// =======================================
// RESET
// =======================================

function resetDatabase(){

    localStorage.removeItem(DB_KEY);

    DATABASE = structuredClone(DEFAULT_DATABASE);

    saveDatabase(DATABASE);

}

// =======================================
// USER
// =======================================

function getUsers(){

    return DATABASE.users;

}

function saveUsers(users){

    DATABASE.users = users;

    saveDatabase(DATABASE);

}

// =======================================
// SLOT
// =======================================

function getSlots(){

    return DATABASE.slots;

}

function saveSlots(slots){

    DATABASE.slots = slots;

    saveDatabase(DATABASE);

}

// =======================================
// SALARY
// =======================================

function getSalary(){

    return DATABASE.salaries;

}

function saveSalary(data){

    DATABASE.salaries = data;

    saveDatabase(DATABASE);

}

// =======================================
// BALANCE
// =======================================

function getBalance(){

    return DATABASE.balances;

}

function saveBalance(data){

    DATABASE.balances = data;

    saveDatabase(DATABASE);

}

// =======================================
// BILL
// =======================================

function getBills(){

    return DATABASE.bills;

}

function saveBills(data){

    DATABASE.bills = data;

    saveDatabase(DATABASE);

}

// =======================================
// LOG
// =======================================

function addLog(action,user){

    DATABASE.logs.push({

        time:new Date().toLocaleString(),

        action,

        user

    });

    saveDatabase(DATABASE);

}

// =======================================
// SETTING
// =======================================

function getSetting(){

    return DATABASE.settings;

}

function saveSetting(setting){

    DATABASE.settings = setting;

    saveDatabase(DATABASE);

}

// =======================================
// INIT
// =======================================

console.log("DATABASE READY");
