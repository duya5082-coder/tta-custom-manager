// =======================================
// CUSTOM TTA MANAGER
// TABLE ENGINE
// =======================================

"use strict";


TTA.tables = [];


TTA.getTables = function(){

    return TTA.tables;

};



TTA.createTable = function(){

    const index = TTA.tables.length;

    const tableName = String.fromCharCode(
        65 + index
    );

    const table = {

        id: tableName,

        slots: []

    };


    for(let i = 1; i <= 12; i++){

        table.slots.push({

            id: i,

            status:"empty",

            team:null

        });

    }


    TTA.tables.push(table);


    return table;

};



TTA.getCurrentTable = function(){

    if(TTA.tables.length === 0){

        return TTA.createTable();

    }


    return TTA.tables[
        TTA.tables.length - 1
    ];

};



TTA.autoCreateNextTable = function(){

    const table = TTA.getCurrentTable();


    const full =
        table.slots.every(
            s=>s.status==="full"
        );


    if(full){

        return TTA.createTable();

    }


    return table;

};


console.log(
    "TABLE ENGINE LOADED"
);
