/**
 * ==========================================================================
 * DSA Learning Game - Core Engine & Interactive Mini-Games
 * Subject: Data Structures & Algorithms
 * Target Audience: Second Year Undergraduate (UG) CS & CSE Students
 * Architecture: Pure Vanilla JavaScript (ES6 Modules/Script, Zero Dependencies)
 * ==========================================================================
 * TEACHER & INSTRUCTOR CUSTOMIZATION GUIDE:
 * - To add or edit levels, modify the `LEVELS_DATA` object below.
 * - Each level contains: title, concept explanation, pseudocode, key notes,
 *   time complexity, viva questions, and step-by-step game state rules.
 * ==========================================================================
 */

// ==========================================================================
// 1. Web Audio Sound Engine (Synthesized chimes & cues - no asset files)
// ==========================================================================
class SoundEngine {
  constructor() {
    this.ctx = null;
    this.enabled = true;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) this.ctx = new AudioCtx();
    }
  }

  playTone(freq, type, duration, delay = 0) {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    setTimeout(() => {
      try {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = type;
        osc.frequency.value = freq;
        gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start();
        osc.stop(this.ctx.currentTime + duration);
      } catch (e) {
        // Audio playback error fallback
      }
    }, delay * 1000);
  }

  playCorrect() {
    this.playTone(523.25, 'sine', 0.15, 0);      // C5
    this.playTone(659.25, 'sine', 0.2, 0.08);    // E5
    this.playTone(783.99, 'triangle', 0.25, 0.16); // G5
  }

  playWrong() {
    this.playTone(220, 'sawtooth', 0.2, 0);     // A3
    this.playTone(196, 'sawtooth', 0.25, 0.1);   // G3
  }

  playClick() {
    this.playTone(600, 'sine', 0.05, 0);
  }

  playFanfare() {
    this.playTone(523.25, 'triangle', 0.15, 0);
    this.playTone(659.25, 'triangle', 0.15, 0.12);
    this.playTone(783.99, 'triangle', 0.15, 0.24);
    this.playTone(1046.50, 'triangle', 0.4, 0.36); // C6
  }
}

const audioFX = new SoundEngine();

// ==========================================================================
// 2. Comprehensive Educational Data for Levels & Viva Preparation
// ==========================================================================
const LEVELS_DATA = {
  1: {
    number: 1,
    title: "Bubble Sort Challenge",
    algorithm: "Bubble Sort",
    tag: "Basic Sorting",
    initialArray: [64, 34, 25, 12, 22, 11, 90],
    explanation: "Bubble Sort repeatedly compares adjacent elements and swaps them if they are in the wrong order. Larger elements gradually 'bubble up' to the end of the array after each pass.",
    pseudocode: `function bubbleSort(arr):
  n = arr.length
  for i = 0 to n - 1:
    for j = 0 to n - i - 2:
      if arr[j] > arr[j + 1]:
        swap(arr[j], arr[j + 1])`,
    notes: [
      "In-place algorithm (requires O(1) auxiliary space).",
      "Stable sorting algorithm (preserves relative order of equal keys).",
      "Can be optimized with a 'swapped' flag for O(n) best-case time on sorted data."
    ],
    complexity: {
      best: "O(n)",
      avg: "O(n²)",
      worst: "O(n²)",
      space: "O(1)"
    },
    viva: [
      {
        q: "How can Bubble Sort achieve O(n) time complexity in the best case?",
        ans: "By using a boolean flag 'swapped' in the outer loop. If no swaps occur in a full pass, the array is already sorted and the algorithm terminates early."
      },
      {
        q: "Why is Bubble Sort considered stable?",
        ans: "Because it only swaps adjacent elements if arr[j] > arr[j+1]. Equal elements are never swapped, maintaining their original relative order."
      },
      {
        q: "What is the maximum number of swaps performed by Bubble Sort for size n?",
        ans: "In the worst case (reversely sorted array), it performs n(n - 1) / 2 swaps."
      }
    ]
  },

  2: {
    number: 2,
    title: "Selection Sort Target Challenge",
    algorithm: "Selection Sort",
    tag: "Target Search",
    initialArray: [29, 10, 14, 37, 13, 2, 45],
    explanation: "Selection Sort divides the array into sorted and unsorted regions. In each outer pass, it searches the unsorted region for the minimum element and swaps it into the first unsorted slot.",
    pseudocode: `function selectionSort(arr):
  n = arr.length
  for i = 0 to n - 2:
    minIdx = i
    for j = i + 1 to n - 1:
      if arr[j] < arr[minIdx]:
        minIdx = j
    swap(arr[i], arr[minIdx])`,
    notes: [
      "Performs at most n - 1 swaps in total (useful when memory writes are expensive).",
      "Standard implementation is unstable due to long-distance swaps.",
      "Always makes O(n²) comparisons regardless of initial array ordering."
    ],
    complexity: {
      best: "O(n²)",
      avg: "O(n²)",
      worst: "O(n²)",
      space: "O(1)"
    },
    viva: [
      {
        q: "Why is Selection Sort generally unstable?",
        ans: "Swapping the minimum element across long distances can jump over an identical element, altering their original relative order."
      },
      {
        q: "When is Selection Sort preferred over other O(n²) algorithms?",
        ans: "When writing to memory is extremely costly (e.g., flash memory wear), as Selection Sort makes at most n - 1 swaps."
      },
      {
        q: "Does initial sorting order affect the number of comparisons in Selection Sort?",
        ans: "No. Selection Sort always scans the remaining unsorted subarray completely, performing n(n-1)/2 comparisons regardless of initial order."
      }
    ]
  },

  3: {
    number: 3,
    title: "Insertion Sort Puzzle",
    algorithm: "Insertion Sort",
    tag: "Card Insertion",
    initialArray: [12, 11, 13, 5, 6, 7],
    explanation: "Insertion Sort builds the final sorted array one item at a time. It takes the current key element and inserts it into its correct position within the sorted subarray on the left, shifting larger elements right.",
    pseudocode: `function insertionSort(arr):
  n = arr.length
  for i = 1 to n - 1:
    key = arr[i]
    j = i - 1
    while j >= 0 and arr[j] > key:
      arr[j + 1] = arr[j]
      j = j - 1
    arr[j + 1] = key`,
    notes: [
      "Efficient for small data sets and nearly sorted arrays.",
      "Stable and in-place.",
      "Online algorithm: can sort data as it is being received in real time."
    ],
    complexity: {
      best: "O(n)",
      avg: "O(n²)",
      worst: "O(n²)",
      space: "O(1)"
    },
    viva: [
      {
        q: "What is an 'online' sorting algorithm?",
        ans: "An online algorithm can process and sort its input piece-by-piece as new data arrives, without needing the entire list available from the start."
      },
      {
        q: "Why is Insertion Sort fast for nearly sorted arrays?",
        ans: "The inner while-loop terminates almost immediately (in O(1) time per pass) when elements are already in order, resulting in O(n) overall comparisons."
      },
      {
        q: "How does Insertion Sort compare to Bubble Sort in practice?",
        ans: "Both have O(n²) worst-case time, but Insertion Sort performs fewer operations and less overhead, making it faster in practice."
      }
    ]
  },

  4: {
    number: 4,
    title: "Merge Sort Divide & Conquer",
    algorithm: "Merge Sort",
    tag: "Divide & Conquer",
    initialArray: [38, 27, 43, 3, 9, 82, 10],
    explanation: "Merge Sort is a Divide-and-Conquer algorithm. It recursively splits the array into halves until subarrays contain single elements, then merges sorted subarrays back together in order.",
    pseudocode: `function mergeSort(arr):
  if length(arr) <= 1: return arr
  mid = length(arr) / 2
  left = mergeSort(arr[0..mid-1])
  right = mergeSort(arr[mid..end])
  return merge(left, right)`,
    notes: [
      "Guaranteed O(n log n) performance in all cases.",
      "Stable sorting algorithm.",
      "Requires O(n) extra space for temporary merge arrays."
    ],
    complexity: {
      best: "O(n log n)",
      avg: "O(n log n)",
      worst: "O(n log n)",
      space: "O(n)"
    },
    viva: [
      {
        q: "Why does Merge Sort require O(n) auxiliary space?",
        ans: "Merging two sorted subarrays in linear time requires copying elements into a temporary array before writing them back to the main array."
      },
      {
        q: "What is the recurrence relation for Merge Sort?",
        ans: "T(n) = 2T(n/2) + O(n). Solving this using the Master Theorem gives T(n) = O(n log n)."
      },
      {
        q: "Why is Merge Sort preferred for Linked Lists over Quick Sort?",
        ans: "Merge Sort accesses data sequentially without needing random array indexing, making it ideal for linked list structures where random access is O(n)."
      }
    ]
  },

  5: {
    number: 5,
    title: "Quick Sort Partition Game",
    algorithm: "Quick Sort",
    tag: "Pivot Partition",
    initialArray: [10, 80, 30, 90, 40, 50, 70],
    explanation: "Quick Sort selects a 'pivot' element and partitions the array into two sub-arrays: elements smaller than the pivot on the left, and elements larger or equal on the right. It then recursively sorts the partitions.",
    pseudocode: `function partition(arr, low, high):
  pivot = arr[high]
  i = low - 1
  for j = low to high - 1:
    if arr[j] < pivot:
      i = i + 1
      swap(arr[i], arr[j])
  swap(arr[i + 1], arr[high])
  return i + 1`,
    notes: [
      "Fastest general-purpose in-place sorting algorithm in practice.",
      "Worst-case O(n²) occurs when pivot selection is poor (e.g. sorted array with last element as pivot).",
      "Space complexity is O(log n) for recursive call stack."
    ],
    complexity: {
      best: "O(n log n)",
      avg: "O(n log n)",
      worst: "O(n²)",
      space: "O(log n)"
    },
    viva: [
      {
        q: "What is a 'pivot' in Quick Sort?",
        ans: "An element chosen from the array to act as a benchmark. All elements smaller than the pivot are placed to its left, and larger elements to its right."
      },
      {
        q: "How can we avoid Quick Sort's worst-case O(n²) time complexity?",
        ans: "By using randomized pivot selection, Median-of-Three pivot choice, or IntroSort to switch to HeapSort if recursion depth exceeds O(log n)."
      },
      {
        q: "What is the main difference between Merge Sort and Quick Sort?",
        ans: "Merge Sort does work during the merge step (Divide is simple O(1), Combine is O(n)) and needs O(n) space. Quick Sort does work during partitioning (Divide is O(n), Combine is trivial) and runs in-place."
      }
    ]
  }
};

// ==========================================================================
// 3. Global Game State Machine
// ==========================================================================
class GameEngine {
  constructor() {
    this.score = 0;
    this.streak = 0;
    this.maxStreak = 0;
    this.timerSeconds = 0;
    this.timerInterval = null;
    this.currentLevel = 1;
    this.soundEnabled = true;
    this.levelScores = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    
    // Level specific internal states
    this.activeArray = [];
    this.levelState = {};
  }

  resetGame() {
    this.score = 0;
    this.streak = 0;
    this.maxStreak = 0;
    this.timerSeconds = 0;
    this.currentLevel = 1;
    this.stopTimer();
    this.updateStatsUI();
  }

  startTimer() {
    this.stopTimer();
    this.timerInterval = setInterval(() => {
      this.timerSeconds++;
      this.updateTimerUI();
    }, 1000);
  }

  stopTimer() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
  }

  updateTimerUI() {
    const mins = String(Math.floor(this.timerSeconds / 60)).padStart(2, '0');
    const secs = String(this.timerSeconds % 60).padStart(2, '0');
    const timerElem = document.getElementById('game-timer');
    if (timerElem) timerElem.textContent = `${mins}:${secs}`;
  }

  addScore(points) {
    if (points > 0) {
      this.streak++;
      if (this.streak > this.maxStreak) this.maxStreak = this.streak;
      const bonus = Math.floor(this.streak / 3) * 5; // Bonus for consecutive streaks
      const totalGain = points + bonus;
      this.score += totalGain;
      this.showScorePopup(`+${totalGain}`, 'plus');
      audioFX.playCorrect();
    } else {
      this.streak = 0;
      this.score = Math.max(0, this.score + points); // Points is negative
      this.showScorePopup(`${points}`, 'minus');
      audioFX.playWrong();
    }

    if (this.score > (this.levelScores[this.currentLevel] || 0)) {
      this.levelScores[this.currentLevel] = this.score;
    }

    this.updateStatsUI();
  }

  showScorePopup(text, type) {
    const container = document.getElementById('score-popup-container');
    if (!container) return;

    const popup = document.createElement('div');
    popup.className = `score-popup ${type}`;
    popup.textContent = text;
    container.appendChild(popup);

    setTimeout(() => {
      if (popup.parentNode) popup.parentNode.removeChild(popup);
    }, 1000);
  }

  updateStatsUI() {
    const scoreElem = document.getElementById('game-score');
    const streakElem = document.getElementById('game-streak');
    if (scoreElem) scoreElem.textContent = this.score;
    if (streakElem) streakElem.textContent = `${this.streak}x`;

    // Update level card high scores on home screen
    for (let l = 1; l <= 5; l++) {
      const cardScore = document.getElementById(`score-lvl-${l}`);
      if (cardScore) cardScore.textContent = `Best: ${this.levelScores[l] || 0}`;
    }
  }

  updateProgress(percent) {
    const fill = document.getElementById('progress-fill');
    const label = document.getElementById('progress-percent');
    const rounded = Math.min(100, Math.max(0, Math.round(percent)));
    if (fill) fill.style.width = `${rounded}%`;
    if (label) label.textContent = `${rounded}%`;
  }
}

const game = new GameEngine();

// ==========================================================================
// 4. UI Manager & Screen Navigation
// ==========================================================================

function showScreen(screenId) {
  audioFX.playClick();
  document.querySelectorAll('.screen').forEach(s => s.classList.add('hidden'));
  const target = document.getElementById(screenId);
  if (target) target.classList.remove('hidden');

  const topStats = document.getElementById('top-stats-bar');
  if (screenId === 'screen-gameplay') {
    if (topStats) topStats.classList.remove('hidden');
    game.startTimer();
  } else {
    if (topStats) topStats.classList.add('hidden');
    game.stopTimer();
  }
}

function loadLevel(levelNum) {
  game.currentLevel = levelNum;
  const data = LEVELS_DATA[levelNum];
  if (!data) return;

  // Setup level banner
  document.getElementById('level-tag').textContent = `LEVEL ${data.number}`;
  document.getElementById('level-title-display').textContent = data.title;
  game.updateProgress(0);

  // Load theory & viva drawer
  populateDrawerData(data);

  // Initialize level mini-game
  game.activeArray = [...data.initialArray];
  initLevelMiniGame(levelNum);

  showScreen('screen-gameplay');
}

function populateDrawerData(data) {
  document.getElementById('theory-explanation').textContent = data.explanation;
  document.getElementById('theory-pseudocode').querySelector('code').textContent = data.pseudocode;

  const notesList = document.getElementById('theory-notes');
  notesList.innerHTML = '';
  data.notes.forEach(note => {
    const li = document.createElement('li');
    li.textContent = note;
    notesList.appendChild(li);
  });

  document.getElementById('comp-best').textContent = data.complexity.best;
  document.getElementById('comp-avg').textContent = data.complexity.avg;
  document.getElementById('comp-worst').textContent = data.complexity.worst;
  document.getElementById('comp-space').textContent = data.complexity.space;

  // Render Viva questions
  const vivaList = document.getElementById('viva-questions-list');
  vivaList.innerHTML = '';
  data.viva.forEach((item, idx) => {
    const card = document.createElement('div');
    card.className = 'viva-card';
    card.innerHTML = `
      <div class="viva-q">Q${idx + 1}: ${item.q}</div>
      <button class="btn-reveal-ans" onclick="toggleVivaAnswer(this)">Show Answer (+5 bonus)</button>
      <div class="viva-ans-box hidden">${item.ans}</div>
    `;
    vivaList.appendChild(card);
  });
}

function toggleVivaAnswer(btn) {
  audioFX.playClick();
  const ansBox = btn.nextElementSibling;
  if (ansBox) {
    const isHidden = ansBox.classList.contains('hidden');
    if (isHidden) {
      ansBox.classList.remove('hidden');
      btn.textContent = 'Hide Answer';
      game.addScore(5);
    } else {
      ansBox.classList.add('hidden');
      btn.textContent = 'Show Answer (+5 bonus)';
    }
  }
}

// ==========================================================================
// 5. Mini-Game Engines (Levels 1 to 5)
// ==========================================================================

function initLevelMiniGame(levelNum) {
  const canvas = document.getElementById('game-canvas');
  const actionBar = document.getElementById('action-bar');
  const prompt = document.getElementById('instruction-prompt');
  canvas.innerHTML = '';
  actionBar.innerHTML = '';

  if (levelNum === 1) {
    initLevel1_BubbleSort();
  } else if (levelNum === 2) {
    initLevel2_SelectionSort();
  } else if (levelNum === 3) {
    initLevel3_InsertionSort();
  } else if (levelNum === 4) {
    initLevel4_MergeSort();
  } else if (levelNum === 5) {
    initLevel5_QuickSort();
  }
}

// --------------------------------------------------------------------------
// LEVEL 1: Bubble Sort Mini-Game
// --------------------------------------------------------------------------
function initLevel1_BubbleSort() {
  const arr = game.activeArray;
  const n = arr.length;
  game.levelState = { i: 0, j: 0, totalSteps: (n * (n - 1)) / 2, completedSteps: 0 };

  renderBubbleStep();
}

function renderBubbleStep() {
  const { i, j, totalSteps, completedSteps } = game.levelState;
  const arr = game.activeArray;
  const n = arr.length;

  if (i >= n - 1) {
    finishLevel();
    return;
  }

  game.updateProgress((completedSteps / totalSteps) * 100);

  const canvas = document.getElementById('game-canvas');
  const actionBar = document.getElementById('action-bar');
  const prompt = document.getElementById('instruction-prompt');
  canvas.innerHTML = '';
  actionBar.innerHTML = '';

  const valA = arr[j];
  const valB = arr[j + 1];
  const needsSwap = valA > valB;

  prompt.innerHTML = `Pass ${i + 1}: Compare <strong>arr[${j}] (${valA})</strong> and <strong>arr[${j + 1}] (${valB})</strong>. Do they need to be swapped?`;

  // Render bars
  const maxVal = Math.max(...arr, 100);
  arr.forEach((val, idx) => {
    const wrapper = document.createElement('div');
    wrapper.className = 'array-bar-wrapper';

    const valLabel = document.createElement('span');
    valLabel.className = 'bar-value';
    valLabel.textContent = val;

    const bar = document.createElement('div');
    bar.className = 'array-bar';
    bar.style.height = `${(val / maxVal) * 100}%`;

    if (idx === j || idx === j + 1) {
      bar.classList.add('state-compare');
    } else if (idx >= n - i) {
      bar.classList.add('state-sorted');
    }

    const idxLabel = document.createElement('span');
    idxLabel.className = 'bar-index';
    idxLabel.textContent = idx;

    wrapper.appendChild(valLabel);
    wrapper.appendChild(bar);
    wrapper.appendChild(idxLabel);
    canvas.appendChild(wrapper);
  });

  // Action buttons
  const btnSwap = document.createElement('button');
  btnSwap.className = 'btn btn-primary';
  btnSwap.innerHTML = `🔄 Swap (${valA} &gt; ${valB})`;
  btnSwap.onclick = () => handleBubbleChoice(true, needsSwap);

  const btnKeep = document.createElement('button');
  btnKeep.className = 'btn btn-secondary';
  btnKeep.innerHTML = `➡️ Keep Order (${valA} &le; ${valB})`;
  btnKeep.onclick = () => handleBubbleChoice(false, needsSwap);

  actionBar.appendChild(btnSwap);
  actionBar.appendChild(btnKeep);
}

function handleBubbleChoice(userChoseSwap, actuallyNeedsSwap) {
  const { i, j } = game.levelState;
  const arr = game.activeArray;
  const n = arr.length;

  if (userChoseSwap === actuallyNeedsSwap) {
    game.addScore(10);
    if (actuallyNeedsSwap) {
      [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
    }
  } else {
    game.addScore(-5);
  }

  game.levelState.completedSteps++;
  game.levelState.j++;

  if (game.levelState.j >= n - i - 1) {
    game.levelState.i++;
    game.levelState.j = 0;
  }

  renderBubbleStep();
}

// --------------------------------------------------------------------------
// LEVEL 2: Selection Sort Mini-Game
// --------------------------------------------------------------------------
function initLevel2_SelectionSort() {
  const arr = game.activeArray;
  game.levelState = { i: 0, stage: 'selectMin', selectedMinIdx: -1, totalPasses: arr.length - 1 };
  renderSelectionStep();
}

function renderSelectionStep() {
  const { i, stage, selectedMinIdx, totalPasses } = game.levelState;
  const arr = game.activeArray;
  const n = arr.length;

  if (i >= n - 1) {
    finishLevel();
    return;
  }

  game.updateProgress((i / totalPasses) * 100);

  const canvas = document.getElementById('game-canvas');
  const actionBar = document.getElementById('action-bar');
  const prompt = document.getElementById('instruction-prompt');
  canvas.innerHTML = '';
  actionBar.innerHTML = '';

  // Calculate actual minimum index in unsorted region
  let actualMinIdx = i;
  for (let k = i + 1; k < n; k++) {
    if (arr[k] < arr[actualMinIdx]) actualMinIdx = k;
  }

  if (stage === 'selectMin') {
    prompt.innerHTML = `Pass ${i + 1}: Scan the unsorted region (indices ${i} to ${n - 1}). <strong>Click on the MINIMUM element!</strong>`;
  } else {
    prompt.innerHTML = `Minimum element is <strong>${arr[selectedMinIdx]}</strong> at index ${selectedMinIdx}. <strong>Click on swap target index ${i}</strong> to place it!`;
  }

  const maxVal = Math.max(...arr, 100);
  arr.forEach((val, idx) => {
    const wrapper = document.createElement('div');
    wrapper.className = 'array-bar-wrapper';

    const valLabel = document.createElement('span');
    valLabel.className = 'bar-value';
    valLabel.textContent = val;

    const bar = document.createElement('div');
    bar.className = 'array-bar';
    bar.style.height = `${(val / maxVal) * 100}%`;

    if (idx < i) {
      bar.classList.add('state-sorted');
    } else if (idx === selectedMinIdx) {
      bar.classList.add('state-target');
    } else if (idx === i && stage === 'selectTarget') {
      bar.classList.add('state-compare');
    }

    const idxLabel = document.createElement('span');
    idxLabel.className = 'bar-index';
    idxLabel.textContent = idx;

    wrapper.appendChild(valLabel);
    wrapper.appendChild(bar);
    wrapper.appendChild(idxLabel);

    // Interactive Bar Click
    wrapper.onclick = () => {
      if (stage === 'selectMin') {
        if (idx >= i) {
          if (idx === actualMinIdx) {
            game.addScore(10);
            game.levelState.selectedMinIdx = idx;
            game.levelState.stage = 'selectTarget';
            renderSelectionStep();
          } else {
            game.addScore(-5);
          }
        }
      } else if (stage === 'selectTarget') {
        if (idx === i) {
          game.addScore(10);
          // Execute swap
          const minIdx = game.levelState.selectedMinIdx;
          [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];

          game.levelState.i++;
          game.levelState.stage = 'selectMin';
          game.levelState.selectedMinIdx = -1;
          renderSelectionStep();
        } else {
          game.addScore(-5);
        }
      }
    };

    canvas.appendChild(wrapper);
  });
}

// --------------------------------------------------------------------------
// LEVEL 3: Insertion Sort Mini-Game
// --------------------------------------------------------------------------
function initLevel3_InsertionSort() {
  const arr = game.activeArray;
  game.levelState = { i: 1, totalPasses: arr.length - 1 };
  renderInsertionStep();
}

function renderInsertionStep() {
  const { i, totalPasses } = game.levelState;
  const arr = game.activeArray;
  const n = arr.length;

  if (i >= n) {
    finishLevel();
    return;
  }

  game.updateProgress(((i - 1) / totalPasses) * 100);

  const canvas = document.getElementById('game-canvas');
  const actionBar = document.getElementById('action-bar');
  const prompt = document.getElementById('instruction-prompt');
  canvas.innerHTML = '';
  actionBar.innerHTML = '';

  const key = arr[i];

  // Determine correct insertion slot index in sorted subarray [0..i-1]
  let correctSlot = 0;
  while (correctSlot < i && arr[correctSlot] <= key) {
    correctSlot++;
  }

  prompt.innerHTML = `Key element = <strong>${key}</strong> at index ${i}. Click the correct slot position in the sorted subarray (indices 0 to ${i}) where ${key} belongs!`;

  const maxVal = Math.max(...arr, 100);
  arr.forEach((val, idx) => {
    const wrapper = document.createElement('div');
    wrapper.className = 'array-bar-wrapper';

    const valLabel = document.createElement('span');
    valLabel.className = 'bar-value';
    valLabel.textContent = val;

    const bar = document.createElement('div');
    bar.className = 'array-bar';
    bar.style.height = `${(val / maxVal) * 100}%`;

    if (idx < i) {
      bar.classList.add('state-sorted');
    } else if (idx === i) {
      bar.classList.add('state-target');
    }

    const idxLabel = document.createElement('span');
    idxLabel.className = 'bar-index';
    idxLabel.textContent = idx;

    wrapper.appendChild(valLabel);
    wrapper.appendChild(bar);
    wrapper.appendChild(idxLabel);
    canvas.appendChild(wrapper);
  });

  // Render Target Insertion Slot Buttons
  const slotContainer = document.createElement('div');
  slotContainer.style.display = 'flex';
  slotContainer.style.gap = '8px';
  slotContainer.style.flexWrap = 'wrap';

  for (let s = 0; s <= i; s++) {
    const btnSlot = document.createElement('button');
    btnSlot.className = 'btn btn-secondary btn-sm';
    btnSlot.innerHTML = `Slot ${s}`;
    btnSlot.onclick = () => {
      if (s === correctSlot) {
        game.addScore(10);
        // Insert key into slot s
        arr.splice(i, 1);
        arr.splice(s, 0, key);

        game.levelState.i++;
        renderInsertionStep();
      } else {
        game.addScore(-5);
      }
    };
    slotContainer.appendChild(btnSlot);
  }

  actionBar.appendChild(slotContainer);
}

// --------------------------------------------------------------------------
// LEVEL 4: Merge Sort Mini-Game (Divide & Conquer)
// --------------------------------------------------------------------------
function initLevel4_MergeSort() {
  const arr = game.activeArray;
  game.levelState = {
    phase: 'divide', // 'divide' or 'merge'
    subArrays: [[...arr]],
    mergePairs: [
      { left: [27, 38], right: [3, 43], result: [], targetLen: 4 },
      { left: [9, 82], right: [10], result: [], targetLen: 3 }
    ],
    currentPairIdx: 0
  };

  renderMergeStep();
}

function renderMergeStep() {
  const { phase, subArrays, mergePairs, currentPairIdx } = game.levelState;
  const canvas = document.getElementById('game-canvas');
  const actionBar = document.getElementById('action-bar');
  const prompt = document.getElementById('instruction-prompt');
  canvas.innerHTML = '';
  actionBar.innerHTML = '';

  if (phase === 'divide') {
    prompt.innerHTML = `<strong>DIVIDE PHASE:</strong> Click on any subarray with length &gt; 1 to divide it into left and right halves!`;
    game.updateProgress(25);

    const container = document.createElement('div');
    container.className = 'merge-tree-container';

    const row = document.createElement('div');
    row.className = 'sub-arrays-row';

    subArrays.forEach((sub, idx) => {
      const box = document.createElement('div');
      box.className = `sub-array-box ${sub.length > 1 ? 'clickable' : ''}`;
      
      sub.forEach(val => {
        const item = document.createElement('span');
        item.className = 'array-item-btn';
        item.textContent = val;
        box.appendChild(item);
      });

      if (sub.length > 1) {
        box.onclick = () => {
          game.addScore(10);
          const mid = Math.floor(sub.length / 2);
          const leftHalf = sub.slice(0, mid);
          const rightHalf = sub.slice(mid);

          subArrays.splice(idx, 1, leftHalf, rightHalf);

          // Check if all divided down to size 1
          const allBase = subArrays.every(s => s.length === 1);
          if (allBase) {
            game.levelState.phase = 'merge';
          }
          renderMergeStep();
        };
      }

      row.appendChild(box);
    });

    container.appendChild(row);
    canvas.appendChild(container);

  } else if (phase === 'merge') {
    if (currentPairIdx >= mergePairs.length) {
      game.activeArray.sort((a, b) => a - b);
      finishLevel();
      return;
    }

    game.updateProgress(50 + (currentPairIdx / mergePairs.length) * 50);
    const pair = mergePairs[currentPairIdx];
    prompt.innerHTML = `<strong>MERGE PHASE:</strong> Compare candidates <strong>${pair.left[0] ?? 'N/A'}</strong> and <strong>${pair.right[0] ?? 'N/A'}</strong>. Click the smaller element to merge it into sorted order!`;

    const container = document.createElement('div');
    container.className = 'merge-tree-container';

    // Pair Candidates Box
    const pairRow = document.createElement('div');
    pairRow.className = 'sub-arrays-row';

    const leftBox = document.createElement('div');
    leftBox.className = 'sub-array-box';
    pair.left.forEach((val, idx) => {
      const btn = document.createElement('button');
      btn.className = `array-item-btn ${idx === 0 ? 'selected' : ''}`;
      btn.textContent = val;
      if (idx === 0) {
        btn.onclick = () => handleMergePick('left', pair);
      }
      leftBox.appendChild(btn);
    });

    const rightBox = document.createElement('div');
    rightBox.className = 'sub-array-box';
    pair.right.forEach((val, idx) => {
      const btn = document.createElement('button');
      btn.className = `array-item-btn ${idx === 0 ? 'selected' : ''}`;
      btn.textContent = val;
      if (idx === 0) {
        btn.onclick = () => handleMergePick('right', pair);
      }
      rightBox.appendChild(btn);
    });

    pairRow.appendChild(leftBox);
    pairRow.appendChild(rightBox);

    // Target Merged Result Row
    const targetRow = document.createElement('div');
    targetRow.className = 'merge-target-row';

    for (let s = 0; s < pair.targetLen; s++) {
      const slot = document.createElement('div');
      slot.className = `merge-slot ${pair.result[s] !== undefined ? 'filled' : ''}`;
      slot.textContent = pair.result[s] !== undefined ? pair.result[s] : '?';
      targetRow.appendChild(slot);
    }

    container.appendChild(pairRow);
    container.appendChild(targetRow);
    canvas.appendChild(container);
  }
}

function handleMergePick(side, pair) {
  const leftVal = pair.left[0];
  const rightVal = pair.right[0];

  let isCorrect = false;
  if (leftVal !== undefined && rightVal !== undefined) {
    if (side === 'left' && leftVal <= rightVal) isCorrect = true;
    if (side === 'right' && rightVal <= leftVal) isCorrect = true;
  } else if (leftVal !== undefined && side === 'left') {
    isCorrect = true;
  } else if (rightVal !== undefined && side === 'right') {
    isCorrect = true;
  }

  if (isCorrect) {
    game.addScore(10);
    const chosenVal = side === 'left' ? pair.left.shift() : pair.right.shift();
    pair.result.push(chosenVal);

    if (pair.result.length >= pair.targetLen) {
      game.levelState.currentPairIdx++;
    }
  } else {
    game.addScore(-5);
  }

  renderMergeStep();
}

// --------------------------------------------------------------------------
// LEVEL 5: Quick Sort Mini-Game (Pivot Partition)
// --------------------------------------------------------------------------
function initLevel5_QuickSort() {
  const arr = game.activeArray;
  const pivot = arr[arr.length - 1]; // 70
  const remaining = arr.slice(0, arr.length - 1);

  game.levelState = {
    pivot: pivot,
    remaining: remaining,
    currentCandidate: remaining[0],
    leftBucket: [],
    rightBucket: [],
    totalCount: remaining.length
  };

  renderQuickStep();
}

function renderQuickStep() {
  const { pivot, remaining, currentCandidate, leftBucket, rightBucket, totalCount } = game.levelState;
  const canvas = document.getElementById('game-canvas');
  const actionBar = document.getElementById('action-bar');
  const prompt = document.getElementById('instruction-prompt');
  canvas.innerHTML = '';
  actionBar.innerHTML = '';

  const processed = leftBucket.length + rightBucket.length;
  game.updateProgress((processed / totalCount) * 100);

  if (processed >= totalCount) {
    // Partition complete
    prompt.innerHTML = `🎉 <strong>PARTITION COMPLETE!</strong> Pivot <strong>${pivot}</strong> is placed between Left Bucket and Right Bucket!`;

    const sortedResult = [...leftBucket.sort((a,b)=>a-b), pivot, ...rightBucket.sort((a,b)=>a-b)];
    game.activeArray = sortedResult;

    setTimeout(() => {
      finishLevel();
    }, 1200);
    return;
  }

  const candidate = remaining[0];
  prompt.innerHTML = `Is Candidate Element <strong>${candidate}</strong> smaller than Pivot <strong>(${pivot})</strong>? Place it in Left or Right Bucket!`;

  const container = document.createElement('div');
  container.className = 'partition-area';

  // Pivot Display Box
  const pivotBox = document.createElement('div');
  pivotBox.className = 'pivot-display-box';
  pivotBox.innerHTML = `<span>PIVOT:</span> <span class="pivot-val-badge">${pivot}</span>`;

  // Candidate Box
  const candBox = document.createElement('div');
  candBox.className = 'candidate-element-box';
  candBox.innerHTML = `
    <span style="font-size: 0.8rem; color: var(--text-muted);">Current Element:</span>
    <span class="candidate-val">${candidate}</span>
  `;

  // Buckets Row
  const bucketContainer = document.createElement('div');
  bucketContainer.className = 'bucket-container';

  const leftB = document.createElement('div');
  leftB.className = 'bucket-box left-bucket';
  leftB.innerHTML = `<div class="bucket-header">Left Bucket (&lt; ${pivot})</div>`;
  const leftItems = document.createElement('div');
  leftItems.className = 'bucket-items';
  leftBucket.forEach(val => {
    const chip = document.createElement('span');
    chip.className = 'bucket-chip';
    chip.textContent = val;
    leftItems.appendChild(chip);
  });
  leftB.appendChild(leftItems);

  const rightB = document.createElement('div');
  rightB.className = 'bucket-box right-bucket';
  rightB.innerHTML = `<div class="bucket-header">Right Bucket (&ge; ${pivot})</div>`;
  const rightItems = document.createElement('div');
  rightItems.className = 'bucket-items';
  rightBucket.forEach(val => {
    const chip = document.createElement('span');
    chip.className = 'bucket-chip';
    chip.textContent = val;
    rightItems.appendChild(chip);
  });
  rightB.appendChild(rightItems);

  bucketContainer.appendChild(leftB);
  bucketContainer.appendChild(rightB);

  container.appendChild(pivotBox);
  container.appendChild(candBox);
  container.appendChild(bucketContainer);
  canvas.appendChild(container);

  // Action Buttons
  const btnLeft = document.createElement('button');
  btnLeft.className = 'btn btn-secondary';
  btnLeft.innerHTML = `⬅️ Left Bucket (&lt; ${pivot})`;
  btnLeft.onclick = () => handlePartitionChoice('left');

  const btnRight = document.createElement('button');
  btnRight.className = 'btn btn-secondary';
  btnRight.innerHTML = `➡️ Right Bucket (&ge; ${pivot})`;
  btnRight.onclick = () => handlePartitionChoice('right');

  actionBar.appendChild(btnLeft);
  actionBar.appendChild(btnRight);
}

function handlePartitionChoice(userChoice) {
  const { pivot, remaining, leftBucket, rightBucket } = game.levelState;
  const candidate = remaining[0];
  const correctChoice = candidate < pivot ? 'left' : 'right';

  if (userChoice === correctChoice) {
    game.addScore(10);
    const elem = remaining.shift();
    if (userChoice === 'left') leftBucket.push(elem);
    else rightBucket.push(elem);
  } else {
    game.addScore(-5);
  }

  renderQuickStep();
}

// --------------------------------------------------------------------------
// Level Completion Handler
// --------------------------------------------------------------------------
function finishLevel() {
  audioFX.playFanfare();
  game.updateProgress(100);

  if (game.currentLevel < 5) {
    setTimeout(() => {
      alert(`🎉 Level ${game.currentLevel} Completed! Moving to Level ${game.currentLevel + 1}...`);
      loadLevel(game.currentLevel + 1);
    }, 600);
  } else {
    // Game completed! Show Final Screen
    setTimeout(() => {
      showFinalScreen();
    }, 600);
  }
}

function showFinalScreen() {
  showScreen('screen-final');

  document.getElementById('final-score').textContent = game.score;
  document.getElementById('final-time').textContent = document.getElementById('game-timer').textContent;
  document.getElementById('final-streak').textContent = `${game.maxStreak}x`;

  // Calculate Rank
  let rank = 'C Rank';
  let rankClass = 'rank-c';
  if (game.score >= 250) { rank = 'S Rank - Algorithm Master'; rankClass = 'rank-s'; }
  else if (game.score >= 180) { rank = 'A Rank'; rankClass = 'rank-s'; }
  else if (game.score >= 120) { rank = 'B Rank'; rankClass = 'rank-s'; }

  const rankElem = document.getElementById('final-rank');
  if (rankElem) {
    rankElem.textContent = rank;
    rankElem.className = `stat-card-val ${rankClass}`;
  }
}

// ==========================================================================
// 6. Global Event Listeners & Bootstrapping
// ==========================================================================

function attachGlobalListeners() {
  // Start Game button
  const btnStart = document.getElementById('btn-start-game');
  if (btnStart) btnStart.onclick = () => loadLevel(1);

  // Level Play buttons on Level Cards
  document.querySelectorAll('.level-card').forEach(card => {
    const lvlNum = parseInt(card.getAttribute('data-level'), 10);
    const playBtn = card.querySelector('.btn-level-play');
    if (playBtn) {
      playBtn.onclick = (e) => {
        e.stopPropagation();
        loadLevel(lvlNum);
      };
    }
  });

  // Navigation Home buttons
  const btnHomeNav = document.getElementById('btn-home-nav');
  if (btnHomeNav) btnHomeNav.onclick = () => showScreen('screen-home');

  const btnReplayLevelSelect = document.getElementById('btn-replay-level-select');
  if (btnReplayLevelSelect) btnReplayLevelSelect.onclick = () => showScreen('screen-home');

  const btnRestartGame = document.getElementById('btn-restart-game');
  if (btnRestartGame) {
    btnRestartGame.onclick = () => {
      game.resetGame();
      loadLevel(1);
    };
  }

  // Restart Level button
  const btnRestartLevel = document.getElementById('btn-restart-level');
  if (btnRestartLevel) {
    btnRestartLevel.onclick = () => loadLevel(game.currentLevel);
  }

  // Hint Button
  const btnHint = document.getElementById('btn-hint');
  if (btnHint) {
    btnHint.onclick = () => {
      audioFX.playClick();
      game.addScore(-2); // Small penalty for hint
      alert(`💡 ALGORITHM HINT:\n${LEVELS_DATA[game.currentLevel].explanation}`);
    };
  }

  // Side Drawer Toggle Buttons
  const drawer = document.getElementById('side-drawer');
  const grid = document.querySelector('.game-arena-grid');
  const drawerTitle = document.getElementById('drawer-title');
  const theoryBody = document.getElementById('drawer-theory-content');
  const vivaBody = document.getElementById('drawer-viva-content');

  const btnToggleLearn = document.getElementById('btn-toggle-learn');
  if (btnToggleLearn) {
    btnToggleLearn.onclick = () => {
      audioFX.playClick();
      drawer.classList.remove('hidden');
      grid.classList.add('drawer-open');
      drawerTitle.textContent = '📖 Theory & Pseudocode';
      theoryBody.classList.remove('hidden');
      vivaBody.classList.add('hidden');
    };
  }

  const btnToggleViva = document.getElementById('btn-toggle-viva');
  if (btnToggleViva) {
    btnToggleViva.onclick = () => {
      audioFX.playClick();
      drawer.classList.remove('hidden');
      grid.classList.add('drawer-open');
      drawerTitle.textContent = '🎓 Viva Voce Questions';
      theoryBody.classList.add('hidden');
      vivaBody.classList.remove('hidden');
    };
  }

  const btnCloseDrawer = document.getElementById('btn-close-drawer');
  if (btnCloseDrawer) {
    btnCloseDrawer.onclick = () => {
      audioFX.playClick();
      drawer.classList.add('hidden');
      grid.classList.remove('drawer-open');
    };
  }

  // Sound Toggle Button
  const btnSound = document.getElementById('btn-sound-toggle');
  if (btnSound) {
    btnSound.onclick = () => {
      audioFX.enabled = !audioFX.enabled;
      btnSound.textContent = audioFX.enabled ? '🔊' : '🔇';
    };
  }

  // Instructions Modal
  const modalInst = document.getElementById('modal-instructions');
  const btnShowInst = document.getElementById('btn-show-instructions');
  const btnCloseInst = document.getElementById('btn-close-instructions');
  const btnGotIt = document.getElementById('btn-got-it');

  if (btnShowInst) btnShowInst.onclick = () => modalInst.classList.remove('hidden');
  if (btnCloseInst) btnCloseInst.onclick = () => modalInst.classList.add('hidden');
  if (btnGotIt) btnGotIt.onclick = () => modalInst.classList.add('hidden');
}

// App Initialization when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  attachGlobalListeners();
  game.updateStatsUI();
  showScreen('screen-home');
});
