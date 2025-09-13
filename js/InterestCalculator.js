document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('interestForm');
    const principalInput = document.getElementById('principal');
    const rateInput = document.getElementById('rate');
    const timeInput = document.getElementById('time');
    const interestTypeRadios = document.querySelectorAll('input[name="interestType"]');
    const compoundingGroup = document.getElementById('compoundingGroup');
    const compoundingSelect = document.getElementById('compounding');
    
    const resultBox = document.getElementById('result-box');
    const finalAmountSpan = document.getElementById('finalAmount');
    const totalInterestSpan = document.getElementById('totalInterest');

    function toggleCompounding() {
        const selectedType = document.querySelector('input[name="interestType"]:checked').value;
        if (selectedType === 'compound') {
            compoundingGroup.style.display = 'block';
        } else {
            compoundingGroup.style.display = 'none';
        }
    }

    function calculateInterest(event) {
        event.preventDefault();

        const principal = parseFloat(principalInput.value);
        const rate = parseFloat(rateInput.value) / 100; // Convert percentage to decimal
        const time = parseFloat(timeInput.value);
        const interestType = document.querySelector('input[name="interestType"]:checked').value;

        if (isNaN(principal) || isNaN(rate) || isNaN(time)) {
            resultBox.style.display = 'none';
            return;
        }

        let finalAmount = 0;
        let totalInterest = 0;

        if (interestType === 'simple') {
            // Formula: A = P(1 + rt)
            finalAmount = principal * (1 + rate * time);
        } else { // compound
            // Formula: A = P(1 + r/n)^(nt)
            const n = parseInt(compoundingSelect.value); // Compounding frequency
            finalAmount = principal * Math.pow((1 + rate / n), n * time);
        }

        totalInterest = finalAmount - principal;

        // Format to currency
        const currencyFormatter = new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR' });

        finalAmountSpan.textContent = currencyFormatter.format(finalAmount);
        totalInterestSpan.textContent = currencyFormatter.format(totalInterest);
        resultBox.style.display = 'block';
    }

    // Event Listeners
    form.addEventListener('submit', calculateInterest);
    interestTypeRadios.forEach(radio => radio.addEventListener('change', toggleCompounding));

    // Initial state
    toggleCompounding();
});
