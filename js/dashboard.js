// dashboard.js
// This file sends sample energy data to dashboard.html.

// Sample household energy data
const dashboardData = {
    lastWeekEnergy: 100,
    thisWeekEnergy: 80,
    weeklySavings: 10,
    reward: "1 Tree Planted"
};

// Wait until the HTML page has fully loaded before changing page content
document.addEventListener("DOMContentLoaded", function () {
    updateEnergyComparison();
    updateWeeklySavings();
    updateWeeklyReward();
});

// Updates the bar graph and weekly energy message
function updateEnergyComparison() {
    const lastWeekBar = document.getElementById("last-week-bar");
    const thisWeekBar = document.getElementById("this-week-bar");
    const summaryMessage = document.getElementById("energy-summary-message");

    const lastWeekEnergy = dashboardData.lastWeekEnergy;
    const thisWeekEnergy = dashboardData.thisWeekEnergy;

    // Calculate percentage change
    const energyDifference = lastWeekEnergy - thisWeekEnergy;
    const percentageSaved = Math.round((energyDifference / lastWeekEnergy) * 100);

    // Set graph bar heights
    // Last week is treated as the full comparison height.
    lastWeekBar.style.height = "180px";

    // This week bar is scaled compared to last week
    const thisWeekBarHeight = (thisWeekEnergy / lastWeekEnergy) * 180;
    thisWeekBar.style.height = thisWeekBarHeight + "px";

    // Update the hidden data values in the HTML
    lastWeekBar.dataset.energyValue = lastWeekEnergy;
    thisWeekBar.dataset.energyValue = thisWeekEnergy;

    // Update summary text
    if (percentageSaved > 0) {
        summaryMessage.innerHTML = `
            <p>↓ You used <strong>${percentageSaved}% less energy</strong> this week.</p>
        `;
    } else if (percentageSaved < 0) {
        summaryMessage.innerHTML = `
            <p>↑ You used <strong>${Math.abs(percentageSaved)}% more energy</strong> this week.</p>
        `;
    } else {
        summaryMessage.innerHTML = `
            <p>Your energy use was <strong>the same as last week</strong>.</p>
        `;
    }
}

// Updates the weekly savings card
function updateWeeklySavings() {
    const savingsCard = document.querySelector("#weekly-savings .summary-highlight");

    savingsCard.innerHTML = `
        💰 You saved <strong>$${dashboardData.weeklySavings}</strong> this week.
    `;
}

// Updates the weekly reward card
function updateWeeklyReward() {
    const rewardCard = document.querySelector("#weekly-reward .summary-highlight");

    rewardCard.innerHTML = `
        🌱 Reward: <strong>${dashboardData.reward}</strong>
    `;
}