// Aggiungiamo un "ascoltatore". Aspettiamo che il browser abbia letto tutto l'HTML 
// prima di far partire il codice. È una pratica sicura per evitare errori.
document.addEventListener('DOMContentLoaded', function() {

    // 1. Troviamo il pulsante usando il suo ID e lo salviamo in una costante (una "scatola" di memoria)
    const bottone = document.getElementById('pulsante-test');
    
    // 2. Troviamo il paragrafo vuoto (sempre tramite il suo ID) dove scriveremo il messaggio
    const outputTesto = document.getElementById('messaggio-output');

    // 3. Diciamo al bottone di restare in ascolto: aspetta che l'utente faccia 'click'
    bottone.addEventListener('click', function() {
        
        // 4. Azioni da eseguire ESATTAMENTE nel momento del click:
        
        // Inseriamo la frase di risposta come testo all'interno del paragrafo vuoto
        outputTesto.textContent = "Ciao Mario! Il server non si è mai fermato e il codice funziona!";
        
        // Modifichiamo lo stile (CSS) tramite JavaScript per colorare il testo di blu
        outputTesto.style.color = "red";
        
        // Modifichiamo lo stile per rendere il testo in grassetto
        outputTesto.style.fontWeight = "bold";
    });

});