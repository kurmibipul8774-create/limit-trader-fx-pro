document.addEventListener("DOMContentLoaded", function () {

    let trades = JSON.parse(localStorage.getItem("trades")) || [];

    // ==========================
    // SAVE TRADE
    // ==========================
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
                profit: parseFloat(document.getElementById("profit").value) || 0,
                aplus: document.getElementById("aplus").value,
                notes: document.getElementById("notes").value
            };

            trades.push(trade);

            localStorage.setItem("trades", JSON.stringify(trades));

            alert("✅ Trade Saved Successfully!");

            window.location.href = "history.html";

        });

    }

    // ==========================
    // HISTORY PAGE
    // ==========================

    const history = document.getElementById("history");

    if (history) {

        if (trades.length === 0) {

            history.innerHTML =
            "<div class='card'><h2>No trades saved.</h2></div>";

        } else {

            trades.slice().reverse().forEach(function(trade){

                history.innerHTML += `
                <div class="card">

                <h2>${trade.pair}</h2>

                <p><strong>Date:</strong> ${trade.date}</p>

                <p><strong>Session:</strong> ${trade.session}</p>

                <p><strong>Bias:</strong> ${trade.bias}</p>

                <p><strong>Setup:</strong> ${trade.setupType}</p>

                <p><strong>Risk:</strong> ${trade.risk}%</p>

                <p><strong>R:R:</strong> ${trade.rr}</p>

                <p><strong>Result:</strong> ${trade.result}</p>

                <p><strong>Profit:</strong> $${trade.profit}</p>

                <p><strong>A+:</strong> ${trade.aplus}</p>

                <p><strong>Notes:</strong><br>${trade.notes}</p>

                </div><br>
                `;
            });

        }

    }
      // ==========================
    // DASHBOARD
    // ==========================

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

        trades.forEach(function (t) {
            if (t.rr && t.rr.includes(":")) {
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
