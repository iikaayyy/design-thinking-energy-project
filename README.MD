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
