const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

function getMultimedia() {
    const filePath = path.join(__dirname, '../data/multimedia.json');
    try {
        const data = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading multimedia.json:', error);
        return { title: 'الاستوديو', subtitle: '', videos: [], gallery: [] };
    }
}

router.get('/studio', (req, res) => {
    const multimedia = getMultimedia();
    res.render('multimedia/studio', { multimedia });
});

module.exports = router;
