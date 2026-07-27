import {
db,
ref,
push,
set,
onValue,
remove,
update
} from "./firebase.js";



const MAX_TEAM = 12;



// thêm team

window.addTeam = function(){


let name = document.getElementById("name").value;

let box = document.getElementById("box").value;

let time = document.getElementById("time").value;



if(name==""){

alert("Nhập tên team");

return;

}



let data = push(ref(db,"teams"));



set(data,{

name:name,

box:box,

time:time,

paid:false,

created:Date.now()

});



document.getElementById("name").value="";


};






// tìm bảng hiện tại

function getTable(number){


return String.fromCharCode(65 + number);


}




// hiển thị


onValue(ref(db,"teams"),(snapshot)=>{


let groups={};



snapshot.forEach((item)=>{


let t=item.val();


let key=t.time;


if(!groups[key]){

groups[key]={};

}


if(!groups[key][t.table]){

groups[key][t.table]=[];

}



groups[key][t.table].push({

...t,

id:item.key

});


});



let html="";



Object.keys(groups).forEach(time=>{


html+=`

<h2>${time}</h2>

`;



Object.keys(groups[time]).forEach(table=>{


html+=`

<h3>
BẢNG ${table}
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


${team.paid ? "💸" : ""}


<button onclick="pay('${team.id}')">

Thanh toán

</button>


<button onclick="del('${team.id}')">

Xóa

</button>


</div>


`;



});



});



});



document.getElementById("list").innerHTML=html;



});







// thanh toán

window.pay=function(id){


update(ref(db,"teams/"+id),{

paid:true

});


};




// xóa

window.del=function(id){

remove(ref(db,"teams/"+id));

};
