document.addEventListener("DOMContentLoaded", function () {

let trades = JSON.parse(localStorage.getItem("trades")) || [];

// ===========================
// SAVE TRADE
// ===========================

const saveBtn = document.getElementById("saveTrade");

if (saveBtn) {

saveBtn.addEventListener("click", function () {

const trade = {

id: Date.now(),

pair: document.getElementById("pair").value,
date: document.getElementById("date").value,
session: document.getElementById("session").value,
bias: document.getElementById("bias").value,
setupType: document.getElementById("setupType").value,
risk: document.getElementById("risk").value,
rr: document.getElementById("rr").value,
result: document.getElementById("result").value,
profit: Number(document.getElementById("profit").value) || 0,
aplus: document.getElementById("aplus").value,
notes: document.getElementById("notes").value

};

trades.push(trade);

localStorage.setItem("trades", JSON.stringify(trades));

alert("✅ Trade Saved Successfully!");

window.location.href = "history.html";

});

}

// ===========================
// HISTORY
// ===========================

const history = document.getElementById("history");

if(history){

if(trades.length===0){

history.innerHTML="<div class='card'><h2>No trades saved.</h2></div>";

}else{

trades.slice().reverse().forEach(function(trade){

history.innerHTML+=`

<div class="card">

<h2>${trade.pair}</h2>

<p><b>Date:</b> ${trade.date}</p>

<p><b>Session:</b> ${trade.session}</p>

<p><b>Bias:</b> ${trade.bias}</p>

<p><b>Setup:</b> ${trade.setupType}</p>

<p><b>Risk:</b> ${trade.risk}%</p>

<p><b>R:R:</b> ${trade.rr}</p>

<p><b>Result:</b> ${trade.result}</p>

<p><b>Profit:</b> $${trade.profit}</p>

<p><b>A+:</b> ${trade.aplus}</p>

<p><b>Notes:</b><br>${trade.notes}</p>

<button onclick="deleteTrade(${trade.id})">🗑 Delete</button>

</div>

<br>

`;

});

}

}
// ===========================
// DASHBOARD
// ===========================

if (document.getElementById("totalTrades")) {

document.getElementById("totalTrades").textContent = trades.length;

let wins = trades.filter(t => t.result === "Win").length;

document.getElementById("winRate").textContent =
trades.length ? ((wins / trades.length) * 100).toFixed(1) + "%" : "0%";

let totalProfit = trades.reduce((sum, t) => sum + Number(t.profit), 0);

document.getElementById("totalProfit").textContent =
"$" + totalProfit.toFixed(2);

let totalRR = 0;
let rrCount = 0;

trades.forEach(function(t){

if(t.rr && t.rr.includes(":")){

totalRR += Number(t.rr.split(":")[1]);

rrCount++;

}

});

document.getElementById("averageRR").textContent =
rrCount ? (totalRR / rrCount).toFixed(2) : "0";

let aplus = trades.filter(t => t.aplus === "Yes").length;

document.getElementById("aPlus").textContent = aplus;

let grossProfit = trades
.filter(t => Number(t.profit) > 0)
.reduce((sum, t) => sum + Number(t.profit), 0);

let grossLoss = Math.abs(
trades
.filter(t => Number(t.profit) < 0)
.reduce((sum, t) => sum + Number(t.profit), 0)
);

document.getElementById("profitFactor").textContent =
grossLoss > 0 ? (grossProfit / grossLoss).toFixed(2) : "∞";

}

});
// ===========================
// DELETE TRADE
// ===========================

function deleteTrade(id) {

    if (!confirm("Delete this trade?")) {
        return;
    }

    let trades = JSON.parse(localStorage.getItem("trades")) || [];

    trades = trades.filter(trade => trade.id !== id);

    localStorage.setItem("trades", JSON.stringify(trades));

    location.reload();
}
