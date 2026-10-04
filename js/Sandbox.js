// Aggiungiamo un "ascoltatore di eventi" (Event Listener) all'intero documento.
// 'DOMContentLoaded' significa che JavaScript aspetterà che l'HTML sia stato caricato del tutto
// prima di eseguire questo blocco di codice. È una pratica molto sicura!
document.addEventListener('DOMContentLoaded', function() {

    // Cerchiamo l'elemento HTML con id "pulsante-test" e lo salviamo in una variabile chiamata "bottone"
    const bottone = document.getElementById('pulsante-test');
    
    // Cerchiamo l'elemento HTML con id "messaggio-output" e lo salviamo nella variabile "output"
    const output = document.getElementById('messaggio-output');

    // Ora diciamo al nostro bottone di mettersi in ascolto per l'evento "click"
    bottone.addEventListener('click', function() {
        
        // Quando avviene il click, modifichiamo il contenuto di testo (textContent) del paragrafo di output
        output.textContent = "Ottimo lavoro! Il tuo JavaScript funziona perfettamente.";
        
        // Cambiamo anche il colore del testo per dare un feedback visivo immediato (verde)
        output.style.color = "green";
        
        // Rendiamo il testo in grassetto
        output.style.fontWeight = "bold";
    });

});