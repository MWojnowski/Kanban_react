const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

app.post('/api/update-board-file', async (req, res) => {
    const { filename, csvData } = req.body;
    const filePath = path.join('./public/Projects', filename);

    try {
        await fs.writeFile(filePath, csvData, 'utf8');
        res.status(200).json({ message: `File ${filename} updated successfully.` });
    } catch (error) {
        console.error(`Error updating file ${filename}:`, error);
        res.status(500).json({ error: `Failed to update file ${filename}.` });
    }
});

app.post('/api/create-project', async (req, res) => {
    const { filename } = req.body;
    const filePath = path.join('./public/Projects', filename);

    try {
        try {
            await fs.access(filePath);
            return res.status(400).json({ error: 'File already exists.' });
        } catch {}

        await fs.writeFile(filePath, 'column1,column2,column3\n', 'utf8');

        let manifest = [];
        try {
            const manifestContent = await fs.readFile('./public/Projects/manifest.json', 'utf8');
            manifest = JSON.parse(manifestContent);
        } catch {}

        if (!manifest.includes(filename)) {
            manifest.unshift(filename);
            await fs.writeFile('./public/Projects/manifest.json', JSON.stringify(manifest, null, 2), 'utf8');
        }

        res.status(200).json({ message: `File ${filename} created and manifest updated.` });
    } catch (error) {
        console.error('Error creating new project:', error);
        res.status(500).json({ error: 'Failed to create new project.' });
    }
});


app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});