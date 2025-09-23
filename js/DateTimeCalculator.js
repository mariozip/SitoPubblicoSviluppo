document.addEventListener('DOMContentLoaded', () => {
    // Elementi per la differenza tra date
    const startDateInput = document.getElementById('startDate');
    const endDateInput = document.getElementById('endDate');
    const calculateDiffBtn = document.getElementById('calculateDiffBtn');
    const diffResultDiv = document.getElementById('diffResult');

    // Elementi per aggiungere/sottrarre durata
    const baseDateInput = document.getElementById('baseDate');
    const yearsInput = document.getElementById('years');
    const monthsInput = document.getElementById('months');
    const weeksInput = document.getElementById('weeks');
    const daysInput = document.getElementById('days');
    const addDurationBtn = document.getElementById('addDurationBtn');
    const subtractDurationBtn = document.getElementById('subtractDurationBtn');
    const dateCalcResultDiv = document.getElementById('dateCalcResult');

    // Imposta le date di default a oggi
    const today = new Date().toISOString().split('T')[0];
    startDateInput.value = today;
    endDateInput.value = today;
    baseDateInput.value = today;

    function dateDiffInYMD(d1, d2) {
        let date1 = new Date(d1);
        let date2 = new Date(d2);

        let yearDiff = date2.getFullYear() - date1.getFullYear();
        let monthDiff = date2.getMonth() - date1.getMonth();
        let dayDiff = date2.getDate() - date1.getDate();

        if (dayDiff < 0) {
            monthDiff--;
            const lastDayOfPrevMonth = new Date(date2.getFullYear(), date2.getMonth(), 0).getDate();
            dayDiff += lastDayOfPrevMonth;
        }

        if (monthDiff < 0) {
            yearDiff--;
            monthDiff += 12;
        }
        
        return { years: yearDiff, months: monthDiff, days: dayDiff };
    }

    // --- Calcolo Differenza tra Date ---
    calculateDiffBtn.addEventListener('click', () => {
        const startDateStr = startDateInput.value;
        const endDateStr = endDateInput.value;

        if (!startDateStr || !endDateStr) {
            diffResultDiv.innerHTML = '<p>Per favore, inserisci date valide.</p>';
            diffResultDiv.style.display = 'block';
            return;
        }
        
        const startDate = new Date(startDateStr);
        const endDate = new Date(endDateStr);

        if (endDate < startDate) {
            diffResultDiv.innerHTML = '<p>La data finale non può essere precedente a quella iniziale.</p>';
            diffResultDiv.style.display = 'block';
            return;
        }

        const diffTime = endDate.getTime() - startDate.getTime();
        const totalDays = diffTime / (1000 * 60 * 60 * 24);

        const { years, months, days } = dateDiffInYMD(startDate, endDate);

        let resultHTML = `<h3>Risultato della Differenza</h3>`;
        resultHTML += `<p><strong>${years}</strong> ${years === 1 ? 'anno' : 'anni'}, <strong>${months}</strong> ${months === 1 ? 'mese' : 'mesi'} e <strong>${days}</strong> ${days === 1 ? 'giorno' : 'giorni'}</p>`;
        resultHTML += `<p>oppure</p>`;
        resultHTML += `<p>Totale di <strong>${totalDays}</strong> ${totalDays === 1 ? 'giorno' : 'giorni'}</p>`;

        diffResultDiv.innerHTML = resultHTML;
        diffResultDiv.style.display = 'block';
    });

    // --- Aggiunta/Sottrazione Durata ---
    function calculateNewDate(operation) {
        const baseDate = new Date(baseDateInput.value);
        if (isNaN(baseDate.getTime())) {
            dateCalcResultDiv.innerHTML = '<p>Per favore, inserisci una data di partenza valida.</p>';
            dateCalcResultDiv.style.display = 'block';
            return;
        }

        const years = parseInt(yearsInput.value) || 0;
        const months = parseInt(monthsInput.value) || 0;
        const weeks = parseInt(weeksInput.value) || 0;
        const days = parseInt(daysInput.value) || 0;

        const multiplier = operation === 'add' ? 1 : -1;

        const newDate = new Date(baseDate);
        newDate.setFullYear(newDate.getFullYear() + (years * multiplier));
        newDate.setMonth(newDate.getMonth() + (months * multiplier));
        newDate.setDate(newDate.getDate() + ((weeks * 7 + days) * multiplier));

        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const formattedDate = newDate.toLocaleDateString('it-IT', options);

        let resultHTML = `<h3>Nuova Data Calcolata</h3>`;
        resultHTML += `<p><strong>${formattedDate}</strong></p>`;
        
        dateCalcResultDiv.innerHTML = resultHTML;
        dateCalcResultDiv.style.display = 'block';
    }

    addDurationBtn.addEventListener('click', () => calculateNewDate('add'));
    subtractDurationBtn.addEventListener('click', () => calculateNewDate('subtract'));
});
