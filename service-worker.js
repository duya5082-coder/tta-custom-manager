// =======================================
// CUSTOM TTA MANAGER
// SERVICE WORKER
// FILE 4B
// =======================================



const CACHE_NAME = "CUSTOM-TTA-v2";





// =======================================
// FILE CẦN CACHE
// =======================================


const APP_FILES = [


"./",


"./index.html",


"./style.css",


"./mobile.css",


"./manifest.json",


"./auth.js",


"./app.js",


"./firebase.js",


"./export.js",


"./backup.js",


"./reset.js",


"./notification.js",


"./messenger.js"


];







// =======================================
// INSTALL
// =======================================


self.addEventListener(

"install",

event=>{


event.waitUntil(


caches.open(

CACHE_NAME

)

.then(cache=>{


return cache.addAll(

APP_FILES

);


})

.catch(error=>{


console.error(

"Cache install lỗi:",

error

);


})


);



self.skipWaiting();



});








// =======================================
// ACTIVE
// XÓA CACHE CŨ
// =======================================


self.addEventListener(

"activate",

event=>{


event.waitUntil(


caches.keys()

.then(keys=>{


return Promise.all(


keys.map(key=>{


if(

key!==CACHE_NAME

){


return caches.delete(key);


}


})


);


})


);



self.clients.claim();



});








// =======================================
// FETCH
// =======================================


self.addEventListener(

"fetch",

event=>{


event.respondWith(


caches.match(

event.request

)

.then(response=>{


return response ||

fetch(

event.request

);



})

.catch(()=>{


return caches.match(

"./index.html"

);



})


);



});






// =======================================
// UPDATE
// =======================================


self.addEventListener(

"message",

event=>{


if(

event.data==="UPDATE"

){


self.skipWaiting();


}



});






console.log(

"🔥 CUSTOM TTA SERVICE WORKER READY"

);
