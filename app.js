import {
db,
ref,
push,
set,
onValue,
remove,
update
} from "./firebase.js";


console.log("🔥 TTA CUSTOM MANAGER ONLINE");


let editID = null;



const nameInput = document.getElementById("name");
const boxInput = document.getElementById("box");
const timeInput = document.getElementById("time");
const addBtn = document.getElementById("add");



const slots = [
"0️⃣1️⃣",
"0️⃣2️⃣",
"0️⃣3️⃣",
"0️⃣4️⃣",
"0️⃣5️⃣",
"0️⃣6️⃣",
"0️⃣7️⃣",
"0️⃣8️⃣",
"0️⃣9️⃣",
"1️⃣0️⃣",
"1️⃣1️⃣",
"1️⃣2️⃣"
];



// =====================
// THÊM TEAM
// =====================


addBtn.onclick = async()=>{


let name=nameInput.value.trim();

let box=boxInput.value;

let time=timeInput.value;



if(name==""){

alert("Nhập tên team");

return;

}



let data={

name:name,

box:box,

time:time,

paid:false,

order:Date.now(),

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







// =====================
// LOAD DATA
// =====================


onValue(ref(db,"teams"),snap=>{


let teams=[];



snap.forEach(item=>{


teams.push({

id:item.key,

...item.val()

});


});



teams.sort((a,b)=>a.order-b.order);



renderList(teams);

renderPaid(teams);

renderMatch(teams);

renderStats(teams);



});







// =====================
// DANH SÁCH CHƯA THANH TOÁN
// =====================


function renderList(teams){


let html="";



teams.filter(t=>!t.paid)

.forEach((t,i)=>{


html+=`

<div class="team">

<h3>

${i+1}️⃣ ${t.name}(${t.box})

</h3>


<p>

${t.time}

</p>


<p class="unpaid">

❌ CHƯA THANH TOÁN

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



document.getElementById("list").innerHTML=html;


}







// =====================
// ĐÃ THANH TOÁN
// =====================


function renderPaid(teams){


let html="";



teams.filter(t=>t.paid)

.forEach((t,i)=>{


html+=`

<div class="team">


<h3>

${i+1}️⃣ ${t.name}(${t.box})💸

</h3>



<p>

${t.time}

</p>



<button onclick="deleteTeam('${t.id}')">

🗑 Xóa

</button>



</div>

`;



});



document.getElementById("paidList").innerHTML=html;


}







// =====================
// TẠO BẢNG MESSENGER
// =====================


function renderMatch(teams){



let html="";



let times={};



teams.forEach(t=>{


if(!times[t.time]){

times[t.time]=[];

}


times[t.time].push(t);


});





let id=0;



Object.keys(times).forEach(time=>{


let list=times[time];


let table=0;



for(let i=0;i<list.length;i+=12){


table++;


id++;


let tableText=
`${time} Bảng ${String.fromCharCode(64+table)}

`;



let group=list.slice(i,i+12);



for(let x=0;x<12;x++){


let t=group[x];


if(t){


tableText +=

`${slots[x]} ${t.name}(${t.box})${t.paid?"💸":""}
`;


}

else{


tableText +=

`${slots[x]}
`;


}


}



tableText+="\n____";





html+=`

<div class="table-box">


<h3>

🔥 Bảng ${String.fromCharCode(64+table)}

</h3>


<pre id="copy${id}">${tableText}</pre>


<button onclick="copyTable('${id}')">

📋 COPY BẢNG ${String.fromCharCode(64+table)}

</button>



</div>

`;



}



});



document.getElementById("match").innerHTML=html;


}









// =====================
// COPY TỪNG BẢNG
// =====================


window.copyTable=function(id){


let text=document
.getElementById("copy"+id)
.innerText;



navigator.clipboard.writeText(text);



alert("✅ Đã copy bảng đấu");


};









// =====================
// THANH TOÁN
// =====================


window.pay=function(id){


update(

ref(db,"teams/"+id),

{

paid:true

}

);


};








// =====================
// XÓA
// =====================


window.deleteTeam=function(id){


if(confirm("Xóa team này?")){


remove(

ref(db,"teams/"+id)

);


}


};







// =====================
// SỬA
// =====================


window.editTeam=function(id){



onValue(

ref(db,"teams/"+id),

snap=>{


let t=snap.val();



nameInput.value=t.name;

boxInput.value=t.box;

timeInput.value=t.time;



editID=id;


addBtn.innerHTML="💾 LƯU";


},


{

onlyOnce:true

}


);


};








// =====================
// THỐNG KÊ
// =====================


function renderStats(teams){


let total=teams.length;


let paid=teams.filter(t=>t.paid).length;


let unpaid=total-paid;


document.getElementById("total").innerHTML=
"Tổng team: "+total;



document.getElementById("paidCount").innerHTML=
"Đã thanh toán: "+paid;



document.getElementById("unpaidCount").innerHTML=
"Chưa thanh toán: "+unpaid;



document.getElementById("money").innerHTML=
"Doanh thu: "+(paid*5)+"K";


}
