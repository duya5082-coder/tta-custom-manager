import {

db,
ref,
push,
set,
onValue,
remove,
update

} from "./firebase.js";



console.log("TTA MANAGER RUN");



let editID = null;



const nameInput =
document.getElementById("name");


const boxInput =
document.getElementById("box");


const timeInput =
document.getElementById("time");


const addBtn =
document.getElementById("add");





// THÊM / SỬA


addBtn.onclick = async ()=>{


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







// HIỂN THỊ


onValue(ref(db,"teams"),(snap)=>{


let html="";


let groups={};



snap.forEach(item=>{


let t=item.val();



if(!groups[t.time]){

groups[t.time]=[];

}



groups[t.time].push({

id:item.key,

...t

});



});





Object.keys(groups).forEach(time=>{


html+=`

<div class="time-box">

<h2>

${time}

</h2>

`;



groups[time].forEach((t,index)=>{


html+=`

<div class="team">


<h3>

${index+1}️⃣

${t.box}

${t.name}

</h3>



<p>

${t.paid 
?"💸 ĐÃ THANH TOÁN"
:"❌ CHƯA THANH TOÁN"}

</p>



<button onclick="pay('${t.id}')">

💸 Thanh toán

</button>



<button onclick="edit('${t.id}','${t.name}','${t.box}','${t.time}')">

✏️ Sửa

</button>



<button onclick="del('${t.id}')">

🗑 Xóa

</button>


</div>


`;


});



html+=`</div>`;


});



document.getElementById("list").innerHTML=html;


});







// THANH TOÁN


window.pay=function(id){


update(

ref(db,"teams/"+id),

{

paid:true

}

);


};





// XÓA


window.del=function(id){


if(confirm("Xóa team này?")){


remove(ref(db,"teams/"+id));


}


};







// SỬA


window.edit=function(id,name,box,time){


editID=id;


nameInput.value=name;


boxInput.value=box;


timeInput.value=time;



addBtn.innerHTML="💾 LƯU SỬA";


};
