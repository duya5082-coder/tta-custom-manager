import {
    db,
    ref,
    push,
    set,
    onValue,
    remove,
    update
} from "./firebase.js";


// Thêm team
window.addTeam = function(){

    const name = document.getElementById("name").value;
    const time = document.getElementById("time").value;


    if(name === ""){
        alert("Vui lòng nhập tên team");
        return;
    }


    const teamRef = push(ref(db, "teams"));


    set(teamRef,{
        name: name,
        time: time,
        box: "BOX 1",
        paid: false
    });


    document.getElementById("name").value = "";
    document.getElementById("time").value = "";

};



// Hiển thị danh sách team

const list = document.getElementById("list");


onValue(ref(db,"teams"),(snapshot)=>{


    list.innerHTML = "";


    snapshot.forEach((item)=>{


        const team = item.val();


        list.innerHTML += `

        <div class="team">

            <h3>
            ${team.paid ? "💸 " : ""}
            ${team.name}
            </h3>

            <p>
            ⏰ ${team.time}
            </p>


            <button onclick="payTeam('${item.key}')">
            Thanh toán
            </button>


            <button onclick="deleteTeam('${item.key}')">
            Xóa
            </button>

        </div>

        `;


    });


});




// Đánh dấu thanh toán

window.payTeam = function(id){

    update(ref(db,"teams/"+id),{

        paid:true

    });

};




// Xóa team

window.deleteTeam = function(id){

    remove(ref(db,"teams/"+id));

};
