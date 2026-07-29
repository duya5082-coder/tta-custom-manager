// =======================================
// CUSTOM TTA MANAGER
// NOTIFICATION.JS
// PHẦN 2K
// NOTIFICATION SYSTEM
// =======================================




// =======================================
// CLOCK SYSTEM
// =======================================

TTA.startClock = function(){



    let clock =
    document.getElementById(
        "clock"
    );



    if(!clock){

        return;

    }



    setInterval(
        function(){



            let now =
            new Date();



            clock.innerHTML =

            now.toLocaleString(
                "vi-VN"
            );



        },
        1000
    );


};





// =======================================
// NOTIFICATION DATABASE
// =======================================

TTA.getNotifications = function(){


    if(
        !Array.isArray(
            TTA.database.notifications
        )
    ){

        TTA.database.notifications = [];

    }



    return TTA.database.notifications;


};







// =======================================
// ADD NOTIFICATION
// =======================================

TTA.addNotification = function(
    title,
    message
){



    let list =
    TTA.getNotifications();



    list.unshift({

        id:
        Date.now(),

        title:title,

        message:message,

        read:false,

        created:
        new Date()
        .toISOString()

    });



    TTA.saveDatabase();


};







// =======================================
// CHECK SLOT WARNING
// =======================================

TTA.checkSlotNotification = function(){



    let slots =
    TTA.getSlots();



    let today =
    new Date()
    .toISOString()
    .split("T")[0];




    slots.forEach(
        slot=>{



            if(
                slot.date === today
            ){



                if(
                    slot.status !== "FULL"
                ){



                    TTA.addNotification(

                        "Slot chưa đủ người",

                        slot.title +
                        " lúc " +
                        slot.startTime

                    );



                }



            }



        }
    );



};








// =======================================
// RENDER NOTIFICATION
// =======================================

TTA.renderNotification = function(){



    let box =
    document.getElementById(
        "notificationList"
    );



    if(!box){

        return;

    }



    let data =
    TTA.getNotifications();



    if(
        data.length === 0
    ){


        box.innerHTML =
        "Không có thông báo";


        return;

    }




    box.innerHTML = "";



    data.slice(0,10)
    .forEach(
        item=>{


            let div =
            document.createElement(
                "div"
            );



            div.className =
            "card";



            div.innerHTML =

            `

            <b>
            ${item.title}
            </b>

            <p>
            ${item.message}
            </p>

            `;



            box.appendChild(
                div
            );


        }
    );



};







// =======================================
// MARK READ
// =======================================

TTA.clearNotifications = function(){



    TTA.database.notifications =
    [];



    TTA.saveDatabase();



    TTA.renderNotification();



};








// =======================================
// AUTO CHECK
// =======================================

setInterval(
function(){


    TTA.checkSlotNotification();


},
60000
);






// =======================================
// START
// =======================================

document.addEventListener(
"DOMContentLoaded",
function(){


    TTA.startClock();


    TTA.renderNotification();


});






// =======================================
// END PART 2K
// =======================================
