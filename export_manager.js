// =======================================
// CUSTOM TTA MANAGER
// EXPORT MANAGER
// PART 3Y
// =======================================

"use strict";



// =======================================
// EXPORT SLOT TEXT
// =======================================


TTA.exportSlotMessenger=function(){



    let text = "";



    text +=
    "🎮 CUSTOM TTA\n";

    text +=
    "📋 BẢNG THI ĐẤU\n\n";



    TTA.tables.forEach(table=>{


        text +=
        "🪑 BÀN "
        +
        table.name
        +
        "\n";



        table.slots.forEach(slot=>{


            let status =
            slot.team
            ?
            "🔴 "
            +
            slot.team
            :
            "🟢 Trống";



            let pay =
            slot.paid
            ?
            "💸"
            :
            "🚫";



            text +=

            "Slot "
            +
            slot.number
            +
            ": "
            +
            status
            +
            " "
            +
            pay
            +
            "\n";


        });



        text += "\n";


    });



    navigator.clipboard.writeText(text);



    alert(
    "Đã copy bảng đấu Messenger"
    );


};





// =======================================
// EXPORT JSON
// =======================================


TTA.exportJSON=function(){



    let data={


        tables:TTA.tables,


        time:
        new Date()
        .toLocaleString()



    };



    let blob =
    new Blob(

        [
            JSON.stringify(
                data,
                null,
                2
            )
        ],

        {
            type:
            "application/json"
        }

    );



    let url =
    URL.createObjectURL(blob);



    let a =
    document.createElement("a");


    a.href=url;


    a.download=
    "TTA_SLOT_EXPORT.json";


    a.click();



};





// =======================================
// EXPORT PAYMENT LIST
// =======================================


TTA.exportPayment=function(){



    let list=[];



    TTA.tables.forEach(table=>{


        table.slots.forEach(slot=>{


            if(slot.team){


                list.push({


                    table:
                    table.name,


                    slot:
                    slot.number,


                    team:
                    slot.team,


                    paid:
                    slot.paid



                });


            }


        });


    });



    console.table(list);



    return list;



};





console.log(
"EXPORT MANAGER 3Y READY"
);
