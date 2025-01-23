const express = require('express');
const fs = require('fs').promises;
const path = require('path');

const router = express.Router();

router.post('/create-project-file', async (req, res) => {
    try {
        const { filename, content } = req.body;
        const filePath = path.join(__dirname, '../PROYECTOS', filename);
        
        await fs.writeFile(filePath, content);
        res.json({ success: true });
    } catch (error) {
        console.error('Error creating project file:', error);
        res.status(500).json({ error: 'Error creating project file' });
    }
});

module.exports = router;
