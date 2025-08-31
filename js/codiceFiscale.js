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
        'A089': 'AGRIGENTO',
        'A182': 'ALESSANDRIA',
        'A271': 'ANCONA',
        'A285': 'ANDRIA',
        'A326': 'AOSTA',
        'A390': 'AREZZO',
        'A462': 'ASCOLI PICENO',
        'A479': 'ASTI',
        'A509': 'AVELLINO',
        'A662': 'BARI',
        'A669': 'BARLETTA',
        'A757': 'BELLUNO',
        'A783': 'BENEVENTO',
        'A859': 'BIELLA',
        'A944': 'BOLOGNA',
        'A952': 'BOLZANO',
        'B157': 'BRESCIA',
        'B180': 'BRINDISI',
        'B354': 'CAGLIARI',
        'B429': 'CALTANISSETTA',
        'B519': 'CAMPOBASSO',
        'C351': 'CATANIA',
        'C352': 'CASERTA',
        'C573': 'CESENA',
        'C632': 'CHIETI',
        'C933': 'COMO',
        'D086': 'COSENZA',
        'D122': 'CROTONE',
        'D150': 'CREMONA',
        'D205': 'CUNEO',
        'D403': 'ENNA',
        'D542': 'FERMO',
        'D548': 'FERRARA',
        'D612': 'FIRENZE',
        'D643': 'FOGGIA',
        'D704': 'FORLÌ',
        'D810': 'FROSINONE',
        'D969': 'GENOVA',
        'E098': 'GORIZIA',
        'E202': 'GROSSETO',
        'E290': 'IMPERIA',
        'E335': 'ISERNIA',
        'E463': 'LA SPEZIA',
        'E472': 'LATINA',
        'E506': 'LECCE',
        'E507': 'LECCO',
        'E625': 'LIVORNO',
        'E648': 'LODI',
        'E715': 'LUCCA',
        'E783': 'MACERATA',
        'E897': 'MANTOVA',
        'F023': 'MASSA',
        'F052': 'MATERA',
        'F158': 'MESSINA',
        'F205': 'MILANO',
        'F257': 'MODENA',
        'F704': 'MONZA',
        'F839': 'NAPOLI',
        'F952': 'NOVARA',
        'F979': 'NUORO',
        'G113': 'ORISTANO',
        'G224': 'PADOVA',
        'G273': 'PALERMO',
        'G337': 'PARMA',
        'G388': 'PAVIA',
        'G478': 'PERUGIA',
        'G479': 'PESARO',
        'G482': 'PESCARA',
        'G535': 'PIACENZA',
        'G702': 'PISA',
        'G713': 'PISTOIA',
        'G888': 'PORDENONE',
        'G942': 'POTENZA',
        'G999': 'PRATO',
        'H163': 'RAGUSA',
        'H199': 'RAVENNA',
        'H224': 'REGGIO CALABRIA',
        'H223': 'REGGIO EMILIA',
        'H282': 'RIETI',
        'H294': 'RIMINI',
        'H501': 'ROMA',
        'H620': 'ROVIGO',
        'H703': 'SALERNO',
        'I452': 'SASSARI',
        'I480': 'SAVONA',
        'I726': 'SIENA',
        'I754': 'SIRACUSA',
        'L049': 'TARANTO',
        'L103': 'TERAMO',
        'L117': 'TERNI',
        'L219': 'TORINO',
        'L327': 'TRAPANI',
        'L328': 'TRANI',
        'L378': 'TRENTO',
        'L407': 'TREVISO',
        'L424': 'TRIESTE',
        'L483': 'UDINE',
        'L500': 'URBINO',
        'L736': 'VENEZIA',
        'L746': 'VERBANIA',
        'L750': 'VERCELLI',
        'L840': 'VERONA',
        'L795': 'VIBO VALENTIA',
        'M082': 'VITERBO'
    };
    
    // Popola la select dei comuni, ordinandoli alfabeticamente
    Object.entries(comuni)
        .sort(([, a], [, b]) => a.localeCompare(b))
        .forEach(([code, name]) => {
            const option = document.createElement('option');
            option.value = code;
            option.textContent = `${name} (${code})`;
            comuneSelect.appendChild(option);
        });

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
