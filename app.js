// =======================================
// CUSTOM TTA MANAGER
// APP SYSTEM
// app.js
// =======================================



window.TTA_APP_LOADED = true;

// =======================================
// DATABASE
// =======================================

const TEAM_KEY = "CUSTOM_TTA_TEAMS";

function getTeams(){

    try{

        const data = JSON.parse(
            localStorage.getItem(TEAM_KEY)
        );

        return Array.isArray(data)
            ? data
            : [];

    }catch(e){

        return [];

    }

}

function saveTeams(data){

    localStorage.setItem(
        TEAM_KEY,
        JSON.stringify(data)
    );

}

// =======================================
// PAGE NAVIGATION
// =======================================

window.openPage = function(page){

    document.querySelectorAll(".page").forEach(function(item){

        item.classList.add("hidden");

    });

    const target = document.getElementById(page);

    if(target){

        target.classList.remove("hidden");

    }

    document.querySelectorAll(".menu button").forEach(function(btn){

        btn.classList.remove("active");

    });

    const active = document.querySelector(
        '.menu button[data-page="'+page+'"]'
    );

    if(active){

        active.classList.add("active");

    }

};

// =======================================
// DASHBOARD
// =======================================

window.updateDashboard = function(){

    const teams = getTeams();

    const total = teams.length;

    const paid = teams.filter(function(t){

        return t.paid;

    }).length;

    const unpaid = total - paid;

    const revenue = paid * 5000;

    const totalEl = document.getElementById("totalTeam");
    const paidEl = document.getElementById("paid");
    const unpaidEl = document.getElementById("unpaid");
    const revenueEl = document.getElementById("revenue");

    if(totalEl) totalEl.textContent = total;
    if(paidEl) paidEl.textContent = paid;
    if(unpaidEl) unpaidEl.textContent = unpaid;

    if(revenueEl){

        revenueEl.textContent =
            revenue.toLocaleString() + "đ";

    }

};

// =======================================
// NOTIFY
// =======================================

window.notify = function(text){

    if(window.sendNotification){

        window.sendNotification(text);

    }

};// =======================================
// CUSTOM TTA MANAGER
// APP SYSTEM
// PHẦN 2
// =======================================

// HIỂN THỊ TEAM
function renderTeams() {

    const list = document.getElementById("teamList");
    if (!list) return;

    const teams = getTeams();
    list.innerHTML = "";

    if (teams.length === 0) {
        list.innerHTML = `
            <div class="empty">
                Chưa có Team nào
            </div>
        `;
        return;
    }

    teams.forEach((team, index) => {

        const item = document.createElement("div");
        item.className = "teamItem";

        item.innerHTML = `
            <div>
                <h3>🔥 ${team.name}</h3>
                <p>📦 ${team.box} | 🕒 ${team.time}</p>
                <p>${team.paid ? "💸 Đã thanh toán" : "❌ Chưa thanh toán"}</p>
            </div>

            <div>
                <button class="payBtn" data-id="${index}">💸</button>
                <button class="deleteBtn" data-id="${index}">🗑️</button>
            </div>
        `;

        list.appendChild(item);

    });

    // Nút thanh toán
    document.querySelectorAll(".payBtn").forEach(btn => {

        btn.onclick = function () {

            const teams = getTeams();
            teams[this.dataset.id].paid = true;

            saveTeams(teams);
            renderTeams();
            updateDashboard();
            notify("Đã thanh toán Team");

        };

    });

    // Nút xóa
    document.querySelectorAll(".deleteBtn").forEach(btn => {

        btn.onclick = function () {

            const teams = getTeams();
            teams.splice(this.dataset.id, 1);

            saveTeams(teams);
            renderTeams();
            updateDashboard();
            notify("Đã xóa Team");

        };

    });

}// =======================================
// CUSTOM TTA MANAGER
// PHẦN 3
// UI + TEAM SYSTEM
// =======================================

function createTTABox(){

    let app = document.createElement("div");

    app.id = "tta-manager";

    app.innerHTML = `

    <div class="tta-header">
        💸 CUSTOM TTA MANAGER
    </div>


    <div class="tta-body">

        <input 
        id="tta-name"
        placeholder="Nhập tên đội">

        <button onclick="addTTAPlayer()">
            ➕ Thêm đội
        </button>


        <div id="tta-list">

        </div>


    </div>


    `;


    document.body.appendChild(app);

}



function addTTAPlayer(){

    let name =
    document.getElementById("tta-name").value;


    if(name.trim()==""){
        alert("Chưa nhập tên!");
        return;
    }


    let data =
    JSON.parse(localStorage.getItem("TTA_LIST"))
    || [];


    data.push({

        name:name,
        time:new Date().toLocaleString()

    });


    localStorage.setItem(
        "TTA_LIST",
        JSON.stringify(data)
    );


    document.getElementById("tta-name").value="";


    loadTTAList();

}




function loadTTAList(){

    let box =
    document.getElementById("tta-list");


    if(!box) return;


    let data =
    JSON.parse(localStorage.getItem("TTA_LIST"))
    || [];


    box.innerHTML="";


    data.forEach((item,index)=>{


        box.innerHTML += `


        <div class="tta-item">


        <b>
        ${index+1}. ${item.name}
        </b>


        <small>
        ${item.time}
        </small>


        <button 
        onclick="removeTTA(${index})">
        ❌
        </button>


        </div>


        `;


    });


}




function removeTTA(index){


    let data =
    JSON.parse(localStorage.getItem("TTA_LIST"))
    || [];


    data.splice(index,1);


    localStorage.setItem(
        "TTA_LIST",
        JSON.stringify(data)
    );


    loadTTAList();

}





window.addEventListener(
"load",
()=>{

    createTTABox();

    loadTTAList();

});// =======================================
// CUSTOM TTA MANAGER
// PHẦN 4
// BILL SYSTEM 5K
// =======================================


function createBillTTA(){


    let data =
    JSON.parse(localStorage.getItem("TTA_LIST"))
    || [];


    if(data.length == 0){

        alert("Chưa có đội đăng ký!");
        return;

    }



    let bill = 
    "💸 CUSTOM TTA 5K\n\n";


    bill +=
    "📋 DANH SÁCH TEAM\n\n";



    data.forEach((item,index)=>{


        bill +=
        `${index+1}. ${item.name} 💸\n`;


    });



    bill +=
    "\n💰 Lệ phí: 5K/team";



    navigator.clipboard.writeText(bill);



    alert(
    "Đã tạo bill và copy!"
    );

}





function cancelTTA(name){


    let data =
    JSON.parse(localStorage.getItem("TTA_LIST"))
    || [];



    let newData =
    data.filter(
        item =>
        item.name.toLowerCase()
        != name.toLowerCase()
    );



    localStorage.setItem(
        "TTA_LIST",
        JSON.stringify(newData)
    );


    loadTTAList();


}





// tạo nút bill

window.addEventListener(
"load",
()=>{


let box =
document.getElementById("tta-manager");


if(box){


box.innerHTML += `


<button 
onclick="createBillTTA()"
class="bill-btn">

💸 TẠO BILL 5K

</button>


`;


}


});// =======================================
// CUSTOM TTA MANAGER
// PHẦN 5
// COMMAND SYSTEM
// =======================================


function createCommandBox(){


let box =
document.getElementById("tta-manager");


if(!box) return;



box.innerHTML += `


<div class="tta-command">


<input 
id="tta-command-input"
placeholder="Nhập: đăng ký Team A">


<button onclick="runTTACommand()">
▶ Gửi
</button>


</div>


<div id="tta-log">

</div>


`;



}




function runTTACommand(){


let input =
document.getElementById(
"tta-command-input"
);


let command =
input.value.trim();



if(command=="") return;



let text =
command.toLowerCase();



if(text.startsWith("đăng ký")){


let name =
command.substring(8).trim();



if(name==""){

alert("Chưa có tên team");
return;

}



let data =
JSON.parse(
localStorage.getItem("TTA_LIST")
)
|| [];



data.push({

name:name,
time:new Date()
.toLocaleString()

});



localStorage.setItem(
"TTA_LIST",
JSON.stringify(data)
);



addTTALog(
"✅ Đã đăng ký: "+name
);



}



else if(text.startsWith("hủy")){


let name =
command.substring(3).trim();



cancelTTA(name);



addTTALog(
"❌ Đã hủy: "+name
);



}


else{


addTTALog(
"⚠️ Không hiểu lệnh"
);


}



input.value="";


loadTTAList();


}




function addTTALog(text){


let log =
document.getElementById(
"tta-log"
);



if(!log) return;



log.innerHTML += `

<div>
${text}
</div>

`;



}




window.addEventListener(
"load",
()=>{

createCommandBox();

});// =======================================
// CUSTOM TTA MANAGER
// PHẦN 6
// STATISTICS SYSTEM
// =======================================


function createStatsBox(){


let box =
document.getElementById(
"tta-manager"
);


if(!box) return;



box.innerHTML += `


<div class="tta-stats">


<h3>
📊 THỐNG KÊ TTA
</h3>


<div id="tta-stats-content">

</div>


</div>


`;



updateTTAStats();


}




function updateTTAStats(){


let stats =
document.getElementById(
"tta-stats-content"
);



if(!stats) return;



let data =
JSON.parse(
localStorage.getItem("TTA_LIST")
)
|| [];



let team =
data.length;



let money =
team * 5000;



stats.innerHTML = `


<p>
👥 Số team:
<b>${team}</b>
</p>


<p>
💸 Tổng tiền:
<b>${money.toLocaleString()}đ</b>
</p>


<p>
📅 Cập nhật:
${new Date()
.toLocaleString()}
</p>


`;



}





window.addEventListener(
"load",
()=>{


createStatsBox();


});




// cập nhật tự động sau mỗi lần thêm/xóa

let oldLoad =
window.loadTTAList;



window.loadTTAList =
function(){


if(oldLoad)
oldLoad();



updateTTAStats();


};// =======================================
// CUSTOM TTA MANAGER
// PHẦN 7
// ADMIN LOGIN SYSTEM
// =======================================


const ADMIN_ACCOUNT = {

    username:"admin",
    password:"123456"

};



let TTA_ADMIN_LOGIN =
localStorage.getItem(
"TTA_ADMIN_LOGIN"
) === "true";





function createAdminBox(){


let box =
document.getElementById(
"tta-manager"
);


if(!box) return;



box.innerHTML += `


<div class="tta-admin">


<h3>
🔐 ADMIN
</h3>


<div id="admin-status">

</div>


<div id="admin-login-box">


<input 
id="admin-user"
placeholder="Tài khoản">


<input 
id="admin-pass"
type="password"
placeholder="Mật khẩu">


<button onclick="loginTTAAdmin()">
Đăng nhập
</button>


</div>



</div>


`;



updateAdminStatus();



}





function loginTTAAdmin(){


let user =
document.getElementById(
"admin-user"
).value;


let pass =
document.getElementById(
"admin-pass"
).value;



if(
user === ADMIN_ACCOUNT.username
&&
pass === ADMIN_ACCOUNT.password

){


localStorage.setItem(
"TTA_ADMIN_LOGIN",
"true"
);



TTA_ADMIN_LOGIN = true;



alert(
"✅ Đăng nhập Admin thành công"
);



updateAdminStatus();


}

else{


alert(
"❌ Sai tài khoản hoặc mật khẩu"
);


}



}





function logoutTTAAdmin(){


localStorage.removeItem(
"TTA_ADMIN_LOGIN"
);



TTA_ADMIN_LOGIN=false;



updateAdminStatus();



}




function updateAdminStatus(){


let box =
document.getElementById(
"admin-status"
);



if(!box) return;



if(TTA_ADMIN_LOGIN){


box.innerHTML = `


<p>
🟢 Admin đang hoạt động
</p>


<button onclick="logoutTTAAdmin()">
🚪 Đăng xuất
</button>


`;



}

else{


box.innerHTML = `

<p>
🔴 Chưa đăng nhập
</p>

`;



}



}





window.addEventListener(
"load",
()=>{


createAdminBox();


});// =======================================
// CUSTOM TTA MANAGER
// PHẦN 8
// BACKUP + ADMIN PROTECT
// =======================================



// ===============================
// KIỂM TRA QUYỀN ADMIN
// ===============================

function checkTTAAdmin(){


return localStorage.getItem(
"TTA_ADMIN_LOGIN"
) === "true";


}





// ===============================
// XÓA TEAM AN TOÀN
// ===============================

function removeTTA(index){


if(!checkTTAAdmin()){


alert(
"🔒 Cần đăng nhập Admin để xóa!"
);


return;


}



let data =
JSON.parse(
localStorage.getItem("TTA_LIST")
)
|| [];



data.splice(index,1);



localStorage.setItem(
"TTA_LIST",
JSON.stringify(data)
);



loadTTAList();



alert(
"✅ Đã xóa team"
);



}





// ===============================
// XUẤT BACKUP
// ===============================

function exportTTABackup(){


let data =
localStorage.getItem(
"TTA_LIST"
)
|| "[]";



let file =
new Blob(
[data],
{
type:"application/json"
}
);



let url =
URL.createObjectURL(file);



let a =
document.createElement("a");



a.href=url;


a.download=
"TTA_Backup.json";



a.click();



URL.revokeObjectURL(url);



alert(
"📤 Đã xuất backup!"
);



}





// ===============================
// NHẬP BACKUP
// ===============================

function importTTABackup(event){


if(!checkTTAAdmin()){


alert(
"🔒 Cần Admin để nhập dữ liệu!"
);


return;


}



let file =
event.target.files[0];



if(!file) return;



let reader =
new FileReader();



reader.onload =
function(e){


try{


let data =
JSON.parse(
e.target.result
);



localStorage.setItem(
"TTA_LIST",
JSON.stringify(data)
);



loadTTAList();



alert(
"📥 Khôi phục thành công!"
);



}

catch{


alert(
"❌ File lỗi!"
);


}



};



reader.readAsText(file);



}





// ===============================
// TẠO MENU BACKUP
// ===============================

window.addEventListener(
"load",
()=>{


let box =
document.getElementById(
"tta-manager"
);



if(!box) return;



box.innerHTML += `


<div class="tta-backup">


<h3>
💾 BACKUP DATA
</h3>


<button onclick="exportTTABackup()">

📤 Xuất file

</button>



<input 
type="file"
accept=".json"
onchange="importTTABackup(event)">


</div>


`;



});// =======================================
// MENU FIX FINAL
// =======================================


window.addEventListener(
"load",
()=>{


document.querySelectorAll(
".menu button"
).forEach(btn=>{


btn.addEventListener(
"click",
function(){


let page =
this.getAttribute(
"data-page"
);



console.log(
"CLICK:",
page
);



document.querySelectorAll(
".page"
).forEach(p=>{


p.classList.add(
"hidden"
);


});



let target =
document.getElementById(page);



if(target){


target.classList.remove(
"hidden"
);


console.log(
"OPEN:",
page
);


}


});


});


});window.openPage = function(page){

    document.querySelectorAll(".page").forEach(p=>{
        p.classList.add("hidden");
    });

    const target = document.getElementById(page);

    if(target){
        target.classList.remove("hidden");
    }else{
        console.error("Không tìm thấy page:", page);
    }

};



