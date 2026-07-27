import {
db,
ref,
push,
set,
onValue,
remove,
update
} from "./firebase.js";



// THÊM TEAM

window.addTeam = function(){


let name = document.getElementById("name").value;

let time = document.getElementById("time").value;

let box = document.getElementById("box").value;



if(name==""){

alert("Nhập tên team");

return;

}



let team = push(ref(db,"teams"));



set(team,{

name:name,

time:time,

box:box,

paid:false

});


};






// HIỂN THỊ 10 BOX


onValue(ref(db,"teams"),(snapshot)=>{


let boxes={};


for(let i=1;i<=10;i++){

boxes["BOX "+i]="";

}



let total=0;


snapshot.forEach((item)=>{


let data=item.val();


total++;



let currentBox=data.box || "BOX 1";



boxes[currentBox]+=`

<div class="team">


<h3>

${data.paid ? "💸 " : ""}

${data.name}

</h3>


<p>

⏰ ${data.time}

</p>


<p>

${data.paid ? "✅ Đã thanh toán" : "❌ Chưa thanh toán"}

</p>


<button onclick="payTeam('${item.key}')">

💸 Thanh toán

</button>


<button onclick="deleteTeam('${item.key}')">

❌ Xóa

</button>


</div>

`;



});





let html="";



for(let i=1;i<=10;i++){


html += `


<h2>

🔥 BOX ${i}

</h2>


${boxes["BOX "+i]}


`;



}



html += `

<h3>
👥 Tổng team: ${total}
</h3>

`;



document.getElementById("list").innerHTML=html;



});








// THANH TOÁN

window.payTeam=function(id){


update(ref(db,"teams/"+id),{

paid:true

});


};





// XÓA

window.deleteTeam=function(id){


remove(ref(db,"teams/"+id));


};
