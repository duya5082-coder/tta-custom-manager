// =======================================
// CUSTOM TTA MANAGER
// APP SYSTEM
// =======================================


if(window.TTA_APP_SYSTEM_LOADED){

console.warn(
"APP SYSTEM đã chạy"
);


}else{


window.TTA_APP_SYSTEM_LOADED=true;



// ===============================
// CHUYỂN TRANG
// ===============================


function openPage(page){


document.querySelectorAll(".page")
.forEach(p=>{


p.classList.add("hidden");


});



const target=document.getElementById(page);



if(target){

target.classList.remove("hidden");

}


}



// ===============================
// MENU
// ===============================


function initMenu(){


document.querySelectorAll(
".menu button"
)

.forEach(btn=>{


btn.onclick=()=>{


const page=btn.dataset.page;


openPage(page);



};


});


}



// ===============================
// LOGOUT
// ===============================


function logout(){


const app=document.getElementById(
"app"
);


const login=document.getElementById(
"loginPage"
);



if(app)
app.classList.add("hidden");



if(login)
login.classList.remove("hidden");



localStorage.removeItem(
"TTA_LOGIN"
);



}



// ===============================
// START
// ===============================


document.addEventListener(
"DOMContentLoaded",
()=>{


initMenu();



const logoutBtn=document.getElementById(
"logoutBtn"
);



if(logoutBtn){

logoutBtn.onclick=logout;

}



openPage(
"dashboard"
);



console.log(
"🔥 APP SYSTEM READY"
);



});


}
