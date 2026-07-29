// =======================================
// CUSTOM TTA MANAGER
// BACKUP.JS
// PHẦN 2J
// BACKUP & RESTORE SYSTEM
// =======================================





// =======================================
// EXPORT DATABASE
// =======================================

window.exportDatabase = function(){



    let data =
    JSON.stringify(
        TTA.database,
        null,
        2
    );



    let blob =
    new Blob(
        [
            data
        ],
        {
            type:
            "application/json"
        }
    );



    let url =
    URL.createObjectURL(
        blob
    );



    let a =
    document.createElement(
        "a"
    );



    a.href =
    url;



    a.download =
    "CUSTOM_TTA_BACKUP.json";



    a.click();



    URL.revokeObjectURL(
        url
    );



    alert(
        "Đã xuất dữ liệu"
    );


};







// =======================================
// IMPORT DATABASE
// =======================================

window.importDatabase = function(event){



    let file =
    event.target.files[0];



    if(!file){

        return;

    }



    let reader =
    new FileReader();




    reader.onload =
    function(e){



        try{


            let data =
            JSON.parse(
                e.target.result
            );



            if(
                !data.users ||
                !data.slots ||
                !data.bills
            ){


                alert(
                    "File backup không hợp lệ"
                );


                return;

            }





            TTA.database =
            data;



            TTA.saveDatabase();




            alert(
                "Khôi phục thành công"
            );



            location.reload();



        }
        catch(error){



            alert(
                "File lỗi"
            );



            console.error(
                error
            );


        }



    };



    reader.readAsText(
        file
    );


};








// =======================================
// RESET DATABASE
// =======================================

window.resetAllData = function(){



    if(
        confirm(
            "Xóa toàn bộ dữ liệu?"
        )
    ){



        localStorage.removeItem(
            "CUSTOM_TTA_DATABASE"
        );



        localStorage.removeItem(
            "CUSTOM_TTA_SESSION"
        );



        alert(
            "Đã reset"
        );



        location.reload();



    }


};








// =======================================
// AUTO BACKUP
// =======================================

TTA.autoBackup = function(){



    let data =
    JSON.stringify(
        TTA.database
    );



    localStorage.setItem(

        "CUSTOM_TTA_AUTO_BACKUP",

        data

    );


};








// =======================================
// RESTORE AUTO BACKUP
// =======================================

TTA.restoreAutoBackup = function(){



    let data =
    localStorage.getItem(
        "CUSTOM_TTA_AUTO_BACKUP"
    );



    if(!data){

        return false;

    }



    try{


        TTA.database =
        JSON.parse(
            data
        );



        TTA.saveDatabase();



        return true;



    }
    catch(e){


        return false;


    }


};







// =======================================
// AUTO SAVE
// =======================================

setInterval(

function(){


    if(
        TTA.database
    ){


        TTA.autoBackup();


    }


},

30000

);






// =======================================
// END PART 2J
// =======================================
