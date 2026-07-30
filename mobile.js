// =======================================
// CUSTOM TTA MANAGER
// MOBILE MENU SYSTEM
// =======================================

"use strict";


TTA.mobile = {

    open:false,


    toggleMenu:function(){

        this.open = !this.open;


        const menu =
            document.querySelector(".sidebar");


        if(menu){

            menu.classList.toggle(
                "show",
                this.open
            );

        }

    },


    close:function(){

        this.open = false;


        const menu =
            document.querySelector(".sidebar");


        if(menu){

            menu.classList.remove("show");

        }

    }

};


console.log("MOBILE MENU READY");
