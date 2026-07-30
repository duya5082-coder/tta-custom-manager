// =======================================
// CUSTOM TTA MANAGER
// BACKUP.JS
// PART 3G
// =======================================


"use strict";



TTA.BACKUP_KEY =
"CUSTOM_TTA_BACKUP";




// =======================================
// BACKUP
// =======================================


TTA.backup=function(){



    let data={



        tables:TTA.tables,


        salary:
        TTA.getSalary
        ?
        TTA.getSalary()
        :
        {},



        payments:
        TTA.getPayments
        ?
        TTA.getPayments()
        :
        []



    };




    localStorage.setItem(

        TTA.BACKUP_KEY,

        JSON.stringify(data)

    );



    alert(
        "Backup thành công"
    );


};





// =======================================
// RESTORE
// =======================================


TTA.restore=function(){



    let data =

    localStorage.getItem(

        TTA.BACKUP_KEY

    );



    if(!data){


        alert(
            "Không có backup"
        );


        return;

    }





    data =
    JSON.parse(data);




    TTA.tables =
    data.tables || [];



    if(
        TTA.saveTables
    ){

        TTA.saveTables();

    }



    alert(
        "Khôi phục thành công"
    );



    refreshDashboard();


};





console.log(
"BACKUP SYSTEM 3G READY"
);
