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




// =================
// THÊM TEAM
// =================


window.addTeam = function(){


let name = document.getElementById("name").value;

let time = document.getElementById("time").value;

let box = document.getElementById("box").value;



if(name.trim()==""){

alert("Vui lòng nhập tên team");

return;

}



let teamRef = push(ref(db,"teams"));



set(teamRef,{

name:name,

time:time,

box:box,

paid:false,

created:Date.now()

});



document.getElementById("name").value="";

document.getElementById("time").value="";


};







// =================
// HIỂN THỊ TEAM
// =================


onValue(ref(db,"teams"),(snapshot)=>{


let box1="";

let box2="";

let total=0;

let paid=0;



snapshot.forEach((item)=>{


let team=item.val();


total++;


if(team.paid){

paid++;

}



let html = `


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



<button class="delete"

onclick="deleteTeam('${item.key}')">

❌ Xóa

</button>


</div>


`;




if(team.box=="BOX 2"){

box2 += html;

}

else{

box1 += html;

}



});




document.getElementById("list").innerHTML=`

<h2>
🔥 BOX 1
</h2>

${box1}



<h2>
🔥 BOX 2
</h2>

${box2}



<hr>


<h3>

👥 Tổng team: ${total}

</h3>


<h3>

💸 Đã thanh toán: ${paid}

</h3>

`;



});








// =================
// THANH TOÁN
// =================


window.payTeam=function(id){


update(ref(db,"teams/"+id),{

paid:true

});


};








// =================
// XÓA TEAM
// =================


window.deleteTeam=function(id){


if(confirm("Xóa team này?")){


remove(ref(db,"teams/"+id));


}


};
