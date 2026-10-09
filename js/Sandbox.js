// Attende che l'intera struttura HTML della pagina sia stata caricata dal browser
document.addEventListener('DOMContentLoaded', function() {

    // 1. Identifichiamo il pulsante tramite il suo ID univoco
    const bottone = document.getElementById('pulsante-test');
    
    // 2. Identifichiamo il paragrafo vuoto che farà da contenitore per il messaggio
    const outputTesto = document.getElementById('messaggio-output');
    
    // 3. Identifichiamo la casella di input in cui l'utente scrive
    const inputNome = document.getElementById('campo-nome');

    // 4. Mettiamo il pulsante in ascolto dell'evento 'click'
    bottone.addEventListener('click', function() {
        
        // Estraiamo il testo inserito dall'utente usando la proprietà .value
        let nomeInserito = inputNome.value;
        
        // Verifichiamo se l'utente ha scritto qualcosa (stringa non vuota)
        if (nomeInserito.trim() !== "") {
            // Se c'è un testo, componiamo il saluto personalizzato
            outputTesto.textContent = "Ciao " + nomeInserito + ", benvenuto nella programmazione JS!";
            outputTesto.style.color = "blue";
        } else {
            // Se la casella è vuota o contiene solo spazi, mostriamo un avviso di errore
            outputTesto.textContent = "Per favore, inserisci un nome prima di cliccare!";
            outputTesto.style.color = "red";
        }
        
        // Rendiamo il testo della risposta in grassetto
        outputTesto.style.fontWeight = "bold";
    });

});