// =======================================
// CUSTOM TTA MANAGER
// EXPORT.JS
// PHẦN 2S
// =======================================

"use strict";

// =======================================
// EXPORT JSON
// =======================================

window.exportJSON = function () {

    const data = JSON.stringify(
        TTA.database,
        null,
        2
    );

    const blob = new Blob(
        [data],
        {
            type: "application/json"
        }
    );

    const url =
        URL.createObjectURL(blob);

    const a =
        document.createElement("a");

    a.href = url;

    a.download =
        "CUSTOM_TTA_BACKUP.json";

    a.click();

    URL.revokeObjectURL(url);

};

// =======================================
// EXPORT CSV
// =======================================

window.exportCSV = function () {

    let csv = [];

    csv.push(
        [
            "Tên",
            "Ngày",
            "Khung giờ",
            "Trạng thái"
        ].join(",")
    );

    TTA.getSlots().forEach(slot => {

        csv.push(

            [

                slot.title,

                slot.date,

                slot.startTime +
                "-" +
                slot.endTime,

                slot.status

            ].join(",")

        );

    });

    const blob = new Blob(

        [csv.join("\n")],

        {

            type:
            "text/csv"

        }

    );

    const url =
        URL.createObjectURL(blob);

    const a =
        document.createElement("a");

    a.href = url;

    a.download =
        "CUSTOM_TTA_SLOT.csv";

    a.click();

    URL.revokeObjectURL(url);

};

// =======================================
// EXPORT HTML REPORT
// =======================================

window.exportReport = function () {

    let html = `

    <html>

    <head>

    <title>

    CUSTOM TTA REPORT

    </title>

    <style>

    body{

        font-family:Arial;

        padding:30px;

    }

    table{

        width:100%;

        border-collapse:collapse;

    }

    td,th{

        border:1px solid #000;

        padding:8px;

    }

    </style>

    </head>

    <body>

    <h2>

    CUSTOM TTA REPORT

    </h2>

    <table>

    <tr>

    <th>Slot</th>

    <th>Ngày</th>

    <th>Giờ</th>

    <th>Trạng thái</th>

    </tr>

    `;

    TTA.getSlots().forEach(slot => {

        html += `

        <tr>

        <td>${slot.title}</td>

        <td>${slot.date}</td>

        <td>${slot.startTime} - ${slot.endTime}</td>

        <td>${slot.status}</td>

        </tr>

        `;

    });

    html += `

    </table>

    </body>

    </html>

    `;

    const w =
        window.open("");

    w.document.write(html);

    w.document.close();

};

// =======================================
// PRINT
// =======================================

window.printReport = function(){

    exportReport();

    setTimeout(function(){

        window.print();

    },500);

};

// =======================================
// REVENUE REPORT
// =======================================

window.exportRevenue = function(){

    let revenue = 0;

    if(TTA.getPayments){

        TTA.getPayments().forEach(item=>{

            if(item.status==="PAID"){

                revenue +=
                item.amount;

            }

        });

    }

    alert(

        "Tổng doanh thu: " +

        revenue.toLocaleString()

        + "đ"

    );

};

// =======================================
// SALARY REPORT
// =======================================

window.exportSalary = function(){

    let salary = 0;

    if(TTA.getSalaryData){

        TTA.getSalaryData().forEach(item=>{

            salary += item.salary;

        });

    }

    alert(

        "Tổng lương: " +

        salary.toLocaleString()

        + "đ"

    );

};

// =======================================
// END
// =======================================
