// تنظیمات بازی
const BOARD_SIZE = 30;
const SNAKES = { 17: 7, 25: 14, 29: 20 };
const LADDERS = { 3: 11, 6: 16, 9: 19 };
const QUESTION_CELLS = [5, 10, 15, 21, 27];

const QUESTIONS = [
  { emoji: "🔢", theme: "theme-1", title: "بعد از ۲۷ چه عددی می‌آید؟", options: ["۲۶", "۲۸", "۳۰"], correct: 1 },
  { emoji: "⬆️", theme: "theme-2", title: "با شمارش یکی‌یکی، بعد از ۵۸ چه عددی می‌آید؟", options: ["۵۷", "۵۹", "۶۰"], correct: 1 },
  { emoji: "🎈", theme: "theme-3", title: "کدام عدد بین ۴۳ و ۴۵ قرار دارد؟", options: ["۴۲", "۴۴", "۴۶"], correct: 1 },
  { emoji: "🌞", theme: "theme-5", title: "بعد از ۳۹ چه عددی می‌آید؟", options: ["۳۸", "۴۰", "۴۱"], correct: 1 },
  { emoji: "⬇️", theme: "theme-4", title: "با شمارش رو به عقب، قبل از ۳۰ چه عددی می‌آید؟", options: ["۲۹", "۳۱", "۲۰"], correct: 0 },
  { emoji: "🔙", theme: "theme-5", title: "قبل از ۵۰ چه عددی است؟", options: ["۵۱", "۴۹", "۶۰"], correct: 1 },
  { emoji: "🎯", theme: "theme-1", title: "از ۶۳ یکی‌یکی به عقب. عدد بعدی؟", options: ["۶۲", "۶۴", "۶۰"], correct: 0 },
  { emoji: "🐢", theme: "theme-2", title: "قبل از ۸۱ چه عددی است؟", options: ["۸۰", "۸۲", "۷۱"], correct: 0 },
  { emoji: "🌙", theme: "theme-3", title: "با شمارش رو به عقب از ۴۵، عدد بعدی؟", options: ["۴۶", "۴۴", "۳۵"], correct: 1 },
  { emoji: "🏆", theme: "theme-4", title: "از ۹۹ یکی‌یکی به عقب: ۹۹، ۹۸، ۹۷، ...", options: ["۱۰۰", "۹۶", "۹۵"], correct: 1 },
  { emoji: "🔟", theme: "theme-4", title: "با شمارش ده‌تاده‌تا، بعد از ۳۰ چه عددی می‌آید؟", options: ["۳۱", "۴۰", "۲۰"], correct: 1 },
  { emoji: "🚀", theme: "theme-5", title: "ده‌تاده‌تا: ۱۰، ۲۰، ۳۰، ... عدد بعدی؟", options: ["۳۱", "۴۰", "۵۰"], correct: 1 },
  { emoji: "🎪", theme: "theme-1", title: "ده‌تاده‌تا: ۵۰، ۶۰، ۷۰، ... چه عددی؟", options: ["۷۱", "۸۰", "۹۰"], correct: 1 },
  { emoji: "🔽", theme: "theme-2", title: "ده‌تاده‌تا به عقب: ۷۰، ۶۰، ۵۰، ... عدد بعدی؟", options: ["۴۰", "۴۵", "۳۰"], correct: 0 },
  { emoji: "🪂", theme: "theme-3", title: "ده‌تاده‌تا به عقب، قبل از ۴۰ چه عددی؟", options: ["۳۰", "۳۹", "۵۰"], correct: 0 },
  { emoji: "🔍", theme: "theme-4", title: "کدام شمارش اشتباه است؟", options: ["۲۵، ۲۶، ۲۷", "۳۸، ۳۹، ۴۰", "۵۰، ۵۱، ۵۳"], correct: 2 },
  { emoji: "🧐", theme: "theme-5", title: "در شمارش رو به عقب کدام اشتباه است؟", options: ["۵۰، ۴۹، ۴۸", "۳۰، ۲۹، ۲۸", "۴۰، ۳۹، ۳۷"], correct: 2 },
  { emoji: "🧩", theme: "theme-1", title: "الگو را کامل کن: ۱۵، ۱۶، ۱۷، ...، ۱۹", options: ["۱۸", "۲۰", "۲۵"], correct: 0 },
  { emoji: "🎨", theme: "theme-2", title: "الگو را کامل کن: ۹۰، ۸۰، ۷۰، ...، ۵۰", options: ["۷۵", "۶۰", "۸۵"], correct: 1 },
  { emoji: "🌟", theme: "theme-3", title: "الگو را کامل کن: ۹۸، ۹۷، ...، ۹۵، ۹۴", options: ["۹۹", "۹۶", "۹۳"], correct: 1 },
  { emoji: "📏", theme: "theme-4", title: "کدام عدد بزرگ‌تر است؟", options: ["۴۵", "۵۴", "۴۹"], correct: 1 },
  { emoji: "🎲", theme: "theme-5", title: "کدام عدد کوچک‌تر است؟", options: ["۷۸", "۸۷", "۷۰"], correct: 2 },
  { emoji: "🔤", theme: "theme-1", title: "از کوچک به بزرگ: ۶۷، ۶۶، ۶۸", options: ["۶۶، ۶۷، ۶۸", "۶۸، ۶۷، ۶۶", "۶۷، ۶۶، ۶۸"], correct: 0 },
  { emoji: "👥", theme: "theme-2", title: "عدد قبل و بعد ۵۵ کدام است؟", options: ["۵۴ و ۵۶", "۵۵ و ۵۶", "۵۶ و ۵۷"], correct: 0 },
  { emoji: "🎪", theme: "theme-3", title: "عدد قبل و بعد ۷۰ کدام است؟", options: ["۶۹ و ۷۱", "۷۰ و ۷۱", "۶۹ و ۷۰"], correct: 0 },
  { emoji: "🎯", theme: "theme-4", title: "از ۲۰ سه‌تا سه‌تا به عقب: ۲۰، ۱۷، ۱۴، ...", options: ["۱۳", "۱۲", "۱۱"], correct: 2 },
  { emoji: "🔥", theme: "theme-5", title: "از ۱۰۰ یکی‌یکی به عقب: ۱۰۰، ۹۹، ۹۸، ...", options: ["۱۰۱", "۹۷", "۹۰"], correct: 1 },
  { emoji: "💎", theme: "theme-1", title: "قبل از ۶۰ چه عددی است؟", options: ["۵۹", "۶۱", "۷۰"], correct: 0 },
  { emoji: "🎁", theme: "theme-2", title: "بعد از ۸۹ چه عددی می‌آید؟", options: ["۸۸", "۹۰", "۱۰۰"], correct: 1 }
];

let state = { playerName: "", coins: 0, position: 0, currentQuestion: null, isWaiting: false, usedQuestions: [] };
let audioCtx = null;

function getAudio() { if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)(); return audioCtx; }
function playTone(freqs, duration, type = 'sine', vol = 0.2) {
  try {
    const ctx = getAudio();
    freqs.forEach((f, i) => {
      const osc = ctx.createOscillator(); const gain = ctx.createGain();
      osc.type = type; osc.frequency.value = f;
      gain.gain.setValueAtTime(vol, ctx.currentTime + i * duration);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * duration + duration);
      osc.connect(gain); gain.connect(ctx.destination);
      osc.start(ctx.currentTime + i * duration); osc.stop(ctx.currentTime + i * duration + duration);
    });
  } catch(e) {}
}
function soundCorrect() { playTone([523, 659, 784, 1047], 0.12, 'sine', 0.25); }
function soundWrong()   { playTone([300, 200, 150], 0.18, 'sawtooth', 0.15); }
function soundDice()    { playTone([400, 500, 600, 700], 0.05, 'square', 0.08); }
function soundMove()    { playTone([700, 800], 0.08, 'triangle', 0.15); }
function soundWin()     { playTone([523, 659, 784, 1047, 1319], 0.15, 'sine', 0.25); }

function startGame() {
  const name = document.getElementById('studentName').value.trim();
  if (!name) { alert('لطفاً نام و نام خانوادگی خود را وارد کنید!'); return; }
  state = { playerName: name, coins: 0, position: 0, currentQuestion: null, isWaiting: false, usedQuestions: [] };
  document.getElementById('playerName').textContent = name;
  document.getElementById('coinCount').textContent = '0';
  document.getElementById('msgBox').textContent = 'برای شروع، تاس رو پرتاب کن! 🎲';
  document.getElementById('rollBtn').disabled = false;
  document.getElementById('dice').textContent = '🎲';
  buildBoard();
  switchScreen('gameScreen');
}

function switchScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

function buildBoard() {
  const board = document.getElementById('board'); board.innerHTML = '';
  const cells = [];
  for (let row = 0; row < 5; row++) {
    const rowCells = [];
    for (let col = 0; col < 6; col++) rowCells.push(row * 6 + col + 1);
    if (row % 2 === 0) cells.push(...rowCells.reverse()); else cells.push(...rowCells);
  }
  const display = cells.reverse();
  display.forEach(num => {
    const cell = document.createElement('div');
    cell.className = 'cell'; cell.id = 'cell-' + num; cell.dataset.num = num;
    let emoji = '';
    if (num === BOARD_SIZE) { cell.classList.add('end'); emoji = '🏁'; }
    else if (SNAKES[num]) { cell.classList.add('snake'); emoji = '🐍'; }
    else if (LADDERS[num]) { cell.classList.add('ladder'); emoji = '🪜'; }
    else if (QUESTION_CELLS.includes(num)) { cell.classList.add('question'); emoji = '❓'; }
    cell.innerHTML = `<span class="num">${num}</span><span class="emoji">${emoji}</span>`;
    board.appendChild(cell);
  });
  renderPiece();
}

function renderPiece() {
  document.querySelectorAll('.piece').forEach(p => p.remove());
  const cell = document.getElementById('cell-' + state.position);
  if (cell) {
    const piece = document.createElement('div');
    piece.className = 'piece'; piece.textContent = '👦';
    cell.appendChild(piece); cell.classList.add('highlight');
  }
}

function clearHighlights() { document.querySelectorAll('.cell').forEach(c => c.classList.remove('highlight')); }

function rollDice() {
  if (state.isWaiting) return;
  const diceEl = document.getElementById('dice'); const btn = document.getElementById('rollBtn');
  btn.disabled = true; diceEl.classList.add('rolling'); soundDice();
  let count = 0;
  const interval = setInterval(() => {
    diceEl.textContent = Math.floor(Math.random() * 6) + 1;
    count++;
    if (count > 10) {
      clearInterval(interval);
      const result = Math.floor(Math.random() * 6) + 1;
      diceEl.textContent = result; diceEl.classList.remove('rolling');
      handleRoll(result);
    }
  }, 80);
}

function handleRoll(value) {
  const remaining = BOARD_SIZE - state.position;
  const msgBox = document.getElementById('msgBox');
  if (value > remaining) {
    msgBox.textContent = `🎲 عدد ${value} آمد. برای رسیدن به پایان باید عدد ${remaining} بیاید! دوباره تلاش کن.`;
    document.getElementById('rollBtn').disabled = false; return;
  }
  const newPos = state.position + value;
  movePieceAnimated(state.position, newPos, () => {
    state.position = newPos; renderPiece();
    if (state.position === BOARD_SIZE) { finishGame(); return; }
    processCell();
  });
}

function movePieceAnimated(from, to, cb) {
  let current = from; const steps = to - from;
  if (steps === 0) { cb(); return; }
  const dir = steps > 0 ? 1 : -1; let count = 0;
  const timer = setInterval(() => {
    current += dir; state.position = current; clearHighlights(); renderPiece(); soundMove(); count++;
    if (count >= Math.abs(steps)) { clearInterval(timer); setTimeout(cb, 200); }
  }, 150);
}

function processCell() {
  const pos = state.position; const msgBox = document.getElementById('msgBox');
  if (SNAKES[pos]) {
    msgBox.textContent = `🐍 آخ! مار گزیدت! برمی‌گردی به خانه ${SNAKES[pos]}`;
    playTone([400, 300, 200], 0.15, 'sawtooth', 0.15);
    setTimeout(() => { movePieceAnimated(pos, SNAKES[pos], () => { state.position = SNAKES[pos]; renderPiece(); setTimeout(checkQuestionOrContinue, 400); }); }, 600);
    return;
  }
  if (LADDERS[pos]) {
    msgBox.textContent = `🪜 عالیه! پله رفت بالا! می‌ری به خانه ${LADDERS[pos]}`;
    playTone([523, 659, 784], 0.1, 'sine', 0.2);
    setTimeout(() => { movePieceAnimated(pos, LADDERS[pos], () => { state.position = LADDERS[pos]; renderPiece(); setTimeout(checkQuestionOrContinue, 400); }); }, 600);
    return;
  }
  checkQuestionOrContinue();
}

function checkQuestionOrContinue() {
  if (QUESTION_CELLS.includes(state.position)) { askQuestion(); }
  else {
    document.getElementById('rollBtn').disabled = false;
    document.getElementById('msgBox').textContent = `مهره در خانه ${state.position} است. دوباره تاس بینداز! 🎲`;
  }
}

function askQuestion() {
  state.isWaiting = true;
  const available = QUESTIONS.filter((_, i) => !state.usedQuestions.includes(i));
  const pool = available.length > 0 ? available : QUESTIONS;
  const q = pool[Math.floor(Math.random() * pool.length)];
  const idx = QUESTIONS.indexOf(q);
  if (!state.usedQuestions.includes(idx)) state.usedQuestions.push(idx);
  state.currentQuestion = q;
  const card = document.getElementById('questionCard');
  card.className = 'question-card ' + q.theme;
  document.getElementById('qEmoji').textContent = q.emoji;
  document.getElementById('qTitle').textContent = q.title;
  const optsBox = document.getElementById('qOptions'); optsBox.innerHTML = '';
  q.options.forEach((opt, i) => {
    const btn = document.createElement('button'); btn.className = 'q-option'; btn.textContent = opt;
    btn.onclick = () => checkAnswer(i, btn); optsBox.appendChild(btn);
  });
  document.getElementById('questionModal').classList.add('active');
}

function checkAnswer(index, btn) {
  const q = state.currentQuestion;
  if (index === q.correct) {
    btn.classList.add('correct'); soundCorrect(); state.coins += 10;
    document.getElementById('coinCount').textContent = state.coins;
    burstCoins();
    setTimeout(() => {
      document.getElementById('questionModal').classList.remove('active'); state.isWaiting = false;
      if (state.position === BOARD_SIZE) finishGame();
      else { document.getElementById('rollBtn').disabled = false; document.getElementById('msgBox').textContent = '✅ آفرین! ۱۰ سکه گرفتی. دوباره تاس بینداز! 🎲'; }
    }, 1000);
  } else {
    btn.classList.add('wrong'); soundWrong();
    setTimeout(() => btn.classList.remove('wrong'), 500);
  }
}

function burstCoins() {
  for (let i = 0; i < 5; i++) {
    const coin = document.createElement('div'); coin.className = 'coin-burst'; coin.textContent = '🪙';
    coin.style.left = (window.innerWidth / 2) + 'px'; coin.style.top = (window.innerHeight / 2) + 'px';
    coin.style.setProperty('--x', (Math.random() * 200 - 100) + 'px');
    document.body.appendChild(coin); setTimeout(() => coin.remove(), 1000);
  }
}

function finishGame() {
  soundWin();
  state.coins += 50;
  document.getElementById('msgBox').textContent = `🎉 تبریک! تو برنده شدی! جایزه پایان بازی: ۵۰ سکه.`;
  saveScore();
  setTimeout(() => {
    alert(`🎉 تبریک ${state.playerName}!\nتو برنده بازی شدی!\nامتیاز نهایی تو: ${state.coins} سکه`);
    backToStart();
  }, 1000);
}

function showHelp() { document.getElementById('helpModal').classList.add('active'); }
function closeHelp() { document.getElementById('helpModal').classList.remove('active'); }

function saveScore() {
  const scores = JSON.parse(localStorage.getItem('scores') || '[]');
  scores.push({ name: state.playerName, coins: state.coins, date: new Date().toLocaleDateString('fa-IR') });
  localStorage.setItem('scores', JSON.stringify(scores));
}

function showReport() {
  switchScreen('reportScreen');
  const body = document.getElementById('reportBody'); body.innerHTML = '';
  const scores = JSON.parse(localStorage.getItem('scores') || '[]');
  if (scores.length === 0) {
    body.innerHTML = '<tr><td colspan="4" class="empty-report">هنوز دانش‌آموزی بازی نکرده است.</td></tr>'; return;
  }
  scores.forEach((s, i) => {
    const row = `<tr><td>${i + 1}</td><td>${s.name}</td><td>${s.coins} 🪙</td><td>${s.date}</td></tr>`;
    body.innerHTML += row;
  });
}

function clearReport() {
  if (confirm('آیا از پاک کردن تمام گزارش‌ها مطمئن هستید؟')) {
    localStorage.removeItem('scores'); showReport();
  }
}

function backToStart() {
  switchScreen('startScreen');
  document.getElementById('studentName').value = '';
  document.getElementById('reportBody').innerHTML = '';
  }
