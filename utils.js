// =======================================
// CUSTOM TTA MANAGER
// UTILS.JS
// VERSION 1.0
// =======================================

// ================================
// SHORT QUERY
// ================================

const $ = (selector) => document.querySelector(selector);

const $$ = (selector) => document.querySelectorAll(selector);

// ================================
// RANDOM ID
// ================================

function createId(prefix = "") {

    return (
        prefix +
        Date.now().toString(36) +
        Math.random().toString(36).substring(2, 8)
    );

}

// ================================
// DATE
// ================================

function today() {

    return new Date().toISOString().split("T")[0];

}

function now() {

    return new Date().toLocaleString("vi-VN");

}

function currentTime() {

    return new Date().toLocaleTimeString("vi-VN");

}

// ================================
// FORMAT MONEY
// ================================

function money(number) {

    return Number(number).toLocaleString("vi-VN") + " đ";

}

// ================================
// NOTIFICATION
// ================================

function toast(message, color = "#2563eb") {

    let box = document.createElement("div");

    box.innerText = message;

    box.style.position = "fixed";
    box.style.right = "20px";
    box.style.top = "20px";
    box.style.padding = "12px 18px";
    box.style.borderRadius = "10px";
    box.style.background = color;
    box.style.color = "#fff";
    box.style.zIndex = "99999";

    document.body.appendChild(box);

    setTimeout(() => {

        box.remove();

    }, 2500);

}

// ================================
// COPY
// ================================

async function copyText(text) {

    try {

        await navigator.clipboard.writeText(text);

        toast("Đã sao chép");

    } catch {

        alert(text);

    }

}

// ================================
// SEARCH
// ================================

function searchArray(array, keyword, field) {

    keyword = keyword.toLowerCase();

    return array.filter(item =>

        String(item[field])

        .toLowerCase()

        .includes(keyword)

    );

}

// ================================
// CLOCK
// ================================

function startClock() {

    const clock = $("#clock");

    if (!clock) return;

    setInterval(() => {

        clock.innerText = now();

    }, 1000);

}

// ================================
// PAGE
// ================================

function openPage(id) {

    $$(".page").forEach(page => {

        page.classList.add("hidden");

    });

    $("#" + id).classList.remove("hidden");

}

// ================================
// SAVE
// ================================

function saveAll() {

    saveDatabase(DATABASE);

}

// ================================
// ROLE
// ================================

function isAdmin() {

    return CURRENT_USER?.role === "admin";

}

function isCTV() {

    return CURRENT_USER?.role === "ctv";

}

// ================================
// LOG
// ================================

function systemLog(action) {

    if (!CURRENT_USER) return;

    addLog(action, CURRENT_USER.username);

}

// ================================
// SLOT FULL
// ================================

function isSlotFull(slot) {

    return slot.players.length >= SLOT.LIMIT;

}

// ================================
// PLAYER COUNT
// ================================

function playerCount(slot) {

    return slot.players.length;

}

// ================================
// AUTO TABLE
// ================================

function nextTable(letter) {

    if (letter === "A") return "B";

    if (letter === "B") return "C";

    if (letter === "C") return "D";

    return "D";

}

// ================================
// RESET INPUT
// ================================

function clearInput(...ids) {

    ids.forEach(id => {

        $("#" + id).value = "";

    });

}

// ================================
// CONFIRM
// ================================

function ask(message) {

    return confirm(message);

}

// ================================
// INIT
// ================================

document.addEventListener("DOMContentLoaded", () => {

    startClock();

    console.log("UTILS READY");

});
