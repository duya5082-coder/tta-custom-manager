// =====================================
// CUSTOM TTA
// MESSENGER SUPPORT
// =====================================



if(window.TTA_MESSENGER_LOADED){


console.warn(
"messenger loaded"
);



}else{


window.TTA_MESSENGER_LOADED=true;



document.addEventListener(

"DOMContentLoaded",

()=>{


console.log(

"💬 Messenger module ready"

);



});







window.openMessenger=function(){



window.open(

"https://m.me/",

"_blank"

);



};



}
