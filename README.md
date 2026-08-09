# DSA Algorithm Visualizer

An interactive, client-side web application designed for second-year undergraduate computer science students to visualize fundamental sorting algorithms step-by-step.

---

## 🌟 Features

- **Interactive Sorting Visualization**: Real-time animated bar visualization for **Bubble Sort**, **Selection Sort**, and **Insertion Sort**.
- **Execution Controls**: Play, Pause, Step-by-Step Forward execution, and Reset functions.
- **Speed & Array Customization**: Adjustable speed slider (50ms - 1000ms), array size slider (5 - 25 elements), and random array generation.
- **Custom Input Array**: Option to enter comma-separated custom numbers for classroom practice problems.
- **Real-Time Step Metrics**: Continuous tracking of Comparisons, Swaps/Shifts, Total Steps, and Execution Status.
- **Synchronized Code Highlighting**: Line-by-line active code highlighting in **Pseudocode**, **C++**, or **JavaScript**.
- **Live Explanations & Log**: Clear natural language explanations for every comparison, swap, and pass.
- **Student Pitfalls & Edge Cases**: Educational section highlighting common mistakes made by students for each algorithm.
- **Zero Dependencies**: Pure standard HTML5, CSS3, and Vanilla JavaScript. Runs directly in any web browser without Node.js or build steps.

---

## 📁 Files Explanation

The project consists of exactly four static files:

1. `index.html` - HTML5 semantic structure containing all 11 application sections, including control panels, visual canvas, code viewer, and outcome cards.
2. `style.css` - Custom CSS stylesheet providing clean academic design, responsive layouts, dark canvas contrast for bars, color-coded animation states, and code highlighting styles.
3. `script.js` - Pure Vanilla JavaScript engine handling step pre-computation, playback animation timers, custom input validation, state management, and DOM updates.
4. `README.md` - Documentation guide for students, teachers, and deployment.

---

## 🚀 How to Deploy on GitHub Pages

Because this application uses standard static HTML, CSS, and JS with relative file paths, deploying to GitHub Pages takes less than 2 minutes:

1. **Create a GitHub Repository**:
   - Go to [GitHub](https://github.com/) and create a new repository (e.g., `dsa-algorithm-visualizer`).
2. **Push Project Files**:
   - Upload or push `index.html`, `style.css`, `script.js`, and `README.md` to the `main` branch.
3. **Enable GitHub Pages**:
   - In your GitHub repository, go to **Settings** > **Pages**.
   - Under **Build and deployment**, select **Source** as `Deploy from a branch`.
   - Select the `main` branch and `/ (root)` folder.
   - Click **Save**.
4. **Access Application**:
   - After a few moments, your application will be live at:
     `https://<your-username>.github.io/<repository-name>/`

---

## ➕ How to Add New Algorithms

To extend the visualizer with new sorting algorithms (e.g., Quick Sort or Merge Sort):

1. **Add Algorithm Metadata in `script.js`**:
   Open `script.js` and add a new key inside the `ALGORITHM_DATA` object:
   ```javascript
   ALGORITHM_DATA.quicksort = {
     name: "Quick Sort",
     bestTime: "O(n log n)",
     worstTime: "O(n²)",
     space: "O(log n)",
     stable: "Unstable",
     description: "Picks an element as pivot and partitions the array around the pivot.",
     mistakes: [ /* Array of { title, desc } */ ],
     code: {
       pseudocode: [ /* Array of string lines */ ],
       cpp: [ /* Array of string lines */ ],
       js: [ /* Array of string lines */ ]
     }
   };
   ```

2. **Add Selection Option in `index.html`**:
   Add an `<option>` element to the `#algo-select` dropdown in `index.html`:
   ```html
   <option value="quicksort">Quick Sort</option>
   ```

3. **Implement Step Generator in `precomputeSteps()` inside `script.js`**:
   Add a block in `precomputeSteps()` to generate step snapshots (`addStep(highlightsMap, explanationText, codeLineNumber)`):
   ```javascript
   else if (algo === 'quicksort') {
     // Implement partition and recursive step tracking
   }
   ```

---

## 🍎 Editing Instructions for Teachers

Teachers and lab instructors can customize this tool for class exercises:

- **Modifying Default Values**:
  - To change default array size, edit `value="12"` on `#size-range` in `index.html`.
  - To adjust initial animation speed, edit `value="500"` on `#speed-range` in `index.html`.
- **Adding Custom Class Examples**:
  - Pre-fill specific numbers for homework problems by setting the `value` attribute on `<input id="custom-array-input">`.
- **Customizing Code Representations**:
  - Edit the `code` array in `ALGORITHM_DATA` in `script.js` to match the exact pseudocode syntax used in your textbook or syllabus.
- **Offline Classroom Usage**:
  - Download or clone the folder and double-click `index.html` to run offline on any computer without internet access.

---

## 🔒 Privacy & Data Policy

- **No Data Collection**: No cookies, tracking scripts, or analytics.
- **No Backend**: Runs 100% locally inside the client's browser.
- **No Third-Party APIs**: Works completely offline.
