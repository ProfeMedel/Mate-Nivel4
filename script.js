// --- Web Audio API para Efectos de Sonido ---
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        let audioCtx = null;

        function initAudio() {
            if (!audioCtx) audioCtx = new AudioContext();
        }

        function playSuccessSound() {
            initAudio();
            if (!audioCtx) return;
            const now = audioCtx.currentTime;
            const osc1 = audioCtx.createOscillator();
            const gain = audioCtx.createGain();

            osc1.type = 'triangle';
            osc1.frequency.setValueAtTime(523.25, now);
            osc1.frequency.setValueAtTime(659.25, now + 0.08);
            osc1.frequency.setValueAtTime(783.99, now + 0.16);
            osc1.frequency.setValueAtTime(1046.50, now + 0.24);

            gain.gain.setValueAtTime(0.3, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);

            osc1.connect(gain);
            gain.connect(audioCtx.destination);

            osc1.start(now);
            osc1.stop(now + 0.5);
        }

        function playErrorSound() {
            initAudio();
            if (!audioCtx) return;
            const now = audioCtx.currentTime;
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();

            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(220, now);
            osc.frequency.exponentialRampToValueAtTime(110, now + 0.3);

            gain.gain.setValueAtTime(0.2, now);
            gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);

            osc.connect(gain);
            gain.connect(audioCtx.destination);

            osc.start(now);
            osc.stop(now + 0.3);
        }

        // --- Banco de Preguntas Predefinidas (Estructuradas 3° Básico - MINEDUC) ---
        const fixedQuestions = [
            // --- MÓDULO BASE ORIGINAL ---
            {
                category: "place",
                topic: "Valor Posicional",
                question: "¿Qué número representa esta representación en bloques base 10?",
                type: "blocks",
                hundreds: 3, tens: 4, units: 2,
                correct: 342,
                options: [342, 243, 432, 324, 340]
            },
            {
                category: "place",
                topic: "Valor Posicional",
                question: "¿Cuántas CENTENAS tiene el número 758?",
                type: "math-desc",
                textDesc: "Centenas = 100",
                correct: 7,
                options: [7, 5, 8, 70, 700]
            },
            {
                category: "addsub",
                topic: "Suma hasta 1.000",
                question: "¿Cuánto es 350 + 240?",
                type: "calc",
                correct: 590,
                options: [590, 580, 600, 570, 490]
            },
            {
                category: "mult",
                topic: "Tabla del 5",
                question: "¿Cuánto es 5 × 6?",
                type: "calc",
                correct: 30,
                options: [25, 28, 30, 32, 35]
            },
            {
                category: "patterns",
                topic: "Patrón Creciente",
                question: "¿Qué número falta? 150, 200, 250, ___, 350",
                type: "calc",
                correct: 300,
                options: [280, 290, 300, 310, 320]
            },

            // --- 1. MÓDULO DE DIVISIONES (10 PREGUNTAS OA 9) ---
            {
                category: "division",
                topic: "Reparto Equitativo",
                question: "Reparte 12 galletas en partes iguales entre 3 niños. ¿Cuántas galletas recibe cada niño?",
                type: "division-visual",
                total: 12, groups: 3, icon: "fa-cookie text-amber-600",
                correct: 4,
                options: [3, 4, 5, 6, 2]
            },
            {
                category: "division",
                topic: "División Básica",
                question: "¿Cuánto es 15 : 5?",
                type: "calc",
                correct: 3,
                options: [2, 3, 4, 5, 6]
            },
            {
                category: "division",
                topic: "Agrupamiento",
                question: "Tienes 20 lápices y quieres formar grupos de 4 lápices. ¿Cuántos grupos formaste?",
                type: "division-visual",
                total: 20, groups: 5, icon: "fa-pencil text-red-500",
                correct: 5,
                options: [4, 5, 6, 10, 3]
            },
            {
                category: "division",
                topic: "Reparto en Platos",
                question: "Hay 18 manzanas repartidas por igual en 2 canastos. ¿Cuántas hay en cada canasto?",
                type: "division-visual",
                total: 18, groups: 2, icon: "fa-apple-whole text-red-600",
                correct: 9,
                options: [7, 8, 9, 10, 6]
            },
            {
                category: "division",
                topic: "División Exacta",
                question: "¿Cuánto es 24 : 4?",
                type: "calc",
                correct: 6,
                options: [4, 5, 6, 7, 8]
            },
            {
                category: "division",
                topic: "Agrupación de Pelotas",
                question: "Si guardas 30 pelotas en cajas de 10 pelotas cada una, ¿cuántas cajas necesitas?",
                type: "division-visual",
                total: 30, groups: 3, icon: "fa-basketball text-orange-500",
                correct: 3,
                options: [2, 3, 4, 5, 6]
            },
            {
                category: "division",
                topic: "Reparto de Flores",
                question: "Consuelo repartió 16 flores entre 4 floreros en partes iguales. ¿Cuántas flores puso en cada florero?",
                type: "calc",
                correct: 4,
                options: [3, 4, 5, 8, 2]
            },
            {
                category: "division",
                topic: "División por 3",
                question: "¿Cuánto es 27 : 3?",
                type: "calc",
                correct: 9,
                options: [7, 8, 9, 10, 6]
            },
            {
                category: "division",
                topic: "Agrupamiento",
                question: "Tienes 10 caramelos y regalas 2 caramelos a cada amigo. ¿A cuántos amigos les diste?",
                type: "division-visual",
                total: 10, groups: 5, icon: "fa-candy-cane text-pink-500",
                correct: 5,
                options: [2, 4, 5, 6, 10]
            },
            {
                category: "division",
                topic: "División por 5",
                question: "¿Cuánto es 40 : 5?",
                type: "calc",
                correct: 8,
                options: [6, 7, 8, 9, 10]
            },

            // --- 2. MÓDULO DE RELOJ ANÁLOGO (10 PREGUNTAS OA 18) ---
            {
                category: "clock",
                topic: "Lectura de Hora Exacta",
                question: "¿Qué hora indica el reloj análogo?",
                type: "clock",
                hours: 3, minutes: 0,
                correct: "03:00",
                options: ["03:00", "12:15", "03:30", "04:00", "02:00"],
                isStringVal: true
            },
            {
                category: "clock",
                topic: "Lectura de Media Hora",
                question: "¿Qué hora muestra el reloj?",
                type: "clock",
                hours: 7, minutes: 30,
                correct: "07:30",
                options: ["07:00", "07:30", "08:30", "06:30", "07:15"],
                isStringVal: true
            },
            {
                category: "clock",
                topic: "Lectura de Cuarto de Hora",
                question: "¿Qué hora señala el minutero (rojo) y la aguja horaria (azul)?",
                type: "clock",
                hours: 10, minutes: 15,
                correct: "10:15",
                options: ["10:00", "10:15", "10:30", "10:45", "11:15"],
                isStringVal: true
            },
            {
                category: "clock",
                topic: "Lectura de Hora Exacta",
                question: "¿Qué hora es en el reloj?",
                type: "clock",
                hours: 12, minutes: 0,
                correct: "12:00",
                options: ["12:00", "01:00", "12:30", "06:00", "11:00"],
                isStringVal: true
            },
            {
                category: "clock",
                topic: "Lectura de Media Hora",
                question: "¿Qué hora marca el reloj de la sala de clases?",
                type: "clock",
                hours: 4, minutes: 30,
                correct: "04:30",
                options: ["04:00", "04:15", "04:30", "05:30", "03:30"],
                isStringVal: true
            },
            {
                category: "clock",
                topic: "Cuarto para la Hora",
                question: "¿Qué hora digital equivale a la imagen del reloj?",
                type: "clock",
                hours: 1, minutes: 45,
                correct: "01:45",
                options: ["01:15", "01:30", "01:45", "02:45", "12:45"],
                isStringVal: true
            },
            {
                category: "clock",
                topic: "Lectura de Hora Exacta",
                question: "Observa las agujas del reloj. ¿Qué hora indican?",
                type: "clock",
                hours: 9, minutes: 0,
                correct: "09:00",
                options: ["09:00", "12:45", "09:30", "08:00", "10:00"],
                isStringVal: true
            },
            {
                category: "clock",
                topic: "Lectura de Cuarto de Hora",
                question: "¿Qué hora marca el reloj?",
                type: "clock",
                hours: 5, minutes: 15,
                correct: "05:15",
                options: ["05:00", "05:15", "05:30", "06:15", "04:15"],
                isStringVal: true
            },
            {
                category: "clock",
                topic: "Lectura de Media Hora",
                question: "¿Qué hora es?",
                type: "clock",
                hours: 11, minutes: 30,
                correct: "11:30",
                options: ["11:00", "11:15", "11:30", "12:30", "10:30"],
                isStringVal: true
            },
            {
                category: "clock",
                topic: "Lectura de Hora Exacta",
                question: "¿Qué hora indica el reloj análogo?",
                type: "clock",
                hours: 6, minutes: 0,
                correct: "06:00",
                options: ["06:00", "12:30", "06:30", "05:00", "07:00"],
                isStringVal: true
            },

            // --- 3. MÓDULO DE PROBLEMÁTICAS MATEMÁTICAS (10 PREGUNTAS OA 1, 6, 8) ---
            {
                category: "problems",
                topic: "Almacén de Barrio",
                question: "En el almacén de Don Pedro, Sofía compró un jugo por $450 y una galleta por $320. ¿Cuánto dinero gastó en total?",
                type: "problem-desc",
                correct: 770,
                options: [770, 750, 870, 670, 790]
            },
            {
                category: "problems",
                topic: "Colección de Láminas",
                question: "Lucas tenía 340 láminas de su álbum del mundial. En el recreo regaló 120 a sus amigos. ¿Cuántas láminas le quedan ahora?",
                type: "problem-desc",
                correct: 220,
                options: [220, 240, 200, 120, 460]
            },
            {
                category: "problems",
                topic: "Feria del Libro",
                question: "La biblioteca de la escuela recibió 3 cajas con 8 libros cada una. ¿Cuántos libros nuevos llegaron en total?",
                type: "problem-desc",
                correct: 24,
                options: [11, 20, 24, 28, 32]
            },
            {
                category: "problems",
                topic: "Feria Libre",
                question: "Doña Elena compró 5 mallas con 6 naranjas en cada malla. ¿Cuántas naranjas compró en total?",
                type: "problem-desc",
                correct: 30,
                options: [11, 25, 30, 35, 40]
            },
            {
                category: "problems",
                topic: "Ahorro de Monedas",
                question: "Mateo guardó en su alcancía $500 el lunes y $350 el martes. Si el miércoles gastó $200, ¿cuánto dinero le queda?",
                type: "problem-desc",
                correct: 650,
                options: [850, 650, 550, 700, 600]
            },
            {
                category: "problems",
                topic: "Paseo Escolar",
                question: "En un bus escolar viajan 42 estudiantes. En la primera parada se bajan 12 y suben 5. ¿Cuántos niños van en el bus ahora?",
                type: "problem-desc",
                correct: 35,
                options: [30, 35, 40, 45, 25]
            },
            {
                category: "problems",
                topic: "Cajas de Lápices",
                question: "La profesora repartió 45 lápices de colores por igual entre 5 mesas de trabajo. ¿Cuántos lápices le tocan a cada mesa?",
                type: "problem-desc",
                correct: 9,
                options: [7, 8, 9, 10, 5]
            },
            {
                category: "problems",
                topic: "Concurso de Canicas",
                question: "Camila tiene 150 bolitas, Tomás tiene 200 y Valentina tiene 100. ¿Cuántas bolitas juntas tienen entre los tres?",
                type: "problem-desc",
                correct: 450,
                options: [350, 400, 450, 500, 300]
            },
            {
                category: "problems",
                topic: "Huerto Escolar",
                question: "Los alumnos plantaron 4 filas de lechugas con 10 lechugas en cada fila. ¿Cuántas lechugas plantaron en total?",
                type: "problem-desc",
                correct: 40,
                options: [14, 30, 40, 50, 44]
            },
            {
                category: "problems",
                topic: "Fiesta de Cumpleaños",
                question: "Para la fiesta se compraron 60 globos. Si se reventaron 15 globos antes de empezar, ¿cuántos globos inflados quedan?",
                type: "problem-desc",
                correct: 45,
                options: [40, 45, 50, 35, 25]
            }
        ];

        // --- Generador Dinámico de Preguntas (Para Modo Infinito) ---
        function generateDynamicQuestion(category) {
            const availableCats = ['place', 'addsub', 'mult', 'division', 'clock', 'problems', 'patterns'];
            const chosenCategory = (category === 'all') 
                ? availableCats[Math.floor(Math.random() * availableCats.length)] 
                : category;

            if (chosenCategory === 'division') {
                const b = Math.floor(Math.random() * 4) + 2; // 2 a 5
                const ans = Math.floor(Math.random() * 8) + 2; // 2 a 9
                const a = b * ans;
                return {
                    category: "division",
                    topic: "División (Dinámico)",
                    question: `Si repartes ${a} objetos en ${b} grupos iguales, ¿cuántos quedan en cada grupo?`,
                    type: "division-visual",
                    total: a, groups: b, icon: "fa-star text-yellow-500",
                    correct: ans,
                    options: generateDistractors(ans, 'small')
                };
            } else if (chosenCategory === 'clock') {
                const h = Math.floor(Math.random() * 12) + 1;
                const mArr = [0, 15, 30, 45];
                const m = mArr[Math.floor(Math.random() * mArr.length)];
                const hStr = h < 10 ? `0${h}` : `${h}`;
                const mStr = m === 0 ? '00' : `${m}`;
                const correctStr = `${hStr}:${mStr}`;
                
                const opts = new Set([correctStr]);
                while(opts.size < 5) {
                    const randomH = Math.floor(Math.random() * 12) + 1;
                    const randomM = mArr[Math.floor(Math.random() * mArr.length)];
                    const rHStr = randomH < 10 ? `0${randomH}` : `${randomH}`;
                    const rMStr = randomM === 0 ? '00' : `${randomM}`;
                    opts.add(`${rHStr}:${rMStr}`);
                }

                return {
                    category: "clock",
                    topic: "Reloj Análogo (Dinámico)",
                    question: "¿Qué hora marca el reloj?",
                    type: "clock",
                    hours: h, minutes: m,
                    correct: correctStr,
                    options: Array.from(opts).sort(() => Math.random() - 0.5),
                    isStringVal: true
                };
            } else if (chosenCategory === 'problems') {
                const val1 = (Math.floor(Math.random() * 30) + 10) * 10;
                const val2 = (Math.floor(Math.random() * 20) + 5) * 10;
                const ans = val1 + val2;
                return {
                    category: "problems",
                    topic: "Resolución de Problemas (Dinámico)",
                    question: `Heidí juntó $${val1} en su alcancía y su amigo Pedro le regaló $${val2}. ¿Cuánto dinero tiene en total?`,
                    type: "problem-desc",
                    correct: ans,
                    options: generateDistractors(ans, 'near')
                };
            } else if (chosenCategory === 'place') {
                const h = Math.floor(Math.random() * 5) + 1;
                const t = Math.floor(Math.random() * 6);
                const u = Math.floor(Math.random() * 8) + 1;
                const val = h * 100 + t * 10 + u;
                return {
                    category: "place",
                    topic: "Valor Posicional (Dinámico)",
                    question: "¿Qué número forman estos bloques multibase?",
                    type: "blocks",
                    hundreds: h, tens: t, units: u,
                    correct: val,
                    options: generateDistractors(val, 'near')
                };
            } else if (chosenCategory === 'addsub') {
                const a = Math.floor(Math.random() * 400) + 100;
                const b = Math.floor(Math.random() * 400) + 50;
                const ans = a + b;
                return {
                    category: "addsub",
                    topic: "Adición (Dinámico)",
                    question: `¿Cuánto es ${a} + ${b}?`,
                    type: "calc",
                    correct: ans,
                    options: generateDistractors(ans, 'near')
                };
            } else if (chosenCategory === 'mult') {
                const f1 = Math.floor(Math.random() * 8) + 2;
                const f2 = Math.floor(Math.random() * 8) + 2;
                const ans = f1 * f2;
                return {
                    category: "mult",
                    topic: "Multiplicación (Dinámico)",
                    question: `¿Cuánto es ${f1} × ${f2}?`,
                    type: "calc",
                    correct: ans,
                    options: generateDistractors(ans, 'mult')
                };
            } else { // patterns
                const step = [5, 10, 50, 100][Math.floor(Math.random() * 4)];
                const start = Math.floor(Math.random() * 8) * step + 10;
                const seq = [start, start + step, start + step * 2, start + step * 3];
                const ans = start + step * 4;
                return {
                    category: "patterns",
                    topic: "Secuencia Numérica (Dinámico)",
                    question: `¿Qué número continúa el patrón? ${seq.join(', ')}, ___`,
                    type: "calc",
                    correct: ans,
                    options: generateDistractors(ans, 'pattern', step)
                };
            }
        }

        // Generador de Distractores para Garantizar 5 Opciones Únicas
        function generateDistractors(correctVal, type, step = 10) {
            let options = new Set();
            options.add(correctVal);

            while (options.size < 5) {
                let offset = 0;
                if (type === 'near') {
                    offset = (Math.floor(Math.random() * 5) - 2) * 10;
                    if (offset === 0) offset = 5;
                } else if (type === 'small') {
                    offset = Math.floor(Math.random() * 7) - 3;
                    if (offset === 0) offset = 1;
                } else if (type === 'mult') {
                    offset = (Math.floor(Math.random() * 5) - 2) * 2;
                    if (offset === 0) offset = 3;
                } else {
                    offset = (Math.floor(Math.random() * 6) - 3) * 5;
                    if (offset === 0) offset = 10;
                }

                let candidate = correctVal + offset;
                if (candidate > 0) options.add(candidate);
            }

            return Array.from(options).sort(() => Math.random() - 0.5);
        }

        // --- Estado del Juego ---
        let currentCategory = 'all';
        let currentQuestion = null;
        let roundQuestionCount = 0;
        let roundScore = 0;
        let totalScore = 0;
        const totalPerRound = 10;

        // Cambiar Categoría
        function setCategory(cat) {
            currentCategory = cat;
            document.querySelectorAll('.cat-btn').forEach(btn => {
                btn.className = 'cat-btn bg-white hover:bg-gray-100 text-slate-700 font-bold py-2 px-2 rounded-2xl text-xs shadow border-b-4 border-slate-300 transition-all flex items-center justify-center gap-1';
            });
            const activeBtn = document.getElementById(`cat-${cat}`);
            if (activeBtn) {
                activeBtn.className = 'cat-btn bg-purple-600 text-white font-bold py-2 px-2 rounded-2xl text-xs shadow border-b-4 border-purple-800 transition-all flex items-center justify-center gap-1';
            }
            startNewRound();
        }

        // Obtener siguiente pregunta
        function getNextQuestion() {
            const filteredFixed = fixedQuestions.filter(q => currentCategory === 'all' || q.category === currentCategory);
            
            if (filteredFixed.length > 0 && Math.random() > 0.3) {
                const randomIdx = Math.floor(Math.random() * filteredFixed.length);
                return JSON.parse(JSON.stringify(filteredFixed[randomIdx]));
            } else {
                return generateDynamicQuestion(currentCategory);
            }
        }

        // Renderizar Reloj Análogo en SVG
        function renderAnalogClock(hours, minutes) {
            const hAngle = ((hours % 12) + minutes / 60) * 30; // 360 / 12 = 30° por hora
            const mAngle = minutes * 6; // 360 / 60 = 6° por minuto

            let clockSVG = `
                <svg width="180" height="180" viewBox="0 0 200 200" class="drop-shadow-md">
                    <!-- Esfera del Reloj -->
                    <circle cx="100" cy="100" r="92" fill="#ffffff" stroke="#8b5cf6" stroke-width="8"/>
                    <circle cx="100" cy="100" r="84" fill="#f8fafc" stroke="#e2e8f0" stroke-width="2"/>
            `;

            // Números del Reloj (1 al 12)
            for (let i = 1; i <= 12; i++) {
                const angle = (i * 30 - 90) * (Math.PI / 180);
                const x = 100 + 68 * Math.cos(angle);
                const y = 100 + 68 * Math.sin(angle) + 6;
                clockSVG += `<text x="${x}" y="${y}" text-anchor="middle" font-size="18" font-weight="bold" fill="#1e293b">${i}</text>`;
            }

            // Aguja Horaria (Azul - más corta)
            clockSVG += `
                <line x1="100" y1="100" x2="${100 + 45 * Math.sin(hAngle * Math.PI / 180)}" y2="${100 - 45 * Math.cos(hAngle * Math.PI / 180)}" 
                      stroke="#2563eb" stroke-width="7" stroke-linecap="round"/>
            `;

            // Aguja Minutero (Roja - más larga)
            clockSVG += `
                <line x1="100" y1="100" x2="${100 + 65 * Math.sin(mAngle * Math.PI / 180)}" y2="${100 - 65 * Math.cos(mAngle * Math.PI / 180)}" 
                      stroke="#dc2626" stroke-width="5" stroke-linecap="round"/>
            `;

            // Centro del Reloj
            clockSVG += `
                    <circle cx="100" cy="100" r="6" fill="#1e293b"/>
                </svg>
            `;

            return clockSVG;
        }

        // Cargar y Renderizar Pregunta
        function loadQuestion(q) {
            currentQuestion = q;
            const qCard = document.getElementById('question-card');
            
            qCard.classList.remove('pop-in');
            void qCard.offsetWidth;
            qCard.classList.add('pop-in');

            document.getElementById('topic-tag').innerText = q.topic;
            document.getElementById('question-text').innerText = q.question;

            const visualContainer = document.getElementById('visual-container');
            visualContainer.innerHTML = '';

            // --- Renderizado de Recursos Visuales ---
            if (q.type === 'blocks') {
                for (let i = 0; i < q.hundreds; i++) {
                    visualContainer.innerHTML += `<div class="block-hundred flex items-center justify-center text-xs font-bold text-yellow-900 m-1">100</div>`;
                }
                for (let i = 0; i < q.tens; i++) {
                    visualContainer.innerHTML += `<div class="block-ten flex items-center justify-center text-xs font-bold text-white m-1">10</div>`;
                }
                for (let i = 0; i < q.units; i++) {
                    visualContainer.innerHTML += `<div class="block-unit m-1"></div>`;
                }
            } else if (q.type === 'clock') {
                visualContainer.innerHTML = renderAnalogClock(q.hours, q.minutes);
            } else if (q.type === 'division-visual') {
                const itemsPerGroup = Math.floor(q.total / q.groups);
                for (let g = 0; g < q.groups; g++) {
                    let groupHTML = `<div class="flex flex-wrap border-2 border-amber-400 bg-amber-50 p-2 rounded-2xl m-1 items-center justify-center max-w-[140px]">`;
                    for (let it = 0; it < itemsPerGroup; it++) {
                        groupHTML += `<i class="fa-solid ${q.icon} text-xl sm:text-2xl m-1"></i>`;
                    }
                    groupHTML += `</div>`;
                    visualContainer.innerHTML += groupHTML;
                }
            } else if (q.type === 'problem-desc') {
                visualContainer.innerHTML = `<div class="text-lg sm:text-xl font-bold text-indigo-900 bg-indigo-50 p-4 rounded-2xl border-2 border-indigo-200 text-center"><i class="fa-solid fa-lightbulb text-amber-500 mr-2"></i>¡Analiza la pregunta y calcula tu respuesta!</div>`;
            } else if (q.type === 'math-desc') {
                visualContainer.innerHTML = `<div class="text-2xl font-extrabold text-purple-700 bg-purple-100 px-6 py-3 rounded-2xl border-2 border-purple-300">${q.textDesc}</div>`;
            } else {
                visualContainer.innerHTML = `<div class="text-5xl text-purple-400 font-bold"><i class="fa-solid fa-calculator"></i></div>`;
            }

            // Renderizar 5 Opciones de Respuesta
            const optionsContainer = document.getElementById('options-container');
            optionsContainer.innerHTML = '';

            const btnColors = [
                'bg-red-500 hover:bg-red-600 border-red-700 text-white',
                'bg-blue-500 hover:bg-blue-600 border-blue-700 text-white',
                'bg-emerald-500 hover:bg-emerald-600 border-emerald-700 text-white',
                'bg-amber-500 hover:bg-amber-600 border-amber-700 text-white',
                'bg-purple-500 hover:bg-purple-600 border-purple-700 text-white'
            ];

            const options = [...q.options].sort(() => Math.random() - 0.5);

            options.forEach((opt, idx) => {
                const btn = document.createElement('button');
                btn.className = `${btnColors[idx % btnColors.length]} border-b-4 font-num font-extrabold text-xl sm:text-2xl py-4 px-2 rounded-2xl shadow-lg bounce-hover transition-all flex items-center justify-center active:translate-y-1`;
                btn.innerText = opt;
                btn.onclick = () => checkAnswer(opt, q.correct, btn);
                optionsContainer.appendChild(btn);
            });

            document.getElementById('feedback-box').innerHTML = '<span class="text-purple-600 animate-pulse">¡Elige la opción correcta!</span>';
        }

        // Evaluar Respuesta
        function checkAnswer(selected, correct, btnElement) {
            initAudio();
            const feedbackBox = document.getElementById('feedback-box');

            if (selected === correct) {
                playSuccessSound();
                confetti({
                    particleCount: 65,
                    spread: 60,
                    origin: { y: 0.7 }
                });

                roundScore += 10;
                totalScore += 10;
                document.getElementById('score-display').innerText = totalScore;

                feedbackBox.innerHTML = '<span class="text-emerald-600 font-extrabold text-2xl pop-in"><i class="fa-solid fa-circle-check"></i> ¡Excelente! ¡Muy bien!</span>';
                btnElement.classList.add('ring-4', 'ring-yellow-300', 'scale-105');

                setTimeout(() => {
                    roundQuestionCount++;
                    updateProgress();

                    if (roundQuestionCount >= totalPerRound) {
                        showRoundSummary();
                    } else {
                        nextQuestion();
                    }
                }, 1400);

            } else {
                playErrorSound();
                btnElement.classList.add('shake', 'opacity-50');
                feedbackBox.innerHTML = '<span class="text-rose-500 font-extrabold text-xl"><i class="fa-solid fa-face-smile-wink"></i> ¡Casi! Inténtalo de nuevo</span>';

                setTimeout(() => {
                    btnElement.classList.remove('shake');
                }, 500);
            }
        }

        // Actualizar Barra de Progreso
        function updateProgress() {
            document.getElementById('round-progress').innerText = `${roundQuestionCount + 1}/${totalPerRound}`;
            const pct = Math.min(((roundQuestionCount + 1) / totalPerRound) * 100, 100);
            document.getElementById('progress-bar').style.width = `${pct}%`;
        }

        // Siguiente Pregunta
        function nextQuestion() {
            const q = getNextQuestion();
            loadQuestion(q);
        }

        // Mostrar Resumen de la Ronda
        function showRoundSummary() {
            document.getElementById('modal-score').innerText = roundScore;
            
            let feedback = "¡Sigue practicando para mejorar!";
            if (roundScore >= 90) feedback = "¡Increíble! ¡Demostraste un dominio total de este módulo! 🌟";
            else if (roundScore >= 70) feedback = "¡Buen trabajo! ¡Casi un puntaje perfecto! 🎉";
            
            document.getElementById('modal-feedback').innerText = feedback;
            document.getElementById('summary-modal').classList.remove('hidden');
        }

        // Iniciar Nueva Ronda
        function startNewRound() {
            roundQuestionCount = 0;
            roundScore = 0;
            document.getElementById('summary-modal').classList.add('hidden');
            updateProgress();
            nextQuestion();
        }

        // Síntesis de voz (Web Speech API)
        function speakCurrentQuestion() {
            if ('speechSynthesis' in window) {
                window.speechSynthesis.cancel();
                if (!currentQuestion) return;

                const textToSpeak = `${currentQuestion.question}`;
                const utterance = new SpeechSynthesisUtterance(textToSpeak);
                utterance.lang = 'es-CL';
                utterance.rate = 0.85;

                window.speechSynthesis.speak(utterance);
            } else {
                alert("Tu navegador no admite reproducción de voz.");
            }
        }

        // Reiniciar Juego Completo
        function restartGame() {
            totalScore = 0;
            roundScore = 0;
            roundQuestionCount = 0;
            document.getElementById('score-display').innerText = totalScore;
            document.getElementById('summary-modal').classList.add('hidden');
            updateProgress();
            nextQuestion();
        }

        // Inicialización
        window.onload = function() {
            updateProgress();
            nextQuestion();
        };
