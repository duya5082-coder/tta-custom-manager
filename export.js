// =======================================
// CUSTOM TTA MANAGER
// EXPORT SYSTEM
// FILE 2D - export.js
// =======================================


if(window.TTA_EXPORT_LOADED){

console.warn(
"EXPORT đã được load"
);


}else{


window.TTA_EXPORT_LOADED=true;



// ===============================
// LẤY DỮ LIỆU TEAM
// ===============================


function TTA_getExportTeams(){


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





// ===============================
// TẠO FILE DOWNLOAD
// ===============================


function TTA_downloadFile(
data,
filename
){



const blob = new Blob(

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

URL.createObjectURL(blob);



const a=document.createElement(
"a"
);



a.href=url;



a.download=filename;



document.body.appendChild(a);



a.click();



a.remove();



URL.revokeObjectURL(url);



}




// ===============================
// EXPORT TEAM
// ===============================


window.exportTeams=function(){



const teams=

TTA_getExportTeams();



if(teams.length===0){


alert(
"Chưa có dữ liệu Team"
);


return;


}



TTA_downloadFile(

{

app:"CUSTOM TTA",

type:"teams",

created:

new Date()

.toLocaleString(),

data:teams

},


"CUSTOM-TTA-TEAMS.json"


);



};





// ===============================
// EXPORT THANH TOÁN
// ===============================


window.exportPayments=function(){



const teams=

TTA_getExportTeams();



const paymentData=teams.map(

team=>({


name:team.name,


box:team.box,


time:team.time,


status:

team.paid

?

"Đã thanh toán"

:

"Chưa thanh toán",



amount:

team.paid

?

5000

:

0



})


);




TTA_downloadFile(

{

app:"CUSTOM TTA",

type:"payments",

data:paymentData

},


"CUSTOM-TTA-PAYMENT.json"


);



};






// ===============================
// EXPORT DOANH THU
// ===============================


window.exportRevenue=function(){



const teams=

TTA_getExportTeams();



const paidTeams=

teams.filter(

t=>t.paid

);




const revenue=

paidTeams.length

*

5000;





TTA_downloadFile(

{

app:"CUSTOM TTA",

type:"revenue",


totalTeam:

teams.length,


paidTeam:

paidTeams.length,


revenue:

revenue,


date:

new Date()

.toLocaleString()


},


"CUSTOM-TTA-REVENUE.json"


);



};





// ===============================
// BUTTON
// ===============================


document.addEventListener(

"DOMContentLoaded",

()=>{



const btn=

document.getElementById(
"exportBtn"
);



if(btn){



btn.onclick=function(){


exportTeams();



};



}





});





console.log(

"🔥 EXPORT SYSTEM READY"

);



}
