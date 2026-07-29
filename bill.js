// =======================================
// CUSTOM TTA MANAGER
// BILL.JS
// PHẦN 2G
// BILL UI SYSTEM
// =======================================




// =======================================
// RENDER BILL LIST
// =======================================

TTA.renderBills = function(){


    let box =
    document.getElementById(
        "billList"
    );



    if(!box){

        return;

    }



    let bills =
    TTA.getBills();



    if(
        bills.length === 0
    ){

        box.innerHTML =

        `

        <div class="card">

        Chưa có Bill

        </div>

        `;


        return;

    }




    box.innerHTML = "";



    bills.forEach(
        bill => {


            let div =
            document.createElement(
                "div"
            );



            div.className =
            "card";



            div.innerHTML =


            `

            <h3>
            ${bill.title}
            </h3>


            <p>
            💰
            ${bill.amount}
            </p>


            <p>
            📌
            ${bill.status}
            </p>


            <p>
            ${bill.note}
            </p>



            <button onclick="completeBill(${bill.id})">

            Hoàn thành

            </button>



            <button onclick="deleteBillUI(${bill.id})">

            Xóa

            </button>


            `;



            box.appendChild(
                div
            );


        }
    );


};





// =======================================
// CREATE BILL UI
// =======================================

window.createNewBill = function(){



    let title =
    prompt(
        "Tên Bill"
    );



    let amount =
    prompt(
        "Số tiền"
    );



    let note =
    prompt(
        "Ghi chú"
    );



    if(
        !title ||
        !amount
    ){

        return;

    }




    TTA.createBill({

        title:title,

        amount:Number(amount),

        note:note


    });




    TTA.renderBills();


    TTA.updateDashboard();



};






// =======================================
// COMPLETE BILL
// =======================================

window.completeBill = function(id){



    TTA.updateBillStatus(

        id,

        "DONE"

    );



    TTA.renderBills();



};






// =======================================
// DELETE BILL
// =======================================

window.deleteBillUI = function(id){



    if(
        confirm(
            "Xóa Bill này?"
        )
    ){


        TTA.deleteBill(
            id
        );


        TTA.renderBills();


        TTA.updateDashboard();


    }


};







// =======================================
// TOTAL MONEY DISPLAY
// =======================================

TTA.renderTotalMoney = function(){



    let box =
    document.getElementById(
        "totalMoney"
    );



    if(!box){

        return;

    }



    let total =
    TTA.calculateTotalBill(
        TTA.getBills()
    );



    box.innerHTML =
    total.toLocaleString();


};







// =======================================
// LOAD BILL PAGE
// =======================================

let oldBillOpenPage =
window.openPage;



window.openPage = function(page){



    oldBillOpenPage(page);



    if(
        page === "bill"
    ){


        TTA.renderBills();


        TTA.renderTotalMoney();


    }


};







// =======================================
// AUTO LOAD
// =======================================

document.addEventListener(
"DOMContentLoaded",
function(){


    TTA.renderBills();


});





// =======================================
// END PART 2G
// =======================================
