const express = require('express');
const fs = require('fs').promises;
const path = require('path');

const app = express();
app.use(express.json());

// Endpoint para guardar archivos HTML
app.post('/api/save-property', async (req, res) => {
    try {
        const { filename, content } = req.body;

        if (!filename || !content) {
            return res.status(400).json({ success: false, error: 'Faltan datos (filename o content)' });
        }

        if (!filename.endsWith('.html')) {
            return res.status(400).json({ success: false, error: 'El nombre del archivo debe terminar en .html' });
        }

        const dirPath = path.join(__dirname, '../PROYECTOS');
        await fs.mkdir(dirPath, { recursive: true }); // Crea la carpeta si no existe

        const filePath = path.join(dirPath, filename);
        console.log('Ruta del archivo a crear:', filePath);

        await fs.writeFile(filePath, content, 'utf8');
        res.json({ success: true, message: 'Archivo creado exitosamente' });
    } catch (error) {
        console.error('Error al guardar el archivo:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});
