// =======================================
// HISTORY MANAGER
// PART 3J
// =======================================

"use strict";


TTA.renderHistory=function(){


let box =
document.getElementById(
"history"
);



if(!box)
return;



let data =
TTA.getHistory
?
TTA.getHistory()
:
[];



let html="<h2>📜 Lịch sử</h2>";



data
.reverse()
.forEach(item=>{


html+=`

<div class="card">

${item.action}

<br>

${item.data}

<br>

${item.time}

</div>

`;


});



box.innerHTML=html;


};



console.log(
"HISTORY MANAGER 3J READY"
);
