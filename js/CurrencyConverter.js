document.addEventListener('DOMContentLoaded', () => {
    const amountInput = document.getElementById('amount');
    const fromCurrencySelect = document.getElementById('fromCurrency');
    const toCurrencySelect = document.getElementById('toCurrency');
    const resultInput = document.getElementById('result');
    const rateInfo = document.getElementById('rate-info');
    const updateStatus = document.getElementById('update-status');

    const API_URL = 'https://open.er-api.com/v6/latest/EUR';
    let rates = {}; // Verrà popolato dall'API

    async function initializeConverter() {
        updateStatus.textContent = 'Aggiornamento tassi in corso...';
        try {
            const response = await fetch(API_URL);
            if (!response.ok) throw new Error('La risposta del server non è stata positiva.');
            
            const data = await response.json();
            if (data.result === 'error') throw new Error(`Errore dall'API: ${data['error-type']}`);

            rates = data.rates;
            populateCurrencies();
            convert();

            const lastUpdateDate = new Date(data.time_last_update_utc);
            updateStatus.textContent = `Tassi aggiornati il: ${lastUpdateDate.toLocaleString('it-IT')}`;

        } catch (error) {
            console.error('Errore nel recupero dei tassi di cambio:', error);
            updateStatus.textContent = 'Errore: impossibile caricare i tassi di cambio.';
            updateStatus.classList.add('error');
        }
    }

    function populateCurrencies() {
        const currencyKeys = Object.keys(rates);
        const fragment = document.createDocumentFragment();

        fromCurrencySelect.innerHTML = '';
        toCurrencySelect.innerHTML = '';

        currencyKeys.forEach(currency => {
            const option = document.createElement('option');
            option.value = currency;
            option.textContent = currency;
            fragment.appendChild(option);
        });

        fromCurrencySelect.appendChild(fragment.cloneNode(true));
        toCurrencySelect.appendChild(fragment);

        // Imposta valori predefiniti se esistono
        if (currencyKeys.includes('EUR')) fromCurrencySelect.value = 'EUR';
        if (currencyKeys.includes('USD')) toCurrencySelect.value = 'USD';
    }

    function convert() {
        if (Object.keys(rates).length === 0) return;

        const amount = parseFloat(amountInput.value);
        const fromCurrency = fromCurrencySelect.value;
        const toCurrency = toCurrencySelect.value;

        if (isNaN(amount) || !fromCurrency || !toCurrency) return;

        const fromRate = rates[fromCurrency];
        const toRate = rates[toCurrency];
        const result = (amount / fromRate) * toRate;

        resultInput.value = result.toLocaleString('it-IT', { style: 'currency', currency: toCurrency });

        const singleUnitRate = (1 / fromRate) * toRate;
        rateInfo.textContent = `1 ${fromCurrency} = ${singleUnitRate.toFixed(4)} ${toCurrency}`;
    }

    // Event Listeners
    [amountInput, fromCurrencySelect, toCurrencySelect].forEach(el => el.addEventListener('input', convert));

    // Inizializzazione
    initializeConverter();
});
