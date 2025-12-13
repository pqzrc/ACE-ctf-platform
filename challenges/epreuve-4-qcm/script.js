document.addEventListener('DOMContentLoaded', () => {

const quizData = [
    {
        id: 1,
        question: "Comment se nomme le campus principal situé à la Martinique ?",
        options: [
            { id: "A", text: "Campus de Camp Jacob" },
            { id: "B", text: "Campus de Fouillole" },
            { id: "C", text: "Campus de Schœlcher" },
            { id: "D", text: "Campus de Troubiran" },
        ]
    },
    {
        id: 2,
        question: "Sur combien de pôles géographiques principaux l'université est-elle répartie ?",
        options: [
            { id: "A", text: "2 pôles (Guadeloupe, Martinique)" },
            { id: "B", text: "3 pôles (Guadeloupe, Martinique, Guyane)" },
            { id: "C", text: "4 pôles (Guadeloupe, Martinique, La Réunion)" },
            { id: "D", text: "4 pôles (Guadeloupe, Martinique, Saint-Martin)" },
        ]
    },
    {
        id: 3,
        question: "Quel territoire faisait partie de l'UAG jusqu'à 2014 ?",
        options: [
            { id: "A", text: "Wallis et Futuna" },
            { id: "B", text: "Saint-Martin" },
            { id: "C", text: "La Réunion" },
            { id: "D", text: "La Guyane" },
        ]
    },
    {
        id: 4,
        question: "Le président actuel de l'Université des Antilles est :",
        options: [
            { id: "A", text: "Valentin Patrice LE DU" },
            { id: "B", text: "Michel GEOFFROY" },
            { id: "C", text: "Yan MONPLAISIR" },
            { id: "D", text: "Il n'y a pas de 'président'" },
        ]
    },
    {
        id: 5,
        question: "Quelle filière universitaire est souvent désignée par le sigle STAPS ?",
        options: [
            { id: "A", text: "Sciences de la Terre et Atmosphères Physiques" },
            { id: "B", text: "Service Technique de l'Administration Publique et Scolaire" },
            { id: "C", text: "Sciences et Techniques des Arts Physiques et Sportifs" },
            { id: "D", text: "Sciences et Techniques des Activités Physiques et Sportives" },
        ]
    },
    {
        id: 6,
        question: "En quelle année l'établissement est-il officiellement devenu l'« Université des Antilles » (suite à la scission) ?",
        options: [
            { id: "A", text: "2015" },
            { id: "B", text: "2001" },
            { id: "C", text: "1982" },
            { id: "D", text: "1945" },
        ]
    },
    {
        id: 7,
        question: "Quel institut propose des BUT à l'UA ?",
        options: [
            { id: "A", text: "L'IUT" },
            { id: "B", text: "L'ENA" },
            { id: "C", text: "L'ICEFI" },
            { id: "D", text: "L'UFR-ST" },
        ]
    },
    {
        id: 8,
        question: "Combien y a-t-il d'étudiants inscrits à l'UA au total ?",
        options: [
                { id: "A", text: "1000+" },
                { id: "B", text: "5000+" },
                { id: "C", text: "10000+" },
                { id: "D", text: "20000+" },
        ]
    },
    {
        id: 9,
        question: "Qui a réalisé la sculpture près de l'entrée du campus de Schoelcher ?",
        options: [
            { id: "A", text: "Philippe Saint-Cyr" },
            { id: "B", text: "Joseph René-Corail" },
            { id: "C", text: "Paulette Nardal" },
            { id: "D", text: "Aucun d'entre eux" },
        ]
    },
    {
        id: 10,
        question: "Que signifie le sigle DOSIP, service essentiel pour les étudiants ?",
        options: [
            { id: "A", text: "Département Officiel des Sciences Informatiques et Physiques" },
            { id: "B", text: "Direction de l'Organisation Sportive et de l'Innovation Pédagogique" },
            { id: "C", text: "Direction de l'Orientation Scolaire et de l'Insertion Professionnelle" },
            { id: "D", text: "Direction de l'Orientation, des Stages et de l'Insertion Professionnelle" },
        ]
    }
];


    let currentQuestionIndex = 0;
    const totalQuestions = quizData.length;

    const answersState = new Array(totalQuestions).fill(null);

    const qcmFormContainer = document.getElementById('qcm-questions-wrapper');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const submitBtn = document.getElementById('submit-btn');
    const currentQDisplay = document.getElementById('current-q');
    const progressBarFill = document.querySelector('.progress-bar-fill');
    const progressText = document.getElementById('progress-text');
    const totalQDisplay = document.getElementById('total-q');
    const flagStatus = document.getElementById('flag-status');

    function generateQuizHTML() {
        totalQDisplay.textContent = totalQuestions;
        qcmFormContainer.innerHTML = quizData.map((q, index) => `
            <div class="question-container ${index === 0 ? 'active' : ''}" data-index="${index}">
                <div class="question-number">
                    <i class="fas fa-microchip"></i> QUESTION ${String(index + 1).padStart(2, '0')} / ${String(totalQuestions).padStart(2, '0')}
                </div>
                <h3 class="question-text">${q.question}</h3>
                <div class="answers-container">
                    ${q.options.map(opt => `
                        <label class="answer-option">
                            <input type="radio" name="q${q.id}" value="${opt.id}" hidden>
                            <span class="answer-letter">${opt.id}</span>
                            <span class="answer-text">${opt.text}</span>
                        </label>
                    `).join('')}
                </div>
            </div>
        `).join('');
        attachAnswerListeners();
    }

    function attachAnswerListeners() {
        document.querySelectorAll('.answer-option').forEach(option => {
            option.addEventListener('click', function() {
                const radio = this.querySelector('input[type="radio"]');
                const questionIndex = parseInt(this.closest('.question-container').dataset.index);
                const parent = this.closest('.answers-container');
                parent.querySelectorAll('.answer-option').forEach(opt => opt.classList.remove('selected'));
                this.classList.add('selected');
                answersState[questionIndex] = radio.value;
                updateProgressBasedOnAnswers();
            });
        });
    }

    generateQuizHTML();
    const questionsDOMElements = document.querySelectorAll('.question-container');
    updateNavigationButtons();

    function updateProgressBasedOnAnswers() {
        const answeredCount = answersState.filter(ans => ans !== null).length;
        const percent = (answeredCount / totalQuestions) * 100;
        progressBarFill.style.width = `${percent}%`;
        progressText.textContent = `Progression : ${Math.round(percent)}%`;
    }

    nextBtn.addEventListener('click', () => {
        if (currentQuestionIndex < totalQuestions - 1) {
            questionsDOMElements[currentQuestionIndex].classList.remove('active');
            currentQuestionIndex++;
            questionsDOMElements[currentQuestionIndex].classList.add('active');
            updateNavigationButtons();
        }
    });

    prevBtn.addEventListener('click', () => {
        if (currentQuestionIndex > 0) {
            questionsDOMElements[currentQuestionIndex].classList.remove('active');
            currentQuestionIndex--;
            questionsDOMElements[currentQuestionIndex].classList.add('active');
            updateNavigationButtons();
        }
    });

    function updateNavigationButtons() {
        currentQDisplay.textContent = currentQuestionIndex + 1;
        prevBtn.disabled = currentQuestionIndex === 0;
        if (currentQuestionIndex === totalQuestions - 1) {
            nextBtn.style.display = 'none';
            submitBtn.style.display = 'flex';
        } else {
            nextBtn.style.display = 'flex';
            submitBtn.style.display = 'none';
        }
    }


    submitBtn.addEventListener('click', async () => {
        if (answersState.includes(null)) {
            alert("L.U.M.E.N. exige une réponse à chaque question avant validation.");
            return;
        }

        const queryParams = answersState.map(ans => `answers[]=${ans}`).join('&');

        const endpoint = `./validate.php?${queryParams}`;

        try {
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Traitement...';

            const response = await fetch(endpoint, {
                method: 'GET',

                mode: 'cors', 
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) throw new Error('Erreur réseau ou CORS');

            const data = await response.json();
            displayResult(data);

        } catch (error) {
            console.error('Erreur:', error);
            alert("Erreur de connexion (Vérifiez la console pour les erreurs CORS ou Serveur).");
            submitBtn.disabled = false;
            submitBtn.innerHTML = 'Valider l\'épreuve <i class="fas fa-check-circle"></i>';
        }
    });

    function displayResult(data) {
        document.getElementById('qcm-form').style.display = 'none';
        const resultArea = document.getElementById('result-area');
        resultArea.style.display = 'block';

        const isSuccess = data.success;

        // Notifier LUMEN/DSIN du résultat
        if (typeof LumenWidget !== 'undefined') {
          LumenWidget.reportEpreuveResult(4, isSuccess);
        }

        const scoreClass = isSuccess ? 'success' : 'error';
        const iconClass = isSuccess ? 'fa-check' : 'fa-times';

        resultArea.innerHTML = `
            <div class="result-header">
                <i class="fas ${iconClass}" style="color: var(--${scoreClass})"></i>
                <h2>${isSuccess ? 'ACCÈS SYSTÈME ACCORDÉ' : 'ACCÈS REFUSÉ'}</h2>
            </div>
            <div class="score-circle ${scoreClass}">
                ${data.score}%
            </div>
            <div class="lumen-message">
                <strong>L.U.M.E.N. :</strong> "${data.message}"
            </div>
            ${isSuccess && data.flag ? `
                <div class="dsin-message">
                    <strong>DSIN (Canal Sécurisé) :</strong> Flag récupéré :<br>
                    <code style="font-size: 1.4rem; color: var(--accent-blue); display:block; margin-top:10px;">${data.flag}</code>
                </div>
            ` : `
                <button onclick="location.reload()" class="btn btn-primary" style="margin: 0 auto;">
                    <i class="fas fa-redo"></i> Recommencer la séquence
                </button>
            `}
        `;
        flagStatus.innerHTML = isSuccess ? `SUCCESS` : `FAILURE`;
    }
});