import {
    db,
    ref,
    push,
    set,
    onValue,
    remove,
    update
} from "./firebase.js";


console.log("🔥 TTA CUSTOM MANAGER READY");



let editID = null;



const nameInput = document.getElementById("name");
const boxInput = document.getElementById("box");
const timeInput = document.getElementById("time");
const addBtn = document.getElementById("add");




// ==========================
// THÊM / SỬA TEAM
// ==========================


addBtn.onclick = async ()=>{


    let name = nameInput.value.trim();
    let box = boxInput.value;
    let time = timeInput.value;



    if(name==""){

        alert("Chưa nhập tên team");

        return;

    }



    if(editID){


        await update(

            ref(db,"teams/"+editID),

            {

                name:name,
                box:box,
                time:time

            }

        );


        editID=null;

        addBtn.innerHTML="➕ THÊM TEAM";


    }

    else{


        let all = [];

        onValue(
            ref(db,"teams"),
            (snap)=>{

                snap.forEach(item=>{

                    all.push(item.val());

                });

            },
            {
                onlyOnce:true
            }
        );



        await set(

            push(ref(db,"teams")),

            {

                name:name,

                box:box,

                time:time,

                paid:false,

                created:Date.now(),

                order:Date.now()

            }

        );


    }



    nameInput.value="";


};







// ==========================
// LẤY DATA FIREBASE
// ==========================



onValue(ref(db,"teams"),(snapshot)=>{


    let teams=[];



    snapshot.forEach(item=>{


        teams.push({

            id:item.key,

            ...item.val()

        });


    });



    // sắp xếp theo thời gian đăng ký

    teams.sort((a,b)=>{

        return a.order-b.order;

    });



    renderList(teams);

    renderMatch(teams);



});








// ==========================
// DANH SÁCH ADMIN
// ==========================



function renderList(teams){


let html="";



let group={};



teams.forEach(t=>{


    if(!group[t.time]){

        group[t.time]=[];

    }


    group[t.time].push(t);



});





Object.keys(group).forEach(time=>{


html+=`

<div class="time-title">

${time}

</div>

`;




group[time].forEach((t,index)=>{



html+=`


<div class="team">


<h3>

${index+1}️⃣ ${t.box} ${t.name}

</h3>



<p>

${t.time}

</p>



<p class="${t.paid?'paid':'unpaid'}">

${t.paid?"💸 ĐÃ THANH TOÁN":"❌ CHƯA THANH TOÁN"}

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


<button onclick="up('${t.id}')">

⬆️ Lên

</button>


<button onclick="down('${t.id}')">

⬇️ Xuống

</button>



</div>


`;



});



});



document.getElementById("list").innerHTML=html;


}









// ==========================
// BẢNG THI ĐẤU SLOT 01-12
// ==========================


function renderMatch(teams){



let html="";



let group={};



teams.forEach(t=>{


if(!group[t.time]){


group[t.time]=[];


}


group[t.time].push(t);



});





Object.keys(group).forEach(time=>{



html+=`

<div class="time-title">

${time}

</div>

`;



let players = group[time];



let tableNumber=0;



for(

let i=0;

i<players.length;

i+=12

){



let tableName =

String.fromCharCode(65+tableNumber);



let table = players.slice(i,i+12);



html+=`

<div class="table-box">


<h3>

🔥 BẢNG ${tableName}

</h3>

`;




for(let x=0;x<12;x++){


let p=table[x];



if(p){



html+=`

<div class="slot">


<span>

${String(x+1).padStart(2,"0")}️⃣

</span>



${p.name}

<br>


🔥 ${p.box}


<br>


${p.time}


<br>


${p.paid?"💸 ĐÃ THANH TOÁN":"❌ CHƯA THANH TOÁN"}



</div>

`;



}

else{


html+=`

<div class="slot">

${String(x+1).padStart(2,"0")}️⃣

(Trống)

</div>

`;



}



}



html+=`

</div>

`;



tableNumber++;


}



});



document.getElementById("match").innerHTML=html;


}








// ==========================
// THANH TOÁN
// ==========================


window.pay=function(id){


update(

ref(db,"teams/"+id),

{

paid:true

}

);


};







// ==========================
// XÓA
// ==========================


window.deleteTeam=function(id){


if(confirm("Xóa team này?")){


remove(

ref(db,"teams/"+id)

);


}


};







// ==========================
// SỬA
// ==========================


window.editTeam=function(id){



onValue(

ref(db,"teams/"+id),

(snapshot)=>{


let t=snapshot.val();



nameInput.value=t.name;

boxInput.value=t.box;

timeInput.value=t.time;



editID=id;



addBtn.innerHTML="💾 LƯU SỬA";



},


{

onlyOnce:true

}



);



};








// ==========================
// ĐỔI THỨ TỰ
// ==========================


window.up=function(id){


alert("Chức năng đổi vị trí sẽ hoàn thiện ở bản tiếp theo");


}



window.down=function(id){


alert("Chức năng đổi vị trí sẽ hoàn thiện ở bản tiếp theo");


}
