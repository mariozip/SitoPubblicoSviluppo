document.addEventListener('DOMContentLoaded', () => {
    const ideaTypeSelect = document.getElementById('ideaType');
    const generateBtn = document.getElementById('generateBtn');
    const ideaOutput = document.getElementById('ideaOutput');

    const data = {
        blog: {
            templates: [
                "Come {verbo} {sostantivo} in {numero} semplici passi",
                "La guida definitiva a {sostantivo}",
                "{numero} errori da evitare quando si vuole {verbo} {sostantivo}",
                "Perché {sostantivo} è più importante di quanto pensi",
                "Il futuro di: {sostantivo}"
            ],
            verbo: ["ottimizzare", "creare", "imparare", "scegliere", "scrivere", "migliorare"],
            sostantivo: ["il tuo sito web", "la produttività", "un nuovo linguaggio di programmazione", "il marketing digitale", "il content marketing", "le proprie finanze"],
            numero: [3, 5, 7, 10]
        },
        project: {
            templates: [
                "{aggettivo} {sostantivo}",
                "Progetto {sostantivo}",
                "Operazione {sostantivo}"
            ],
            aggettivo: ["Quantum", "Nexus", "Orion", "Vortex", "Stellar", "Apex", "Nova"],
            sostantivo: ["Phoenix", "Dynamo", "Horizon", "Odyssey", "Catalyst", "Momentum"]
        },
        discussion: {
            templates: [
                "{soggetto}: un bene o un male per la società?",
                "Qual è il futuro di {soggetto}?",
                "L'impatto di {soggetto} su {ambito}.",
                "Dovremmo regolare più severamente {soggetto}?",
                "È etico utilizzare {soggetto} per {ambito}?"
            ],
            soggetto: ["L'intelligenza artificiale", "I social media", "Il lavoro da remoto", "Le criptovalute", "La globalizzazione", "L'editing genetico"],
            ambito: ["il mondo del lavoro", "le relazioni personali", "l'educazione", "l'economia globale", "la privacy"]
        }
    };

    function getRandomElement(arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    }

    function generateIdea() {
        const ideaType = ideaTypeSelect.value;
        const ideaData = data[ideaType];
        
        const template = getRandomElement(ideaData.templates);
        let generatedIdea = template;

        // Trova tutti i segnaposto come {parola} nel template
        const placeholders = template.match(/{[a-z]+}/g) || [];
        
        // Sostituisce ogni segnaposto con una parola casuale dalla lista corrispondente
        placeholders.forEach(placeholder => {
            // es. da "{verbo}" a "verbo"
            const key = placeholder.substring(1, placeholder.length - 1);
            if (ideaData[key]) {
                const replacement = getRandomElement(ideaData[key]);
                generatedIdea = generatedIdea.replace(new RegExp(placeholder, 'g'), replacement);
            }
        });

        ideaOutput.textContent = generatedIdea;
    }

    generateBtn.addEventListener('click', generateIdea);
    ideaTypeSelect.addEventListener('change', generateIdea);

    // Genera un'idea iniziale al caricamento della pagina
    generateIdea();
});
