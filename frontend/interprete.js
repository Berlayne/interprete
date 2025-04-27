

 function processFile() {

    const fileInput = document.getElementById('fileInput');
    const lineCount = document.getElementById('lineCount').value;
    const splitWord = document.getElementById('splitWord').value;

    if (!fileInput.files[0]) {
        alert('por favor selecciona un archivo');
        return;
    }

     const file = fileInput.files[0];
     const reader = new FileReader();
     reader.onload = function(event) {
        const content = event.target.result;
        let result = '';

        if (lineCount) {
            result = splitByLines(content, lineCount);
        } else if (splitWord) {
            result = splitByWord(content, splitWord);
        } else {
            alert('por favor ingrese un valor numero o texto para separar');
            return;
        };

        generateSeparatePDFs(result);

     };

     reader.readAsText(file);
}

function splitByLines(content, lineCount) {
    const lines = content.split('\n');
    let chunks = [];
    let chunk = [];

    lines.forEach((line, index) => {
        chunk.push(line);
        if (chunk.length === parseInt(lineCount)) {
            chunks.push(chunk.join('\n'));
            chunk = [];
        }
    });

    if (chunk.length > 0) {
        chunks.push(chunk.join('\n'));
    }

return chunks;
}

function splitByWord(content, word) {
    const regex = new RegExp(`(${word})`, 'g');
    const sections = content.split(regex);
    let chunks = [];
    let currentChunk = '';

    sections.forEach((part, index) => {
        if (part.match(regex)) {
            if (currentChunk) {
                chunks.push(currentChunk);
            }
            currentChunk = part;
        } else {
            currentChunk += part;
        }
    });

    if (currentChunk) {
        chunks.push(currentChunk);
    }
 
    return chunks;
}

function generateSeparatePDFs(sections) {
    const { jsPDF } = window.jspdf;

    sections.forEach((section, index) => {
        const doc = new jsPDF();

        const numberMatch = section.match(/ID:\s*(\d+)/);
        let fileName = 'archivo_seccion';

        if (numberMatch) {
            fileName = `archivo_${numberMatch[1]}`;
        } else {
            fileName = `archivo_seccion_${index + 1}`;
        }

        doc.text(section, 10, 10); 
        
        // Convertir el PDF a Base64
        const pdfBase64 = doc.output('datauristring');

        // Guardar el PDF en la base de datos
       /* savePDFToDatabase(pdfBase64, fileName);*/
       /*sendPDFToEmail(pdfBase64, fileName);*/
       doc.save()

    });
}

/*
function savePDFToDatabase(pdfBase64, fileName) {
    const data = {
        PDFs: pdfBase64,
        fileName: fileName
    };

    // Realizamos la solicitud POST al servidor para guardar el PDF en la base de datos
    fetch('http://localhost:3000/interprete/server.js', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        console.log('PDF guardado:', data);
        alert('PDF guardado correctamente en la base de datos');
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Hubo un error al guardar el PDF');
    });
}
*/
/*
function sendPDFToEmail(pdfBase64, fileName) {
    const data = {
        PDFBase64: pdfBase64,
        fileName: fileName
    };

    fetch('http://127.0.0.1:3000/send-email', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Correo enviado:', data);
        alert('El archivo se ha enviado por correo electrónico.');
    })
    .catch(error => {
        console.error('Error al enviar el correo:', error);
        alert('Hubo un error al enviar el correo.');
    });
}
*/