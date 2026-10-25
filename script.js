// Aventuras Matemáticas - Lógica del juego
// 15 preguntas por categoría, 30 en "Todos". Límite: 4 errores.

const $ = (id) => document.getElementById(id);

const CATEGORY_NAMES = {
  all: "Todos", place: "Bloques", addsub: "Sumas/Restas", mult: "Multiplicar",
  division: "División", clock: "Reloj", problems: "Problemas", patterns: "Patrones"
};

const COLORS = [
  "bg-red-500 hover:bg-red-600 border-red-700",
  "bg-blue-500 hover:bg-blue-600 border-blue-700",
  "bg-emerald-500 hover:bg-emerald-600 border-emerald-700",
  "bg-amber-500 hover:bg-amber-600 border-amber-700",
  "bg-purple-500 hover:bg-purple-600 border-purple-700"
];

const CAT_ACTIVE_CLASS = "cat-btn bg-purple-600 text-white font-bold py-2 px-2 rounded-2xl text-xs shadow border-b-4 border-purple-800 transition-all flex items-center justify-center gap-1";
const CAT_INACTIVE_CLASS = "cat-btn bg-white hover:bg-purple-50 text-slate-700 font-bold py-2 px-2 rounded-2xl text-xs shadow border-b-4 border-slate-300 transition-all flex items-center justify-center gap-1";

let playerName = "";
let currentCategory = "all";
let questions = [];
let questionIndex = 0;
let errors = 0;
let categoryScore = 0;
let totalScore = 0;
let answerLocked = false;
let currentQuestion = null;

const fixedQuestions = [
  {category:"place",topic:"Valor posicional",question:"¿Qué número forman 3 centenas, 4 decenas y 2 unidades?",type:"blocks",hundreds:3,tens:4,units:2,correct:342},
  {category:"place",topic:"Centenas",question:"¿Cuántas centenas tiene el número 758?",type:"calc",correct:7},
  {category:"addsub",topic:"Adición",question:"¿Cuánto es 350 + 240?",type:"calc",correct:590},
  {category:"addsub",topic:"Sustracción",question:"¿Cuánto es 800 - 260?",type:"calc",correct:540},
  {category:"mult",topic:"Tabla del 5",question:"¿Cuánto es 5 × 6?",type:"calc",correct:30},
  {category:"mult",topic:"Multiplicación",question:"¿Cuánto es 7 × 8?",type:"calc",correct:56},
  {category:"patterns",topic:"Patrón creciente",question:"¿Qué número falta? 150, 200, 250, ___, 350",type:"calc",correct:300},
  {category:"division",topic:"Reparto equitativo",question:"Reparte 12 galletas entre 3 niños por igual. ¿Cuántas recibe cada uno?",type:"division",total:12,groups:3,correct:4},
  {category:"division",topic:"División básica",question:"¿Cuánto es 15 / 5?",type:"calc",correct:3},
  {category:"clock",topic:"Hora exacta",question:"¿Qué hora indica el reloj?",type:"clock",hours:3,minutes:0,correct:"03:00",isStringVal:true},
  {category:"clock",topic:"Media hora",question:"¿Qué hora indica el reloj?",type:"clock",hours:7,minutes:30,correct:"07:30",isStringVal:true},
  {category:"clock",topic:"Cuarto de hora",question:"¿Qué hora indica el reloj?",type:"clock",hours:10,minutes:15,correct:"10:15",isStringVal:true},
  {category:"problems",topic:"Almacén de barrio",question:"Sofía compró un jugo por $450 y una galleta por $320. ¿Cuánto gastó?",type:"problem",correct:770},
  {category:"problems",topic:"Colección de láminas",question:"Lucas tenía 340 láminas y regaló 120. ¿Cuántas le quedan?",type:"problem",correct:220},
  {category:"problems",topic:"Biblioteca escolar",question:"Llegaron 3 cajas con 8 libros cada una. ¿Cuántos libros llegaron?",type:"problem",correct:24}
];

function shuffle(array) {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function makeOptions(correct, mode = "near") {
  const result = new Set([correct]);
  let attempts = 0;
  while (result.size < 5 && attempts < 500) {
    attempts++;
    let candidate;
    if (typeof correct === "string") {
      const hours = Math.floor(Math.random() * 12) + 1;
      const minutes = [0, 15, 30, 45][Math.floor(Math.random() * 4)];
      candidate = `${String(hours).padStart(2,"0")}:${String(minutes).padStart(2,"0")}`;
    } else {
      let delta;
      if (mode === "small") delta = Math.floor(Math.random() * 7) - 3;
      else if (mode === "mult") delta = (Math.floor(Math.random() * 9) - 4) * 2;
      else if (mode === "pattern") delta = (Math.floor(Math.random() * 7) - 3) * 5;
      else delta = (Math.floor(Math.random() * 9) - 4) * 10;
      if (delta === 0) delta = 7;
      candidate = correct + delta;
    }
    if (candidate !== correct && (typeof candidate === "string" || candidate > 0)) result.add(candidate);
  }
  let n = 1;
  while (result.size < 5) {
    result.add(typeof correct === "number" ? correct + n * 11 : `${String((n % 12) + 1).padStart(2,"0")}:00`);
    n++;
  }
  return shuffle([...result]);
}

function makeDynamicQuestion(category) {
  const cat = category === "all"
    ? ["place","addsub","mult","division","clock","problems","patterns"][Math.floor(Math.random()*7)]
    : category;

  if (cat === "place") {
    const hundreds = Math.floor(Math.random()*9)+1;
    const tens = Math.floor(Math.random()*10);
    const units = Math.floor(Math.random()*10);
    const correct = hundreds*100 + tens*10 + units;
    const phrasing = Math.floor(Math.random()*3);
    let qText = `¿Qué número forman ${hundreds} centenas, ${tens} decenas y ${units} unidades?`;
    if (phrasing === 1) qText = `Encuentra el número compuesto por ${hundreds} C, ${tens} D y ${units} U.`;
    else if (phrasing === 2) qText = `Si tienes ${hundreds} centenas, ${tens} decenas y ${units} unidades, ¿qué número es?`;
    return {category:cat,topic:"Valor posicional",question:qText,type:"blocks",hundreds,tens,units,correct,options:makeOptions(correct)};
  }
  if (cat === "addsub") {
    const subtract = Math.random() < .5;
    const a = Math.floor(Math.random()*700)+100;
    const b = Math.floor(Math.random()*Math.min(700,a-1))+10;
    const x = subtract ? Math.max(a,b) : a;
    const y = subtract ? Math.min(a,b) : b;
    const correct = subtract ? x-y : a+b;
    return {category:cat,topic:subtract?"Sustracción":"Adición",question:subtract?`¿Cuánto es ${x} - ${y}?`:`¿Cuánto es ${a} + ${b}?`,type:"calc",correct,options:makeOptions(correct)};
  }
  if (cat === "mult") {
    const a = Math.floor(Math.random()*10)+2, b = Math.floor(Math.random()*10)+2;
    const correct = a*b;
    return {category:cat,topic:"Multiplicación",question:`¿Cuánto es ${a} × ${b}?`,type:"calc",correct,options:makeOptions(correct,"mult")};
  }
  if (cat === "division") {
    const groups = Math.floor(Math.random()*8)+2, each = Math.floor(Math.random()*9)+2;
    const total = groups*each;
    return {category:cat,topic:"División exacta",question:`¿Cuánto es ${total} / ${groups}?`,type:"calc",correct:each,options:makeOptions(each,"small")};
  }
  if (cat === "clock") {
    const hours = Math.floor(Math.random()*12)+1;
    const minutes = Math.floor(Math.random()*12)*5;
    const correct = `${String(hours).padStart(2,"0")}:${String(minutes).padStart(2,"0")}`;
    const phrasing = Math.floor(Math.random()*3);
    let qText = `¿Qué hora indica el reloj análogo?`;
    if (phrasing === 1) qText = `¿Qué hora marca el reloj en este momento?`;
    else if (phrasing === 2) qText = `Observa el reloj. ¿Qué hora señala exactamente?`;
    return {category:cat,topic:"Lectura del reloj",question:qText,type:"clock",hours,minutes,correct,isStringVal:true,options:makeOptions(correct)};
  }
  if (cat === "problems") {
    const a = (Math.floor(Math.random()*40)+10)*10, b = (Math.floor(Math.random()*25)+5)*10;
    const add = Math.random() < .5;
    const correct = add ? a+b : Math.max(a,b)-Math.min(a,b);
    return {category:cat,topic:"Resolución de problemas",question:add?`Camila ahorró $${a} y luego $${b}. ¿Cuánto dinero reunió?`:`Había $${Math.max(a,b)} y se gastaron $${Math.min(a,b)}. ¿Cuánto dinero queda?`,type:"problem",correct,options:makeOptions(correct)};
  }
  const step = [5,10,50,100][Math.floor(Math.random()*4)];
  const start = (Math.floor(Math.random()*8)+1)*step;
  const seq = [start,start+step,start+2*step,start+3*step];
  const correct = start+4*step;
  return {category:"patterns",topic:"Patrón numérico",question:`¿Qué número continúa la secuencia? ${seq.join(", ")}, ___`,type:"calc",correct,options:makeOptions(correct,"pattern")};
}

function prepareQuestion(q) {
  const copy = JSON.parse(JSON.stringify(q));
  if (!copy.options) copy.options = makeOptions(copy.correct);
  return copy;
}

function buildQuestionPool(category, count) {
  const pool = [];
  const seen = new Set();
  const matching = fixedQuestions.filter(q => category === "all" || q.category === category);

  for (const item of matching) {
    const q = prepareQuestion(item);
    if (!seen.has(q.question)) {
      seen.add(q.question);
      pool.push(q);
    }
  }

  let attempts = 0;
  const maxAttempts = count * 300;
  while (pool.length < count && attempts < maxAttempts) {
    attempts++;
    const q = prepareQuestion(makeDynamicQuestion(category));
    // Validamos clave única basada en la pregunta base sin sufijos
    if (!seen.has(q.question)) {
      seen.add(q.question);
      pool.push(q);
    }
  }

  // Si aún faltan preguntas para completar el total, generamos nuevas variaciones lógicas sin agregar textos entre paréntesis
  while (pool.length < count) {
    const q = prepareQuestion(makeDynamicQuestion(category));
    if (!seen.has(q.question)) {
      seen.add(q.question);
      pool.push(q);
    } else {
      // Si la pregunta exacta ya existe, creamos una variación numérica limpia para el reloj u otras categorías
      if (q.type === "clock") {
        q.hours = (q.hours % 12) + 1;
        q.correct = `${String(q.hours).padStart(2,"0")}:${String(q.minutes).padStart(2,"0")}`;
        q.options = makeOptions(q.correct);
      } else if (typeof q.correct === "number") {
        q.correct += 5;
        q.options = makeOptions(q.correct);
      }
      if (!seen.has(q.question + "_" + q.correct)) {
        seen.add(q.question + "_" + q.correct);
        pool.push(q);
      }
    }
  }

  return shuffle(pool).slice(0, count);
}

function formatTextForSpeech(text) {
  if (!text) return "";
  return text
    .replace(/\//g, " dividido en ")
    .replace(/÷/g, " dividido en ")
    .replace(/×/g, " por ")
    .replace(/\*/g, " por ")
    .replace(/\+/g, " más ")
    .replace(/-/g, " menos ");
}

function speakText(textToSpeak) {
  if (!("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(formatTextForSpeech(textToSpeak));
  utterance.lang = "es-CL";
  utterance.rate = 0.85;
  utterance.pitch = 1.05;
  
  window.speechSynthesis.speak(utterance);
}

function startRound(category, resetScore = false) {
  currentCategory = category;
  if (resetScore) {
    categoryScore = 0;
    totalScore = 0;
  }
  questionIndex = 0;
  errors = 0;
  answerLocked = false;
  const amount = category === "all" ? 30 : 15;
  questions = buildQuestionPool(category, amount);
  
  $("score-display").textContent = totalScore;
  $("start-screen").classList.add("hidden");
  $("summary-modal").classList.add("hidden");
  $("game-screen").classList.remove("hidden");
  $("restart-button").classList.remove("hidden");
  
  updateCategoryButtons();
  renderQuestion();
}

function updateCategoryButtons() {
  document.querySelectorAll(".cat-btn").forEach(btn => {
    const active = btn.dataset.category === currentCategory;
    btn.className = active ? CAT_ACTIVE_CLASS : CAT_INACTIVE_CLASS;
  });
}

function renderQuestion() {
  if (questionIndex >= questions.length) return finishGame(errors < 4);
  currentQuestion = questions[questionIndex];
  answerLocked = false;
  
  $("round-progress").textContent = `${questionIndex + 1}/${questions.length}`;
  $("progress-bar").style.width = `${(questionIndex / questions.length) * 100}%`;
  $("topic-tag").textContent = currentQuestion.topic;
  $("question-text").textContent = currentQuestion.question;
  $("feedback-box").textContent = "¡Elige la respuesta correcta!";
  $("feedback-box").className = "h-12 flex items-center justify-center text-center text-xl font-extrabold text-purple-600 animate-pulse";
  $("visual-container").innerHTML = makeVisual(currentQuestion);
  
  const container = $("options-container");
  container.innerHTML = "";
  
  shuffle(currentQuestion.options).forEach((option, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `${COLORS[index]} answer-btn border-b-4 text-white font-extrabold text-xl py-3 px-2 rounded-2xl shadow-lg bounce-hover`;
    button.textContent = option;
    button.addEventListener("click", () => checkAnswer(option, button));
    container.appendChild(button);
  });
  
  $("question-card").classList.remove("pop-in");
  void $("question-card").offsetWidth;
  $("question-card").classList.add("pop-in");
}

function makeVisual(q) {
  if (q.type === "blocks") {
    let html = '<div class="flex flex-wrap items-center justify-center gap-1">';
    for(let i=0; i<q.hundreds; i++) html += '<div class="block-hundred flex items-center justify-center text-xs font-bold text-yellow-950">100</div>';
    for(let i=0; i<q.tens; i++) html += '<div class="block-ten"></div>';
    for(let i=0; i<q.units; i++) html += '<div class="block-unit"></div>';
    return html + "</div>";
  }
  if (q.type === "clock") return renderClock(q.hours, q.minutes);
  if (q.type === "division") {
    const each = Math.floor(q.total / q.groups);
    let html = '<div class="flex flex-wrap justify-center gap-2">';
    for(let g=0; g<q.groups; g++) {
      html += '<div class="border-2 border-amber-400 bg-amber-50 p-2 rounded-xl flex flex-wrap justify-center max-w-28">';
      for(let i=0; i<each; i++) html += '<span class="text-xl m-1">⭐</span>';
      html += "</div>";
    }
    return html + "</div>";
  }
  if (q.type === "problem") return '<div class="text-lg font-bold text-indigo-900 bg-indigo-50 p-4 rounded-2xl text-center"><i class="fa-solid fa-lightbulb text-amber-500 mr-2"></i>¡Lee con atención y calcula!</div>';
  return '<div class="text-5xl text-purple-400"><i class="fa-solid fa-calculator"></i></div>';
}

function renderClock(hours, minutes) {
  const hAngle = ((hours % 12) + minutes / 60) * 30;
  const mAngle = minutes * 6;
  const hx = 100 + 43 * Math.sin(hAngle * Math.PI / 180), hy = 100 - 43 * Math.cos(hAngle * Math.PI / 180);
  const mx = 100 + 63 * Math.sin(mAngle * Math.PI / 180), my = 100 - 63 * Math.cos(mAngle * Math.PI / 180);
  let numbers = "";
  for(let i=1; i<=12; i++) {
    const a = (i * 30 - 90) * Math.PI / 180;
    numbers += `<text x="${100 + 68 * Math.cos(a)}" y="${100 + 68 * Math.sin(a) + 6}" text-anchor="middle" font-size="18" font-weight="bold" fill="#1e293b">${i}</text>`;
  }
  return `<svg class="clock-face" viewBox="0 0 200 200" role="img" aria-label="Reloj análogo"><circle cx="100" cy="100" r="92" fill="white" stroke="#8b5cf6" stroke-width="8"/><circle cx="100" cy="100" r="84" fill="#f8fafc" stroke="#e2e8f0" stroke-width="2"/>${numbers}<line x1="100" y1="100" x2="${hx}" y2="${hy}" stroke="#2563eb" stroke-width="7" stroke-linecap="round"/><line x1="100" y1="100" x2="${mx}" y2="${my}" stroke="#dc2626" stroke-width="5" stroke-linecap="round"/><circle cx="100" cy="100" r="6" fill="#1e293b"/></svg>`;
}

function checkAnswer(selected, button) {
  if (answerLocked) return;
  
  if (selected === currentQuestion.correct || String(selected) === String(currentQuestion.correct)) {
    answerLocked = true;
    categoryScore += 10;
    totalScore += 10;
    $("score-display").textContent = totalScore;
    $("feedback-box").textContent = "¡Excelente! ¡Respuesta correcta!";
    $("feedback-box").className = "h-12 flex items-center justify-center text-center text-xl font-extrabold text-emerald-600";
    button.classList.add("ring-4", "ring-yellow-300");
    if (window.confetti) confetti({particleCount:45, spread:55, origin:{y:.7}});
    
    window.setTimeout(() => {
      questionIndex++;
      renderQuestion();
    }, 650);
  } else {
    answerLocked = true;
    errors++;
    $("feedback-box").textContent = errors >= 4 ? "¡Has acumulado 4 errores!" : "Respuesta incorrecta. Pasando a la siguiente...";
    $("feedback-box").className = "h-12 flex items-center justify-center text-center text-lg font-extrabold text-rose-600";
    button.classList.add("opacity-50", "ring-4", "ring-rose-300");
    $("question-card").classList.add("shake");
    
    window.setTimeout(() => {
      $("question-card").classList.remove("shake");
      if (errors >= 4) {
        finishGame(false);
      } else {
        questionIndex++;
        renderQuestion();
      }
    }, 850);
  }
}

function finishGame(won) {
  $("game-screen").classList.add("hidden");
  $("summary-modal").classList.remove("hidden");
  $("progress-bar").style.width = won ? "100%" : `${(questionIndex / questions.length) * 100}%`;
  $("modal-score").textContent = categoryScore;
  $("modal-trophy-icon").innerHTML = won ? '<i class="fa-solid fa-trophy"></i>' : '<i class="fa-solid fa-heart-crack text-rose-500"></i>';
  
  if (won) {
    $("modal-title").textContent = "¡Ronda Completada!";
    $("modal-subtitle").textContent = `¡Excelente trabajo, ${playerName}!`;
    $("modal-feedback").textContent = "¡Eres un/a genio/a de las matemáticas!";
    if (window.confetti) confetti({particleCount:150, spread:100, origin:{y:.6}});
  } else {
    $("modal-title").textContent = "¡Game Over!";
    $("modal-subtitle").textContent = `¡Ánimo, ${playerName}! Cometiste 4 errores.`;
    $("modal-feedback").textContent = "¡Sigue practicando para mejorar!";
  }
}

// Event Listeners
$("start-form").addEventListener("submit", (event) => {
  event.preventDefault();
  playerName = $("player-name").value.trim();
  if (!playerName) return;
  startRound("all", true);
});

$("category-selector").addEventListener("click", (event) => {
  const button = event.target.closest("[data-category]");
  if (!button) return;
  const category = button.dataset.category;
  startRound(category, category !== currentCategory);
});

$("play-again").addEventListener("click", () => startRound(currentCategory, false));
$("restart-button").addEventListener("click", () => startRound(currentCategory, false));

$("btn-speak").addEventListener("click", () => {
  if (!currentQuestion) return;
  const textToRead = `${currentQuestion.topic}. ${currentQuestion.question}`;
  speakText(textToRead);
});
