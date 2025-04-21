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

// Start the server
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});