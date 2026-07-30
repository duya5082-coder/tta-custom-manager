// =======================================
// CUSTOM TTA MANAGER
// NOTIFICATION.JS
// PART 3F
// =======================================


"use strict";




TTA.notify=function(message){



console.log(
"🔔 "+message
);



if(
Notification.permission==="granted"
){


new Notification(
"CUSTOM TTA",
{

body:message

}

);


}



};





if(
"Notification" in window
){

Notification.requestPermission();

}



console.log(
"NOTIFICATION 3F READY"
);
