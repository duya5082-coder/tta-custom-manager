// =======================================
// CUSTOM TTA MANAGER
// CONFIG.JS
// VERSION 1.0
// =======================================

const APP_CONFIG = {

    appName: "CUSTOM TTA MANAGER",

    version: "1.0.0",

    company: "CUSTOM TTA",

    developer: "CUSTOM",

    storageKey: "CUSTOM_TTA_DATABASE",

    loginKey: "CUSTOM_TTA_LOGIN"

};

// =======================================
// ROLE
// =======================================

const ROLE = {

    ADMIN: "admin",

    CTV: "ctv"

};

// =======================================
// LOGIN
// =======================================

const LOGIN = {

    ADMIN:{

        username:"admin",

        password:"123"

    },

    CTV1:{

        username:"ctv1",

        password:"101"

    },

    CTV2:{

        username:"ctv2",

        password:"102"

    }

};

// =======================================
// SLOT
// =======================================

const SLOT = {

    LIMIT:12,

    TABLES:[

        "A",

        "B",

        "C",

        "D"

    ],

    AUTO_CREATE:true,

    AUTO_DELETE_NEXT_DAY:true

};

// =======================================
// PAYMENT
// =======================================

const PAYMENT = {

    PAID:"💸",

    UNPAID:"🚫",

    WAIT:"⏳",

    CANCEL:"❌",

    DEDUCT:5000

};

// =======================================
// SALARY
// =======================================

const SALARY = {

    SLOT_PRICE:500,

    DELAY:90,

    AUTO_ADD:true

};

// =======================================
// MENU
// =======================================

const MENU = [

    {

        id:"dashboard",

        icon:"🏠",

        name:"Dashboard"

    },

    {

        id:"slot",

        icon:"🎮",

        name:"Slot"

    },

    {

        id:"payment",

        icon:"💸",

        name:"Thanh toán"

    },

    {

        id:"balance",

        icon:"💰",

        name:"Danh sách dư"

    },

    {

        id:"salary",

        icon:"📊",

        name:"Bảng lương"

    },

    {

        id:"ctv",

        icon:"👥",

        name:"CTV"

    },

    {

        id:"setting",

        icon:"⚙️",

        name:"Cài đặt"

    }

];

// =======================================
// COLOR
// =======================================

const COLOR = {

    PRIMARY:"#2563eb",

    SUCCESS:"#16a34a",

    WARNING:"#f59e0b",

    DANGER:"#dc2626",

    DARK:"#111827",

    LIGHT:"#f4f7fb"

};

// =======================================
// MESSAGE
// =======================================

const MESSAGE = {

    LOGIN_SUCCESS:"Đăng nhập thành công",

    LOGIN_ERROR:"Sai tài khoản hoặc mật khẩu",

    FULL_SLOT:"Slot đã đủ 12 người",

    SAVE_SUCCESS:"Đã lưu dữ liệu",

    DELETE_SUCCESS:"Đã xóa",

    UPDATE_SUCCESS:"Đã cập nhật"

};

// =======================================
// SYSTEM
// =======================================

const SYSTEM = {

    DEBUG:true,

    AUTO_SAVE:true,

    AUTO_BACKUP:false

};

console.log(APP_CONFIG.appName + " CONFIG READY");
