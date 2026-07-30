// =======================================
// CUSTOM TTA MANAGER
// SYSTEM FINAL CHECK
// PART 3Z
// =======================================

"use strict";



TTA.systemCheck=function(){



    console.clear();



    console.log(
    "=============================="
    );


    console.log(
    " CUSTOM TTA SYSTEM CHECK "
    );


    console.log(
    "=============================="
    );




    let check = [



        {
            name:"TTA CORE",
            ok:
            typeof TTA!=="undefined"
        },



        {
            name:"TABLE SYSTEM",
            ok:
            Array.isArray(
                TTA.tables
            )
        },



        {
            name:"SAVE TABLE",
            ok:
            typeof TTA.saveTables==="function"
        },



        {
            name:"SLOT ACTION",
            ok:
            typeof TTA.selectSlot==="function"
        },



        {
            name:"PAYMENT",
            ok:
            typeof TTA.markPaid==="function"
        },



        {
            name:"SALARY",
            ok:
            typeof TTA.addSalarySlot==="function"
        },



        {
            name:"FINANCE",
            ok:
            typeof TTA.addSlotFinance==="function"
        },



        {
            name:"BACKUP",
            ok:
            typeof TTA.createBackup==="function"
        },



        {
            name:"EXPORT",
            ok:
            typeof TTA.exportSlotMessenger==="function"
        }


    ];





    let error=0;



    check.forEach(item=>{


        if(item.ok){


            console.log(
            "✅",
            item.name
            );


        }
        else{


            console.warn(
            "❌",
            item.name
            );


            error++;


        }



    });






    console.log(
    "=============================="
    );



    if(error===0){


        console.log(
        "🎉 SYSTEM READY"
        );


    }
    else{


        console.warn(
        "Còn lỗi:",
        error
        );


    }



    return check;



};





// chạy tự động


window.addEventListener(
"load",
()=>{


    setTimeout(()=>{


        TTA.systemCheck();



    },1500);



});





console.log(
"SYSTEM FINAL CHECK 3Z READY"
);
