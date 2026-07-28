// =======================================
// CUSTOM TTA MANAGER
// AUTH SYSTEM
// FILE 2A
// =======================================


// chống load trùng
if(window.TTA_AUTH_LOADED){

console.warn(
"AUTH đã được load"
);


}else{


window.TTA_AUTH_LOADED = true;



// ===============================
// USER DATABASE DEMO
// Sau này có thể đổi Firebase
// ===============================


const TTA_USERS = [

{
username:"admin",
password:"123456",
role:"admin",
name:"Admin TTA"
},


{
username:"ctv1",
password:"123456",
role:"ctv",
name:"CTV 1"
},


{
username:"ctv2",
password:"123456",
role:"ctv",
name:"CTV 2"
}


];




// ===============================
// SESSION KEY
// dùng tên riêng tránh lỗi
// ===============================


const TTA_SESSION_KEY = "CUSTOM_TTA_SESSION";




// ===============================
// LẤY SESSION
// ===============================


window.TTA_getSession = function(){


try{


return JSON.parse(

localStorage.getItem(
TTA_SESSION_KEY
)

)

|| null;


}catch(e){


return null;


}


};




// ===============================
// LƯU SESSION
// ===============================


window.TTA_saveSession=function(user){


localStorage.setItem(

TTA_SESSION_KEY,

JSON.stringify(user)

);


};




// ===============================
// XÓA SESSION
// ===============================


window.TTA_logout=function(){


localStorage.removeItem(

TTA_SESSION_KEY

);



location.reload();


};





// ===============================
// LOGIN
// ===============================


window.TTA_login=function(username,password){



const user = TTA_USERS.find(


u=>


u.username===username

&&

u.password===password


);



if(!user){


return false;


}



TTA_saveSession(user);



return true;


};





// ===============================
// KIỂM TRA QUYỀN
// ===============================


window.TTA_isAdmin=function(){


const user=TTA_getSession();



return user

&&

user.role==="admin";


};





// ===============================
// HIỂN THỊ USER
// ===============================


window.TTA_showUser=function(){



const user=TTA_getSession();



if(!user)

return;



const welcome = document.getElementById(
"welcome"
);



if(welcome){


welcome.innerHTML=

`

Xin chào <b>${user.name}</b>

`;



}



};




// ===============================
// DOM READY
// ===============================


document.addEventListener(

"DOMContentLoaded",

()=>{



const loginBtn=

document.getElementById(
"loginBtn"
);



if(loginBtn){



loginBtn.onclick=function(){



const username=

document.getElementById(
"username"
).value.trim();



const password=

document.getElementById(
"password"
).value.trim();




const result=

TTA_login(
username,
password
);



if(result){


document.getElementById(
"loginPage"
).classList.add(
"hidden"
);



document.getElementById(
"app"
).classList.remove(
"hidden"
);



TTA_showUser();



}else{


const error=

document.getElementById(
"loginError"
);



if(error)

error.innerHTML=

"❌ Sai tài khoản hoặc mật khẩu";


}



};



}




const logoutBtn=

document.getElementById(
"logoutBtn"
);



if(logoutBtn){


logoutBtn.onclick=()=>{


TTA_logout();


};


}




// tự đăng nhập lại


const session=

TTA_getSession();



if(session){


const login=

document.getElementById(
"loginPage"
);



const app=

document.getElementById(
"app"
);



if(login)

login.classList.add(
"hidden"
);



if(app)

app.classList.remove(
"hidden"
);



TTA_showUser();



}




});



console.log(

"🔥 AUTH SYSTEM READY"

);



}
