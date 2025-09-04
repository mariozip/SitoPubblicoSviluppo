document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('bmiForm');
    const weightInput = document.getElementById('weight');
    const heightInput = document.getElementById('height');
    const risultatoBox = document.getElementById('risultato');
    const bmiOutput = document.getElementById('bmiOutput');
    const bmiCategoryOutput = document.getElementById('bmiCategory');

    function calculateAndDisplayBMI() {
        const weight = parseFloat(weightInput.value);
        const height = parseFloat(heightInput.value);

        // Se i dati non sono validi, nascondi il box dei risultati e interrompi.
        if (isNaN(weight) || isNaN(height) || weight <= 0 || height <= 0) {
            risultatoBox.style.display = 'none';
            return;
        }

        // Calcola il BMI. L'altezza viene convertita da cm a metri.
        const heightInMeters = height / 100;
        const bmi = weight / (heightInMeters * heightInMeters);

        // Mostra il risultato
        bmiOutput.textContent = bmi.toFixed(2); // Arrotonda a due cifre decimali
        risultatoBox.style.display = 'block';

        // Determina la categoria e imposta lo stile
        let category = '';
        let categoryClass = '';

        if (bmi < 18.5) {
            category = 'Sottopeso';
            categoryClass = 'underweight';
        } else if (bmi < 25) { // bmi >= 18.5 è implicito
            category = 'Normopeso';
            categoryClass = 'normal';
        } else if (bmi < 30) { // bmi >= 25 è implicito
            category = 'Sovrappeso';
            categoryClass = 'overweight';
        } else { // bmi >= 30
            category = 'Obeso';
            categoryClass = 'obese';
        }

        bmiCategoryOutput.textContent = category;
        
        // Rimuovi le classi precedenti e aggiungi quella nuova
        risultatoBox.className = 'risultato-box'; // Resetta le classi
        risultatoBox.classList.add(categoryClass);
    }

    // Impedisce al form di ricaricare la pagina quando si preme Invio
    form.addEventListener('submit', (event) => {
        event.preventDefault();
    });

    // Calcola il BMI a ogni modifica degli input (digitazione o uso delle frecce)
    weightInput.addEventListener('input', calculateAndDisplayBMI);
    heightInput.addEventListener('input', calculateAndDisplayBMI);

    // Calcola il BMI con i valori iniziali al caricamento della pagina
    calculateAndDisplayBMI();
});
