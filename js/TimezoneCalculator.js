document.addEventListener('DOMContentLoaded', () => {
    const fromTimezoneSelect = document.getElementById('fromTimezone');
    const toTimezoneSelect = document.getElementById('toTimezone');
    const fromTimeDisplay = document.getElementById('fromTime');
    const toTimeDisplay = document.getElementById('toTime');
    const timeInput = document.getElementById('timeInput');
    const resultBox = document.getElementById('result');
    const convertedTimeSpan = document.getElementById('convertedTime');

    // Popola i menu a tendina con i fusi orari
    function populateTimezones() {
        const timezones = Intl.supportedValuesOf('timeZone');
        const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

        timezones.forEach(tz => {
            const fromOption = document.createElement('option');
            fromOption.value = tz;
            fromOption.textContent = tz.replace(/_/g, ' ');
            fromTimezoneSelect.appendChild(fromOption);

            const toOption = document.createElement('option');
            toOption.value = tz;
            toOption.textContent = tz.replace(/_/g, ' ');
            toTimezoneSelect.appendChild(toOption);
        });

        // Imposta i valori predefiniti
        fromTimezoneSelect.value = userTimezone;
        toTimezoneSelect.value = 'UTC'; // Un default comune
    }

    // Aggiorna gli orologi con l'ora corrente
    function updateClocks() {
        const now = new Date();
        const fromZone = fromTimezoneSelect.value;
        const toZone = toTimezoneSelect.value;

        const timeFormatOptions = {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        };

        fromTimeDisplay.textContent = new Intl.DateTimeFormat('it-IT', { ...timeFormatOptions, timeZone: fromZone }).format(now);
        toTimeDisplay.textContent = new Intl.DateTimeFormat('it-IT', { ...timeFormatOptions, timeZone: toZone }).format(now);
    }

    // Converte l'orario inserito dall'utente
    function convertTime() {
        const fromZone = fromTimezoneSelect.value;
        const toZone = toTimezoneSelect.value;
        const inputValue = timeInput.value;

        if (!inputValue) {
            resultBox.style.display = 'none';
            return;
        }

        // Crea una data basata sull'input dell'utente.
        const [hours, minutes] = inputValue.split(':');
        const dateToConvert = new Date();
        dateToConvert.setHours(hours, minutes, 0, 0);

        // Formatta la data nel fuso orario di destinazione
        const convertedTime = new Intl.DateTimeFormat('it-IT', {
            timeStyle: 'long',
            timeZone: toZone
        }).format(dateToConvert);
        
        const fromTime = new Intl.DateTimeFormat('it-IT', {
            timeStyle: 'short',
            timeZone: fromZone
        }).format(dateToConvert);

        convertedTimeSpan.textContent = `${convertedTime}`;
        resultBox.querySelector('p').textContent = `Le ${fromTime} in "${fromZone.replace(/_/g, ' ')}" corrispondono a:`;
        resultBox.style.display = 'block';
    }

    // Event Listeners
    fromTimezoneSelect.addEventListener('change', () => { updateClocks(); convertTime(); });
    toTimezoneSelect.addEventListener('change', () => { updateClocks(); convertTime(); });
    timeInput.addEventListener('input', convertTime);

    // Inizializzazione
    populateTimezones();
    updateClocks();
    setInterval(updateClocks, 1000); // Aggiorna gli orologi ogni secondo
});
