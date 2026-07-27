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


    if(name==""){
        alert("Nhập tên team!");
        return;
    }


    let teamRef = push(ref(db,"teams"));


    set(teamRef,{
        name:name,
        time:time,
        box:"BOX 1",
        paid:false
    });


    document.getElementById("name").value="";
}



// HIỂN THỊ TEAM

let list = document.getElementById("list");


onValue(ref(db,"teams"),(snapshot)=>{

    list.innerHTML="";


    snapshot.forEach((child)=>{


        let data = child.val();


        list.innerHTML += `

        <div class="team">

        <b>${data.paid ? "💸 " : ""}${data.name}</b>
        <br>

        ⏰ ${data.time}

        <br>

        <button onclick="payTeam('${child.key}')">
        Thanh toán
        </button>


        <button onclick="deleteTeam('${child.key}')">
        Xóa
        </button>


        </div>

        `;

    });


});




// THANH TOÁN

window.payTeam=function(id){

update(ref(db,"teams/"+id),{
    paid:true
});

}



// XÓA

window.deleteTeam=function(id){

remove(ref(db,"teams/"+id));

}
