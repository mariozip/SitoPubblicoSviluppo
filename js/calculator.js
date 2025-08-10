document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display');
    const buttons = document.querySelectorAll('.buttons button');

    let isResultShown = false;

    // Funzione centralizzata per aggiornare il display e gestire l'overflow del testo
    function updateDisplay(newText) {
        display.textContent = newText;

        // Resetta la dimensione del font al valore di default
        display.style.fontSize = '2.5em';

        // Ottiene la dimensione del font corrente in pixel per poterla ridurre
        let currentFontSize = parseFloat(window.getComputedStyle(display, null).getPropertyValue('font-size'));

        // Riduci la dimensione del font finché il testo non entra nel display
        while (display.scrollWidth > display.clientWidth && currentFontSize > 10) {
            currentFontSize -= 2; // Riduci di 2px
            display.style.fontSize = `${currentFontSize}px`;
        }
    }


    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const buttonText = button.textContent;
            const currentDisplay = display.textContent;

            if (button.id === 'clear') {
                updateDisplay('0');
                isResultShown = false;
            } else if (button.id === 'equals') {
                try {
                    // Sanificazione dell'input per sicurezza.
                    // Permette solo numeri, parentesi e gli operatori base.
                    const sanitizedExpression = currentDisplay.replace(/[^-()\d/*+.]/g, '');
                    if (sanitizedExpression !== currentDisplay) {
                        throw new Error("Caratteri non validi");
                    }
                    // Calcola l'espressione sanificata.
                    const result = new Function('return ' + sanitizedExpression)();
                    updateDisplay(result);
                    isResultShown = true;
                } catch (error) {
                    updateDisplay('Errore');
                    isResultShown = true;
                }
            } else {
                const operators = ['/', '*', '-', '+'];
                const lastChar = currentDisplay.slice(-1);
                if (operators.includes(lastChar) && operators.includes(buttonText)) {
                    return;
                }

                if (currentDisplay === '0' || isResultShown) {
                    updateDisplay(buttonText);
                    isResultShown = false;
                } else {
                     updateDisplay(currentDisplay + buttonText);
                }
            }
        });
    });
});
