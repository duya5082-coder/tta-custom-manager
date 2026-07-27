import {

db,
ref,
push,
set,
onValue,
remove,
update

} from "./firebase.js";


console.log("APP MỚI ĐÃ CHẠY");



// THÊM TEAM

document.getElementById("add").onclick = function(){


console.log("ĐÃ BẤM THÊM TEAM");



let name =
document.getElementById("name").value;


let box =
document.getElementById("box").value;


let time =
document.getElementById("time").value;



if(name.trim()==""){

alert("Chưa nhập tên team");

return;

}



let teamRef = push(ref(db,"teams"));



set(teamRef,{

name:name,

box:box,

time:time,

paid:false

})


.then(()=>{


alert("Đã thêm team");


document.getElementById("name").value="";


})


.catch((error)=>{


alert(error.message);


});


};






// HIỂN THỊ


onValue(ref(db,"teams"),(snapshot)=>{


let html="";



snapshot.forEach((item)=>{


let team=item.val();



html += `


<div class="team">


<h3>

${team.box}

${team.name}

</h3>


<p>

${team.time}

</p>


<p>

${team.paid ? "💸 Đã thanh toán":"❌ Chưa thanh toán"}

</p>


<button onclick="pay('${item.key}')">

💸 Thanh toán

</button>


<button onclick="del('${item.key}')">

❌ Xóa

</button>


</div>


`;


});



document.getElementById("list").innerHTML = html;


});







window.pay=function(id){


update(ref(db,"teams/"+id),{

paid:true

});


};





window.del=function(id){


remove(ref(db,"teams/"+id));


};
