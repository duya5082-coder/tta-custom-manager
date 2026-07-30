// =======================================
// CUSTOM TTA MANAGER
// SLOT GENERATOR
// PART 3A NEW SYSTEM
// =======================================

"use strict";



TTA.checkAutoCreateBoard=function(boxData){


    if(!boxData)
    return;



    let board =
    boxData.boards[
        boxData.boards.length-1
    ];



    if(!board)
    return;



    let full =
    board.slots.every(
        s=>s.team
    );



    if(!full)
    return;



    let next =
    String.fromCharCode(
        board.name.charCodeAt(0)+1
    );



    if(next <= "E"){


        boxData.boards.push(

            TTA.createBoard(next)

        );


        console.log(
            "AUTO CREATE BOARD",
            next
        );


    }


};





TTA.checkAllBoards=function(){



    if(
        !Array.isArray(
            TTA.slotData
        )
    )
    return;



    TTA.slotData.forEach(box=>{


        TTA.checkAutoCreateBoard(box);


    });


};





console.log(
"SLOT GENERATOR NEW READY"
);
