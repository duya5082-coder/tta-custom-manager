// =======================================
// CUSTOM TTA MANAGER
// SETTING.JS
// PHẦN 2L
// SYSTEM CONFIGURATION
// =======================================





// =======================================
// DEFAULT CONFIG
// =======================================

TTA.config =
TTA.config || {};





TTA.defaultConfig = {


    appName:
    "CUSTOM TTA",


    version:
    "1.0.0",


    company:
    "CUSTOM TTA MANAGER",


    firebaseMode:
    false


};








// =======================================
// LOAD CONFIG
// =======================================

TTA.loadConfig = function(){



    let data =
    localStorage.getItem(
        "CUSTOM_TTA_CONFIG"
    );



    if(data){


        try{


            TTA.config =
            JSON.parse(
                data
            );


        }
        catch(e){


            TTA.config =
            TTA.defaultConfig;


        }


    }
    else{


        TTA.config =
        TTA.defaultConfig;


        TTA.saveConfig();


    }


};








// =======================================
// SAVE CONFIG
// =======================================

TTA.saveConfig = function(){



    localStorage.setItem(

        "CUSTOM_TTA_CONFIG",

        JSON.stringify(
            TTA.config
        )

    );


};








// =======================================
// CHANGE APP NAME
// =======================================

window.changeAppName = function(){



    if(
        !TTA.isAdmin()
    ){


        alert(
            "Chỉ Admin được chỉnh sửa"
        );


        return;

    }




    let name =
    prompt(
        "Tên hệ thống mới",

        TTA.config.appName

    );



    if(
        !name
    ){

        return;

    }



    TTA.config.appName =
    name;



    TTA.saveConfig();



    TTA.updateAppName();



};








// =======================================
// UPDATE UI NAME
// =======================================

TTA.updateAppName = function(){



    let logo =
    document.querySelector(
        ".logo"
    );



    if(logo){


        logo.innerHTML =
        TTA.config.appName;


    }



    document.title =
    TTA.config.appName;



};








// =======================================
// SYSTEM INFO
// =======================================

TTA.renderSystemInfo = function(){



    let box =
    document.getElementById(
        "systemInfo"
    );



    if(!box){

        return;

    }



    box.innerHTML =

    `

    <div class="card">

    <h3>

    ${TTA.config.appName}

    </h3>


    <p>

    Version:
    ${TTA.config.version}

    </p>


    <p>

    Firebase:
    ${
    TTA.config.firebaseMode
    ?
    "ON"
    :
    "LOCAL"
    }

    </p>


    </div>

    `;


};








// =======================================
// RESET CONFIG
// =======================================

window.resetConfig = function(){



    if(
        confirm(
            "Khôi phục cấu hình mặc định?"
        )
    ){



        TTA.config =
        TTA.defaultConfig;



        TTA.saveConfig();



        TTA.updateAppName();



    }



};








// =======================================
// INIT
// =======================================

document.addEventListener(
"DOMContentLoaded",
function(){



    TTA.loadConfig();


    TTA.updateAppName();


    TTA.renderSystemInfo();



});





// =======================================
// END PART 2L
// =======================================
