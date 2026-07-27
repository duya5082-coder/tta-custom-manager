// =====================================
// CUSTOM TTA
// BACKUP DATA
// =====================================



if(window.TTA_BACKUP_LOADED){


console.warn(
"backup loaded"
);


}else{


window.TTA_BACKUP_LOADED=true;



document.addEventListener(

"DOMContentLoaded",

()=>{


const btn=

document.getElementById(

"backupBtn"

);



if(btn){


btn.onclick=backupData;


}



});







function backupData(){



const data={



teams:

JSON.parse(

localStorage.getItem(
"TTA_TEAMS"
)

)||[],



date:

new Date().toLocaleString()



};






const file=

new Blob(

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



const a=

document.createElement("a");



a.href=url;



a.download=

"TTA_BACKUP.json";



a.click();



URL.revokeObjectURL(url);



alert(

"✅ Backup thành công"

);



}





}
