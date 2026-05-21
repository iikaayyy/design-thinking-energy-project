# WattBuddy

WattBuddy is a static front-end website for the 2008ICT Design Thinking in IT project. The website helps households understand energy use, view weekly usage patterns, set simple goals, and learn practical saving tips.

The project is built with HTML and CSS only. It does not require JavaScript, a database, or user accounts for the current prototype version.

## Website Pages

- `index.html`: Welcome page and entry point.
- `details.html`: Static setup form for a sample household energy profile.
- `dashboard.html`: Weekly energy summary, profile overview, savings, rewards, and quick actions.
- `usage.html`: Weekly energy usage chart, appliance breakdown, alerts, and next-step links.
- `goals.html`: Energy goals, progress tracking, badges, rewards, and impact summary.
- `tips.html`: Energy saving tips and habit suggestions.
- `about.html`: Project purpose, problem, solution, and feature overview.

## Key Features

- Consistent WattBuddy branding, colours, navigation, buttons, and card layout.
- Responsive page layouts using CSS grid and flexbox.
- Gamified goal features such as streaks, badges, tree rewards, and estimated savings.
- Usage visualisations for weekly energy use and appliance breakdown.
- Clear user flow from setup to dashboard, usage, goals, and tips.
- Page transition effect with the WattBuddy logo.
- Accessibility improvements including semantic sections, visible focus states, current-page navigation labels, and ARIA labels for charts/progress indicators.

## Testing Checklist

Use this checklist before demonstration or submission:

- Open each main HTML page listed above directly in a browser.
- Check navigation links between all main pages.
- Check the layout at desktop, tablet, and mobile widths.
- Confirm text does not overlap cards, charts, buttons, or navigation.
- Confirm the current page is highlighted in the navigation where a navbar is present.
- Confirm usage chart labels and goal progress values are readable.
- Confirm the setup form can submit to `dashboard.html`.
- Confirm no PDF or private assignment files are tracked in Git.

## Security Notes

This prototype is static and does not store user data. The setup form uses placeholder input and submits through a normal page link only.

If the website were developed into a real product, it should include:

- HTTPS hosting.
- Server-side validation for all form inputs.
- Secure authentication for real user accounts.
- Careful handling of personal data and household energy information.
- Protection against injection attacks if a backend or database is added.

## Suggested Demo Flow

1. Start at `index.html` and introduce WattBuddy.
2. Open `details.html` to show the optional setup form.
3. Continue to `dashboard.html` for the weekly summary.
4. Open `usage.html` to explain energy patterns and appliance breakdown.
5. Open `goals.html` to show goal progress, rewards, and badges.
6. Open `tips.html` to show practical behaviour changes.
7. Finish with `about.html` to connect the website back to the project problem and solution.

---

# GitHub Team Reminder

## Before You Start Coding

Always pull the latest code from GitHub first.

```bash
git checkout main
git pull origin main
```

# IMPORTANT

## Never pull while having uncommitted code.

Before pulling new code, always save your current work first:

```bash
git add .
git commit -m "Saving current progress"
```

Then pull the latest updates:

```bash
git pull origin main
```

This helps avoid:

- losing your code
- overwriting teammate code
- merge conflicts

---

# Before You Push

Always pull latest changes first:

```bash
git checkout main
git pull origin main
```

After making sure everything works:

```bash
git add .
git commit -m "Your update message"
git push origin your-branch-name
```

---

# Team Rules

## DO:

- Pull before coding AND before push
- Commit frequently
- Push regularly

## DO NOT:

- Pull with uncommitted changes
- Use `git push --force`
- Delete teammate files

---

# Reminder

Uncommitted code is NOT safe.

If you pull new changes without committing your current work first, your code may be lost or conflicted.
