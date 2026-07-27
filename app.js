// =====================================
// CUSTOM TTA MANAGER V2
// CORE APP
// =====================================



// chống chạy nhiều lần
if(window.CUSTOM_TTA_APP_LOADED){

    console.warn("APP đã chạy");

}else{


window.CUSTOM_TTA_APP_LOADED=true;



// ================================
// DATABASE
// ================================


let ttaTeams = JSON.parse(

localStorage.getItem("TTA_TEAMS")

) || [];





// ================================
// DOM READY
// ================================


document.addEventListener(

"DOMContentLoaded",

()=>{


initApp();


});







// ================================
// INIT
// ================================


function initApp(){


updateDashboard();



renderTeams();



setupButtons();



}




// ================================
// BUTTON
// ================================


function setupButtons(){



const addBtn =

document.getElementById("addTeamBtn");



if(addBtn){


addBtn.onclick = addTeam;


}




const search =

document.getElementById("searchTeam");



if(search){


search.addEventListener(

"input",

renderTeams

);


}





}







// ================================
// ADD TEAM
// ================================


function addTeam(){



const name =

document.getElementById("teamName").value.trim();



const box =

document.getElementById("teamBox").value;



const time =

document.getElementById("teamTime").value;



const note =

document.getElementById("teamNote").value;



if(!name){


alert("Nhập tên team");


return;


}



if(!box){


alert("Chọn BOX");


return;


}



if(!time){


alert("Chọn giờ");


return;


}





// kiểm tra trùng

const existsTeam =

ttaTeams.some(

(t)=>

t.name.toLowerCase()

===

name.toLowerCase()

);





if(existsTeam){


alert("Team đã tồn tại");


return;


}






const newTeam={


id:Date.now(),


name,


box,


time,


note,


paid:false,


created:new Date().toLocaleString()



};





ttaTeams.push(newTeam);



saveData();



renderTeams();



updateDashboard();




clearRegister();



toast(

"🔥 Thêm team thành công"

);



}








// ================================
// SAVE
// ================================


function saveData(){



localStorage.setItem(

"TTA_TEAMS",

JSON.stringify(ttaTeams)

);



}







// ================================
// RENDER TEAM
// ================================


function renderTeams(){



const list =

document.getElementById("teamList");



if(!list)

return;





list.innerHTML="";





let data=[...ttaTeams];




const search =

document.getElementById("searchTeam");



if(search && search.value){



const key=

search.value.toLowerCase();



data=data.filter(

(t)=>

t.name.toLowerCase()

.includes(key)

);



}





if(data.length===0){


list.innerHTML=

`
<div class="empty">
Chưa có team
</div>
`;

return;


}







data.forEach(team=>{



const div=document.createElement("div");



div.className="teamCard";




div.innerHTML=


`

<div>

<h3>

🔥 ${team.name}

</h3>


<p>

BOX ${team.box}

|

${team.time}

</p>


<p>

${team.paid?"💸 Đã thanh toán":"❌ Chưa thanh toán"}

</p>


</div>


<div>


<button onclick="window.payTeam(${team.id})">

💸

</button>



<button onclick="window.deleteTeam(${team.id})">

🗑

</button>


</div>

`;



list.appendChild(div);



});





}







// ================================
// DELETE
// ================================


function deleteTeam(id){



ttaTeams =

ttaTeams.filter(

(t)=>t.id!==id

);



saveData();



renderTeams();



updateDashboard();



toast(

"Đã xóa team"

);


}







// ================================
// PAYMENT
// ================================


function payTeam(id){



const team=

ttaTeams.find(

(t)=>t.id===id

);



if(!team)

return;



team.paid=true;



saveData();



renderTeams();



updateDashboard();



toast(

"Đã thanh toán"

);



}







// ================================
// DASHBOARD
// ================================


function updateDashboard(){



const total=

ttaTeams.length;



const paid=

ttaTeams.filter(

(t)=>t.paid

).length;



const unpaid=

total-paid;




setText(

"statTotalTeams",

total

);



setText(

"statPaid",

paid

);



setText(

"statUnpaid",

unpaid

);



setText(

"teamCount",

total

);



setText(

"paidCount",

paid

);



setText(

"unpaidCount",

unpaid

);





let money=

paid*5000;



setText(

"statRevenue",

money.toLocaleString()+"đ"

);




}








// ================================
// CLEAR INPUT
// ================================


function clearRegister(){



[
"teamName",
"teamBox",
"teamTime",
"teamNote"

].forEach(id=>{


const el=

document.getElementById(id);


if(el)

el.value="";


});



}







// ================================
// HELPER
// ================================


function setText(id,value){



const el=

document.getElementById(id);



if(el)

el.innerText=value;



}




function toast(msg){



const box=

document.getElementById("toast");



if(box){


box.innerText=msg;


box.classList.add("show");



setTimeout(()=>{


box.classList.remove("show");


},2000);



}


}






// GLOBAL BUTTON

window.deleteTeam=

deleteTeam;



window.payTeam=

payTeam;



}
