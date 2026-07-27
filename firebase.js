// =======================================
// FILE 8C
// firebase.js
// KẾT NỐI FIREBASE + DATABASE CUSTOM TTA
// =======================================


// IMPORT FIREBASE

import {

initializeApp

}

from

"https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";


import {

getFirestore,

collection,

doc,

addDoc,

getDocs,

getDoc,

setDoc,

updateDoc,

deleteDoc,

serverTimestamp

}

from

"https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";


import {

getAuth

}

from

"https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";





// =======================================
// FIREBASE CONFIG
// THAY CONFIG THẬT VÀO ĐÂY
// =======================================


const firebaseConfig = {


apiKey:

"YOUR_API_KEY",


authDomain:

"YOUR_PROJECT.firebaseapp.com",


projectId:

"YOUR_PROJECT_ID",


storageBucket:

"YOUR_PROJECT.appspot.com",


messagingSenderId:

"YOUR_SENDER_ID",


appId:

"YOUR_APP_ID"


};





// =======================================
// START FIREBASE
// =======================================


const app = initializeApp(firebaseConfig);



export const db = getFirestore(app);



export const auth = getAuth(app);





// =======================================
// DATABASE COLLECTION
// =======================================


export const COLLECTIONS = {


teams:

"teams",


debts:

"debts",


history:

"history",


salary:

"salary",


settings:

"settings",


users:

"users"


};





// =======================================
// COLLECTION FUNCTION
// =======================================


export function teamCollection(){


return collection(

db,

COLLECTIONS.teams

);


}



export function debtCollection(){


return collection(

db,

COLLECTIONS.debts

);


}



export function historyCollection(){


return collection(

db,

COLLECTIONS.history

);


}



export function salaryCollection(){


return collection(

db,

COLLECTIONS.salary

);


}





// =======================================
// SAVE TEAM
// =======================================


export async function saveTeam(data){


await addDoc(

teamCollection(),

{


...data,


created:

serverTimestamp()


}

);


}





// =======================================
// UPDATE TEAM
// =======================================


export async function updateTeam(id,data){


await updateDoc(

doc(

db,

COLLECTIONS.teams,

id

),

data

);


}





// =======================================
// DELETE TEAM
// =======================================


export async function deleteTeam(id){


await deleteDoc(

doc(

db,

COLLECTIONS.teams,

id

)

);


}





// =======================================
// CHECK TEAM TRÙNG
// =======================================


export async function teamExists(name){


const snap=

await getDocs(

teamCollection()

);



return snap.docs.some(

item=>

item.data().name

.toLowerCase()

===

name.toLowerCase()

);


}





// =======================================
// SAVE HISTORY
// =======================================


export async function saveHistory(

action,

user,

detail

){


await addDoc(

historyCollection(),

{


action,


user,


detail,


time:

serverTimestamp()


}

);


}





// =======================================
// FORMAT MONEY
// =======================================


export function money(value){


return Number(value||0)

.toLocaleString("vi-VN")

+"đ";


}





// =======================================
// DATE
// =======================================


export function todayKey(){


const d=

new Date();



return d.getFullYear()

+

"-"

+

String(

d.getMonth()+1

)

.padStart(2,"0")

+

"-"

+

String(

d.getDate()

)

.padStart(2,"0");


}





// =======================================
// TIME LIST
// =======================================


export const TIME_LIST=[


"10H00",


"13H00",


"15H00",


"18H00",


"20H00",


"22H00",


"23H50"


];





// =======================================
// BOX LIST
// =======================================


export const BOX_LIST=[


1,2,3,4,5,

6,7,8,9,10


];





// =======================================
// ROLE
// =======================================


export const ROLE={


ADMIN:"admin",


CTV1:"ctv1",


CTV2:"ctv2"


};





// =======================================
// END FILE 8C
// =======================================
