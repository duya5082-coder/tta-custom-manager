// =====================================
// CUSTOM TTA MANAGER
// EXPORT DATA
// =====================================


if(window.TTA_EXPORT_LOADED){

console.warn("export đã chạy");

}else{


window.TTA_EXPORT_LOADED=true;



document.addEventListener(

"DOMContentLoaded",

()=>{


const btn =

document.getElementById(

"exportTeamBtn"

);



if(btn){


btn.onclick=exportTeams;


}



});






function exportTeams(){



const data=

JSON.parse(

localStorage.getItem(

"TTA_TEAMS"

)

)||[];





if(data.length===0){


alert(

"Chưa có dữ liệu"

);


return;


}





let text="🔥 CUSTOM TTA TEAM LIST\n\n";





data.forEach((team,index)=>{



text+=

`${index+1}. ${team.name}
BOX: ${team.box}
GIỜ: ${team.time}
TRẠNG THÁI: ${team.paid?"Đã thanh toán":"Chưa thanh toán"}

----------------

`;



});






downloadFile(

"text.txt",

text

);



}





function downloadFile(

filename,

content

){



const blob=

new Blob(

[content],

{

type:"text/plain"

}

);



const url=

URL.createObjectURL(blob);



const a=

document.createElement("a");



a.href=url;



a.download=filename;



a.click();



URL.revokeObjectURL(url);



}





}
