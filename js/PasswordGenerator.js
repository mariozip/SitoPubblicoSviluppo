document.addEventListener('DOMContentLoaded', () => {
    // Elementi del DOM
    const lengthSlider = document.getElementById('length');
    const lengthValue = document.getElementById('lengthValue');
    const includeUppercase = document.getElementById('includeUppercase');
    const includeLowercase = document.getElementById('includeLowercase');
    const includeNumbers = document.getElementById('includeNumbers');
    const includeSymbols = document.getElementById('includeSymbols');
    const generateBtn = document.getElementById('generateBtn');
    const passwordOutput = document.getElementById('passwordOutput');
    const copyBtn = document.getElementById('copyBtn');

    // Set di caratteri
    const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const numberChars = '0123456789';
    const symbolChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';

    // Aggiorna il valore della lunghezza visualizzato
    lengthSlider.addEventListener('input', () => {
        lengthValue.textContent = lengthSlider.value;
    });

    // Funzione per generare la password
    function generatePassword() {
        const length = parseInt(lengthSlider.value);
        let allowedChars = '';
        let password = '';

        // Costruisci la stringa di caratteri consentiti
        if (includeUppercase.checked) allowedChars += uppercaseChars;
        if (includeLowercase.checked) allowedChars += lowercaseChars;
        if (includeNumbers.checked) allowedChars += numberChars;
        if (includeSymbols.checked) allowedChars += symbolChars;

        // Controlla se almeno un'opzione è selezionata
        if (allowedChars.length === 0) {
            passwordOutput.value = 'Seleziona almeno un tipo di carattere!';
            return;
        }

        // Genera la password
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * allowedChars.length);
            password += allowedChars[randomIndex];
        }

        passwordOutput.value = password;
        copyBtn.textContent = 'Copia'; // Resetta il testo del pulsante copia
    }

    // Funzione per copiare la password
    function copyPassword() {
        const password = passwordOutput.value;
        if (!password || password.startsWith('Seleziona')) {
            return; // Non copiare se non c'è una password valida
        }

        navigator.clipboard.writeText(password).then(() => {
            copyBtn.textContent = 'Copiato!';
            setTimeout(() => {
                copyBtn.textContent = 'Copia';
            }, 2000);
        }).catch(err => {
            console.error('Errore durante la copia:', err);
            copyBtn.textContent = 'Errore';
        });
    }

    // Event listener
    generateBtn.addEventListener('click', generatePassword);
    copyBtn.addEventListener('click', copyPassword);

    // Genera una password al caricamento della pagina
    generatePassword();
});
