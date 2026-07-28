// =======================================
// CUSTOM TTA MANAGER
// APP SYSTEM
// PHẦN 1
// =======================================

if (window.TTA_APP_LOADED) {

    console.warn("APP đã được load");

} else {

window.TTA_APP_LOADED = true;

// =======================================
// DATABASE
// =======================================

const TEAM_KEY = "CUSTOM_TTA_TEAMS";

function getTeams(){

    try{

        const data = JSON.parse(localStorage.getItem(TEAM_KEY));

        return Array.isArray(data) ? data : [];

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

    const target=document.getElementById(page);

    if(target){

        target.classList.remove("hidden");

    }

    document.querySelectorAll(".menu button").forEach(function(btn){

        btn.classList.remove("active");

    });

    const active=document.querySelector(
        '.menu button[data-page="'+page+'"]'
    );

    if(active){

        active.classList.add("active");

    }

};

// =======================================
// DASHBOARD
// =======================================

window.updateDashboard=function(){

    const teams=getTeams();

    const total=teams.length;

    const paidTeams=teams.filter(t=>t.paid);

    const paid=paidTeams.length;

    const unpaid=total-paid;

    const revenue=paid*5000;

    const totalEl=document.getElementById("totalTeam");
    const paidEl=document.getElementById("paid");
    const unpaidEl=document.getElementById("unpaid");
    const revenueEl=document.getElementById("revenue");

    if(totalEl) totalEl.textContent=total;

    if(paidEl) paidEl.textContent=paid;

    if(unpaidEl) unpaidEl.textContent=unpaid;

    if(revenueEl)
        revenueEl.textContent=
        revenue.toLocaleString()+"đ";

};

// =======================================
// THÔNG BÁO
// =======================================

window.notify=function(text){

    if(window.sendNotification){

        window.sendNotification(text);

    }

};

// =======================================
// DOM READY
// =======================================

document.addEventListener("DOMContentLoaded",function(){

    // Menu

    document.querySelectorAll(".menu button").forEach(function(btn){

        btn.onclick=function(){

            openPage(this.dataset.page);

        };

    });

    // Dashboard mặc định

    openPage("dashboard");

    updateDashboard();

});// ===============================
// HIỂN THỊ TEAM
// ===============================

function renderTeams(){

    const list = document.getElementById("teamList");

    if(!list) return;

    const teams = getTeams();

    list.innerHTML = "";

    if(teams.length===0){
        list.innerHTML=`
        <div class="empty">
            Chưa có Team nào
        </div>
        `;
        return;
    }

    teams.forEach((team,index)=>{

        const item=document.createElement("div");

        item.className="teamItem";

        item.innerHTML=`

        <div>

            <h3>🔥 ${team.name}</h3>

            <p>
                📦 ${team.box}
                |
                🕒 ${team.time}
            </p>

            <p>
                ${
                    team.paid
                    ? "💸 Đã thanh toán"
                    : "❌ Chưa thanh toán"
                }
            </p>

        </div>

        <div>

            <button
                class="payBtn"
                data-id="${index}">
                💸
            </button>

            <button
                class="deleteBtn"
                data-id="${index}">
                🗑️
            </button>

        </div>

        `;

        list.appendChild(item);

    });

    //=====================
    // NÚT THANH TOÁN
    //=====================

    document.querySelectorAll(".payBtn").forEach(btn=>{

        btn.onclick=function(){

            const id=this.dataset.id;

            let teams=getTeams();

            teams[id].paid=true;

            saveTeams(teams);

            renderTeams();

            updateDashboard();

            notify("Đã thanh toán");

        };

    });

    //=====================
    // NÚT XOÁ
    //=====================

    document.querySelectorAll(".deleteBtn").forEach(btn=>{

        btn.onclick=function(){

            const id=this.dataset.id;

            let teams=getTeams();

            teams.splice(id,1);

            saveTeams(teams);

            renderTeams();

            updateDashboard();

            notify("Đã xoá Team");

        };

    });

}// ===============================
// THÊM TEAM
// ===============================

function addTeam(){

    const name=document.getElementById("teamName").value.trim();
    const box=document.getElementById("teamBox").value;
    const time=document.getElementById("teamTime").value;

    if(name===""){
        alert("Vui lòng nhập tên Team");
        return;
    }

    let teams=getTeams();

    if(
        teams.some(
            t=>t.name.toLowerCase()===name.toLowerCase()
        )
    ){
        alert("Team đã tồn tại");
        return;
    }

    teams.push({
        id:Date.now(),
        name:name,
        box:box,
        time:time,
        paid:false
    });

    saveTeams(teams);

    renderTeams();

    updateDashboard();

    notify("Đã thêm Team");

    document.getElementById("teamName").value="";

}

// ===============================
// DASHBOARD
// ===============================

function updateDashboard(){

    const teams=getTeams();

    const total=teams.length;

    const paidTeams=teams.filter(
        t=>t.paid
    ).length;

    const unpaidTeams=total-paidTeams;

    if(document.getElementById("totalTeam"))
        document.getElementById("totalTeam").innerHTML=total;

    if(document.getElementById("paid"))
        document.getElementById("paid").innerHTML=paidTeams;

    if(document.getElementById("unpaid"))
        document.getElementById("unpaid").innerHTML=unpaidTeams;

    if(document.getElementById("revenue"))
        document.getElementById("revenue").innerHTML=
        (paidTeams*5000).toLocaleString()+"đ";

}

// ===============================
// SEARCH TEAM
// ===============================

function searchTeam(){

    const input=document.getElementById("searchTeam");

    if(!input) return;

    input.oninput=function(){

        const keyword=this.value.toLowerCase();

        document.querySelectorAll(".teamItem")
        .forEach(item=>{

            if(
                item.innerText
                .toLowerCase()
                .includes(keyword)
            ){
                item.style.display="flex";
            }else{
                item.style.display="none";
            }

        });

    };

}

// ===============================
// NOTIFY
// ===============================

function notify(text){

    if(window.sendNotification){

        window.sendNotification(text);

    }

}// ===============================
// PAGE NAVIGATION
// ===============================

window.openPage=function(page){

    // Ẩn tất cả page
    document.querySelectorAll(".page").forEach(function(item){
        item.classList.add("hidden");
    });

    // Hiện page được chọn
    const target=document.getElementById(page);

    if(target){
        target.classList.remove("hidden");
    }

    // Active menu
    document.querySelectorAll(".menu button").forEach(function(btn){
        btn.classList.remove("active");
    });

    const active=document.querySelector(
        '.menu button[data-page="'+page+'"]'
    );

    if(active){
        active.classList.add("active");
    }

};

// ===============================
// START APP
// ===============================

document.addEventListener("DOMContentLoaded",function(){

    // Menu
    document.querySelectorAll(".menu button").forEach(function(btn){

        btn.onclick=function(){

            openPage(this.dataset.page);

        };

    });

    // Nút thêm Team
    const addBtn=document.getElementById("addTeamBtn");

    if(addBtn){
        addBtn.onclick=addTeam;
    }

    renderTeams();

    updateDashboard();

    searchTeam();

    // Mở Dashboard mặc định
    openPage("dashboard");

    // Ẩn loading
    setTimeout(function(){

        const loading=document.getElementById("loading");

        if(loading){
            loading.style.display="none";
        }

    },1000);

});

console.log("🔥 APP SYSTEM READY");
