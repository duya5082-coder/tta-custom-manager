// =======================================
// CUSTOM TTA MANAGER
// MENU SYSTEM
// =======================================

"use strict";


TTA.menu = {

    open:false,


    toggleMenu:function(){

        this.open = !this.open;


        const menu =
            document.getElementById("sideMenu");


        if(menu){

            menu.classList.toggle(
                "active",
                this.open
            );

        }

    },


    close:function(){

        this.open = false;


        const menu =
            document.getElementById("sideMenu");


        if(menu){

            menu.classList.remove("active");

        }

    }

};



TTA.toggleMenu = function(){

    TTA.menu.toggleMenu();

};


console.log("MENU SYSTEM READY");
