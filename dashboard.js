// =======================================
// CUSTOM TTA MANAGER
// DASHBOARD.JS
// PART 2T
// =======================================

"use strict";

TTA.updateDashboard = function () {

    if (!TTA.database) return;

    const slots =
        TTA.getSlots ? TTA.getSlots() : [];

    const payments =
        TTA.getPayments ? TTA.getPayments() : [];

    const salary =
        TTA.getSalaryData ? TTA.getSalaryData() : [];

    // ===== SLOT =====

    const totalSlot = slots.length;

    const fullSlot =
        slots.filter(
            s => s.status === "FULL"
        ).length;

    const openSlot =
        slots.filter(
            s => s.status === "OPEN"
        ).length;

    // ===== PAYMENT =====

    let revenue = 0;

    payments.forEach(p => {

        if (p.status === "PAID") {

            revenue += Number(p.amount || 0);

        }

    });

    // ===== SALARY =====

    let salaryTotal = 0;

    salary.forEach(s => {

        salaryTotal += Number(
            s.salary || 0
        );

    });

    // ===== UI =====

    setValue("dashboardTotalSlot", totalSlot);

    setValue("dashboardOpenSlot", openSlot);

    setValue("dashboardFullSlot", fullSlot);

    setValue(
        "dashboardRevenue",
        revenue.toLocaleString()
    );

    setValue(
        "dashboardSalary",
        salaryTotal.toLocaleString()
    );

};

// =======================================

function setValue(id, value) {

    const el =
        document.getElementById(id);

    if (el) {

        el.textContent = value;

    }

}

// =======================================

window.refreshDashboard =
function(){

    TTA.updateDashboard();

};

// =======================================

document.addEventListener(

"DOMContentLoaded",

function(){

    TTA.updateDashboard();

}

);
