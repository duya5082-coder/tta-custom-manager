// =======================================
// CUSTOM TTA MANAGER
// HISTORY CORE
// =======================================

"use strict";


TTA.HISTORY_KEY =
"CUSTOM_TTA_HISTORY";


TTA.addHistory=function(action,data){


let list=[];


try{

list =
JSON.parse(
localStorage.getItem(
TTA.HISTORY_KEY
)
)
||[];

}catch(e){

list=[];

}



list.push({

action:action,

data:data,

time:new Date()
.toLocaleString()

});



localStorage.setItem(

TTA.HISTORY_KEY,

JSON.stringify(list)

);



};



TTA.getHistory=function(){


return JSON.parse(

localStorage.getItem(
TTA.HISTORY_KEY
)

||
"[]"

);


};


console.log(
"HISTORY READY"
);
