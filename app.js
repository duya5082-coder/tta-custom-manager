import {
    db,
    ref,
    push,
    set,
    onValue,
    remove,
    update
} from "./firebase.js";


window.addTeam = function(){

    let name = document.getElementById("name").value;
    let time = document.getElementById("time").value;

    if(name === ""){
        alert("Nhập tên team");
        return;
    }

    let team = push(ref(db,"teams"));

    set(team,{
        name:name,
        time:time,
        paid:false
    });

    document.getElementById("name").value="";
    document.getElementById("time").value="";
};



onValue(ref(db,"teams"),(snapshot)=>{

    let list = document.getElementById("list");

    list.innerHTML="";


    snapshot.forEach((item)=>{

        let data = item.val();


        list.innerHTML += `

        <div class="team">

            <h3>
            ${data.paid ? "💸 " : ""}${data.name}
            </h3>

            <p>
            ⏰ ${data.time}
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



window.payTeam = function(id){

    update(ref(db,"teams/"+id),{
        paid:true
    });

};



window.deleteTeam = function(id){

    remove(ref(db,"teams/"+id));

};
