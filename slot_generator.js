// =======================================
// CUSTOM TTA MANAGER
// SLOT GENERATOR
// PART 3A NEW SYSTEM
// AUTO CREATE BOARD
// =======================================

"use strict";



// =======================================
// AUTO CREATE BOARD
// =======================================


TTA.checkAutoCreateBoard=function(
boxData
){



    if(!boxData)
    return;



    let lastBoard =

    boxData.boards[
        boxData.boards.length-1
    ];



    let full =

    lastBoard.slots.every(

        slot=>slot.team

    );



    if(!full)
    return;




    let next =

    String.fromCharCode(

        lastBoard.name.charCodeAt(0)+1

    );



    if(next <= "E"){


        boxData.boards.push(

            TTA.createBoard(
                next
            )

        );


        console.log(
            "AUTO CREATE BOARD",
            next
        );


    }



};





// =======================================
// CHECK ALL BOX
// =======================================


TTA.checkAllBoards=function(){



    TTA.slotData.forEach(box=>{


        TTA.checkAutoCreateBoard(
            box
        );


    });



};





console.log(
"SLOT GENERATOR 3A NEW READY"
);
