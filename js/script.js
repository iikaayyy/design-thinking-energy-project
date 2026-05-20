// script.js
// Saves and loads WattBuddy user profiles using localStorage.
// Supports setup mode, skip mode, email login mode, dashboard display, and home page button updates.

// Sample profile used when the user skips the setup form
const sampleUserProfile = {
    name: "Guest User",
    email: "guest@wattbuddy.local",
    rooms: "3-4 rooms",
    weather: "Mixed weather",
    temperatureUse: "Both depending on weather",
    averageUse: "18 kWh per day",
    appliances: "Multiple heavy appliances",
    goal: "Reduce overall energy use",
    isSampleData: true
};

document.addEventListener("DOMContentLoaded", function () {
    loadNavbar();

    setupDetailsForm();
    setupSkipLink();
    setupEmailLoginScreen();
    setupEmailLoginForm();
    loadProfileOnDashboard();
    updateHomePageButtons();
});

// Saves the user's details when they submit the setup form
function setupDetailsForm() {
    const setupForm = document.querySelector(".setup-form");

    if (!setupForm) {
        return;
    }

    setupForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const email = getInputValue("email", "").toLowerCase();

        if (email === "") {
            alert("Please enter an email address so your profile can be saved.");
            return;
        }

        const userProfile = {
            name: getInputValue("name", "Guest User"),
            email: email,
            rooms: getInputValue("rooms", "Not provided"),
            weather: getInputValue("weather", "Not provided"),
            temperatureUse: getInputValue("temperature-use", "Not provided"),
            averageUse: getInputValue("average-use", "Not provided"),
            appliances: getInputValue("appliances", "Not provided"),
            goal: getInputValue("goal", "Not provided"),
            isSampleData: false
        };

        saveProfileByEmail(userProfile);
        setActiveProfile(userProfile);

        window.location.href = "dashboard.html";
    });
}

// Gets an input/select value safely
function getInputValue(elementId, fallbackValue) {
    const element = document.getElementById(elementId);

    if (!element || element.value.trim() === "") {
        return fallbackValue;
    }

    return element.value.trim();
}

// Saves all user profiles in localStorage using their email as the lookup value
function saveProfileByEmail(profile) {
    const profiles = getSavedProfiles();

    profiles[profile.email] = profile;

    localStorage.setItem("wattBuddyProfiles", JSON.stringify(profiles));
}

// Gets all saved profiles from localStorage
function getSavedProfiles() {
    const savedProfiles = localStorage.getItem("wattBuddyProfiles");

    if (!savedProfiles) {
        return {};
    }

    try {
        return JSON.parse(savedProfiles);
    } catch (error) {
        console.error("Could not read saved profiles:", error);
        return {};
    }
}

// Saves the profile currently being used by the dashboard
function setActiveProfile(profile) {
    localStorage.setItem("wattBuddyProfile", JSON.stringify(profile));
}

// Gets the currently active/logged-in profile
function getActiveProfile() {
    const savedProfile = localStorage.getItem("wattBuddyProfile");

    if (!savedProfile) {
        return null;
    }

    try {
        return JSON.parse(savedProfile);
    } catch (error) {
        console.error("Could not read active profile:", error);
        return null;
    }
}

// Uses sample data if the user clicks "Skip for now"
function setupSkipLink() {
    const skipLink = document.querySelector(".skip-link");

    if (!skipLink) {
        return;
    }

    skipLink.addEventListener("click", function () {
        setActiveProfile(sampleUserProfile);
    });
}

// Shows the email login screen and hides the setup form card
function setupEmailLoginScreen() {
    const showEmailLoginButton = document.getElementById("show-email-login-btn");
    const backToSetupButton = document.getElementById("back-to-setup-btn");

    const formCard = document.querySelector(".form-card");
    const emailLoginSection = document.getElementById("email-login-section");
    const divider = document.querySelector(".or-divider");
    const quickAccessButtons = document.querySelector(".quick-access-buttons");

    if (!showEmailLoginButton || !formCard || !emailLoginSection) {
        return;
    }

    showEmailLoginButton.addEventListener("click", function () {
        formCard.classList.add("hidden");

        if (divider) {
            divider.classList.add("hidden");
        }

        if (quickAccessButtons) {
            quickAccessButtons.classList.add("hidden");
        }

        emailLoginSection.classList.remove("hidden");
    });

    if (backToSetupButton) {
        backToSetupButton.addEventListener("click", function () {
            formCard.classList.remove("hidden");

            if (divider) {
                divider.classList.remove("hidden");
            }

            if (quickAccessButtons) {
                quickAccessButtons.classList.remove("hidden");
            }

            emailLoginSection.classList.add("hidden");

            const errorMessage = document.getElementById("login-error-message");

            if (errorMessage) {
                errorMessage.textContent = "";
            }
        });
    }
}

// Checks whether the login email exists in localStorage
function setupEmailLoginForm() {
    const emailLoginForm = document.getElementById("email-login-form");

    if (!emailLoginForm) {
        return;
    }

    emailLoginForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const loginEmail = getInputValue("login-email", "").toLowerCase();
        const errorMessage = document.getElementById("login-error-message");
        const profiles = getSavedProfiles();

        if (errorMessage) {
            errorMessage.textContent = "";
        }

        if (loginEmail === "") {
            if (errorMessage) {
                errorMessage.textContent = "Please enter your email address.";
            }
            return;
        }

        if (!profiles[loginEmail]) {
            if (errorMessage) {
                errorMessage.textContent = "This email does not exist. Please complete the setup form first.";
            }
            return;
        }

        setActiveProfile(profiles[loginEmail]);

        window.location.href = "dashboard.html";
    });
}

// Loads the saved profile on dashboard.html
function loadProfileOnDashboard() {
    const welcomeMessage = document.getElementById("dashboard-welcome-message");
    const dashboardIntro = document.querySelector(".dashboard-intro .section-content");

    // Stop this function if the current page is not dashboard.html
    if (!welcomeMessage || !dashboardIntro) {
        return;
    }

    let userProfile = getActiveProfile();

    if (!userProfile) {
        userProfile = sampleUserProfile;
        setActiveProfile(sampleUserProfile);
    }

    displayUserNameOnDashboard(userProfile);
    displayProfileOnDashboard(userProfile);
}

// Displays the user's name at the top of dashboard.html
function displayUserNameOnDashboard(profile) {
    const welcomeMessage = document.getElementById("dashboard-welcome-message");

    if (!welcomeMessage) {
        return;
    }

    welcomeMessage.textContent = `Welcome back, ${profile.name}!`;
}

// Sends the saved or sample profile data into dashboard.html
function displayProfileOnDashboard(profile) {
    const dashboardIntro = document.querySelector(".dashboard-intro .section-content");

    if (!dashboardIntro) {
        return;
    }

    const existingProfileSummary = document.getElementById("profile-summary");

    if (existingProfileSummary) {
        existingProfileSummary.remove();
    }

    const profileSummary = document.createElement("div");
    profileSummary.classList.add("profile-summary");
    profileSummary.id = "profile-summary";

    profileSummary.innerHTML = `
        <h2>Your Energy Profile</h2>

        <p>
            Email: <strong>${profile.email}</strong>
        </p>

        <p>
            Number of rooms: <strong>${profile.rooms}</strong>
        </p>

        <p>
            Usual weather: <strong>${profile.weather}</strong>
        </p>

        <p>
            Heating or air conditioning use: <strong>${profile.temperatureUse}</strong>
        </p>

        <p>
            Average energy use: <strong>${profile.averageUse}</strong>
        </p>

        <p>
            Heavy appliances: <strong>${profile.appliances}</strong>
        </p>

        <p>
            Main goal: <strong>${profile.goal}</strong>
        </p>

        <p class="profile-data-note">
            ${profile.isSampleData ? "Using sample data. Complete the setup form to personalise your dashboard." : "Using your saved energy profile."}
        </p>
    `;

    dashboardIntro.appendChild(profileSummary);
}

// Updates the index.html buttons depending on whether the user is already logged in
function updateHomePageButtons() {
    const mainStartButton = document.getElementById("main-start-btn");
    const dashboardAccessButton = document.getElementById("dashboard-access-btn");

    if (!mainStartButton || !dashboardAccessButton) {
        return;
    }

    const activeProfile = getActiveProfile();

    if (activeProfile && activeProfile.isSampleData === false) {
        mainStartButton.textContent = `Go to ${activeProfile.name}'s Dashboard`;
        mainStartButton.href = "dashboard.html";

        dashboardAccessButton.textContent = "Continue to Dashboard";
        dashboardAccessButton.href = "dashboard.html";
    } else {
        mainStartButton.textContent = "Get Started";
        mainStartButton.href = "details.html";

        dashboardAccessButton.textContent = "Explore Dashboard";
        dashboardAccessButton.href = "dashboard.html";
    }
}

// Loads the shared navbar.html into pages that have #navbar-container
function loadNavbar() {
    const navbarContainer = document.getElementById("navbar-container");

    if (!navbarContainer) {
        return;
    }

    fetch("navbar.html")
        .then(function (response) {
            if (!response.ok) {
                throw new Error("Could not load navbar.html");
            }

            return response.text();
        })
        .then(function (navbarHTML) {
            navbarContainer.innerHTML = navbarHTML;

            updateActiveNavbarLink();
            updateNavbarLoginState();
            setupLogoutButton();
        })
        .catch(function (error) {
            console.error("Navbar loading error:", error);
        });
}

// Highlights the current page in the navbar
function updateActiveNavbarLink() {
    const currentPage = window.location.pathname.split("/").pop() || "index.html";
    const navbarLinks = document.querySelectorAll(".navbar-links a");

    navbarLinks.forEach(function (link) {
        const linkPage = link.getAttribute("href");

        if (linkPage === currentPage) {
            link.setAttribute("aria-current", "page");
        } else {
            link.removeAttribute("aria-current");
        }
    });
}

// Shows or hides the logout button depending on login state
function updateNavbarLoginState() {
    const loginSignupButton = document.getElementById("login-signup-btn");
    const logoutButton = document.getElementById("logout-btn");

    if (!loginSignupButton || !logoutButton) {
        return;
    }

    const activeProfile = getActiveProfile();

    if (activeProfile && activeProfile.isSampleData === false) {
        loginSignupButton.classList.add("hidden");
        logoutButton.classList.remove("hidden");
    } else {
        loginSignupButton.classList.remove("hidden");
        logoutButton.classList.add("hidden");
    }
}

// Logs the user out and returns them to the home page
function setupLogoutButton() {
    const logoutButton = document.getElementById("logout-btn");

    if (!logoutButton) {
        return;
    }

    logoutButton.addEventListener("click", function () {
        localStorage.removeItem("wattBuddyProfile");

        window.location.href = "index.html";
    });
}