// =====================================
// CUSTOM TTA MANAGER
// RESET SYSTEM
// =====================================



if(window.TTA_RESET_LOADED){


console.warn(

"reset đã chạy"

);


}else{


window.TTA_RESET_LOADED=true;





document.addEventListener(

"DOMContentLoaded",

()=>{



const btn=

document.getElementById(

"resetDayBtn"

);




if(btn){


btn.onclick=resetDay;


}




});









function resetDay(){



const check=

confirm(

"Bạn muốn xóa toàn bộ team hôm nay?"

);




if(!check)

return;






localStorage.removeItem(

"TTA_TEAMS"

);





location.reload();



}






}
