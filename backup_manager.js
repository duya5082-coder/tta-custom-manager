// =======================================
// CUSTOM TTA MANAGER
// BACKUP MANAGER
// PART 3X
// =======================================

"use strict";



// =======================================
// BACKUP KEY LIST
// =======================================


TTA.BACKUP_KEYS=[

    "CUSTOM_TTA_TABLES",

    "CUSTOM_TTA_TEAMS",

    "CUSTOM_TTA_ACCOUNTS",

    "CUSTOM_TTA_SALARY",

    "CUSTOM_TTA_FINANCE",

    "CUSTOM_TTA_HISTORY",

    "CUSTOM_TTA_DATE"

];





// =======================================
// CREATE BACKUP
// =======================================


TTA.createBackup=function(){


    let data={};



    TTA.BACKUP_KEYS.forEach(key=>{


        data[key]=

        localStorage.getItem(key)
        ||
        null;


    });



    data.exportTime =
    new Date()
    .toLocaleString();



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
    "CUSTOM_TTA_BACKUP.json";



    a.click();



    URL.revokeObjectURL(url);



    console.log(
        "BACKUP CREATED"
    );


};





// =======================================
// RESTORE BACKUP
// =======================================


TTA.restoreBackup=function(file){



    let reader =
    new FileReader();



    reader.onload=function(e){



        try{


            let data =
            JSON.parse(
                e.target.result
            );



            Object.keys(data)
            .forEach(key=>{



                if(
                    key!=="exportTime"
                ){


                    if(
                        data[key]
                    ){


                        localStorage.setItem(

                            key,

                            data[key]

                        );


                    }


                }


            });



            alert(
            "Khôi phục thành công. Reload trang."
            );



        }
        catch(err){


            alert(
            "File backup lỗi"
            );


        }


    };



    reader.readAsText(file);



};





// =======================================
// RESET ALL DATA
// =======================================


TTA.fullReset=function(){



    if(
        !confirm(
        "Xóa toàn bộ dữ liệu?"
        )
    )
    return;



    TTA.BACKUP_KEYS.forEach(key=>{


        localStorage.removeItem(key);


    });



    location.reload();


};





console.log(
"BACKUP MANAGER 3X READY"
);
