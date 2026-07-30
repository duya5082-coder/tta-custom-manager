// =======================================
// CUSTOM TTA MANAGER
// SECURITY.JS
// PART 2V
// =======================================

"use strict";

TTA.security = {};

// =======================================
// AUDIT LOG
// =======================================

TTA.security.getLogs = function () {

    if (!Array.isArray(TTA.database.logs)) {

        TTA.database.logs = [];

    }

    return TTA.database.logs;

};

TTA.security.addLog = function (action) {

    TTA.security.getLogs().unshift({

        id: Date.now(),

        user: TTA.currentUser
            ? TTA.currentUser.username
            : "Unknown",

        action,

        time: new Date().toLocaleString("vi-VN")

    });

    if (TTA.security.getLogs().length > 500) {

        TTA.database.logs.length = 500;

    }

    TTA.saveDatabase();

};

// =======================================
// CHECK DATABASE
// =======================================

TTA.security.checkDatabase = function () {

    if (!TTA.database) {

        alert("Database bị lỗi.");

        location.reload();

    }

};

// =======================================
// BACKUP SNAPSHOT
// =======================================

TTA.security.createSnapshot = function () {

    localStorage.setItem(

        "CUSTOM_TTA_LAST_BACKUP",

        JSON.stringify(TTA.database)

    );

};

// =======================================
// RESTORE SNAPSHOT
// =======================================

TTA.security.restoreSnapshot = function () {

    const backup =

        localStorage.getItem(

            "CUSTOM_TTA_LAST_BACKUP"

        );

    if (!backup) {

        return;

    }

    try {

        TTA.database = JSON.parse(backup);

        TTA.saveDatabase();

    } catch (e) {

        console.error(e);

    }

};

// =======================================
// AUTO SAVE SNAPSHOT
// =======================================

setInterval(function () {

    TTA.security.createSnapshot();

}, 300000);

// =======================================
// START
// =======================================

document.addEventListener(

    "DOMContentLoaded",

    function () {

        TTA.security.checkDatabase();

    }

);
