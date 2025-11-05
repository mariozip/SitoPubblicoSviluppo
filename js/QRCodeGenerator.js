document.addEventListener('DOMContentLoaded', () => {
    const textInput = document.getElementById('text-input');
    const generateBtn = document.getElementById('generate-btn');
    const qrCodeContainer = document.getElementById('qrcode');
    const qrCodePlaceholder = document.getElementById('qrcode-placeholder');
    const downloadBtn = document.getElementById('download-btn');

    let qrcode = null;

    function generateQRCode() {
        const text = textInput.value.trim();
        if (!text) {
            alert('Per favore, inserisci un testo o un URL.');
            textInput.focus();
            return;
        }

        // Pulisce il contenitore precedente
        qrCodeContainer.innerHTML = '';

        // Crea un nuovo oggetto QRCode
        qrcode = new QRCode(qrCodeContainer, {
            text: text,
            width: 180,
            height: 180,
            colorDark: "#000000",
            colorLight: "#ffffff",
            correctLevel: QRCode.CorrectLevel.H
        });

        qrCodePlaceholder.style.display = 'none';
        downloadBtn.style.display = 'block';
    }

    generateBtn.addEventListener('click', generateQRCode);

    textInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            generateQRCode();
        }
    });

    downloadBtn.addEventListener('click', () => {
        const img = qrCodeContainer.querySelector('img');
        const link = document.createElement('a');
        link.href = img.src;
        link.download = 'qrcode.png';
        link.click();
    });
});