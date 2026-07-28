// =======================================
// CUSTOM TTA MANAGER
// MESSENGER BILL SYSTEM
// FILE 2H - messenger.js
// =======================================


if(window.TTA_MESSENGER_LOADED){


console.warn(
"MESSENGER đã được load"
);


}else{


window.TTA_MESSENGER_LOADED=true;



// =======================================
// LẤY TEAM
// =======================================


function TTA_getMessengerTeams(){



try{


return JSON.parse(

localStorage.getItem(

"CUSTOM_TTA_TEAMS"

)

)

|| [];



}catch(e){


return [];


}



}





// =======================================
// TẠO BILL
// =======================================


window.createMessengerBill=function(){



const teams=

TTA_getMessengerTeams();





if(teams.length===0){



alert(

"Chưa có Team để tạo bill"

);



return "";



}





let text=

"🔥 CUSTOM TTA BILL\n";



text +=

"====================\n\n";





teams.forEach((team,index)=>{



text +=

`${index+1}. ${team.name}\n`;



text +=

`📦 BOX ${team.box}\n`;



text +=

`🕒 ${team.time}\n`;



text +=

`💸 ${team.paid ? "Đã thanh toán" : "Chưa thanh toán"}\n\n`;



});





text +=

"====================\n";



text +=

`👥 Tổng Team: ${teams.length}\n`;



text +=

"🔥 CUSTOM TTA ESPORT";





return text;



};







// =======================================
// COPY BILL
// =======================================


window.copyMessengerBill=function(){



const bill=

createMessengerBill();





if(!bill)

return;






navigator.clipboard.writeText(

bill

)

.then(()=>{



alert(

"✅ Đã copy bill Messenger"

);



if(window.sendNotification){


window.sendNotification(

"Đã copy bill"

);



}



})

.catch(()=>{



alert(

"Không thể copy"

);



});



};







// =======================================
// MỞ MESSENGER
// =======================================


window.openMessenger=function(){



const bill=

createMessengerBill();





if(!bill)

return;





const url=

"https://m.me/?text="

+

encodeURIComponent(

bill

);





window.open(

url,

"_blank"

);



};







// =======================================
// BUTTON
// =======================================


document.addEventListener(

"DOMContentLoaded",

()=>{



const btn=

document.getElementById(

"messengerBtn"

);




if(btn){



btn.onclick=function(){



openMessenger();



};



}




const copyBtn=

document.getElementById(

"copyBillBtn"

);



if(copyBtn){



copyBtn.onclick=function(){



copyMessengerBill();



};



}



});





console.log(

"🔥 MESSENGER SYSTEM READY"

);



}
