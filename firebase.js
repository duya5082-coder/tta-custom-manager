import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import { 
getDatabase,
ref,
push,
set,
onValue,
remove,
update
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";


const firebaseConfig = {
  apiKey: "AIzaSyC5053lsBtGbC8rWll-8TRlAXf5lxENbPY",
  authDomain: "tta-custom-manager.firebaseapp.com",
  projectId: "tta-custom-manager",
  storageBucket: "tta-custom-manager.firebasestorage.app",
  messagingSenderId: "1042103585902",
  appId: "1:1042103585902:web:d2fc07315553340d4eaa7f",
  measurementId: "G-REF95HDMCQ"
};


const app = initializeApp(firebaseConfig);

const db = getDatabase(app);


export {
db,
ref,
push,
set,
onValue,
remove,
update
};
