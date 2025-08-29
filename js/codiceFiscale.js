document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('cfForm');
    const cfOutput = document.getElementById('codiceFiscaleOutput');
    const comuneSelect = document.getElementById('comuneNascita');

    // Mappa dei mesi
    const mesi = {
        '01': 'A', '02': 'B', '03': 'C', '04': 'D', '05': 'E',
        '06': 'H', '07': 'L', '08': 'M', '09': 'P', '10': 'R',
        '11': 'S', '12': 'T'
    };

    // Mappa di esempio per i comuni (codice catastale)
    const comuni = {
        'H501': 'ROMA',
        'F205': 'MILANO',
        'F839': 'NAPOLI',
        'L219': 'TORINO',
        'G273': 'PALERMO',
        'A944': 'BOLOGNA',
        'D612': 'FIRENZE',
        'A794': 'BARI',
        'C351': 'CATANIA',
        'M126': 'VENEZIA'
    };
    
    // Popola la select dei comuni
    for (const code in comuni) {
        const option = document.createElement('option');
        option.value = code;
        option.textContent = `${comuni[code]} (${code})`;
        comuneSelect.appendChild(option);
    }

    // Mappe per il carattere di controllo
    const charControlPari = {
        '0': 0, '1': 1, '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9,
        'A': 0, 'B': 1, 'C': 2, 'D': 3, 'E': 4, 'F': 5, 'G': 6, 'H': 7, 'I': 8, 'J': 9,
        'K': 10, 'L': 11, 'M': 12, 'N': 13, 'O': 14, 'P': 15, 'Q': 16, 'R': 17, 'S': 18,
        'T': 19, 'U': 20, 'V': 21, 'W': 22, 'X': 23, 'Y': 24, 'Z': 25
    };

    const charControlDispari = {
        '0': 1, '1': 0, '2': 5, '3': 7, '4': 9, '5': 13, '6': 15, '7': 17, '8': 19, '9': 21,
        'A': 1, 'B': 0, 'C': 5, 'D': 7, 'E': 9, 'F': 13, 'G': 15, 'H': 17, 'I': 19, 'J': 21,
        'K': 2, 'L': 4, 'M': 18, 'N': 20, 'O': 11, 'P': 3, 'Q': 6, 'R': 8, 'S': 12, 'T': 14,
        'U': 16, 'V': 10, 'W': 22, 'X': 25, 'Y': 24, 'Z': 23
    };
    
    const charControlResto = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    function getConsonantiVocali(str) {
        const upperStr = str.toUpperCase().replace(/[^A-Z]/g, '');
        const vocali = upperStr.replace(/[^AEIOU]/g, '');
        const consonanti = upperStr.replace(/[AEIOU]/g, '');
        return { vocali, consonanti };
    }

    function calcolaCognome(cognome) {
        const { vocali, consonanti } = getConsonantiVocali(cognome);
        let codice = consonanti + vocali;
        codice = (codice + 'XXX').substring(0, 3);
        return codice;
    }

    function calcolaNome(nome) {
        const { vocali, consonanti } = getConsonantiVocali(nome);
        if (consonanti.length >= 4) {
            return consonanti[0] + consonanti[2] + consonanti[3];
        }
        let codice = consonanti + vocali;
        codice = (codice + 'XXX').substring(0, 3);
        return codice;
    }

    function calcolaData(dataNascita, sesso) {
        const data = new Date(dataNascita);
        const anno = data.getFullYear().toString().slice(-2);
        const mese = mesi[('0' + (data.getMonth() + 1)).slice(-2)];
        let giorno = data.getDate();
        if (sesso === 'F') {
            giorno += 40;
        }
        const giornoStr = ('0' + giorno).slice(-2);
        return anno + mese + giornoStr;
    }

    function calcolaCarattereControllo(codiceParziale) {
        let somma = 0;
        for (let i = 0; i < 15; i++) {
            const char = codiceParziale[i];
            if ((i + 1) % 2 === 0) { // Posizione pari
                somma += charControlPari[char];
            } else { // Posizione dispari
                somma += charControlDispari[char];
            }
        }
        const resto = somma % 26;
        return charControlResto[resto];
    }

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const formData = new FormData(form);
        const nome = formData.get('nome');
        const cognome = formData.get('cognome');
        const dataNascita = formData.get('dataNascita');
        const sesso = formData.get('sesso');
        const comune = formData.get('comuneNascita');

        if (!nome || !cognome || !dataNascita || !sesso || !comune) {
            cfOutput.textContent = "Compila tutti i campi.";
            return;
        }

        try {
            const codiceCognome = calcolaCognome(cognome);
            const codiceNome = calcolaNome(nome);
            const codiceData = calcolaData(dataNascita, sesso);
            const codiceComune = comune;

            const codiceParziale = codiceCognome + codiceNome + codiceData + codiceComune;
            const carattereControllo = calcolaCarattereControllo(codiceParziale);

            const codiceFiscaleCompleto = codiceParziale + carattereControllo;
            cfOutput.textContent = codiceFiscaleCompleto;
        } catch (error) {
            console.error("Errore nel calcolo:", error);
            cfOutput.textContent = "Errore nel calcolo. Controlla i dati inseriti.";
        }
    });
});
