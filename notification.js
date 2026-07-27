// =====================================
// CUSTOM TTA
// NOTIFICATION
// =====================================

if (window.TTA_NOTIFICATION_LOADED) {

    console.warn("notification loaded");

} else {

    window.TTA_NOTIFICATION_LOADED = true;

    document.addEventListener("DOMContentLoaded", () => {

        console.log("🔔 Notification ready");

    });

    window.sendNotification = function (msg) {

        const list = document.getElementById("notificationList");

        if (!list) return;

        const div = document.createElement("div");
        div.className = "notificationItem";

        div.innerHTML = `
            🔔 ${msg}
            <br>
            <small>${new Date().toLocaleString("vi-VN")}</small>
        `;

        list.prepend(div);

    };

}
