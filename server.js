const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;
const DATA_DIR = path.join(__dirname, 'JSON');

app.use(bodyParser.json());
app.use(express.static('public')); // Servir archivos estáticos desde la carpeta 'public'

// Endpoint para obtener los datos
app.get('/api/medicos', (req, res) => {
    const filePath = path.join(DATA_DIR, 'medicos.json');
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Error reading data file' });
        }
        res.json(JSON.parse(data));
    });
});

// Endpoint para obtener los datos de servicios
app.get('/api/servicios', (req, res) => {
    const filePath = path.join(DATA_DIR, 'JSON/servicios.json');
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Error reading data file' });
        }
        res.json(JSON.parse(data));
    });
});

// Endpoint para guardar los datos
app.post('/api/medicos', (req, res) => {
    const filePath = path.join(DATA_DIR, 'medicos.json');
    fs.writeFile(filePath, JSON.stringify(req.body, null, 2), 'utf8', (err) => {
        if (err) {
            return res.status(500).json({ error: 'Error writing data file' });
        }
        res.status(200).json({ message: 'Data saved successfully' });
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});