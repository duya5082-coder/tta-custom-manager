// =======================================
// FILE 4A
// app.js
// =======================================

import{

auth,
ROLE,
TIME_LIST,
BOX_LIST

}from "./firebase.js";

import{

listenTeams,
listenDebts,
listenHistory,
listenSalary,
teamExists

}from "./firebase.js";

import{

logout,
notify,
money,
formatDate,
formatTime,
currentUser

}from "./firebase.js";

// =======================================
// GLOBAL
// =======================================

let TEAMS=[];

let DEBTS=[];

let HISTORY=[];

let SALARY=[];

let CURRENT_PAGE="dashboardPage";

// =======================================
// START
// =======================================

window.addEventListener("DOMContentLoaded",()=>{

init();

});

// =======================================
// INIT
// =======================================

function init(){

bindMenu();

bindButtons();

startRealtime();

showPage("dashboardPage");

document.getElementById("todayDate").innerHTML=

formatDate()+" - "+formatTime();

setInterval(()=>{

document.getElementById("todayDate").innerHTML=

formatDate()+" - "+formatTime();

},1000);

}

// =======================================
// MENU
// =======================================

function bindMenu(){

document

.querySelectorAll(".menuBtn")

.forEach(btn=>{

btn.onclick=()=>{

document

.querySelectorAll(".menuBtn")

.forEach(x=>x.classList.remove("active"));

btn.classList.add("active");

showPage(btn.dataset.page+"Page");

};

});

document

.querySelectorAll(".bottomItem")

.forEach(btn=>{

btn.onclick=()=>{

showPage(btn.dataset.page);

document

.querySelectorAll(".bottomItem")

.forEach(x=>x.classList.remove("active"));

btn.classList.add("active");

};

});

}

// =======================================
// PAGE
// =======================================

function showPage(id){

CURRENT_PAGE=id;

document

.querySelectorAll(".page")

.forEach(page=>{

page.classList.remove("active");

});

const p=document.getElementById(id);

if(p){

p.classList.add("active");

}

}

// =======================================
// BUTTON
// =======================================

function bindButtons(){

const logoutBtn=

document.getElementById("logoutBtn");

if(logoutBtn){

logoutBtn.onclick=()=>{

logout();

};

}

}// =======================================
// FILE 4B
// REALTIME + DASHBOARD
// =======================================

// =======================================
// START REALTIME
// =======================================

function startRealtime(){

listenTeams(data=>{

TEAMS=data;

refreshAll();

});

listenDebts(data=>{

DEBTS=data;

renderDebtList();

});

listenHistory(data=>{

HISTORY=data;

renderHistory();

});

listenSalary(data=>{

SALARY=data;

renderSalary();

});

}

// =======================================
// REFRESH ALL
// =======================================

function refreshAll(){

renderDashboard();

renderTeamList();

renderMatchTables();

renderPayment();

renderStatistics();

}

// =======================================
// DASHBOARD
// =======================================

function renderDashboard(){

const total=TEAMS.length;

const paid=TEAMS.filter(x=>x.paid).length;

const unpaid=total-paid;

const revenue=paid*5000;

document.getElementById("statTotalTeams").innerHTML=total;

document.getElementById("statPaid").innerHTML=paid;

document.getElementById("statUnpaid").innerHTML=unpaid;

document.getElementById("statRevenue").innerHTML=

money(revenue);

// =======================================
// BOX
// =======================================

const boxCount={};

BOX_LIST.forEach(b=>boxCount[b]=0);

TEAMS.forEach(t=>{

boxCount[t.box]++;

});

let bestBox="-";

let max=0;

BOX_LIST.forEach(box=>{

const c=boxCount[box];

const el=document.getElementById(

"box"+box+"Count"

);

if(el){

el.innerHTML=c+" Team";

}

if(c>max){

max=c;

bestBox="BOX "+box;

}

});

document.getElementById(

"statBestBox"

).innerHTML=bestBox;

// =======================================
// TIME
// =======================================

TIME_LIST.forEach(time=>{

const count=

TEAMS.filter(

t=>t.time===time&&t.paid

).length;

const id=

"time"+

time

.replace("H","")

.replace("00","")

.replace("50","50");

});

updateTimeRevenue();

}

// =======================================
// TIME REVENUE
// =======================================

function updateTimeRevenue(){

const ids={

"10H00":"rev10",

"13H00":"rev13",

"15H00":"rev15",

"18H00":"rev18",

"20H00":"rev20",

"22H00":"rev22",

"23H50":"rev2350"

};

TIME_LIST.forEach(time=>{

const count=

TEAMS.filter(

x=>x.time===time&&x.paid

).length;

const el=document.getElementById(ids[time]);

if(el){

el.innerHTML=

money(count*5000);

}

});

}

// =======================================
// ADMIN
// =======================================

function updateAdmin(){

if(!currentUser)return;

if(currentUser.role===ROLE.ADMIN){

document

.querySelectorAll(".adminOnly")

.forEach(x=>{

x.style.display="";

});

}else{

document

.querySelectorAll(".adminOnly")

.forEach(x=>{

x.style.display="none";

});

}

}// =======================================
// FILE 4C
// TEAM LIST
// =======================================

// =======================================
// RENDER TEAM
// =======================================

function renderTeamList(){

const list=

document.getElementById("teamList");

if(!list)return;

list.innerHTML="";

// SEARCH
const keyword=(

document.getElementById("searchTeam")?.value||""

)

.toLowerCase()

.trim();

// FILTER
const timeFilter=

document.getElementById("filterTime")?.value||"all";

const statusFilter=

document.getElementById("filterStatus")?.value||"all";

let data=[...TEAMS];

// SEARCH
if(keyword){

data=data.filter(team=>

team.name

.toLowerCase()

.includes(keyword)

);

}

// TIME
if(timeFilter!=="all"){

data=data.filter(

team=>team.time===timeFilter

);

}

// STATUS
if(statusFilter==="paid"){

data=data.filter(

team=>team.paid===true

);

}

if(statusFilter==="unpaid"){

data=data.filter(

team=>!team.paid

);

}

// SORT
data.sort((a,b)=>{

if(a.time===b.time){

return a.slot-b.slot;

}

return a.time.localeCompare(b.time);

});

// COUNT
document.getElementById("teamCount").innerHTML=data.length;

document.getElementById("paidCount").innerHTML=

data.filter(x=>x.paid).length;

document.getElementById("unpaidCount").innerHTML=

data.filter(x=>!x.paid).length;

// CARD
data.forEach(team=>{

const card=document.createElement("div");

card.className="teamCard";

card.innerHTML=`

<div class="teamTop">

<div class="teamName">

${team.name}

</div>

<div class="teamStatus ${team.paid?"statusPaid":"statusUnpaid"}">

${team.paid?"💸 ĐÃ THANH TOÁN":"❌ CHƯA THANH TOÁN"}

</div>

</div>

<div class="teamInfo">

<div class="infoBox">

<h4>BOX</h4>

<p>${team.box}</p>

</div>

<div class="infoBox">

<h4>Khung giờ</h4>

<p>${team.time}</p>

</div>

<div class="infoBox">

<h4>Slot</h4>

<p>${team.slot||"-"}</p>

</div>

<div class="infoBox">

<h4>CTV</h4>

<p>${team.ctv||"-"}</p>

</div>

</div>

<div class="teamActions">

<button

class="btnPaid"

onclick="togglePaid('${team.id}')">

💸

</button>

<button

class="btnEdit"

onclick="editTeam('${team.id}')">

✏️

</button>

<button

class="btnDelete"

onclick="removeTeam('${team.id}')">

🗑

</button>

<button

class="btnUp"

onclick="moveUp('${team.id}')">

⬆️

</button>

<button

class="btnDown"

onclick="moveDown('${team.id}')">

⬇️

</button>

</div>

`;

list.appendChild(card);

});

}

// =======================================
// SEARCH
// =======================================

document

.getElementById("searchTeam")

?.addEventListener(

"input",

renderTeamList

);

document

.getElementById("filterTime")

?.addEventListener(

"change",

renderTeamList

);

document

.getElementById("filterStatus")

?.addEventListener(

"change",

renderTeamList

);

// =======================================
// END 4C
// =======================================// =======================================
// FILE 4D
// REGISTER TEAM + PAYMENT
// =======================================

import{

saveTeam,

teamExists,

saveHistory

}from "./firebase.js";

import{

currentUser,

money

}from "./firebase.js";


// =======================================
// ADD TEAM
// =======================================

const addTeamBtn=

document.getElementById("addTeamBtn");


if(addTeamBtn){

addTeamBtn.onclick=async()=>{


const name=

document.getElementById("teamName").value.trim();


const box=

document.getElementById("teamBox").value;


const time=

document.getElementById("teamTime").value;


const note=

document.getElementById("teamNote").value.trim();



if(!name||!box||!time){

notify("⚠️ Vui lòng nhập đủ thông tin");

return;

}


// CHECK TRÙNG

const exists=

await teamExists(name);


if(exists){

notify("⚠️ Team đã đăng ký rồi!");

return;

}


// TÌM SLOT

const sameTime=

TEAMS.filter(

x=>x.time===time

);


const slot=

sameTime.length+1;


// FULL 12 SLOT

if(slot>12){

notify("⚠️ Khung giờ này đã FULL");

return;

}


// DATA

const team={


name:name,


box:Number(box),


time:time,


slot:slot,


paid:false,


note:note,


ctv:

currentUser?.username || "admin",


created:new Date().toISOString()


};


// SAVE

await saveTeam(team);



await saveHistory(

"Đăng ký team",

team.ctv,

name+" - "+time

);


// CLEAR

document.getElementById("teamName").value="";

document.getElementById("teamNote").value="";


notify(

"🔥 Đã thêm "+name

);


};

}


// =======================================
// TOGGLE PAYMENT
// =======================================

window.togglePaid=async function(id){


const team=

TEAMS.find(

x=>x.id===id

);


if(!team)return;



await updateTeam(

id,

{

paid:!team.paid,

paymentTime:new Date().toISOString()

}

);



await saveHistory(

team.paid?

"Hủy thanh toán":

"Thanh toán",

currentUser?.username||"",

team.name

);



notify(

team.paid?

"❌ Đã hủy thanh toán":

"💸 Đã thanh toán"

);


};


// =======================================
// PAYMENT RENDER
// =======================================

function renderPayment(){


const box=

document.getElementById(

"paymentList"

);


if(!box)return;


box.innerHTML="";


TEAMS.forEach(team=>{


const div=document.createElement("div");


div.className="paymentCard";


div.innerHTML=`

<div>

<h3>${team.name}</h3>

<p>

⏰ ${team.time}

|

BOX ${team.box}

</p>

</div>


<div>

<button

class="${team.paid?'paymentDone':'paymentWaiting'}"

onclick="togglePaid('${team.id}')">

${team.paid?

"💸 Đã thu":

"❌ Chưa thu"}

</button>

</div>

`;


box.appendChild(div);


});


const done=

TEAMS.filter(

x=>x.paid

).length;


document.getElementById(

"paymentDone"

).innerHTML=done;


document.getElementById(

"paymentWaiting"

).innerHTML=

TEAMS.length-done;


document.getElementById(

"paymentRevenue"

).innerHTML=

money(done*5000);


}


// =======================================
// END 4D
// =======================================// =======================================
// FILE 4E
// MATCH TABLE + COPY MESSENGER
// =======================================


// =======================================
// RENDER BẢNG ĐẤU
// =======================================

function renderMatchTables(){

const container=

document.getElementById(

"matchContainer"

);


if(!container)return;


container.innerHTML="";


// GROUP THEO KHUNG GIỜ

TIME_LIST.forEach(time=>{


const teams=

TEAMS.filter(

x=>x.time===time

);



if(teams.length===0)return;



const timeBox=document.createElement("div");


timeBox.className="matchTime";


let html=`

<div class="matchTitle">

<h2>

⏰ ${time} ⏰ 💸5000💸

</h2>

</div>


<div class="tableGrid">

`;


// CHIA BẢNG A B C D

let tableIndex=0;


for(

let i=0;

i<teams.length;

i+=12

){


tableIndex++;


const tableTeams=

teams.slice(i,i+12);



const tableName=

String.fromCharCode(

64+tableIndex

);



html+=`

<div class="tableBox">


<h3>

🔥 BẢNG ${tableName}

</h3>


`;


// SLOT 12

for(let slot=1;slot<=12;slot++){


const team=

tableTeams.find(

x=>x.slot===slot

);



if(team){


html+=`

<div class="slot">


<div class="slotNumber">

${formatSlot(slot)}

</div>


<div class="slotName">

${team.name}

(BOX ${team.box})

${team.paid?"💸":""}


</div>


</div>

`;


}else{


html+=`

<div class="slot">


<div class="slotNumber">

${formatSlot(slot)}

</div>


<div class="slotEmpty">

(Trống)

</div>


</div>


`;

}


}


html+=`

</div>

`;


}


html+=`

</div>

`;


timeBox.innerHTML=html;


container.appendChild(timeBox);


});


}


// =======================================
// FORMAT SLOT MESS
// =======================================

function formatSlot(number){


const list=[

"0️⃣",

"1️⃣",

"2️⃣",

"3️⃣",

"4️⃣",

"5️⃣",

"6️⃣",

"7️⃣",

"8️⃣",

"9️⃣",

"🔟",

"1️⃣1️⃣",

"1️⃣2️⃣"

];


return list[number] || number;


}



// =======================================
// COPY TẤT CẢ BẢNG
// =======================================

const copyAllBtn=

document.getElementById(

"copyAllBtn"

);



if(copyAllBtn){


copyAllBtn.onclick=()=>{


let text="";



TIME_LIST.forEach(time=>{


const teams=

TEAMS.filter(

x=>x.time===time

);



if(!teams.length)return;



text+=`

⏰${time}⏰ 💸5K💸


`;



let table=1;


for(

let i=0;

i<teams.length;

i+=12

){


text+=`

🔥 BẢNG ${String.fromCharCode(64+table)}

`;



const list=

teams.slice(i,i+12);



for(

let s=1;

s<=12;

s++

){


const team=

list.find(

x=>x.slot===s

);



text+=

formatSlot(s)+" ";



if(team){


text+=

team.name+

"("+team.box+")"+

(team.paid?"💸":"");


}else{


text+="";

}


text+="\n";


}


text+="\n____\n";


table++;


}



});


navigator.clipboard.writeText(text);


notify(

"📋 Đã copy toàn bộ bảng đấu"

);


};


}



// =======================================
// COPY 1 BẢNG
// =======================================

window.copyTable=function(time,index){


const teams=

TEAMS.filter(

x=>x.time===time

);



const data=

teams.slice(

index*12,

index*12+12

);



let text=

`⏰${time}⏰ 💸5K💸\n\n`;


data.forEach((team,i)=>{


text+=

formatSlot(i+1)

+" "

+

team.name

+

"("+team.box+")"

+

(team.paid?"💸":"")+

"\n";


});



navigator.clipboard.writeText(text);


notify(

"📋 Đã copy bảng"

);


};


// =======================================
// END FILE 4E
// =======================================// =======================================
// FILE 4F
// DEBT MONEY + AUTO TRỪ DƯ
// =======================================


// =======================================
// OPEN DEBT MODAL
// =======================================

const addDebtBtn=

document.getElementById(

"addDebtBtn"

);


if(addDebtBtn){

addDebtBtn.onclick=()=>{


openModal(

"debtModal"

);


};

}


// =======================================
// SAVE DEBT
// =======================================

document

.getElementById("saveDebtBtn")

?.addEventListener(

"click",

async()=>{


const name=

document.getElementById(

"debtPlayer"

).value.trim();



const moneyValue=

Number(

document.getElementById(

"debtMoney"

).value

);



if(!name||!moneyValue){

notify(

"⚠️ Nhập đủ thông tin"

);

return;

}



await addDoc(

debtCollection(),

{


name:name,


money:moneyValue,


created:

new Date().toISOString()


}

);



await saveHistory(

"Thêm dư tiền",

currentUser?.username||"",

name+" +"+moneyValue

);



closeModal(

"debtModal"

);



notify(

"💰 Đã thêm dư tiền"

);


}

);



// =======================================
// RENDER DEBT
// =======================================

function renderDebtList(){


const box=

document.getElementById(

"debtList"

);



if(!box)return;



box.innerHTML="";



DEBTS.forEach(debt=>{


const div=document.createElement(

"div"

);



div.className="debtCard";



div.innerHTML=`

<div>

<h3>

${debt.name}

</h3>


<p>

Số dư còn lại:

</p>

</div>


<div class="debtMoney">

${money(debt.money)}

</div>


<button

onclick="removeDebt('${debt.id}')">

🗑

</button>

`;



box.appendChild(div);



});


}



// =======================================
// TRỪ DƯ KHI ĐĂNG KÝ TEAM
// =======================================

export async function checkDebtPayment(name){


const debt=

DEBTS.find(

x=>

x.name.toLowerCase()

===

name.toLowerCase()

);



if(!debt)return null;



const price=5000;



if(debt.money>=price){



await updateDoc(

doc(

debtCollection(),

debt.id

),

{


money:

debt.money-price


}

);



await saveHistory(

"Trừ dư tiền",

currentUser?.username||"",

name+" -5000"

);



return true;


}



return false;


}



// =======================================
// XÓA DƯ
// =======================================

window.removeDebt=

async function(id){


if(!confirm(

"Xóa khoản dư này?"

))return;



await deleteDoc(

doc(

debtCollection(),

id

)

);



notify(

"🗑 Đã xóa dư tiền"

);



};



// =======================================
// DƯ TIỀN FORMAT
// =======================================

function totalDebt(){


return DEBTS.reduce(

(a,b)=>

a+b.money,

0

);


}



const debtTotal=

document.getElementById(

"debtTotal"

);


if(debtTotal){


setInterval(()=>{


debtTotal.innerHTML=

money(

totalDebt()

);


},1000);


}



// =======================================
// END FILE 4F
// =======================================// =======================================
// FILE 4G
// DELETE + EDIT + MOVE SLOT + UNDO
// =======================================


// =======================================
// EDIT TEAM
// =======================================

window.editTeam=function(id){

const team=

TEAMS.find(

x=>x.id===id

);


if(!team)return;



document.getElementById(

"detailName"

).value=team.name;


document.getElementById(

"detailBox"

).value=team.box;


document.getElementById(

"detailTime"

).value=team.time;


document.getElementById(

"detailNote"

).value=team.note||"";


document.getElementById(

"detailPaid"

).value=team.paid;



window.currentEditTeam=id;



openModal(

"teamDetailModal"

);


};



// =======================================
// SAVE EDIT
// =======================================

document

.getElementById("saveDetailBtn")

?.addEventListener(

"click",

async()=>{


const id=

window.currentEditTeam;


if(!id)return;



await updateTeam(

id,

{


name:

document.getElementById(

"detailName"

).value,


box:

Number(

document.getElementById(

"detailBox"

).value

),


time:

document.getElementById(

"detailTime"

).value,


note:

document.getElementById(

"detailNote"

).value,


paid:

document.getElementById(

"detailPaid"

).value==="true"


}

);



closeModal(

"teamDetailModal"

);


notify(

"✏️ Đã cập nhật team"

);


}

);



// =======================================
// DELETE TEAM
// =======================================

let lastDeleted=null;



window.removeTeam=async function(id){


const team=

TEAMS.find(

x=>x.id===id

);



if(!team)return;



if(!confirm(

"Xóa "+team.name+"?"

))return;



lastDeleted=team;



await deleteTeam(id);



await saveHistory(

"Xóa team",

currentUser?.username||"",

team.name

);



showUndo(

team.name

);


notify(

"🗑 Đã xóa "+team.name

);


};



// =======================================
// UNDO DELETE
// =======================================

function showUndo(name){


const bar=

document.getElementById(

"undoBar"

);



if(!bar)return;



document.getElementById(

"undoText"

).innerHTML=

"🗑 Đã xóa "+name;



bar.classList.remove(

"hidden"

);



setTimeout(()=>{


bar.classList.add(

"hidden"

);



lastDeleted=null;


},10000);


}



document

.getElementById("undoBtn")

?.addEventListener(

"click",

async()=>{


if(!lastDeleted)return;



await saveTeam(

lastDeleted

);



lastDeleted=null;



document

.getElementById("undoBar")

.classList.add(

"hidden"

);



notify(

"↩️ Đã hoàn tác"

);


}

);



// =======================================
// MOVE SLOT UP
// =======================================

window.moveUp=async function(id){


const index=

TEAMS.findIndex(

x=>x.id===id

);



if(index<=0)return;



const current=

TEAMS[index];

const before=

TEAMS[index-1];



await batchUpdate([


{

id:current.id,

data:{

slot:before.slot

}

},


{

id:before.id,

data:{

slot:current.slot

}

}


]);



};



// =======================================
// MOVE SLOT DOWN
// =======================================

window.moveDown=async function(id){


const index=

TEAMS.findIndex(

x=>x.id===id

);



if(index===-1||

index>=TEAMS.length-1)

return;



const current=

TEAMS[index];

const after=

TEAMS[index+1];



await batchUpdate([


{

id:current.id,

data:{

slot:after.slot

}

},


{

id:after.id,

data:{

slot:current.slot

}

}


]);


};



// =======================================
// OPEN / CLOSE MODAL
// =======================================

function openModal(id){


const el=

document.getElementById(id);


if(el){

el.classList.remove(

"hidden"

);

document

.getElementById("overlay")

?.classList.remove(

"hidden"

);

}


}



function closeModal(id){


const el=

document.getElementById(id);


if(el){

el.classList.add(

"hidden"

);

}


document

.getElementById("overlay")

?.classList.add(

"hidden"

);


}



document

.querySelectorAll("[id^='close']")

.forEach(btn=>{


btn.onclick=()=>{


const modal=

btn.closest(".hidden")?

null:

btn.closest("div[id]");



if(modal){

closeModal(

modal.id

);

}


};


});


// =======================================
// END FILE 4G
// =======================================// =======================================
// FILE 4H
// STATISTICS + HISTORY + CTV RANKING
// =======================================


// =======================================
// RENDER STATISTICS
// =======================================

function renderStatistics(){


const total=

TEAMS.length;


const paid=

TEAMS.filter(

x=>x.paid

).length;



const unpaid=

total-paid;



const revenue=

paid*5000;



const set=(id,value)=>{


const el=document.getElementById(id);


if(el){

el.innerHTML=value;

}


};



set(

"stTotal",

total

);



set(

"stPaid",

paid

);



set(

"stUnpaid",

unpaid

);



set(

"stRevenue",

money(revenue)

);



// ================================
// BOX RANK
// ================================


const boxData={};



BOX_LIST.forEach(box=>{


boxData[box]=

TEAMS.filter(

x=>Number(x.box)===box

).length;


});



let best="-";

let max=0;



Object.keys(boxData)

.forEach(box=>{


if(boxData[box]>max){

max=boxData[box];

best="BOX "+box;

}


});



set(

"stBestBox",

best

);



renderBoxStatistic(

boxData

);



renderCTVRank();

}



// =======================================
// BOX STATISTIC
// =======================================

function renderBoxStatistic(data){


const box=

document.getElementById(

"boxStatistic"

);



if(!box)return;



box.innerHTML="";



Object.keys(data)

.forEach(item=>{


box.innerHTML+=`

<div class="boxItem">


<span>

🔥 BOX ${item}

</span>


<b>

${data[item]} Team

</b>


</div>

`;


});


}



// =======================================
// CTV RANKING
// =======================================

function renderCTVRank(){


const list=

document.getElementById(

"ctvRanking"

);



if(!list)return;



const rank={

ctv1:0,

ctv2:0

};



TEAMS.forEach(team=>{


if(team.ctv){

rank[team.ctv]++;

}


});



const arr=[


{

name:"CTV1",

count:rank.ctv1

},


{

name:"CTV2",

count:rank.ctv2

}


];



arr.sort(

(a,b)=>b.count-a.count

);



list.innerHTML="";



arr.forEach((x,i)=>{


list.innerHTML+=`

<div class="historyItem">


<div class="historyTime">

${i+1} 🏆

</div>


<div>

<b>

${x.name}

</b>


<br>


Đã lên:

${x.count} Team


</div>


</div>

`;


});


}



// =======================================
// HISTORY RENDER
// =======================================

function renderHistory(){


const list=

document.getElementById(

"historyList"

);



if(!list)return;



list.innerHTML="";



HISTORY.slice(0,100)

.forEach(item=>{


const time=

item.time?.toDate

?

item.time.toDate()

:

new Date();



list.innerHTML+=`

<div class="historyItem">


<div class="historyTime">

${

String(time.getHours())

.padStart(2,"0")

}:

${

String(time.getMinutes())

.padStart(2,"0")

}

</div>


<div class="historyContent">


<b>

${item.action}

</b>


<br>


${item.detail||""}


<br>


👤 ${item.user||"system"}


</div>


</div>

`;


});


}



// =======================================
// CTV SALARY
// =======================================

function renderSalary(){


const ctv1=

SALARY.find(

x=>x.id==="ctv1"

)||{money:0,teams:0};



const ctv2=

SALARY.find(

x=>x.id==="ctv2"

)||{money:0,teams:0};



const a=

document.getElementById(

"salaryCTV1"

);



const b=

document.getElementById(

"salaryCTV2"

);



if(a){

a.innerHTML=

money(ctv1.money);

}



if(b){

b.innerHTML=

money(ctv2.money);

}


}



// =======================================
// AUTO ADD SALARY
// =======================================

async function addCTVSalary(team){


if(!team.ctv)return;



const ref=

doc(

salaryCollection(),

team.ctv

);



const snap=

await getDoc(ref);



let old={

money:0,

teams:0

};



if(snap.exists()){

old=snap.data();

}



await setDoc(

ref,

{


money:

old.money+500,


teams:

old.teams+1,


updated:

serverTimestamp()


},

{

merge:true

}

);


}



// =======================================
// FULL CHECK
// =======================================

function checkFullTable(){


TIME_LIST.forEach(time=>{


const count=

TEAMS.filter(

x=>x.time===time

).length;



if(count>=12){


notify(

"🔔 "+time+" đã FULL 12 đội!"

);



}


});


}



// =======================================
// END FILE 4H
// =======================================
