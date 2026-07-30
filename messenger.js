// =======================================
// CUSTOM TTA MANAGER
// MESSENGER.JS
// PART 3G
// COPY MESSENGER EXPORT
// =======================================

"use strict";



TTA.copyMessenger=function(){



    let text =
    "🔥 CUSTOM TTA 🔥\n\n";



    TTA.tables.forEach(table=>{


        text +=
        "🪑 BÀN "
        +
        table.name
        +
        "\n";



        table.slots.forEach(slot=>{


            text +=

            "Slot "
            +
            slot.number
            +
            ": "
            +
            (
                slot.team
                ?
                slot.team
                :
                "Trống"
            )
            +
            (
                slot.paid
                ?
                " 💸"
                :
                ""
            )
            +
            "\n";


        });



        text+="\n";


    });




    navigator.clipboard.writeText(
        text
    );



    alert(
        "Đã copy bảng đấu"
    );



    return text;


};





console.log(
"MESSENGER EXPORT 3G READY"
);
