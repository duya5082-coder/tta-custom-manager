// =======================================
// CUSTOM TTA MANAGER
// FIREBASE CONNECT SYSTEM
// FILE 2C
// =======================================


// chống load trùng

if(window.TTA_FIREBASE_LOADED){

console.warn(
"Firebase đã được load"
);


}else{


window.TTA_FIREBASE_LOADED=true;



// =======================================
// FIREBASE CONFIG
// Thay bằng config thật của bạn sau
// =======================================


const firebaseConfig = {


apiKey: "",


authDomain: "",


projectId: "",


storageBucket: "",


messagingSenderId: "",


appId: ""


};




// =======================================
// KIỂM TRA CONFIG
// =======================================


const FIREBASE_READY =

firebaseConfig.apiKey !== "";





// =======================================
// KHỞI TẠO
// =======================================


if(FIREBASE_READY){



console.log(

"🔥 Firebase config detected"

);



// Sau này thêm:
// initializeApp(firebaseConfig)
// getFirestore()
// getAuth()



}else{



console.warn(

"⚠️ Firebase chưa cấu hình - đang chạy Local Mode"

);



}






// =======================================
// DATABASE CONNECTOR
// =======================================



window.TTA_DATABASE = {



mode:

FIREBASE_READY

?

"firebase"

:

"local",





save:function(key,data){



if(this.mode==="local"){



localStorage.setItem(

key,

JSON.stringify(data)

);



return true;


}



},





get:function(key){



if(this.mode==="local"){



try{


return JSON.parse(

localStorage.getItem(key)

)

|| null;



}catch(e){



return null;



}



}



},





remove:function(key){



localStorage.removeItem(key);



}





};







// =======================================
// BACKUP DATA
// =======================================



window.TTA_backupDatabase=function(){



const data={



teams:

localStorage.getItem(

"CUSTOM_TTA_TEAMS"

),



session:

localStorage.getItem(

"CUSTOM_TTA_SESSION"

),



date:

new Date()

.toISOString()



};




const file=new Blob(

[

JSON.stringify(

data,

null,

2

)

],


{

type:"application/json"

}


);




const url=

URL.createObjectURL(file);



const a=document.createElement(

"a"

);



a.href=url;



a.download=

"CUSTOM-TTA-backup.json";



a.click();



URL.revokeObjectURL(url);



};






// =======================================
// RESTORE DATA
// =======================================


window.TTA_restoreDatabase=function(file){



const reader=new FileReader();



reader.onload=function(){



try{



const data=

JSON.parse(

reader.result

);




if(data.teams)


localStorage.setItem(

"CUSTOM_TTA_TEAMS",

data.teams

);




if(data.session)


localStorage.setItem(

"CUSTOM_TTA_SESSION",

data.session

);




alert(

"Khôi phục thành công"

);



location.reload();



}catch(e){



alert(

"File backup lỗi"

);



}



};



reader.readAsText(file);



};





console.log(

"🔥 FIREBASE SYSTEM READY"

);



}
