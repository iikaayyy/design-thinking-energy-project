// script.js
// This file saves and loads the user's WattBuddy profile using localStorage.

// Sample profile used when the user skips the setup form
const sampleUserProfile = {
    name: "Guest User",
    household: "3-4 people",
    goal: "Reduce energy use",
    usage: "Medium",
    isSampleData: true
};

// Runs after the page has loaded
document.addEventListener("DOMContentLoaded", function () {
    setupDetailsForm();
    setupSkipLink();
    loadProfileOnDashboard();
});

// Saves the user's details when they submit the details form
function setupDetailsForm() {
    const setupForm = document.querySelector(".setup-form");

    // Stop this function if the current page does not have the details form
    if (!setupForm) {
        return;
    }

    setupForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const nameInput = document.getElementById("name");
        const householdInput = document.getElementById("household");
        const goalInput = document.getElementById("goal");
        const usageInput = document.getElementById("usage");

        const userProfile = {
            name: nameInput.value.trim() || "Guest User",
            household: householdInput.value || "Not provided",
            goal: goalInput.value || "Not provided",
            usage: usageInput.value || "Not provided",
            isSampleData: false
        };

        localStorage.setItem("wattBuddyProfile", JSON.stringify(userProfile));

        window.location.href = "dashboard.html";
    });
}

// Uses sample data if the user clicks "Skip for now"
function setupSkipLink() {
    const skipLink = document.querySelector(".skip-link");

    if (!skipLink) {
        return;
    }

    skipLink.addEventListener("click", function () {
        localStorage.setItem("wattBuddyProfile", JSON.stringify(sampleUserProfile));
    });
}

// Loads the saved profile on the dashboard page
function loadProfileOnDashboard() {
    const savedProfile = localStorage.getItem("wattBuddyProfile");

    let userProfile;

    if (savedProfile) {
        userProfile = JSON.parse(savedProfile);
    } else {
        userProfile = sampleUserProfile;
        localStorage.setItem("wattBuddyProfile", JSON.stringify(sampleUserProfile));
    }

    displayProfileOnDashboard(userProfile);
    displayUserNameOnDashboard(userProfile);
}

// Sends the saved or sample profile data into dashboard.html
function displayProfileOnDashboard(profile) {
    const dashboardIntro = document.querySelector(".home-intro .section-content");

    // Stop this function if the current page is not the dashboard/home summary page
    if (!dashboardIntro) {
        return;
    }

    const profileSummary = document.createElement("div");
    profileSummary.classList.add("profile-summary");
    profileSummary.id = "profile-summary";

    profileSummary.innerHTML = `
        <h2>Welcome, ${profile.name}</h2>

        <p>
            Household size: <strong>${profile.household}</strong>
        </p>

        <p>
            Main goal: <strong>${profile.goal}</strong>
        </p>

        <p>
            Current usage level: <strong>${profile.usage}</strong>
        </p>

        <p class="profile-data-note">
            ${profile.isSampleData ? "Using sample data. Complete the setup form to personalise your dashboard." : "Using your saved energy profile."}
        </p>
    `;

    dashboardIntro.appendChild(profileSummary);
}

function displayUserNameOnDashboard(profile) {
    const welcomeMessage = document.getElementById("dashboard-welcome-message");

    if (!welcomeMessage) {
        return;
    }

    welcomeMessage.textContent = `Welcome back, ${profile.name}!`;
}