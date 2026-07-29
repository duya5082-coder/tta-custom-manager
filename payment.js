// =======================================
// CUSTOM TTA MANAGER
// PAYMENT.JS
// PHẦN 2Q
// PAYMENT MANAGEMENT SYSTEM
// =======================================




// =======================================
// PAYMENT DATABASE
// =======================================


TTA.getPayments = function(){


    if(
        !Array.isArray(
            TTA.database.payments
        )
    ){

        TTA.database.payments = [];

    }


    return TTA.database.payments;


};






// =======================================
// CREATE PAYMENT
// =======================================


window.createPayment = function(){



    if(
        !TTA.hasPermission("bill")
        &&
        !TTA.isAdmin()
    ){

        alert(
            "Không có quyền"
        );

        return;

    }




    let name =
    prompt(
        "Tên khách"
    );



    let amount =
    Number(
        prompt(
            "Số tiền"
        )
    );



    let note =
    prompt(
        "Nội dung"
    );



    if(
        !name ||
        !amount
    ){

        return;

    }




    TTA.getPayments()
    .push({


        id:
        Date.now(),


        customer:
        name,


        amount:
        amount,


        note:
        note || "",


        status:
        "PENDING",


        date:
        new Date()
        .toISOString()


    });



    TTA.saveDatabase();



    TTA.renderPayments();



};








// =======================================
// RENDER PAYMENT
// =======================================


TTA.renderPayments = function(){



    let box =
    document.getElementById(
        "paymentList"
    );



    if(!box){

        return;

    }





    let payments =
    TTA.getPayments();




    if(
        payments.length === 0
    ){


        box.innerHTML =

        `
        <div class="card">

        Chưa có giao dịch

        </div>
        `;


        return;

    }





    box.innerHTML = "";





    payments.forEach(
        p=>{


            let div =
            document.createElement(
                "div"
            );



            div.className =
            "card";



            div.innerHTML =


            `

            <h3>
            ${p.customer}
            </h3>


            <p>
            💰
            ${p.amount.toLocaleString()}
            </p>


            <p>
            📌
            ${p.status}
            </p>


            <p>
            ${p.note}
            </p>



            ${
            p.status === "PENDING"

            ?

            `

            <button onclick="confirmPayment(${p.id})">

            ✅ Đã nhận tiền

            </button>

            `

            :

            ""

            }




            <button onclick="deletePayment(${p.id})">

            🗑 Xóa

            </button>


            `;



            box.appendChild(
                div
            );


        }
    );



};








// =======================================
// CONFIRM PAYMENT
// =======================================


window.confirmPayment = function(id){



    let payment =
    TTA.getPayments()
    .find(
        p =>
        p.id === id
    );



    if(payment){


        payment.status =
        "PAID";


    }



    TTA.saveDatabase();



    TTA.renderPayments();



};








// =======================================
// DELETE PAYMENT
// =======================================


window.deletePayment = function(id){



    if(
        confirm(
            "Xóa giao dịch?"
        )
    ){



        TTA.database.payments =

        TTA.getPayments()
        .filter(
            p =>
            p.id !== id
        );



        TTA.saveDatabase();



        TTA.renderPayments();


    }


};








// =======================================
// TOTAL REVENUE
// =======================================


TTA.totalRevenue = function(){



    return TTA.getPayments()

    .filter(
        p =>
        p.status === "PAID"
    )

    .reduce(

        (sum,p)=>

        sum + p.amount,

        0

    );


};








// =======================================
// TODAY REVENUE
// =======================================


TTA.todayRevenue = function(){



    let today =
    new Date()
    .toISOString()
    .split("T")[0];



    return TTA.getPayments()

    .filter(
        p =>
        p.status === "PAID"
        &&
        p.date.includes(today)
    )

    .reduce(

        (sum,p)=>

        sum+p.amount,

        0

    );


};








// =======================================
// PAGE LOAD
// =======================================


let oldPaymentOpenPage =
window.openPage;



window.openPage = function(page){



    oldPaymentOpenPage(page);



    if(
        page === "payment"
    ){


        TTA.renderPayments();


    }


};








document.addEventListener(
"DOMContentLoaded",
function(){

    TTA.renderPayments();

});




// =======================================
// END PART 2Q
// =======================================
