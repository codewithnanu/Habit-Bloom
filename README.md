# Habit Bloom

Habit Bloom is a browser-based habit tracker built with React and Vite. Add habits, mark the days you complete them, and review your activity in a monthly calendar, heatmap, and statistics charts.

## Features

- **Dashboard:** View your habits in a day-by-day grid for a selected month. Use the month arrows to move between months.
- **Daily encouragement:** See a motivational habit-building quote on the dashboard that changes each day.
- **Daily tracking:** Mark a habit complete or incomplete for a date by selecting its cell in the dashboard grid.
- **Progress summaries:** The dashboard shows total habits, completions this month, monthly consistency, and today's progress.
- **Heatmap:** Browse months and see each day colored according to the percentage of habits completed that day:
  - Level 0: 0%
  - Level 1: 1–25%
  - Level 2: 26–50%
  - Level 3: 51–75%
  - Level 4: over 75%
- **Statistics:** View daily progress for the current month and monthly progress across the current year.
- **Habit creation:** Give a habit a name, choose an emoji, and choose a color tag.
- **Responsive layout:** Pages adjust for tablet and mobile widths. The dashboard's 31-day tracking grid can scroll horizontally on smaller screens.
- **Local persistence:** Habits are saved in the browser's local storage, so they remain available after a reload in the same browser.

## Getting started

### Requirements

- Node.js and npm

### Install and run

```bash
npm install
npm run dev
```

Open the local URL printed by Vite in your browser.

### Available scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite development server. |
| `npm run build` | Create a production build in `dist/`. |
| `npm run preview` | Preview the production build locally. |
| `npm run lint` | Run ESLint across the project. |

## Using the app

1. Select **Add Habit** in the header.
2. Enter a habit name, select an emoji and color, then choose **Add Habit**.
3. Return to the dashboard and select a date cell in the habit's row to toggle completion.
4. Use the dashboard's month arrows to view or update dates in another month.
5. Open **Heatmap** to review daily completion levels, or **Stats** to view the charts.

## How progress is calculated

- **Daily progress and heatmap:** Count the habits completed on a date, divide by the total number of habits, then convert the result to a percentage. With no habits, progress is 0%.
- **Monthly statistics:** Count completed habit-days in a month and divide by the number of habits multiplied by the number of days in that month. This accounts for months of different lengths and leap years.
- **Dashboard monthly consistency:** The current dashboard calculation divides the number of habit completions in the selected month by the number of days in that month. Because it does not divide by the total possible habit completions, this value can exceed 100% when tracking multiple habits.

## Data and privacy

Habit data is stored in the browser's `localStorage`; this project does not currently use a server account or cloud database. Data is specific to the browser and device where it was entered. Clearing the browser's site data can remove saved habits.

Each habit currently stores a name, emoji, color, an identifier, and a list of completed date strings. Completion dates are represented as `year-month-day` (for example, `2026-10-27`).

## Current limitations

- Habit descriptions and frequency options are not currently active in the add-habit form.
- The Settings page is a placeholder.
- The remove-habit control is displayed, but its current handler does not correctly remove a habit.
- Statistics charts show the current month and year; unlike the dashboard and heatmap, they do not have month navigation.
- There is no automated test script configured in `package.json`.

## Tech stack

- React
- React Router
- Vite
- Plain CSS
