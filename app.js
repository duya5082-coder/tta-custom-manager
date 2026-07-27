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




// THÊM TEAM

window.addTeam = function(){


let name = document.getElementById("name").value;

let time = document.getElementById("time").value;



if(name==""){

alert("Nhập tên team");

return;

}



let newTeam = push(ref(db,"teams"));



set(newTeam,{

name:name,

time:time,

paid:false

});



document.getElementById("name").value="";

document.getElementById("time").value="";


};





// HIỂN THỊ TEAM


onValue(ref(db,"teams"),(data)=>{


let list=document.getElementById("list");


list.innerHTML="";



data.forEach((item)=>{


let team=item.val();



list.innerHTML += `


<div class="team">


<h3>

${team.paid ? "💸 " : ""}

${team.name}

</h3>


<p>

⏰ ${team.time}

</p>



<button onclick="pay('${item.key}')">

Thanh toán

</button>


<button class="delete" onclick="del('${item.key}')">

Xóa

</button>


</div>


`;


});


});






window.pay=function(id){


update(ref(db,"teams/"+id),{

paid:true

});


}




window.del=function(id){


remove(ref(db,"teams/"+id));


}
