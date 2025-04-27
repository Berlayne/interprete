/*const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Conexión a MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // Usa tus credenciales
    password: 'ber92layne', // Reemplázalo por tu contraseña
    database: 'interprete' // Nombre de la base de datos
});

db.connect(err => {
    if (err) {
        console.error('Error al conectar a la base de datos', err);
        return;
    }
    console.log('Conexión exitosa a la base de datos');
});

// Ruta para guardar el PDF
app.post('/interprete', (req, res) => {
    const { PDFs, fileName } = req.body;
    
    // Verifica que los datos lleguen correctamente
    console.log('Recibiendo PDF:', fileName);
    console.log('Contenido PDF:', PDFs);

    if (!PDFs || !fileName) {
        return res.status(400).json({ error: 'Faltan datos para guardar el PDF' });
      }

    // Inserta el PDF en la base de datos
    const query = 'INSERT INTO archivos_pdf (fileName, PDFs) VALUES (?, ?)';
    db.query(query, [fileName, PDFs], (err, result) => {
        if (err) {
            console.error('Error al guardar el PDF:', err);
            return res.status(500).json({ error: 'Hubo un error al guardar el PDF' });
        }
        res.status(200).json({ message: 'PDF guardado correctamente' });
    });
});

// Iniciar el servidor
const PORT = 3000
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
*/