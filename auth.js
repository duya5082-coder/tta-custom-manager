// =================================
// CUSTOM TTA MANAGER V2
// FIREBASE CONFIG
// =================================


// Firebase SDK

import { initializeApp } 
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";


import { 
getFirestore 
} 
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";


import {

getAuth

}

from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";





// =================================
// FIREBASE CONFIG
// THAY BẰNG CONFIG CỦA BẠN
// =================================


const firebaseConfig = {


apiKey: "YOUR_API_KEY",


authDomain: "YOUR_PROJECT.firebaseapp.com",


projectId: "YOUR_PROJECT_ID",


storageBucket: "YOUR_PROJECT.appspot.com",


messagingSenderId: "YOUR_SENDER_ID",


appId: "YOUR_APP_ID"


};





// =================================
// INIT FIREBASE
// =================================


const firebaseApp = initializeApp(firebaseConfig);



const db = getFirestore(firebaseApp);



const auth = getAuth(firebaseApp);





// =================================
// EXPORT
// =================================


export {


firebaseApp,

db,

auth


};
