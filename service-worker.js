// =======================================
// FILE 7B
// service-worker.js
// OFFLINE + LOAD NHANH CUSTOM TTA
// =======================================


// =======================================
// CACHE VERSION
// =======================================

const CACHE_NAME = "CUSTOM-TTA-v1";


// =======================================
// FILE CẦN LƯU
// =======================================

const FILES_CACHE = [

"./",

"./index.html",

"./style.css",

"./mobile.css",

"./firebase.js",

"./app.js",

"./auth.js",

"./export.js",

"./reset.js",

"./notification.js",

"./messenger.js",

"./backup.js",

"./manifest.json"


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

FILES_CACHE

);


})


);



self.skipWaiting();



});




// =======================================
// ACTIVE
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


return response || fetch(

event.request

);


})


);



});




// =======================================
// UPDATE CACHE
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



// =======================================
// END FILE 7B
// =======================================
