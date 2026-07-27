import {
db,
ref,
push,
set,
onValue,
remove,
update,
get
} from "./firebase.js";

const MAX_TEAM = 12;


// =======================
// THÊM TEAM TỰ CHIA BẢNG
// =======================

window.addTeam = async function(){

let name = document.getElementById("name").value;

let box = document.getElementById("box").value;

let time = document.getElementById("time").value;


if(name.trim()==""){

alert("Nhập tên team");

return;

}


// lấy dữ liệu hiện tại

let snap = await get(ref(db,"teams"));

let data = snap.val() || {};


// tìm bảng trống

let tableNumber = 0;

let table = "A";


while(true){


let count = 0;


Object.values(data).forEach(team=>{


if(
team.time == time &&
team.table == table
){

count++;

}


});



if(count < MAX_TEAM){

break;

}



tableNumber++;

table = String.fromCharCode(65 + tableNumber);


}



// tạo team


let newTeam = push(ref(db,"teams"));


set(newTeam,{

name:name,

box:box,

time:time,

table:table,

paid:false,

created:Date.now()

});



document.getElementById("name").value="";


};





// =======================
// HIỂN THỊ
// =======================


onValue(ref(db,"teams"),(snapshot)=>{


let groups={};



snapshot.forEach(item=>{


let team=item.val();


if(!groups[team.time]){

groups[team.time]={};

}



if(!groups[team.time][team.table]){

groups[team.time][team.table]=[];

}



groups[team.time][team.table].push({

...team,

id:item.key

});


});



let html="";



Object.keys(groups).forEach(time=>{


html+=`

<div class="time-box">

<h2>

${time}

</h2>

`;



Object.keys(groups[time]).sort().forEach(table=>{


html+=`

<h3>
🔥 BẢNG ${table}
</h3>

`;



groups[time][table].forEach((team,index)=>{


html+=`

<div class="team">


<b>
${String(index+1).padStart(2,"0")}️⃣
</b>


${team.box}

${team.name}


<br>


${team.paid ? "💸 Đã thanh toán" : "❌ Chưa thanh toán"}



<button onclick="pay('${team.id}')">

💸

</button>



<button onclick="del('${team.id}')">

❌

</button>


</div>


`;



});


});


html+=`

</div>

`;



});



document.getElementById("list").innerHTML=html;


});







// =======================
// THANH TOÁN
// =======================


window.pay=function(id){


update(ref(db,"teams/"+id),{

paid:true

});


};





// =======================
// XÓA
// =======================


window.del=function(id){


remove(ref(db,"teams/"+id));


};
