// =======================================
// CUSTOM TTA MANAGER
// NOTIFICATION SYSTEM
// FILE 2G - notification.js
// =======================================


if(window.TTA_NOTIFICATION_LOADED){


console.warn(
"NOTIFICATION đã được load"
);


}else{


window.TTA_NOTIFICATION_LOADED=true;




// =======================================
// TẠO THÔNG BÁO
// =======================================


window.sendNotification=function(message){



const list = document.getElementById(

"notificationList"

);




// nếu chưa có khung thông báo
// vẫn lưu lịch sử


const history = JSON.parse(

localStorage.getItem(

"CUSTOM_TTA_HISTORY"

)

|| "[]"

);





history.unshift({


message:message,


time:new Date()

.toLocaleString()



});





localStorage.setItem(

"CUSTOM_TTA_HISTORY",

JSON.stringify(history)

);





if(!list){



showToast(message);



return;


}






const item=document.createElement(

"div"

);



item.className="notificationItem";



item.innerHTML=`

<div>

🔔 ${message}

</div>

<small>

${new Date().toLocaleString()}

</small>

`;



list.prepend(item);




showToast(message);



};








// =======================================
// TOAST
// =======================================


function showToast(message){



const toast=document.getElementById(

"toast"

);



if(!toast)

return;





toast.innerHTML=

`

🔔 ${message}

`;





toast.classList.add(

"show"

);





setTimeout(()=>{


toast.classList.remove(

"show"

);



},3000);



}





// =======================================
// HIỂN THỊ LỊCH SỬ
// =======================================


window.loadNotificationHistory=function(){



const box=document.getElementById(

"notificationList"

);



if(!box)

return;





const history=JSON.parse(

localStorage.getItem(

"CUSTOM_TTA_HISTORY"

)

|| "[]"

);





box.innerHTML="";





history.forEach(item=>{



const div=document.createElement(

"div"

);



div.className=

"notificationItem";




div.innerHTML=

`

🔔 ${item.message}

<br>

<small>

${item.time}

</small>

`;




box.appendChild(div);



});



};





// =======================================
// START
// =======================================


document.addEventListener(

"DOMContentLoaded",

()=>{


loadNotificationHistory();



});





console.log(

"🔔 NOTIFICATION SYSTEM READY"

);



}
