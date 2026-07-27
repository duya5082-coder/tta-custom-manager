import {

db,
ref,
push,
set,
onValue,
remove,
update

} from "./firebase.js";



window.addTeam=function(){


let name=document.getElementById("name").value;

let box=document.getElementById("box").value;

let time=document.getElementById("time").value;



if(name==""){

alert("Nhập tên team");

return;

}



let team=push(ref(db,"teams"));



set(team,{

name:name,

box:box,

time:time,

paid:false,

table:"A"

});



document.getElementById("name").value="";


};





onValue(ref(db,"teams"),(snapshot)=>{


let html="";



let boxes={};



snapshot.forEach(item=>{


let t=item.val();


let key=t.time;



if(!boxes[key]){

boxes[key]=[];

}



boxes[key].push(t);



});





Object.keys(boxes).forEach(time=>{


html+=`

<h2>${time}</h2>

<h3>🔥 BẢNG A</h3>

`;



boxes[time].forEach((team,index)=>{


html+=`

<div class="team">


${String(index+1).padStart(2,"0")}️⃣

${team.box}

${team.name}


<p>

${team.paid ? "💸 Đã thanh toán" : "❌ Chưa thanh toán"}

</p>


<button onclick="pay('${team.name}')">

💸 Thanh toán

</button>


</div>

`;



});


});



document.getElementById("list").innerHTML=html;


});





window.pay=function(name){


alert("Đã thanh toán: "+name);


};
