// =======================================
// FILE 7D
// loading.js
// SPLASH SCREEN CUSTOM TTA
// =======================================


// =======================================
// CREATE LOADING
// =======================================

function createLoading(){


const loading=

document.createElement("div");


loading.id=

"ttaLoading";


loading.innerHTML=`

<div class="loadingBox">


<div class="logoFire">

🔥 CUSTOM TTA 🔥

</div>


<h2>

HỆ THỐNG QUẢN LÍ BOX HÀNG ĐẦU

</h2>


<div class="loader">

</div>


<p>

Đang khởi động hệ thống...

</p>


</div>

`;



document.body.prepend(

loading

);



}



// =======================================
// HIDE LOADING
// =======================================

function hideLoading(){



const loading=

document.getElementById(

"ttaLoading"

);



if(!loading)return;



loading.classList.add(

"hide"

);



setTimeout(()=>{


loading.remove();


},500);



}



// =======================================
// AUTO START
// =======================================

window.addEventListener(

"load",

()=>{


createLoading();



setTimeout(()=>{


hideLoading();


},1500);



});



// =======================================
// CSS INLINE
// =======================================

const style=

document.createElement(

"style"

);



style.innerHTML=`

#ttaLoading{


position:fixed;

top:0;

left:0;

right:0;

bottom:0;

background:

linear-gradient(

135deg,

#111827,

#000

);


display:flex;

justify-content:center;

align-items:center;

z-index:99999;


}



.loadingBox{


text-align:center;

color:white;

padding:30px;


}



.logoFire{


font-size:32px;

font-weight:900;

margin-bottom:15px;


}



.loadingBox h2{


font-size:18px;

}



.loader{


width:50px;

height:50px;

border-radius:50%;

border:5px solid #ffffff40;

border-top-color:#ff6b00;

margin:25px auto;

animation:

spin 1s linear infinite;


}



@keyframes spin{


to{

transform:rotate(360deg);

}


}



#ttaLoading.hide{


opacity:0;

transition:.5s;


}



`;



document.head.appendChild(

style

);



// =======================================
// END FILE 7D
// =======================================
