/**
 * ==========================================================================
 * DSA Algorithm Visualizer - JavaScript Engine
 * Subject: Data Structures and Algorithms
 * Topic: Sorting Algorithms (Bubble, Selection, Insertion)
 * Level: Second Year UG Computer Science
 * Author: Academic Learning Tool
 * ==========================================================================
 */

// Global State Management
let array = [];
let steps = [];             // Pre-calculated animation steps
let currentStepIndex = 0;   // Current step in playback
let isPlaying = false;      // Play/Pause flag
let timerId = null;         // Animation timeout handler
let comparisonsCount = 0;   // Real-time counter
let swapsCount = 0;         // Real-time counter
let animationSpeed = 500;   // Delay in milliseconds

// Metadata for Algorithms (Descriptions, Complexities, Common Pitfalls, Code)
const ALGORITHM_DATA = {
  bubble: {
    name: "Bubble Sort",
    bestTime: "O(n)",
    worstTime: "O(n²)",
    space: "O(1)",
    stable: "Stable",
    description: "Repeatedly steps through the array, compares adjacent elements, and swaps them if they are in the wrong order. Passes continue until no swaps are needed.",
    mistakes: [
      {
        title: "Missing 'n - i - 1' Inner Loop Limit",
        desc: "Redundantly comparing elements in the already sorted right portion of the array, causing unnecessary comparisons."
      },
      {
        title: "Omitting 'swapped' Flag Optimization",
        desc: "Failing to stop early when an entire pass makes zero swaps (which indicates the array is already sorted in O(n) time)."
      },
      {
        title: "Off-by-One Array Indexing",
        desc: "Comparing `arr[j]` with `arr[j+1]` where `j+1` goes out of bounds (`j < n` instead of `j < n - 1`)."
      }
    ],
    code: {
      pseudocode: [
        "function bubbleSort(arr):",
        "  n = length(arr)",
        "  for i from 0 to n - 1:",
        "    swapped = false",
        "    for j from 0 to n - i - 2:",
        "      if arr[j] > arr[j + 1]:",
        "        swap(arr[j], arr[j + 1])",
        "        swapped = true",
        "    if not swapped: break"
      ],
      cpp: [
        "void bubbleSort(vector<int>& arr) {",
        "  int n = arr.size();",
        "  for (int i = 0; i < n - 1; i++) {",
        "    bool swapped = false;",
        "    for (int j = 0; j < n - i - 1; j++) {",
        "      if (arr[j] > arr[j + 1]) {",
        "        swap(arr[j], arr[j + 1]);",
        "        swapped = true;",
        "      }",
        "    }",
        "    if (!swapped) break;",
        "  }",
        "}"
      ],
      js: [
        "function bubbleSort(arr) {",
        "  const n = arr.length;",
        "  for (let i = 0; i < n - 1; i++) {",
        "    let swapped = false;",
        "    for (let j = 0; j < n - i - 1; j++) {",
        "      if (arr[j] > arr[j + 1]) {",
        "        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];",
        "        swapped = true;",
        "      }",
        "    }",
        "    if (!swapped) break;",
        "  }",
        "}"
      ]
    }
  },

  selection: {
    name: "Selection Sort",
    bestTime: "O(n²)",
    worstTime: "O(n²)",
    space: "O(1)",
    stable: "Unstable",
    description: "Divides the array into sorted and unsorted regions. Repeatedly selects the minimum element from the unsorted region and swaps it with the first unsorted element.",
    mistakes: [
      {
        title: "Assuming Selection Sort is Stable",
        desc: "Standard Selection Sort swaps long distances, disrupting relative order of duplicate elements. (Requires shifting instead of swapping to make stable)."
      },
      {
        title: "Unnecessary Self-Swapping",
        desc: "Executing a swap operation even when `minIndex == i`, causing redundant write operations."
      },
      {
        title: "Mistaking Selection Sort for Bubble Sort",
        desc: "Swapping elements immediately during inner loop comparison rather than keeping track of `minIndex` until loop finishes."
      }
    ],
    code: {
      pseudocode: [
        "function selectionSort(arr):",
        "  n = length(arr)",
        "  for i from 0 to n - 2:",
        "    minIndex = i",
        "    for j from i + 1 to n - 1:",
        "      if arr[j] < arr[minIndex]:",
        "        minIndex = j",
        "    if minIndex != i:",
        "      swap(arr[i], arr[minIndex])"
      ],
      cpp: [
        "void selectionSort(vector<int>& arr) {",
        "  int n = arr.size();",
        "  for (int i = 0; i < n - 1; i++) {",
        "    int minIdx = i;",
        "    for (int j = i + 1; j < n; j++) {",
        "      if (arr[j] < arr[minIdx]) {",
        "        minIdx = j;",
        "      }",
        "    }",
        "    if (minIdx != i)",
        "      swap(arr[i], arr[minIdx]);",
        "  }",
        "}"
      ],
      js: [
        "function selectionSort(arr) {",
        "  const n = arr.length;",
        "  for (let i = 0; i < n - 1; i++) {",
        "    let minIdx = i;",
        "    for (let j = i + 1; j < n; j++) {",
        "      if (arr[j] < arr[minIdx]) {",
        "        minIdx = j;",
        "      }",
        "    }",
        "    if (minIdx !== i) {",
        "      [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];",
        "    }",
        "  }",
        "}"
      ]
    }
  },

  insertion: {
    name: "Insertion Sort",
    bestTime: "O(n)",
    worstTime: "O(n²)",
    space: "O(1)",
    stable: "Stable",
    description: "Builds the sorted array one element at a time by picking the current key and inserting it into its correct position among previously sorted elements.",
    mistakes: [
      {
        title: "Incorrect Boundary Check in Inner Loop",
        desc: "Forgetting `j >= 0` check when shifting elements left, leading to out-of-bounds array access errors."
      },
      {
        title: "Overwriting Key Element Before Shifting",
        desc: "Failing to store `key = arr[i]` before starting the shifting loop, causing value corruption."
      },
      {
        title: "Placing Key at Wrong Index `j` Instead of `j + 1`",
        desc: "Placing key at index `j` after loop termination rather than `j + 1` (since `j` decremented one step further)."
      }
    ],
    code: {
      pseudocode: [
        "function insertionSort(arr):",
        "  n = length(arr)",
        "  for i from 1 to n - 1:",
        "    key = arr[i]",
        "    j = i - 1",
        "    while j >= 0 and arr[j] > key:",
        "      arr[j + 1] = arr[j]",
        "      j = j - 1",
        "    arr[j + 1] = key"
      ],
      cpp: [
        "void insertionSort(vector<int>& arr) {",
        "  int n = arr.size();",
        "  for (int i = 1; i < n; i++) {",
        "    int key = arr[i];",
        "    int j = i - 1;",
        "    while (j >= 0 && arr[j] > key) {",
        "      arr[j + 1] = arr[j];",
        "      j--;",
        "    }",
        "    arr[j + 1] = key;",
        "  }",
        "}"
      ],
      js: [
        "function insertionSort(arr) {",
        "  const n = arr.length;",
        "  for (let i = 1; i < n; i++) {",
        "    const key = arr[i];",
        "    let j = i - 1;",
        "    while (j >= 0 && arr[j] > key) {",
        "      arr[j + 1] = arr[j];",
        "      j--;",
        "    }",
        "    arr[j + 1] = key;",
        "  }",
        "}"
      ]
    }
  }
};

// DOM Element Selectors
const algoSelect = document.getElementById('algo-select');
const speedRange = document.getElementById('speed-range');
const speedLabel = document.getElementById('speed-label');
const sizeRange = document.getElementById('size-range');
const sizeLabel = document.getElementById('size-label');
const customInput = document.getElementById('custom-array-input');
const customError = document.getElementById('custom-input-error');
const languageSelect = document.getElementById('language-select');

const btnStart = document.getElementById('btn-start');
const btnPause = document.getElementById('btn-pause');
const btnStep = document.getElementById('btn-step');
const btnReset = document.getElementById('btn-reset');
const btnGenerate = document.getElementById('btn-generate');
const btnApplyCustom = document.getElementById('btn-apply-custom');

const barsContainer = document.getElementById('bars-container');
const statComparisons = document.getElementById('stat-comparisons');
const statSwaps = document.getElementById('stat-swaps');
const statSteps = document.getElementById('stat-steps');
const statStatus = document.getElementById('stat-status');

const currentStepText = document.getElementById('current-step-text');
const stepLogList = document.getElementById('step-log-list');

const codeBlock = document.getElementById('code-block');
const mistakesContent = document.getElementById('mistakes-content');

const completionBanner = document.getElementById('completion-banner');
const completionDetails = document.getElementById('completion-details');
const btnCloseBanner = document.getElementById('btn-close-banner');

// ==========================================================================
// Initialization Functions
// ==========================================================================

function initApp() {
  attachEventListeners();
  updateAlgorithmInfo();
  generateRandomArray();
}

// Generate random array with given size
function generateRandomArray() {
  stopAnimation();
  const size = parseInt(sizeRange.value, 10);
  array = [];
  for (let i = 0; i < size; i++) {
    // Generate values between 10 and 95 for nice proportional height
    array.push(Math.floor(Math.random() * 85) + 10);
  }
  resetVisualization();
}

// Render array bars into DOM
function renderBars(currentArray, highlights = {}) {
  barsContainer.innerHTML = '';
  const maxVal = Math.max(...currentArray, 100);

  currentArray.forEach((value, index) => {
    const wrapper = document.createElement('div');
    wrapper.className = 'array-bar-wrapper';

    const valLabel = document.createElement('span');
    valLabel.className = 'bar-value';
    valLabel.textContent = value;

    const bar = document.createElement('div');
    bar.className = 'array-bar';
    // Set height percentage based on max value
    const heightPercent = Math.max((value / maxVal) * 100, 8);
    bar.style.height = `${heightPercent}%`;

    // Apply color state class
    if (highlights[index]) {
      bar.classList.add(`state-${highlights[index]}`);
    } else {
      bar.classList.add('state-default');
    }

    const idxLabel = document.createElement('span');
    idxLabel.className = 'bar-index';
    idxLabel.textContent = index;

    wrapper.appendChild(valLabel);
    wrapper.appendChild(bar);
    wrapper.appendChild(idxLabel);
    barsContainer.appendChild(wrapper);
  });
}

// Reset visualization state without recreating new values
function resetVisualization() {
  stopAnimation();
  currentStepIndex = 0;
  comparisonsCount = 0;
  swapsCount = 0;

  // Precompute steps for current array and algorithm
  steps = precomputeSteps([...array], algoSelect.value);

  updateStats(0, 0, 0, 'Ready', 'status-ready');
  currentStepText.innerHTML = `Array reset. Click <strong>Start</strong> or <strong>Step</strong> to begin ${ALGORITHM_DATA[algoSelect.value].name}.`;
  
  stepLogList.innerHTML = `<li class="log-item info">Initialized array with ${array.length} elements. Ready.</li>`;
  completionBanner.classList.add('hidden');

  renderBars(array);
  highlightCodeLine(-1); // Clear code highlights
}

// ==========================================================================
// Algorithm Pre-computation Engine (Generates visual snapshot states)
// ==========================================================================

function precomputeSteps(initialArr, algo) {
  const stepsList = [];
  let arr = [...initialArr];
  let comps = 0;
  let swaps = 0;

  // Helper to record a state step
  function addStep(highlightsMap, explanation, activeLine, logType = 'info') {
    stepsList.push({
      array: [...arr],
      highlights: { ...highlightsMap },
      comparisons: comps,
      swaps: swaps,
      explanation: explanation,
      activeLine: activeLine,
      logType: logType
    });
  }

  // Initial step
  addStep({}, "Starting array state.", 1, 'info');

  if (algo === 'bubble') {
    const n = arr.length;
    let swapped;
    for (let i = 0; i < n - 1; i++) {
      swapped = false;
      addStep({}, `Pass ${i + 1}: Starting outer loop pass.`, 3, 'info');

      for (let j = 0; j < n - i - 1; j++) {
        comps++;
        // Highlight elements being compared
        const compHighlights = { [j]: 'compare', [j + 1]: 'compare' };
        // Mark previously sorted elements
        for (let k = n - i; k < n; k++) compHighlights[k] = 'sorted';

        addStep(compHighlights, `Comparing arr[${j}] (${arr[j]}) and arr[${j + 1}] (${arr[j + 1]}).`, 6, 'compare');

        if (arr[j] > arr[j + 1]) {
          // Swap
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          swaps++;
          swapped = true;

          const swapHighlights = { [j]: 'swap', [j + 1]: 'swap' };
          for (let k = n - i; k < n; k++) swapHighlights[k] = 'sorted';

          addStep(swapHighlights, `Swapped arr[${j}] (${arr[j + 1]} ➔ ${arr[j]}) and arr[${j + 1}].`, 7, 'swap');
        }
      }

      // Mark the rightmost element as sorted
      const passEndHighlights = {};
      for (let k = n - i - 1; k < n; k++) passEndHighlights[k] = 'sorted';
      addStep(passEndHighlights, `Element at index ${n - i - 1} (${arr[n - i - 1]}) is now in its sorted position.`, 3, 'info');

      if (!swapped) {
        addStep(passEndHighlights, "No swaps made in this pass. Array is already sorted!", 9, 'info');
        break;
      }
    }
  } else if (algo === 'selection') {
    const n = arr.length;
    for (let i = 0; i < n - 1; i++) {
      let minIdx = i;

      const passHighlights = { [i]: 'target' };
      for (let k = 0; k < i; k++) passHighlights[k] = 'sorted';
      addStep(passHighlights, `Pass ${i + 1}: Assuming index ${i} (value: ${arr[i]}) is current minimum.`, 4, 'info');

      for (let j = i + 1; j < n; j++) {
        comps++;
        const compareHighlights = { [j]: 'compare', [minIdx]: 'target' };
        for (let k = 0; k < i; k++) compareHighlights[k] = 'sorted';

        addStep(compareHighlights, `Comparing arr[${j}] (${arr[j]}) with current min arr[${minIdx}] (${arr[minIdx]}).`, 6, 'compare');

        if (arr[j] < arr[minIdx]) {
          minIdx = j;
          const newMinHighlights = { [minIdx]: 'target' };
          for (let k = 0; k < i; k++) newMinHighlights[k] = 'sorted';
          addStep(newMinHighlights, `Found new minimum at index ${minIdx} (value: ${arr[minIdx]}).`, 7, 'info');
        }
      }

      if (minIdx !== i) {
        [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
        swaps++;

        const swapHighlights = { [i]: 'swap', [minIdx]: 'swap' };
        for (let k = 0; k < i; k++) swapHighlights[k] = 'sorted';
        addStep(swapHighlights, `Swapped minimum element at index ${minIdx} with index ${i}.`, 9, 'swap');
      } else {
        const noSwapHighlights = { [i]: 'sorted' };
        for (let k = 0; k < i; k++) noSwapHighlights[k] = 'sorted';
        addStep(noSwapHighlights, `Element at index ${i} is already the minimum. No swap needed.`, 8, 'info');
      }
    }
  } else if (algo === 'insertion') {
    const n = arr.length;
    // Index 0 is initially sorted
    addStep({ 0: 'sorted' }, "Index 0 is considered sorted initially.", 1, 'info');

    for (let i = 1; i < n; i++) {
      const key = arr[i];
      let j = i - 1;

      const keyHighlights = { [i]: 'target' };
      for (let k = 0; k < i; k++) keyHighlights[k] = 'sorted';
      addStep(keyHighlights, `Selected key = ${key} at index ${i}. Finding insertion position in sorted sub-array.`, 4, 'info');

      while (j >= 0 && arr[j] > key) {
        comps++;
        const compareHighlights = { [j]: 'compare', [j + 1]: 'swap' };
        for (let k = 0; k <= i; k++) {
          if (k !== j && k !== j + 1) compareHighlights[k] = 'sorted';
        }
        addStep(compareHighlights, `arr[${j}] (${arr[j]}) > key (${key}). Shifted arr[${j}] right to index ${j + 1}.`, 7, 'swap');

        arr[j + 1] = arr[j];
        swaps++; // Count shifting as swap operation
        j--;
      }

      if (j >= 0) comps++; // Count the final failing comparison in while loop

      arr[j + 1] = key;
      const insertHighlights = { [j + 1]: 'sorted' };
      for (let k = 0; k <= i; k++) insertHighlights[k] = 'sorted';
      addStep(insertHighlights, `Inserted key (${key}) into index ${j + 1}.`, 9, 'info');
    }
  }

  // Final completely sorted state
  const allSortedMap = {};
  for (let k = 0; k < arr.length; k++) allSortedMap[k] = 'sorted';
  addStep(allSortedMap, "🎉 Sorting completed successfully!", 0, 'sorted');

  return stepsList;
}

// ==========================================================================
// Animation Execution Controller
// ==========================================================================

function playNextStep() {
  if (currentStepIndex >= steps.length) {
    finishAnimation();
    return;
  }

  const step = steps[currentStepIndex];
  renderBars(step.array, step.highlights);
  updateStats(step.comparisons, step.swaps, currentStepIndex, 'Sorting...', 'status-running');

  currentStepText.innerHTML = step.explanation;
  appendLogItem(step.explanation, step.logType);
  highlightCodeLine(step.activeLine);

  currentStepIndex++;

  if (isPlaying && currentStepIndex < steps.length) {
    timerId = setTimeout(playNextStep, animationSpeed);
  } else if (currentStepIndex >= steps.length) {
    finishAnimation();
  }
}

function startAnimation() {
  if (currentStepIndex >= steps.length) {
    resetVisualization();
  }
  isPlaying = true;
  btnStart.disabled = true;
  btnPause.disabled = false;
  btnStep.disabled = true;
  btnGenerate.disabled = true;
  btnApplyCustom.disabled = true;
  algoSelect.disabled = true;
  sizeRange.disabled = true;

  playNextStep();
}

function pauseAnimation() {
  isPlaying = false;
  stopAnimation();
  btnStart.disabled = false;
  btnPause.disabled = true;
  btnStep.disabled = false;
  btnGenerate.disabled = false;
  btnApplyCustom.disabled = false;
  algoSelect.disabled = false;
  sizeRange.disabled = false;

  statStatus.textContent = "Paused";
  statStatus.className = "stat-value status-paused";
}

function stepForward() {
  if (isPlaying) pauseAnimation();

  if (currentStepIndex < steps.length) {
    playNextStep();
  }
}

function stopAnimation() {
  if (timerId) {
    clearTimeout(timerId);
    timerId = null;
  }
  isPlaying = false;
}

function finishAnimation() {
  stopAnimation();
  btnStart.disabled = false;
  btnPause.disabled = true;
  btnStep.disabled = true;
  btnGenerate.disabled = false;
  btnApplyCustom.disabled = false;
  algoSelect.disabled = false;
  sizeRange.disabled = false;

  const lastStep = steps[steps.length - 1];
  updateStats(lastStep.comparisons, lastStep.swaps, steps.length - 1, 'Completed', 'status-finished');

  // Trigger Completion Banner
  completionDetails.textContent = `The array of size ${array.length} was sorted in ${steps.length - 1} steps, performing ${lastStep.comparisons} comparisons and ${lastStep.swaps} swaps/shifts.`;
  completionBanner.classList.remove('hidden');
}

// ==========================================================================
// UI Helpers & Renderers
// ==========================================================================

function updateStats(comparisons, swaps, stepIndex, statusText, statusClass) {
  statComparisons.textContent = comparisons;
  statSwaps.textContent = swaps;
  statSteps.textContent = stepIndex;
  statStatus.textContent = statusText;
  statStatus.className = `stat-value ${statusClass}`;
}

function appendLogItem(message, type) {
  const item = document.createElement('li');
  item.className = `log-item ${type}`;
  item.textContent = message;
  stepLogList.prepend(item); // Add newest at top
}

function updateAlgorithmInfo() {
  const algoKey = algoSelect.value;
  const data = ALGORITHM_DATA[algoKey];

  document.getElementById('badge-time').textContent = `Best: ${data.bestTime} | Worst: ${data.worstTime}`;
  document.getElementById('badge-space').textContent = `Space: ${data.space}`;
  document.getElementById('badge-stable').textContent = data.stable;
  document.getElementById('algo-desc').textContent = data.description;

  renderCodeBlock();
  renderCommonMistakes();
}

function renderCodeBlock() {
  const algoKey = algoSelect.value;
  const lang = languageSelect.value;
  const codeLines = ALGORITHM_DATA[algoKey].code[lang] || [];

  codeBlock.innerHTML = '';
  codeLines.forEach((line, index) => {
    const lineSpan = document.createElement('span');
    lineSpan.className = 'code-line';
    lineSpan.dataset.line = index + 1;
    lineSpan.textContent = line;
    codeBlock.appendChild(lineSpan);
  });
}

function highlightCodeLine(lineNumber) {
  const lines = codeBlock.querySelectorAll('.code-line');
  lines.forEach(line => line.classList.remove('active-line'));

  if (lineNumber > 0) {
    const targetLine = codeBlock.querySelector(`.code-line[data-line="${lineNumber}"]`);
    if (targetLine) {
      targetLine.classList.add('active-line');
    }
  }
}

function renderCommonMistakes() {
  const algoKey = algoSelect.value;
  const mistakes = ALGORITHM_DATA[algoKey].mistakes;

  mistakesContent.innerHTML = '';
  mistakes.forEach(item => {
    const card = document.createElement('div');
    card.className = 'mistake-card';
    card.innerHTML = `
      <h4>⚠️ ${item.title}</h4>
      <p>${item.desc}</p>
    `;
    mistakesContent.appendChild(card);
  });
}

// Custom Input Validation & Handling
function handleCustomInput() {
  const rawInput = customInput.value.trim();
  customError.textContent = '';

  if (!rawInput) {
    customError.textContent = "Please enter comma-separated numbers.";
    return;
  }

  // Parse comma separated values
  const parts = rawInput.split(',').map(s => s.trim());
  const parsedNumbers = [];

  for (let part of parts) {
    const num = Number(part);
    if (isNaN(num) || part === '') {
      customError.textContent = `Invalid entry "${part}". Please enter valid integers.`;
      return;
    }
    if (num < 1 || num > 100) {
      customError.textContent = "Numbers must be between 1 and 100 for optimal visualization.";
      return;
    }
    parsedNumbers.push(num);
  }

  if (parsedNumbers.length < 3 || parsedNumbers.length > 25) {
    customError.textContent = "Please enter between 3 and 25 numbers.";
    return;
  }

  array = parsedNumbers;
  sizeRange.value = array.length;
  sizeLabel.textContent = `${array.length} elements`;
  resetVisualization();
}

// ==========================================================================
// Event Listeners Registration
// ==========================================================================

function attachEventListeners() {
  algoSelect.addEventListener('change', () => {
    updateAlgorithmInfo();
    resetVisualization();
  });

  languageSelect.addEventListener('change', renderCodeBlock);

  speedRange.addEventListener('input', (e) => {
    animationSpeed = 1050 - parseInt(e.target.value, 10); // Inverse for intuitive Fast <-> Slow
    speedLabel.textContent = `${e.target.value} ms`;
  });

  sizeRange.addEventListener('input', (e) => {
    sizeLabel.textContent = `${e.target.value} elements`;
    generateRandomArray();
  });

  btnStart.addEventListener('click', startAnimation);
  btnPause.addEventListener('click', pauseAnimation);
  btnStep.addEventListener('click', stepForward);
  btnReset.addEventListener('click', resetVisualization);
  btnGenerate.addEventListener('click', generateRandomArray);
  btnApplyCustom.addEventListener('click', handleCustomInput);

  customInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleCustomInput();
  });

  btnCloseBanner.addEventListener('click', () => {
    completionBanner.classList.add('hidden');
  });
}

// Start application when DOM content is ready
document.addEventListener('DOMContentLoaded', initApp);
