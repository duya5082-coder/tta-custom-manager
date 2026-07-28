// =======================================
// CUSTOM TTA MANAGER
// APP SYSTEM
// FILE 2B
// =======================================


if(window.TTA_APP_LOADED){

console.warn(
"APP đã được load"
);


}else{


window.TTA_APP_LOADED=true;



// ===============================
// DATABASE LOCAL
// ===============================


const TTA_TEAM_KEY = "CUSTOM_TTA_TEAMS";



function getTeams(){


try{


return JSON.parse(

localStorage.getItem(
TTA_TEAM_KEY
)

)

|| [];


}catch(error){


return [];


}


}




function saveTeams(data){


localStorage.setItem(

TTA_TEAM_KEY,

JSON.stringify(data)

);


}




// ===============================
// HIỂN THỊ TEAM
// ===============================


function renderTeams(){


const list = document.getElementById(
"teamList"
);



if(!list)

return;



const teams=getTeams();



list.innerHTML="";



if(teams.length===0){


list.innerHTML=

`

<div class="empty">

Chưa có Team nào

</div>

`;

return;


}



teams.forEach((team,index)=>{



const item=document.createElement(
"div"
);



item.className="teamItem";



item.innerHTML=

`

<div>


<h3>

🔥 ${team.name}

</h3>


<p>

📦 BOX ${team.box}

|

🕒 ${team.time}

</p>



<p>

💰 ${team.paid ? 

"✅ Đã thanh toán"

:

"❌ Chưa thanh toán"

}

</p>


</div>



<div>


<button

class="payBtn"

data-id="${index}">

💸

</button>


<button

class="deleteBtn"

data-id="${index}">

🗑️

</button>


</div>

`;



list.appendChild(item);



});




// nút thanh toán


document.querySelectorAll(

".payBtn"

).forEach(btn=>{


btn.onclick=function(){



const id=this.dataset.id;



let data=getTeams();



data[id].paid=true;



saveTeams(data);



renderTeams();



updateDashboard();



notify(

"Đã thanh toán Team"

);



};



});





// nút xóa


document.querySelectorAll(

".deleteBtn"

).forEach(btn=>{


btn.onclick=function(){



const id=this.dataset.id;



let data=getTeams();



data.splice(
id,
1
);



saveTeams(data);



renderTeams();



updateDashboard();



notify(

"Đã xóa Team"

);



};


});



}




// ===============================
// THÊM TEAM
// ===============================


function addTeam(){



const name=

document.getElementById(
"teamName"
)?.value.trim();



const box=

document.getElementById(
"teamBox"
)?.value;



const time=

document.getElementById(
"teamTime"
)?.value;



if(!name || !box || !time){


alert(
"Vui lòng nhập đủ thông tin"
);


return;


}




const teams=getTeams();



// chống trùng


const exists=

teams.some(

t=>

t.name.toLowerCase()

===

name.toLowerCase()

);



if(exists){


alert(

"Team này đã tồn tại"

);


return;


}




teams.push({


id:Date.now(),


name:name,


box:box,


time:time,


paid:false,


created:new Date()

.toLocaleString()



});




saveTeams(teams);



renderTeams();



updateDashboard();



notify(

"Đã thêm Team mới"

);



// reset form


document.getElementById(
"teamName"
).value="";



}




// ===============================
// DASHBOARD
// ===============================


function updateDashboard(){



const teams=getTeams();



const total=

document.getElementById(
"totalTeam"
);



const paid=

document.getElementById(
"paid"
);



const unpaid=

document.getElementById(
"unpaid"
);



const revenue=

document.getElementById(
"revenue"
);



if(total)

total.innerHTML=

teams.length;



const paidTeam=

teams.filter(

t=>t.paid

).length;



if(paid)

paid.innerHTML=

paidTeam;



if(unpaid)

unpaid.innerHTML=

teams.length-paidTeam;



const price=5000;



if(revenue)

revenue.innerHTML=

(

paidTeam*price

)

.toLocaleString()

+"đ";



}





// ===============================
// TÌM KIẾM TEAM
// ===============================


function searchTeam(){



const input=

document.getElementById(
"searchTeam"
);



if(!input)

return;



input.addEventListener(

"input",

()=>{


const key=

input.value.toLowerCase();



document.querySelectorAll(

".teamItem"

).forEach(item=>{


item.style.display=

item.innerText

.toLowerCase()

.includes(key)

?

"flex"

:

"none";



});



});



}





// ===============================
// THÔNG BÁO
// ===============================


function notify(msg){



if(window.sendNotification){


window.sendNotification(msg);



}



}




// ===============================
// START
// ===============================


document.addEventListener(

"DOMContentLoaded",

()=>{


const btn=

document.getElementById(
"addTeamBtn"
);



if(btn){


btn.onclick=addTeam;


}



renderTeams();


updateDashboard();


searchTeam();



});





console.log(

"🔥 APP SYSTEM READY"

);



}document.addEventListener("DOMContentLoaded",()=>{

setTimeout(()=>{

const loading=document.getElementById("loading");

if(loading){

loading.style.display="none";

}

},1000);


});
