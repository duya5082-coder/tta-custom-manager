import {

db,

ref,

push,

set,

onValue,

remove,

update

}

from "./firebase.js";




// =======================
// THÊM TEAM
// =======================


window.addTeam = function(){


let name = document.getElementById("name").value;

let time = document.getElementById("time").value;

let box = document.getElementById("box").value;



if(name.trim()==""){

alert("Nhập tên team!");

return;

}



let team = push(ref(db,"teams"));



set(team,{

name:name,

time:time,

box:box,

paid:false,

created:Date.now()

});



document.getElementById("name").value="";

document.getElementById("time").value="";


};







// =======================
// HIỂN THỊ 10 BOX
// =======================


onValue(ref(db,"teams"),(snapshot)=>{


let boxes={};


let total=0;

let paid=0;



// tạo BOX 1 - BOX 10

for(let i=1;i<=10;i++){

boxes["BOX "+i]="";

}



snapshot.forEach((item)=>{


let team=item.val();


total++;


if(team.paid){

paid++;

}




let html=`


<div class="team">


<h3>

${team.paid ? "💸 " : ""}

${team.name}

</h3>



<p>
⏰ ${team.time}
</p>



<p>
${team.box}
</p>



<p>

${team.paid 
? "✅ Đã thanh toán"
: "❌ Chưa thanh toán"}

</p>



<button onclick="payTeam('${item.key}')">

💸 Thanh toán

</button>



<button class="delete" onclick="deleteTeam('${item.key}')">

❌ Xóa

</button>



</div>


`;




if(boxes[team.box] !== undefined){

boxes[team.box] += html;

}



});




let output="";



for(let i=1;i<=10;i++){


output += `


<h2>
🔥 BOX ${i}
</h2>


${boxes["BOX "+i]}


`;



}



output += `


<hr>


<h3>
👥 Tổng team: ${total}
</h3>


<h3>
💸 Đã thanh toán: ${paid}
</h3>


`;



document.getElementById("list").innerHTML=output;



});








// =======================
// THANH TOÁN
// =======================


window.payTeam=function(id){


update(ref(db,"teams/"+id),{

paid:true

});


};







// =======================
// XÓA TEAM
// =======================


window.deleteTeam=function(id){


if(confirm("Xóa team này?")){


remove(ref(db,"teams/"+id));


}


};
