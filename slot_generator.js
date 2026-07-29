// =======================================
// CUSTOM TTA MANAGER
// SLOT_GENERATOR.JS
// PHẦN 2P
// AUTO SLOT GENERATOR
// =======================================





// =======================================
// CREATE MULTI SLOT
// =======================================


window.generateSlots = function(){



    if(
        !TTA.isAdmin()
    ){

        alert(
            "Chỉ Admin được tạo Slot"
        );

        return;

    }




    let date =
    prompt(
        "Ngày tạo Slot (VD: 29/07)"
    );



    let start =
    prompt(
        "Giờ bắt đầu Slot đầu tiên (VD: 19:00)"
    );



    let total =
    Number(
        prompt(
            "Số lượng Slot"
        )
    );



    let duration =
    Number(
        prompt(
            "Mỗi Slot bao nhiêu phút?"
        )
    );



    if(
        !date ||
        !start ||
        !total
    ){

        return;

    }




    for(
        let i = 0;
        i < total;
        i++
    ){



        let time =
        calculateTime(
            start,
            i * duration
        );



        let end =
        calculateTime(
            start,
            (i+1) * duration
        );





        TTA.createSlot({

            title:
            "Slot " +
            (i+1),


            date:
            date,


            startTime:
            time,


            endTime:
            end,


            status:
            "OPEN"



        });



    }




    TTA.saveDatabase();



    TTA.renderSlots();


    TTA.updateDashboard();



    alert(
        "Đã tạo " + total + " Slot"
    );



};








// =======================================
// TIME CALCULATOR
// =======================================


function calculateTime(
    time,
    addMinute
){



    let parts =
    time.split(":");



    let hour =
    Number(parts[0]);



    let minute =
    Number(parts[1]);



    let total =
    hour * 60 +
    minute +
    addMinute;



    let newHour =
    Math.floor(
        total / 60
    )
    % 24;



    let newMinute =
    total % 60;




    return (

        String(newHour)
        .padStart(2,"0")

        +

        ":"

        +

        String(newMinute)
        .padStart(2,"0")

    );


};








// =======================================
// DUPLICATE DAY SLOT
// =======================================


window.copySlotToDate = function(){



    let oldDate =
    prompt(
        "Ngày cũ"
    );



    let newDate =
    prompt(
        "Ngày mới"
    );



    if(
        !oldDate ||
        !newDate
    ){

        return;

    }



    let slots =
    TTA.getSlots()
    .filter(
        s =>
        s.date === oldDate
    );




    slots.forEach(
        slot=>{


            TTA.createSlot({

                title:
                slot.title,


                date:
                newDate,


                startTime:
                slot.startTime,


                endTime:
                slot.endTime,


                status:
                "OPEN"


            });


        }
    );




    TTA.saveDatabase();



    TTA.renderSlots();



    alert(
        "Đã copy lịch"
    );



};








// =======================================
// QUICK TEMPLATE
// =======================================


window.createDailyTemplate = function(){



    let date =
    prompt(
        "Ngày"
    );



    if(!date){

        return;

    }




    let times = [


        ["19:00","19:30"],

        ["19:30","20:00"],

        ["20:00","20:30"],

        ["20:30","21:00"]


    ];





    times.forEach(
        (t,index)=>{


            TTA.createSlot({


                title:
                "Custom " +
                (index+1),


                date:
                date,


                startTime:
                t[0],


                endTime:
                t[1],


                status:
                "OPEN"


            });


        }
    );




    TTA.saveDatabase();


    TTA.renderSlots();


};








// =======================================
// END PART 2P
// =======================================
