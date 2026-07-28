// =======================================
// CUSTOM TTA MANAGER
// BACKUP SYSTEM
// FILE 2E - backup.js
// =======================================


if(window.TTA_BACKUP_LOADED){


console.warn(
"BACKUP đã được load"
);


}else{


window.TTA_BACKUP_LOADED=true;



// =======================================
// KEY DATABASE
// =======================================


const TTA_BACKUP_KEYS = [


"CUSTOM_TTA_TEAMS",


"CUSTOM_TTA_SESSION",


"CUSTOM_TTA_SETTINGS",


"CUSTOM_TTA_DEBT",


"CUSTOM_TTA_HISTORY"


];




// =======================================
// TẠO BACKUP
// =======================================


window.TTA_createBackup=function(){



const backup={


app:"CUSTOM TTA Manager",


version:"1.0",


created:

new Date()

.toLocaleString(),



data:{}



};





TTA_BACKUP_KEYS.forEach(key=>{


backup.data[key]=

localStorage.getItem(key);



});





const blob=new Blob(


[

JSON.stringify(

backup,

null,

2

)

],


{

type:"application/json"

}


);





const url=

URL.createObjectURL(blob);



const link=

document.createElement("a");



link.href=url;



link.download=

"CUSTOM-TTA-BACKUP.json";



document.body.appendChild(link);



link.click();



link.remove();



URL.revokeObjectURL(url);





if(window.sendNotification){


window.sendNotification(

"Đã tạo file backup"

);


}



};






// =======================================
// KHÔI PHỤC BACKUP
// =======================================


window.TTA_restoreBackup=function(file){



if(!file){


alert(

"Chưa chọn file backup"

);


return;


}





const reader=

new FileReader();





reader.onload=function(e){



try{



const backup=

JSON.parse(

e.target.result

);





if(!backup.data){



alert(

"File backup không hợp lệ"

);



return;


}






Object.keys(

backup.data

)

.forEach(key=>{



if(

backup.data[key]

!==null

&&

backup.data[key]

!==undefined

){



localStorage.setItem(

key,

backup.data[key]

);



}



});





alert(

"✅ Khôi phục dữ liệu thành công"

);



location.reload();





}catch(error){



console.error(error);



alert(

"❌ File backup bị lỗi"

);



}



};





reader.readAsText(file);



};






// =======================================
// NÚT BACKUP
// =======================================


document.addEventListener(

"DOMContentLoaded",

()=>{



const backupBtn=

document.getElementById(
"backupBtn"
);



if(backupBtn){



backupBtn.onclick=function(){



TTA_createBackup();



};



}





});





console.log(

"🔥 BACKUP SYSTEM READY"

);



}
