import {

db,
ref,
push,
set,
onValue,
remove,
update

} from "./firebase.js";



console.log("🔥 APP TTA MANAGER RUN");



let editID = null;



const nameInput = document.getElementById("name");
const boxInput = document.getElementById("box");
const timeInput = document.getElementById("time");
const addBtn = document.getElementById("add");





// =======================
// THÊM / SỬA TEAM
// =======================


addBtn.onclick = async ()=>{


let name = nameInput.value.trim();

let box = boxInput.value;

let time = timeInput.value;



if(name==""){

alert("Nhập tên team");

return;

}




let data = {

name:name,

box:box,

time:time,

paid:false,

created:Date.now()

};





if(editID){


await update(

ref(db,"teams/"+editID),

data

);


editID=null;

addBtn.innerHTML="➕ THÊM TEAM";


}

else{


await set(

push(ref(db,"teams")),

data

);


}



nameInput.value="";


};









// =======================
// ĐỌC FIREBASE
// =======================


onValue(ref(db,"teams"),(snap)=>{


let teams=[];



snap.forEach(item=>{


teams.push({

id:item.key,

...item.val()

});


});



renderList(teams);

renderTable(teams);



});









// =======================
// DANH SÁCH ĐĂNG KÝ
// =======================


function renderList(teams){


let html="";



let times={};



teams.forEach(t=>{


if(!times[t.time]){

times[t.time]=[];

}


times[t.time].push(t);


});





Object.keys(times).forEach(time=>{


html+=`

<div class="time-title">

${time}

</div>

`;



times[time].forEach((t,index)=>{


html+=`

<div class="team">


<h3>

${index+1}️⃣ ${t.box} ${t.name}

</h3>


<p class="${t.paid?'paid':'unpaid'}">

${t.paid?"💸 ĐÃ THANH TOÁN":"❌ CHƯA THANH TOÁN"}

</p>



<button onclick="pay('${t.id}')">

💸 Thanh toán

</button>



<button onclick="editTeam('${t.id}')">

✏️ Sửa

</button>



<button onclick="deleteTeam('${t.id}')">

🗑 Xóa

</button>


</div>

`;



});


});



document.getElementById("list").innerHTML=html;


}










// =======================
// BẢNG THI ĐẤU A B C D
// =======================


function renderTable(teams){


let html="";



let times={};



teams.forEach(t=>{


if(!times[t.time]){

times[t.time]=[];

}


times[t.time].push(t);


});





Object.keys(times).forEach(time=>{


html+=`

<div class="time-title">

${time}

</div>

`;



let current=0;

let table=0;



while(current < times[time].length){



let letter =

String.fromCharCode(65+table);



let group =

times[time].slice(current,current+12);



if(group.length>0){



html+=`

<div class="table-box">


<h3>

🔥 BẢNG ${letter}

</h3>


`;



group.forEach((t,i)=>{


html+=`

<div class="slot">

${String(i+1).padStart(2,"0")}️⃣

${t.box}

${t.name}

</div>

`;


});



html+=`

</div>

`;



}



current +=12;

table++;


}



});




document.getElementById("match").innerHTML=html;


}









// =======================
// THANH TOÁN
// =======================


window.pay=function(id){


update(

ref(db,"teams/"+id),

{

paid:true

}

);


};







// =======================
// XÓA
// =======================


window.deleteTeam=function(id){


if(confirm("Xóa team này?")){


remove(

ref(db,"teams/"+id)

);


}


};








// =======================
// SỬA
// =======================


window.editTeam=function(id){



onValue(

ref(db,"teams/"+id),

(snapshot)=>{


let t=snapshot.val();



nameInput.value=t.name;

boxInput.value=t.box;

timeInput.value=t.time;



editID=id;



addBtn.innerHTML="💾 LƯU SỬA";


},

{

onlyOnce:true

}

);



};
