document.addEventListener('DOMContentLoaded', () => {
    // --- DATI DEL GIOCO ---
    // NOTA: Assicurati di creare una cartella 'img/places/' e di inserire le immagini corrispondenti.
    // Le immagini dovrebbero essere di pubblico dominio o con licenza appropriata.
    const places = [
        {
            image: 'img/places/colosseo.jpg',
            options: ['Colosseo, Roma', 'Arena di Verona', 'Partenone, Atene', 'Anfiteatro di Pompei'],
            answer: 'Colosseo, Roma'
        },
        {
            image: 'img/places/tour-eiffel.jpg',
            options: ['Tour Eiffel, Parigi', 'Big Ben, Londra', 'Empire State Building, New York', 'Torre di Pisa'],
            answer: 'Tour Eiffel, Parigi'
        },
        {
            image: 'img/places/statua-liberta.jpg',
            options: ['Cristo Redentore, Rio', 'Statua della Libertà, New York', 'David di Michelangelo, Firenze', 'Sirenetta, Copenaghen'],
            answer: 'Statua della Libertà, New York'
        },
        {
            image: 'img/places/piramidi-giza.jpg',
            options: ['Chichén Itzá, Messico', 'Piramidi di Giza, Egitto', 'Ziqqurat di Ur, Iraq', 'Machu Picchu, Perù'],
            answer: 'Piramidi di Giza, Egitto'
        },
        {
            image: 'img/places/sydney-opera-house.jpg',
            options: ['Museo Guggenheim, Bilbao', 'Heydar Aliyev Center, Baku', 'Sydney Opera House, Australia', 'Walt Disney Concert Hall, Los Angeles'],
            answer: 'Sydney Opera House, Australia'
        },
        {
            image: 'img/places/machu-picchu.jpg',
            options: ['Machu Picchu, Perù', 'Grande Muraglia Cinese', 'Petra, Giordania', 'Angkor Wat, Cambogia'],
            answer: 'Machu Picchu, Perù'
        }
    ];

    // --- ELEMENTI DEL DOM ---
    const scoreEl = document.getElementById('score');
    const imageEl = document.getElementById('place-image');
    const optionsContainer = document.getElementById('options-container');
    const feedbackTextEl = document.getElementById('feedback-text');
    const nextBtn = document.getElementById('next-btn');
    const restartBtn = document.getElementById('restart-btn');
    const gameArea = document.getElementById('game-area');
    const endGameContainer = document.getElementById('end-game-container');
    const finalScoreEl = document.getElementById('final-score');

    // --- STATO DEL GIOCO ---
    let score = 0;
    let currentQuestionIndex = 0;
    let shuffledPlaces = [];

    // --- FUNZIONI ---

    /** Mescola un array in modo casuale (algoritmo di Fisher-Yates) */
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    /** Avvia il gioco o carica la domanda successiva */
    function loadQuestion() {
        // Resetta lo stato precedente
        feedbackTextEl.textContent = '';
        nextBtn.style.display = 'none';
        optionsContainer.innerHTML = '';

        if (currentQuestionIndex >= shuffledPlaces.length) {
            endGame();
            return;
        }

        const currentPlace = shuffledPlaces[currentQuestionIndex];
        imageEl.src = currentPlace.image;
        imageEl.alt = `Luogo da indovinare numero ${currentQuestionIndex + 1}`;

        // Mescola le opzioni di risposta
        const shuffledOptions = [...currentPlace.options];
        shuffleArray(shuffledOptions);

        // Crea i pulsanti per le opzioni
        shuffledOptions.forEach(option => {
            const button = document.createElement('button');
            button.textContent = option;
            button.classList.add('option-btn');
            button.addEventListener('click', () => handleAnswer(option, currentPlace.answer));
            optionsContainer.appendChild(button);
        });
    }

    /** Gestisce la selezione di una risposta */
    function handleAnswer(selectedOption, correctAnswer) {
        const buttons = optionsContainer.querySelectorAll('.option-btn');
        let correct = false;

        if (selectedOption === correctAnswer) {
            score++;
            scoreEl.textContent = score;
            feedbackTextEl.textContent = 'Corretto!';
            feedbackTextEl.style.color = '#28a745';
            correct = true;
        } else {
            feedbackTextEl.textContent = `Sbagliato! La risposta era: ${correctAnswer}`;
            feedbackTextEl.style.color = '#dc3545';
        }

        // Evidenzia le risposte e disabilita i pulsanti
        buttons.forEach(button => {
            button.disabled = true;
            if (button.textContent === correctAnswer) {
                button.classList.add('correct');
            } else if (button.textContent === selectedOption && !correct) {
                button.classList.add('incorrect');
            }
        });

        // Mostra il pulsante "Prossima"
        nextBtn.style.display = 'inline-block';
    }

    /** Termina la partita e mostra il punteggio finale */
    function endGame() {
        gameArea.style.display = 'none';
        endGameContainer.style.display = 'block';
        finalScoreEl.textContent = `${score} su ${shuffledPlaces.length}`;
    }

    /** Inizia una nuova partita */
    function startGame() {
        score = 0;
        currentQuestionIndex = 0;
        scoreEl.textContent = score;

        shuffledPlaces = [...places];
        shuffleArray(shuffledPlaces);

        gameArea.style.display = 'block';
        endGameContainer.style.display = 'none';

        loadQuestion();
    }

    // --- EVENT LISTENERS ---
    nextBtn.addEventListener('click', () => {
        currentQuestionIndex++;
        loadQuestion();
    });

    restartBtn.addEventListener('click', startGame);

    // --- AVVIO DEL GIOCO ---
    startGame();
});
