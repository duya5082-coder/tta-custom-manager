// =======================================
// FILE 5A
// auth.js
// LOGIN SYSTEM CTV + ADMIN
// =======================================


import {

auth,

signInWithEmailAndPassword,

signOut,

onAuthStateChanged

} from "./firebase.js";


// =======================================
// ACCOUNT DEFAULT
// =======================================

const ACCOUNT_LIST={


ctv1:{

username:"ctv1",

password:"1",

role:"ctv1"

},


ctv2:{

username:"ctv2",

password:"2",

role:"ctv2"

},


admin:{

username:"admin",

password:"11",

role:"admin"

}


};



// =======================================
// CURRENT ACCOUNT
// =======================================

export let USER_SESSION=null;



// =======================================
// LOGIN
// =======================================

const loginBtn=

document.getElementById(

"loginBtn"

);



if(loginBtn){


loginBtn.onclick=()=>{


const username=

document.getElementById(

"username"

).value.trim();



const password=

document.getElementById(

"password"

).value.trim();



login(username,password);



};


}



// =======================================
// CHECK LOGIN
// =======================================

function login(username,password){



const account=

Object.values(

ACCOUNT_LIST

)

.find(

x=>

x.username===username

&&

x.password===password

);



if(!account){


showLoginError(

"❌ Sai tài khoản hoặc mật khẩu"

);



return;


}



USER_SESSION={


username:account.username,


role:account.role,


loginTime:new Date()


};



localStorage.setItem(

"tta_session",

JSON.stringify(USER_SESSION)

);



showLoginSuccess();



}



// =======================================
// LOAD SESSION
// =======================================

export function loadSession(){



const data=

localStorage.getItem(

"tta_session"

);



if(data){


USER_SESSION=

JSON.parse(data);


return USER_SESSION;


}



return null;


}



// =======================================
// LOGOUT
// =======================================

export function logout(){


localStorage.removeItem(

"tta_session"

);



USER_SESSION=null;



location.reload();


}



// =======================================
// CHECK LOGIN
// =======================================

export function isLogin(){


return USER_SESSION!==null;


}



// =======================================
// ROLE CHECK
// =======================================

export function isAdmin(){


return USER_SESSION?.role==="admin";


}



export function isCTV(){


return USER_SESSION?.role==="ctv1"

||

USER_SESSION?.role==="ctv2";


}



// =======================================
// SHOW ERROR
// =======================================

function showLoginError(text){


const el=

document.getElementById(

"loginError"

);



if(el){

el.innerHTML=text;

}


}



// =======================================
// SUCCESS LOGIN
// =======================================

function showLoginSuccess(){


const login=

document.getElementById(

"loginPage"

);



const app=

document.getElementById(

"app"

);



if(login){

login.classList.add(

"hidden"

);

}



if(app){

app.classList.remove(

"hidden"

);

}



}


// =======================================
// AUTO CHECK
// =======================================

window.addEventListener(

"DOMContentLoaded",

()=>{


loadSession();


if(USER_SESSION){


showLoginSuccess();


}


});


// =======================================
// END FILE 5A
// =======================================// =======================================
// FILE 5B
// PERMISSION SYSTEM
// PHÂN QUYỀN ADMIN / CTV
// =======================================


import {

USER_SESSION,

isAdmin,

isCTV

} from "./auth.js";



// =======================================
// CHECK PERMISSION
// =======================================

export function checkPermission(action){



// ADMIN FULL QUYỀN

if(isAdmin()){

return true;

}



// =======================================
// CTV
// =======================================

if(isCTV()){



const allow=[


"addTeam",

"editTeam",

"deleteTeam",

"payment",

"debt",

"copy",

"moveSlot",

"history",

"statistics",

"export"


];



return allow.includes(action);



}



return false;


}



// =======================================
// HIDE ADMIN ONLY
// =======================================

export function hideAdminMenu(){



const adminItems=

document.querySelectorAll(

".adminOnly"

);



adminItems.forEach(item=>{


if(!isAdmin()){


item.style.display="none";


}else{


item.style.display="";


}


});


}



// =======================================
// HIDE SALARY
// =======================================

export function protectSalary(){



const salary=

document.querySelectorAll(

".salaryAdmin"

);



salary.forEach(item=>{


if(!isAdmin()){


item.style.display="none";


}else{


item.style.display="";


}



});


}



// =======================================
// DISPLAY USER
// =======================================

export function showUser(){



const name=

document.getElementById(

"userName"

);



const role=

document.getElementById(

"userRole"

);



if(name){

name.innerHTML=

USER_SESSION?.username || "Guest";

}



if(role){


if(USER_SESSION?.role==="admin"){

role.innerHTML="👑 ADMIN";

}

else if(USER_SESSION?.role==="ctv1"){

role.innerHTML="🔥 CTV 1";

}

else if(USER_SESSION?.role==="ctv2"){

role.innerHTML="🔥 CTV 2";

}


}


}



// =======================================
// BLOCK ACTION
// =======================================

export function deny(){


const box=

document.getElementById(

"toast"

);



if(box){


box.innerHTML=

"⚠️ Bạn không có quyền thực hiện";



box.classList.add(

"show"

);



setTimeout(()=>{


box.classList.remove(

"show"

);


},2500);


}



}



// =======================================
// AUTO PERMISSION LOAD
// =======================================

window.addEventListener(

"DOMContentLoaded",

()=>{


hideAdminMenu();


protectSalary();


showUser();


});



// =======================================
// END FILE 5B
// =======================================// =======================================
// FILE 5C
// CTV CHẤM CÔNG + TÍNH LƯƠNG
// =======================================


import {

USER_SESSION

} from "./auth.js";


import {

db,

salaryCollection,

addDoc,

getDoc,

setDoc,

doc,

serverTimestamp,

COLLECTIONS

} from "./firebase.js";


// =======================================
// CONFIG LƯƠNG
// =======================================

const SALARY_PER_TEAM = 500;


// =======================================
// CHECK CTV
// =======================================

function getCTV(){


return USER_SESSION?.username || null;


}



// =======================================
// TẠO BẢNG CÔNG
// =======================================

export async function createWorkLog(){


const ctv=getCTV();


if(!ctv)return;



const ref=doc(

db,

COLLECTIONS.salary,

ctv

);



const snap=

await getDoc(ref);



if(!snap.exists()){


await setDoc(

ref,

{


username:ctv,


teams:0,


salary:0,


today:0,


created:

serverTimestamp()


}


);


}



}



// =======================================
// CỘNG CÔNG KHI TEAM THÀNH CÔNG
// =======================================

export async function addWorkSalary(team){



if(!team)return;



const ctv=

team.ctv;



if(!ctv)return;



const ref=

doc(

db,

COLLECTIONS.salary,

ctv

);



const snap=

await getDoc(ref);



let data={


teams:0,


salary:0,


today:0


};



if(snap.exists()){


data={

...data,

...snap.data()

};


}



await setDoc(

ref,

{


teams:

data.teams+1,


salary:

data.salary+SALARY_PER_TEAM,


today:

data.today+1,


updated:

serverTimestamp()


},


{

merge:true

}

);


}



// =======================================
// RESET CÔNG MỖI NGÀY
// =======================================

export async function resetDailySalary(){


const users=[

"ctv1",

"ctv2"

];



for(const user of users){



await setDoc(

doc(

db,

COLLECTIONS.salary,

user

),

{


today:0,


resetTime:

serverTimestamp()


},


{

merge:true

}


);


}


}



// =======================================
// LẤY CÔNG HÔM NAY
// =======================================

export async function getTodaySalary(user){



const snap=

await getDoc(

doc(

db,

COLLECTIONS.salary,

user

)

);



if(!snap.exists()){


return {

teams:0,

salary:0,

today:0

};


}



return snap.data();


}



// =======================================
// BẢNG XẾP HẠNG CTV
// =======================================

export function calculateRanking(list){


return list.sort(

(a,b)=>b.teams-a.teams

);


}



// =======================================
// KIỂM TRA MỐC THỜI GIAN
// =======================================

export function checkTimeSuccess(team){



if(!team)return false;



const now=new Date();



const current=

now.getHours()*60+

now.getMinutes();



const teamTime=

convertTime(team.time);



return current>=teamTime;


}



// =======================================
// ĐỔI 13H00 -> PHÚT
// =======================================

function convertTime(time){



if(!time)return 0;



const arr=

time.replace("H",":").split(":");



return Number(arr[0])*60+

Number(arr[1]);


}



// =======================================
// AUTO CHẤM CÔNG
// =======================================

export async function autoCheckSalary(teams){



for(const team of teams){



if(

team.paid &&

!team.salaryDone &&

checkTimeSuccess(team)

){



await addWorkSalary(team);



}

}


}



// =======================================
// END FILE 5C
// =======================================// =======================================
// FILE 5D
// ADMIN SALARY SECURITY
// CHỈ ADMIN XEM LƯƠNG CTV
// =======================================


import {

USER_SESSION,

isAdmin

} from "./auth.js";

import {

notify

} from "./firebase.js";


// =======================================
// CHECK VIEW SALARY
// =======================================

export function canViewSalary(){


return isAdmin();


}



// =======================================
// PROTECT SALARY PAGE
// =======================================

export function protectSalaryPage(){



const salaryPages=

document.querySelectorAll(

".salaryPage"

);



salaryPages.forEach(page=>{


if(!isAdmin()){


page.innerHTML=`


<div class="noPermission">


<h2>

🔒 Không có quyền truy cập

</h2>


<p>

Chỉ ADMIN mới được xem lương CTV

</p>


</div>


`;


}


});


}



// =======================================
// HIDE SALARY DATA
// =======================================

export function hideSalaryData(){



const salaryBox=

document.querySelectorAll(

".salaryData"

);



salaryBox.forEach(box=>{


if(!isAdmin()){


box.style.display="none";


}


});


}



// =======================================
// CHECK BEFORE OPEN SALARY
// =======================================

export function openSalary(){



if(!isAdmin()){



notify(

"🔒 Chỉ ADMIN được xem lương"

);



return false;


}



return true;


}



// =======================================
// ADMIN VIEW
// =======================================

export function adminSalaryView(){



if(!USER_SESSION)return;



const adminArea=

document.querySelectorAll(

".adminSalary"

);



adminArea.forEach(el=>{


if(USER_SESSION.role==="admin"){


el.style.display="block";


}else{


el.style.display="none";


}


});


}



// =======================================
// FORMAT SALARY
// =======================================

export function salaryText(value){



return Number(value||0)

.toLocaleString("vi-VN")

+"đ";


}



// =======================================
// SALARY DETAIL
// =======================================

export function createSalaryCard(data){



if(!isAdmin())return "";



return `


<div class="salaryCard">


<h3>

🔥 ${data.username}

</h3>


<h1>

${salaryText(data.salary)}

</h1>


<p>

👥 ${data.teams} Team

</p>


<p>

📅 Hôm nay:

${data.today||0} Team

</p>


</div>


`;



}



// =======================================
// BLOCK INSPECT
// =======================================

document.addEventListener(

"DOMContentLoaded",

()=>{


protectSalaryPage();


hideSalaryData();


adminSalaryView();


});



// =======================================
// END FILE 5D
// =======================================
