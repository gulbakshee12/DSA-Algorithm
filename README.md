# 🎮 DSA Learning Game

An interactive, gamified Data Structures and Algorithms (DSA) web application tailored for **Undergraduate (UG) 2nd Year Computer Science & Engineering students**.

Built purely with standard **HTML5, CSS3, and ES6 JavaScript** with **zero external backend or database dependencies**. It runs offline directly in any browser by opening `index.html`.

---

## 🚀 Game Features

### 1. Interactive Algorithm Mini-Games
- **Level 1: Basic Sorting (Bubble Sort)** — Compare adjacent elements and choose whether to swap or maintain order.
- **Level 2: Selection Sort Challenge** — Scan unsorted sub-arrays, spot the minimum element, and swap it into position.
- **Level 3: Insertion Sort Puzzle** — Pick key elements and insert them into their exact sorted slot like ordering playing cards.
- **Level 4: Merge Sort Visual Game** — Recursively divide arrays into halves down to base cases, then click candidate elements to merge them into sorted order.
- **Level 5: Quick Sort Partition Game** — Select pivots and classify elements into Left Bucket (`< Pivot`) and Right Bucket (`≥ Pivot`).

### 2. Gamified Mechanics & Scoring
- **Score System**: +10 points for correct algorithmic decisions, -5 points for incorrect choices.
- **Combo Multipliers**: Build consecutive streaks for extra bonus multipliers (`🔥 2x`, `3x`).
- **Progress Trackers**: Real-time progress bar showing percentage of level completed.
- **Live Timer**: Track time taken to solve each level.
- **Synthesized Audio Cues**: Built-in Web Audio API sound effects for clicks, correct moves, errors, and level fanfare.

### 3. Theory & Viva Voce Preparation
- **Comprehensive Theory Drawer**: Detailed explanation, formatted pseudocode, key notes, and best/average/worst time & space complexities ($O(n^2)$, $O(n \log n)$, $O(1)$, $O(n)$).
- **Interactive Viva Cards**: Real university practical exam viva voce questions with click-to-reveal answers and bonus points!

---

## 📂 File Structure

The project strictly consists of 4 lightweight, self-contained files:

```
├── index.html     # Application structure, screen layouts, modal, and drawer components
├── style.css      # Custom slate arcade styling, animations, responsive grid layouts
├── script.js       # Game engine state machine, audio synthesizer, and interactive mini-games
└── README.md      # Game documentation, developer guide, and deployment instructions
```

---

## 🛠️ How to Edit or Customise Levels (For Teachers & Developers)

All level configuration and mini-game data are centralized in `script.js` inside the `LEVELS_DATA` object.

To modify an existing level or add new questions:
1. Open `script.js` in any text editor.
2. Locate `LEVELS_DATA`:
   ```javascript
   const LEVELS_DATA = {
     1: {
       number: 1,
       title: "Bubble Sort Challenge",
       initialArray: [64, 34, 25, 12, 22, 11, 90],
       explanation: "...",
       pseudocode: "...",
       notes: ["..."],
       complexity: { best: "O(n)", avg: "O(n²)", worst: "O(n²)", space: "O(1)" },
       viva: [
         { q: "Question text...", ans: "Answer text..." }
       ]
     },
     // ...
   };
   ```
3. You can change `initialArray` to test different array configurations or edit the `viva` array to add custom university viva questions!

---

## 🌐 Deploying on GitHub Pages

Since this project requires no server, build step, or node server, deploying to GitHub Pages takes less than a minute:

1. **Create a GitHub Repository**: Create a new repository on GitHub (e.g., `dsa-learning-game`).
2. **Push Code**: Commit and push `index.html`, `style.css`, `script.js`, and `README.md` to your `main` branch.
3. **Enable GitHub Pages**:
   - Go to your repository **Settings** tab.
   - Click **Pages** in the left sidebar.
   - Under **Source**, select `Deploy from a branch`.
   - Select branch: `main` / `/ (root)` and click **Save**.
4. **Access Link**: Your game will be live at `https://<your-username>.github.io/dsa-learning-game/` in a few moments!

---

## 🔒 Privacy & Data Collection Declaration

**No Personal Data Collection**: This application operates 100% client-side in the browser. It does not collect, track, transmit, store, or share any personal data, user analytics, IP addresses, or cookies. All scores and game state persist purely in browser memory during the active session.
