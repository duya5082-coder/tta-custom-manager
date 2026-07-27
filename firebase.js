// Kết nối Firebase App
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

// Kết nối Firebase Realtime Database
import { 
    getDatabase,
    ref,
    push,
    set,
    onValue,
    remove,
    update
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";


// Thông tin Firebase của TTA CUSTOM MANAGER
const firebaseConfig = {

    apiKey: "AIzaSyC5053lsBtGbC8rWll-8TRlAXf5lxENbPY",

    authDomain: "tta-custom-manager.firebaseapp.com",

    databaseURL: "https://tta-custom-manager-default-rtdb.asia-southeast1.firebasedatabase.app",

    projectId: "tta-custom-manager",

    storageBucket: "tta-custom-manager.firebasestorage.app",

    messagingSenderId: "1042103585902",

    appId: "1:1042103585902:web:d2fc07315553340d4eaa7f",

    measurementId: "G-REF95HDMCQ"
};


// Khởi tạo Firebase
const app = initializeApp(firebaseConfig);


// Khởi tạo Database
const db = getDatabase(app);


// Xuất dữ liệu cho app.js sử dụng
export {
    db,
    ref,
    push,
    set,
    onValue,
    remove,
    update
};
