// =======================================
// CUSTOM TTA MANAGER
// RESET SYSTEM
// FILE 2F - reset.js
// =======================================


if(window.TTA_RESET_LOADED){


console.warn(
"RESET đã được load"
);


}else{


window.TTA_RESET_LOADED=true;



// =======================================
// RESET TEAM TRONG NGÀY
// =======================================


window.TTA_resetTeams=function(){



const confirmReset=

confirm(

"⚠️ Bạn có chắc muốn reset danh sách Team hôm nay?"

);



if(!confirmReset)

return;




localStorage.removeItem(

"CUSTOM_TTA_TEAMS"

);





if(window.sendNotification){


window.sendNotification(

"Đã reset danh sách Team"

);


}





alert(

"✅ Reset Team thành công"

);



location.reload();



};





// =======================================
// RESET TIỀN / THANH TOÁN
// =======================================


window.TTA_resetMoney=function(){



const ok=

confirm(

"⚠️ Xóa toàn bộ dữ liệu tiền?"

);



if(!ok)

return;




localStorage.removeItem(

"CUSTOM_TTA_DEBT"

);



localStorage.removeItem(

"CUSTOM_TTA_HISTORY"

);




alert(

"✅ Đã reset dữ liệu tiền"

);



location.reload();



};






// =======================================
// RESET TOÀN BỘ APP
// KHÔNG XÓA SESSION LOGIN
// =======================================


window.TTA_fullReset=function(){



const ok=

confirm(

"🚨 CẢNH BÁO\n\nXóa toàn bộ dữ liệu CUSTOM TTA?\n\nKhông thể hoàn tác!"

);



if(!ok)

return;





const keepSession=

localStorage.getItem(

"CUSTOM_TTA_SESSION"

);





localStorage.clear();






if(keepSession){



localStorage.setItem(

"CUSTOM_TTA_SESSION",

keepSession

);



}





alert(

"✅ Đã reset hệ thống"

);



location.reload();



};







// =======================================
// BUTTON CONNECT
// =======================================


document.addEventListener(

"DOMContentLoaded",

()=>{



const resetBtn=

document.getElementById(

"resetBtn"

);





if(resetBtn){



resetBtn.onclick=function(){



TTA_resetTeams();



};



}




});





console.log(

"🔥 RESET SYSTEM READY"

);



}
