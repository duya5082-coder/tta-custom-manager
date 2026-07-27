import {
db,
ref,
push,
set,
onValue,
remove,
update
} from "./firebase.js";


console.log("APP ĐÃ CHẠY");


// bắt nút thêm

let button = document.getElementById("add");


console.log("BUTTON:", button);



button.addEventListener("click", async ()=>{


console.log("ĐÃ BẤM NÚT");



let name = document.getElementById("name").value;

let box = document.getElementById("box").value;

let time = document.getElementById("time").value;



console.log(name, box, time);



if(name==""){

alert("Chưa nhập tên team");

return;

}



let newRef = push(ref(db,"teams"));



await set(newRef,{

name:name,

box:box,

time:time,

paid:false

});



alert("THÊM TEAM THÀNH CÔNG");


});





// đọc dữ liệu


onValue(ref(db,"teams"),(snapshot)=>{


let list=document.getElementById("list");


let html="";



snapshot.forEach((item)=>{


let team=item.val();



html += `

<div>

<h3>${team.box} ${team.name}</h3>

<p>${team.time}</p>

<button onclick="xoa('${item.key}')">
Xóa
</button>


</div>

`;



});



list.innerHTML=html;


});





window.xoa=function(id){


remove(ref(db,"teams/"+id));


};
