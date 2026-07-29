// =======================================
// CUSTOM TTA MANAGER
// FIREBASE.JS
// PHẦN 2M
// FIREBASE SYNC SYSTEM
// =======================================




// =======================================
// FIREBASE CONFIG
// =======================================


TTA.firebase = {

    enabled:false,

    db:null,

    app:null

};







// =======================================
// INIT FIREBASE
// =======================================

TTA.initFirebase = function(){



    if(
        typeof firebase === "undefined"
    ){


        console.warn(

            "Firebase chưa tải - chạy Local Mode"

        );


        return false;


    }




    if(
        !window.FIREBASE_CONFIG
    ){


        console.warn(

            "Chưa có Firebase Config - Local Mode"

        );


        return false;


    }




    try{


        firebase.initializeApp(
            FIREBASE_CONFIG
        );



        TTA.firebase.app =
        firebase.app();



        TTA.firebase.db =
        firebase.firestore();



        TTA.firebase.enabled =
        true;



        console.log(

            "Firebase Online"

        );



        return true;



    }
    catch(e){



        console.error(
            "Firebase lỗi",
            e
        );



        return false;


    }



};








// =======================================
// SYNC DATABASE UP
// =======================================

TTA.syncFirebase = async function(){



    if(
        !TTA.firebase.enabled
    ){


        console.log(
            "Local Mode"
        );


        return false;


    }




    try{


        await TTA.firebase.db

        .collection(
            "tta_database"
        )

        .doc(
            "main"
        )

        .set(
            TTA.database
        );



        console.log(

            "Sync thành công"

        );



        return true;



    }
    catch(e){



        console.error(
            e
        );


        return false;


    }


};








// =======================================
// LOAD DATABASE CLOUD
// =======================================

TTA.loadFirebaseData = async function(){



    if(
        !TTA.firebase.enabled
    ){

        return false;

    }





    try{


        let snap =

        await TTA.firebase.db

        .collection(
            "tta_database"
        )

        .doc(
            "main"
        )

        .get();





        if(
            snap.exists
        ){


            TTA.database =
            snap.data();



            TTA.saveDatabase();



            console.log(

                "Đã tải dữ liệu Cloud"

            );



            return true;


        }


    }
    catch(e){


        console.error(e);


    }


    return false;


};








// =======================================
// AUTO SYNC
// =======================================


setInterval(

function(){


    if(
        TTA.firebase.enabled
    ){


        TTA.syncFirebase();


    }


},

60000

);








// =======================================
// FIREBASE STATUS
// =======================================

TTA.firebaseStatus = function(){



    let box =
    document.getElementById(
        "firebaseStatus"
    );



    if(!box){

        return;

    }




    box.innerHTML =


    TTA.firebase.enabled

    ?

    "🟢 Online"

    :

    "⚪ Local Mode";



};








// =======================================
// START
// =======================================

document.addEventListener(
"DOMContentLoaded",
function(){



    TTA.initFirebase();


    TTA.firebaseStatus();



});




// =======================================
// END PART 2M
// =======================================
